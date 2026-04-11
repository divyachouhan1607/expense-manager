export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#FDF6F2] px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg sm:p-12">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Privacy Policy
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          Last updated: April 5, 2026
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              What is Kharcha Saathi?
            </h2>
            <p>
              Kharcha Saathi is a personal expense tracking app that helps you
              manage your spending, set budgets, and analyze your financial
              habits.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Information We Collect
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Google Account Info:</strong> When you sign in with
                Google, we receive your name, email address, and profile picture
                to create your account.
              </li>
              <li>
                <strong>Expense Data:</strong> The expenses, budgets, and
                categories you enter are stored in our database so you can access
                them across devices.
              </li>
              <li>
                <strong>Google Sheets Access:</strong> If you choose to export
                your data to Google Sheets, we request one-time permission to
                create spreadsheets in your Google Drive. We only create new
                spreadsheets — we never read or modify your existing files.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              How We Use Your Data
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>To provide and maintain the expense tracking service</li>
              <li>To sync your data across devices when you are signed in</li>
              <li>
                To export your expense data to Google Sheets when you request it
              </li>
            </ul>
            <p className="mt-2">
              We do <strong>not</strong> sell, share, or use your data for
              advertising. Your financial data is yours alone.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Data Storage & Security
            </h2>
            <p>
              Your data is stored securely in a PostgreSQL database hosted on
              Supabase with encrypted connections. Authentication is handled by
              Google OAuth through NextAuth.js — we never see or store your
              Google password.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Data Deletion
            </h2>
            <p>
              You can delete all your expense data at any time using the
              &quot;Clear All Data&quot; button in the app. To delete your
              account entirely, contact us at the email below and we will remove
              all your data from our systems.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Third-Party Services
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Google OAuth:</strong> For authentication
              </li>
              <li>
                <strong>Google Sheets API:</strong> For optional data export
              </li>
              <li>
                <strong>Supabase:</strong> For database hosting
              </li>
              <li>
                <strong>Vercel:</strong> For app hosting
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Your Rights
            </h2>
            <p>You can at any time:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Export all your data (JSON, CSV, or Google Sheets)</li>
              <li>Delete all your data from the app</li>
              <li>
                Revoke Google permissions from your{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  className="text-[#D4603A] underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Account settings
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Contact
            </h2>
            <p>
              For any privacy-related questions, reach out at{" "}
              <a
                href="mailto:divyachouhan1607@gmail.com"
                className="text-[#D4603A] underline"
              >
                divyachouhan1607@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
