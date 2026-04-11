export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#FDF6F2] px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg sm:p-12">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Terms of Service
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          Last updated: April 6, 2026
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              1. Acceptance of Terms
            </h2>
            <p>
              By using Kharcha Saathi (&quot;the App&quot;), you agree to these
              Terms of Service. If you do not agree, please do not use the App.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              2. Description of Service
            </h2>
            <p>
              Kharcha Saathi is a free personal expense tracking application that
              helps you record expenses, set budgets, and export your financial
              data. The App is provided &quot;as is&quot; for personal,
              non-commercial use.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              3. User Accounts
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                You sign in using your Google account. You are responsible for
                maintaining the security of your Google account credentials.
              </li>
              <li>
                You must provide accurate information and not impersonate others.
              </li>
              <li>
                You are responsible for all activity that occurs under your
                account.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              4. Acceptable Use
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Use the App for any illegal or unauthorized purpose</li>
              <li>
                Attempt to gain unauthorized access to the App or its systems
              </li>
              <li>Interfere with or disrupt the App or its servers</li>
              <li>
                Use automated tools to scrape or collect data from the App
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              5. Your Data
            </h2>
            <p>
              You retain ownership of all expense data you enter into the App.
              You can export or delete your data at any time. See our{" "}
              <a
                href="/privacy"
                className="text-[#D4603A] underline"
              >
                Privacy Policy
              </a>{" "}
              for details on how we handle your data.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              6. Google Sheets Integration
            </h2>
            <p>
              If you choose to export data to Google Sheets, you grant the App
              permission to create new spreadsheets in your Google Drive on your
              behalf. The App will never read or modify your existing files. You
              can revoke this permission at any time from your{" "}
              <a
                href="https://myaccount.google.com/permissions"
                className="text-[#D4603A] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Account settings
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              7. Disclaimer of Warranties
            </h2>
            <p>
              The App is provided &quot;as is&quot; without warranties of any
              kind. We do not guarantee that the App will be available at all
              times, error-free, or that your data will never be lost. We
              recommend regularly exporting your data as a backup.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              8. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Kharcha Saathi and its
              developer shall not be liable for any indirect, incidental, or
              consequential damages arising from your use of the App.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              9. Changes to Terms
            </h2>
            <p>
              We may update these terms from time to time. Continued use of the
              App after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              10. Contact
            </h2>
            <p>
              For any questions about these terms, reach out at{" "}
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
