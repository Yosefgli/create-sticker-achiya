const CACHE_NAME = "barcode-label-v4";
const ASSETS = [
  "./",
  "./scan.html",
  "./upload.html",
  "./styles.css?v=4",
  "./scan.js?v=4",
  "./csv.js?v=4",
  "./upload.js?v=4",
  "./manifest.json?v=4",
  "./icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
