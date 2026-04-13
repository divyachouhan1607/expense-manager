"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SetSessionPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      const supabase = createClient();
      supabase.auth
        .setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        .then(({ error }) => {
          if (!error) {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/login?error=session";
          }
        });
    } else {
      window.location.href = "/login?error=missing_tokens";
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FDF6F2] to-[#F5DDD0]">
      <p className="text-[#D4603A] font-semibold">Signing you in...</p>
    </div>
  );
}
