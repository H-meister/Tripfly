// public/sw.js
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("tripfly-v1").then((cache) =>
      cache.addAll([
        "/",
        "/signin",
      ])
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});