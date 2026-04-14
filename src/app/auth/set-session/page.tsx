"use client";

import { useEffect } from "react";

// Legacy page — previously used for cross-origin cookie handoff from Capacitor.
// Now the WebView loads the remote URL directly, so this is just a redirect.
export default function SetSessionPage() {
  useEffect(() => {
    window.location.href = "/login";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FDF6F2] to-[#F5DDD0]">
      <p className="text-[#D4603A] font-semibold">Redirecting...</p>
    </div>
  );
}
