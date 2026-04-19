// Bumped from v1 — v1 cached /api/user-data responses, which caused stale
// server reads to overwrite local state when the network flickered. v2 never
// caches API responses; old caches are purged on activate.
const CACHE_NAME = "kharcha-saathi-v2";
const STATIC_ASSETS = [
  "/",
  "/dashboard",
  "/manifest.json",
  "/favicon.png",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip chrome-extension and other non-http requests
  if (!request.url.startsWith("http")) return;

  // Never intercept API calls. Let the client see real network state —
  // including failures — instead of serving zombie cached responses.
  if (request.url.includes("/api/")) return;

  // Network-first for any HTML file and every navigation. This guarantees
  // that new deploys (including /expense-app.html loaded inside an iframe)
  // take effect on the next page load instead of being pinned to the
  // cached copy — the bug that previously required users to hard-refresh.
  if (request.mode === "navigate" || /\.html(\?|$)/.test(request.url)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      });
    })
  );
});
