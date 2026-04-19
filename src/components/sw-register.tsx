"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // Capture whether the page was already controlled at mount. If it was NOT
    // (fresh install / first visit), the first controllerchange from claim()
    // is expected — don't reload. If it WAS (an upgrade), the next
    // controllerchange means a new SW took over and we should reload so the
    // page runs the latest code without the user having to hard-refresh.
    const hadController = !!navigator.serviceWorker.controller;

    navigator.serviceWorker.register("/sw.js").catch(() => {});

    let reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!hadController || reloaded) return;
      reloaded = true;
      window.location.reload();
    });
  }, []);

  return null;
}
