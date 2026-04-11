import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface Expense {
  date: string;
  category: string;
  description: string;
  amount: number;
}

interface AppData {
  expenses?: Record<string, Expense[]>;
  currency?: string;
}

// Kharcha Saathi brand colors
const BRAND_ORANGE = { red: 0.831, green: 0.376, blue: 0.227 }; // #D4603A
const BRAND_CREAM = { red: 0.992, green: 0.965, blue: 0.949 }; // #FDF6F2
const WHITE = { red: 1, green: 1, blue: 1 };
const LIGHT_GRAY = { red: 0.95, green: 0.95, blue: 0.95 };
const DARK_TEXT = { red: 0.2, green: 0.2, blue: 0.2 };

async function getAccessToken(userId: string): Promise<string | null> {
  const { data: tokenRow } = await supabaseAdmin
    .from("google_tokens")
    .select("access_token, refresh_token, expires_at")
    .eq("user_id", userId)
    .single();

  if (!tokenRow?.access_token) return null;

  if (tokenRow.expires_at && tokenRow.expires_at * 1000 < Date.now()) {
    if (!tokenRow.refresh_token) return null;

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: tokenRow.refresh_token,
      }),
    });

    const tokens = await response.json();
    if (!tokens.access_token) return null;

    await supabaseAdmin
      .from("google_tokens")
      .update({
        access_token: tokens.access_token,
        expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    return tokens.access_token;
  }

  return tokenRow.access_token;
}

function getMonthName(monthKey: string): string {
  const [year, month] = monthKey.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

function buildSheetFormatRequests(
  sheetId: number,
  dataRowCount: number,
  categoryCount: number
) {
  const requests = [];

  // Row 0: Banner title (merged, tall, orange bg, large white text)
  requests.push({
    mergeCells: {
      range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 4 },
      mergeType: "MERGE_ALL",
    },
  });
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 0, endRowIndex: 1 },
      cell: {
        userEnteredFormat: {
          textFormat: { bold: true, fontSize: 18, foregroundColorStyle: { rgbColor: WHITE } },
          backgroundColor: BRAND_ORANGE,
          horizontalAlignment: "CENTER",
          verticalAlignment: "MIDDLE",
        },
      },
      fields: "userEnteredFormat(textFormat,backgroundColor,horizontalAlignment,verticalAlignment)",
    },
  });
  requests.push({
    updateDimensionProperties: {
      range: { sheetId, dimension: "ROWS", startIndex: 0, endIndex: 1 },
      properties: { pixelSize: 56 },
      fields: "pixelSize",
    },
  });

  // Row 1: Column headers (orange bg, white text, smaller)
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 1, endRowIndex: 2 },
      cell: {
        userEnteredFormat: {
          textFormat: { bold: true, fontSize: 11, foregroundColorStyle: { rgbColor: WHITE } },
          backgroundColor: { red: 0.722, green: 0.271, blue: 0.153 }, // darker orange
          horizontalAlignment: "CENTER",
          verticalAlignment: "MIDDLE",
        },
      },
      fields: "userEnteredFormat(textFormat,backgroundColor,horizontalAlignment,verticalAlignment)",
    },
  });
  requests.push({
    updateDimensionProperties: {
      range: { sheetId, dimension: "ROWS", startIndex: 1, endIndex: 2 },
      properties: { pixelSize: 32 },
      fields: "pixelSize",
    },
  });

  // Alternate row colors for data rows (starting from row 2)
  for (let i = 0; i < dataRowCount; i++) {
    if (i % 2 === 1) {
      requests.push({
        repeatCell: {
          range: { sheetId, startRowIndex: i + 2, endRowIndex: i + 3 },
          cell: {
            userEnteredFormat: { backgroundColor: BRAND_CREAM },
          },
          fields: "userEnteredFormat(backgroundColor)",
        },
      });
    }
  }

  // Subtotal row (shifted down by 1 due to banner)
  const subtotalRow = dataRowCount + 3;
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: subtotalRow, endRowIndex: subtotalRow + 1 },
      cell: {
        userEnteredFormat: {
          textFormat: { bold: true, fontSize: 11 },
          backgroundColor: LIGHT_GRAY,
          borders: {
            top: { style: "SOLID_MEDIUM", colorStyle: { rgbColor: BRAND_ORANGE } },
          },
        },
      },
      fields: "userEnteredFormat(textFormat,backgroundColor,borders)",
    },
  });

  // Category breakdown header
  if (categoryCount > 0) {
    const catHeaderRow = subtotalRow + 2;
    requests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: catHeaderRow, endRowIndex: catHeaderRow + 1 },
        cell: {
          userEnteredFormat: {
            textFormat: { bold: true, fontSize: 10, foregroundColorStyle: { rgbColor: BRAND_ORANGE } },
          },
        },
        fields: "userEnteredFormat(textFormat)",
      },
    });

    // Category total row (after category data rows)
    const catTotalRow = catHeaderRow + 1 + categoryCount;
    requests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: catTotalRow, endRowIndex: catTotalRow + 1 },
        cell: {
          userEnteredFormat: {
            textFormat: { bold: true, fontSize: 11 },
            backgroundColor: LIGHT_GRAY,
            borders: {
              top: { style: "SOLID_MEDIUM", colorStyle: { rgbColor: BRAND_ORANGE } },
            },
          },
        },
        fields: "userEnteredFormat(textFormat,backgroundColor,borders)",
      },
    });
  }

  // Auto-resize columns
  requests.push({
    autoResizeDimensions: {
      dimensions: { sheetId, dimension: "COLUMNS", startIndex: 0, endIndex: 4 },
    },
  });

  return requests;
}

function buildSummaryFormatRequests(
  sheetId: number,
  monthCount: number,
  categoryCount: number
) {
  const requests = [];

  // Row 0: Banner title (merged, tall, orange bg, large white text)
  requests.push({
    mergeCells: {
      range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 3 },
      mergeType: "MERGE_ALL",
    },
  });
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 0, endRowIndex: 1 },
      cell: {
        userEnteredFormat: {
          textFormat: { bold: true, fontSize: 22, foregroundColorStyle: { rgbColor: WHITE } },
          backgroundColor: BRAND_ORANGE,
          horizontalAlignment: "CENTER",
          verticalAlignment: "MIDDLE",
        },
      },
      fields: "userEnteredFormat(textFormat,backgroundColor,horizontalAlignment,verticalAlignment)",
    },
  });
  requests.push({
    updateDimensionProperties: {
      range: { sheetId, dimension: "ROWS", startIndex: 0, endIndex: 1 },
      properties: { pixelSize: 64 },
      fields: "pixelSize",
    },
  });

  // "Monthly Breakdown" header (row 2) - darker orange
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 2, endRowIndex: 3 },
      cell: {
        userEnteredFormat: {
          textFormat: { bold: true, fontSize: 11, foregroundColorStyle: { rgbColor: WHITE } },
          backgroundColor: { red: 0.722, green: 0.271, blue: 0.153 },
          horizontalAlignment: "CENTER",
        },
      },
      fields: "userEnteredFormat(textFormat,backgroundColor,horizontalAlignment)",
    },
  });

  // Grand total row after monthly breakdown
  const grandTotalRow = 3 + monthCount;
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: grandTotalRow, endRowIndex: grandTotalRow + 1 },
      cell: {
        userEnteredFormat: {
          textFormat: { bold: true, fontSize: 12 },
          backgroundColor: LIGHT_GRAY,
          borders: {
            top: { style: "SOLID_MEDIUM", colorStyle: { rgbColor: BRAND_ORANGE } },
          },
        },
      },
      fields: "userEnteredFormat(textFormat,backgroundColor,borders)",
    },
  });

  // "Category Breakdown" header
  const catHeaderRow = grandTotalRow + 2;
  if (categoryCount > 0) {
    requests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: catHeaderRow, endRowIndex: catHeaderRow + 1 },
        cell: {
          userEnteredFormat: {
            textFormat: { bold: true, fontSize: 11, foregroundColorStyle: { rgbColor: WHITE } },
            backgroundColor: BRAND_ORANGE,
            horizontalAlignment: "CENTER",
          },
        },
        fields: "userEnteredFormat(textFormat,backgroundColor,horizontalAlignment)",
      },
    });
  }

  // Auto-resize
  requests.push({
    autoResizeDimensions: {
      dimensions: { sheetId, dimension: "COLUMNS", startIndex: 0, endIndex: 3 },
    },
  });

  return requests;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = await getAccessToken(session.user.id);
  if (!accessToken) {
    return NextResponse.json(
      { error: "NEEDS_AUTH", message: "Google Sheets permission required" },
      { status: 403 }
    );
  }

  const body = await req.json();
  const appData = body as AppData;
  const expenses = appData.expenses ?? {};
  const currency = appData.currency ?? "INR";

  // Get sorted month keys (newest first)
  const monthKeys = Object.keys(expenses).sort().reverse();
  const allExpenses: Expense[] = [];
  for (const mk of monthKeys) {
    for (const e of expenses[mk]) allExpenses.push(e);
  }

  if (allExpenses.length === 0) {
    return NextResponse.json({ error: "No expenses to export" }, { status: 400 });
  }

  // Build sheet definitions: Summary + one per month
  const sheetDefs = [
    { properties: { title: "Summary", sheetId: 0, gridProperties: { frozenRowCount: 3 } } },
    ...monthKeys.map((mk, i) => ({
      properties: {
        title: getMonthName(mk),
        sheetId: i + 1,
        gridProperties: { frozenRowCount: 2 },
      },
    })),
  ];

  // Create spreadsheet with all sheets
  const createRes = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        title: `Kharcha Saathi - Expenses (${new Date().toLocaleDateString("en-IN")})`,
      },
      sheets: sheetDefs,
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json();
    console.error("Sheets API create error:", err);
    if (createRes.status === 403 || createRes.status === 401) {
      return NextResponse.json(
        { error: "NEEDS_AUTH", message: "Google Sheets permission required" },
        { status: 403 }
      );
    }
    return NextResponse.json({ error: "Failed to create spreadsheet" }, { status: 500 });
  }

  const spreadsheet = await createRes.json();
  const spreadsheetId = spreadsheet.spreadsheetId;
  const spreadsheetUrl = spreadsheet.spreadsheetUrl;

  // Build data for each month sheet and collect summary data
  const headerRow = ["Date", "Category", "Description", `Amount (${currency})`];
  const valueRanges: { range: string; values: (string | number)[][] }[] = [];
  const formatRequests: object[] = [];
  const monthlySummary: { month: string; total: number; count: number }[] = [];
  const categoryTotals: Record<string, number> = {};

  for (let i = 0; i < monthKeys.length; i++) {
    const mk = monthKeys[i];
    const monthExpenses = [...expenses[mk]].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const sheetName = getMonthName(mk);
    const sheetId = i + 1;

    const dataRows = monthExpenses.map((e) => [
      new Date(e.date).toLocaleDateString("en-IN"),
      e.category,
      e.description,
      e.amount,
    ]);

    const monthTotal = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
    monthlySummary.push({ month: sheetName, total: monthTotal, count: monthExpenses.length });

    // Track category totals
    for (const e of monthExpenses) {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    }

    // Category breakdown for this month
    const monthCatTotals: Record<string, number> = {};
    for (const e of monthExpenses) {
      monthCatTotals[e.category] = (monthCatTotals[e.category] || 0) + e.amount;
    }
    const catRows = Object.entries(monthCatTotals)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, amt]) => ["", cat, "", amt]);

    const rows: (string | number)[][] = [
      [sheetName, "", "", ""],  // Banner title row
      headerRow,
      ...dataRows,
      [],
      ["", "", "TOTAL", monthTotal],
      [],
      ["", "Category", "", `Amount (${currency})`],
      ...catRows,
      ["", "", "TOTAL", monthTotal],
    ];

    valueRanges.push({ range: `'${sheetName}'!A1`, values: rows });
    formatRequests.push(
      ...buildSheetFormatRequests(sheetId, dataRows.length, catRows.length)
    );
  }

  // Build summary sheet data
  const grandTotal = allExpenses.reduce((sum, e) => sum + e.amount, 0);
  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  const summaryRows: (string | number)[][] = [
    ["Kharcha Saathi - Expense Report", "", ""],
    [],
    ["Month", "Expenses", `Total (${currency})`],
    ...monthlySummary.map((m) => [m.month, m.count, m.total]),
    ["GRAND TOTAL", allExpenses.length, grandTotal],
    [],
    ["Category", "Count", `Total (${currency})`],
    ...sortedCategories.map(([cat, amt]) => {
      const count = allExpenses.filter((e) => e.category === cat).length;
      return [cat, count, amt];
    }),
  ];

  valueRanges.unshift({ range: "'Summary'!A1", values: summaryRows });
  formatRequests.push(
    ...buildSummaryFormatRequests(0, monthlySummary.length, sortedCategories.length)
  );

  // Batch write all data
  const batchUpdateRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valueInputOption: "USER_ENTERED",
        data: valueRanges,
      }),
    }
  );

  if (!batchUpdateRes.ok) {
    console.error("Sheets API batch update error:", await batchUpdateRes.json());
    return NextResponse.json({ error: "Failed to write data to spreadsheet" }, { status: 500 });
  }

  // Apply all formatting
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requests: formatRequests }),
    }
  );

  return NextResponse.json({
    success: true,
    url: spreadsheetUrl,
    count: allExpenses.length,
  });
}
