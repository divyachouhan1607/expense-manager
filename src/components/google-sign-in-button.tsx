"use client";

import { createClient } from "@/lib/supabase/client";

export function GoogleSignInButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const handleSignIn = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        skipBrowserRedirect: true,
      },
    });

    if (data?.url && !error) {
      // Navigate in the same window to stay inside the Capacitor WebView
      window.location.href = data.url;
    }
  };

  return (
    <button type="button" onClick={handleSignIn} className={className}>
      {children}
    </button>
  );
}
