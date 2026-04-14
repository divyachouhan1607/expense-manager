"use client";

import { createClient } from "@/lib/supabase/client";

function isCapacitor(): boolean {
  return typeof window !== "undefined" && "Capacitor" in window;
}

function getCapacitorPlugin(name: string) {
  // Access native plugin directly through the Capacitor bridge
  // This works even when JS is loaded from a remote URL
  const cap = (window as unknown as Record<string, unknown>).Capacitor as
    | { Plugins?: Record<string, Record<string, (...args: unknown[]) => Promise<unknown>>> }
    | undefined;
  return cap?.Plugins?.[name];
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
      // Native Google Sign-In — shows bottom sheet, no browser opens
      // Cookies are set on the same origin since WebView loads the remote URL directly
      const plugin = getCapacitorPlugin("SocialLogin");

      if (plugin) {
        try {
          await plugin.initialize({
            google: {
              webClientId:
                "70670976387-jegs52h23874eue79q0r0a5oe75t56qt.apps.googleusercontent.com",
            },
          });

          const result = (await plugin.login({
            provider: "google",
            options: { scopes: ["email", "profile"] },
          })) as {
            result?: {
              responseType?: string;
              idToken?: string;
            };
          };

          if (result?.result?.idToken) {
            const { error, data } = await supabase.auth.signInWithIdToken({
              provider: "google",
              token: result.result.idToken,
            });

            if (!error && data?.session) {
              window.location.href = "/dashboard";
              return;
            }
          }
        } catch {
          // Native sign-in failed, fall through to web OAuth
        }
      }
    }

    // Web (or Capacitor fallback): standard OAuth redirect
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (data?.url && !error) {
      window.location.href = data.url;
    }
  };

  return (
    <button type="button" onClick={handleSignIn} className={className}>
      {children}
    </button>
  );
}
