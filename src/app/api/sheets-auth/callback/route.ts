import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getBaseUrl(req: NextRequest): string {
  const host = req.headers.get("host") || "kharcha-saathi.vercel.app";
  const proto = req.headers.get("x-forwarded-proto") || "https";
  return `${proto}://${host}`;
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const userId = req.nextUrl.searchParams.get("state");

  if (!code || !userId) {
    return NextResponse.redirect(new URL("/dashboard?sheets=error", req.url));
  }

  const baseUrl = getBaseUrl(req);

  // Exchange code for tokens
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      code,
      grant_type: "authorization_code",
      redirect_uri: `${baseUrl}/api/sheets-auth/callback`,
    }),
  });

  const tokens = await tokenRes.json();

  if (!tokens.access_token) {
    return NextResponse.redirect(new URL("/dashboard?sheets=error", req.url));
  }

  await supabaseAdmin.from("google_tokens").upsert({
    user_id: userId,
    access_token: tokens.access_token,
    expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
    ...(tokens.refresh_token ? { refresh_token: tokens.refresh_token } : {}),
    scope: tokens.scope,
    updated_at: new Date().toISOString(),
  });

  return NextResponse.redirect(new URL("/dashboard?sheets=authorized", req.url));
}
