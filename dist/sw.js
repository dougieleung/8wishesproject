const cacheName = "static-shell-v1";
const resourcesToPrecache = [
  "/",
  "pages/index.html",
  "/css/style.css",
  "/js/main.js",
];

self.addEventListener("install", (event) => {
  console.log("SW install event");
  event.waitUntil(
    cache.open(cache.Name).then(function (cache) {
      return cache.addAll(resourcesToPrecache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request) || fetch(event.request));
});
