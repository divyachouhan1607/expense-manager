"use client";

import { createClient } from "@/lib/supabase/client";

function isCapacitor(): boolean {
  return typeof window !== "undefined" && "Capacitor" in window;
}

export function GoogleSignInButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const handleSignIn = async () => {
    const supabase = createClient();

    if (isCapacitor()) {
      // Native Google Sign-In — shows bottom sheet account picker, no browser
      const { SocialLogin } = await import("@capgo/capacitor-social-login");
      await SocialLogin.initialize({
        google: {
          webClientId:
            "70670976387-jegs52h23874eue79q0r0a5oe75t56qt.apps.googleusercontent.com",
        },
      });

      const result = await SocialLogin.login({
        provider: "google",
        options: { scopes: ["email", "profile"] },
      });

      const googleResult = result?.result;
      if (googleResult?.responseType === "online" && googleResult.idToken) {
        // Exchange the Google ID token with Supabase for a session
        const { error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: googleResult.idToken,
        });

        if (!error) {
          window.location.href = "/dashboard";
        }
      }
    } else {
      // Web: use standard OAuth redirect
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });

      if (data?.url && !error) {
        window.location.href = data.url;
      }
    }
  };

  return (
    <button type="button" onClick={handleSignIn} className={className}>
      {children}
    </button>
  );
}
