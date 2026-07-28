const CACHE = "forge50-v1.1";

const FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./data.js",
    "./manifest.json",

    "./js/app.js",
    "./js/storage.js",
    "./js/logbook.js",
    "./js/timer.js",

    "./pages/home.js",
    "./pages/workout.js",
    "./pages/progress.js",
    "./pages/settings.js",

    "./assets/icon-192.png",
    "./assets/icon-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(FILES))
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE) {
                        return caches.delete(key);
                    }
                })
            )
        ).then(() => {
            // Notify all clients that a new version is active
            return self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({ type: "SW_UPDATE_AVAILABLE", version: CACHE });
                });
            });
        }).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            return fetch(event.request).then(fetchResponse => {
                if (event.request.method === "GET" && fetchResponse.status === 200) {
                    const clone = fetchResponse.clone();
                    caches.open(CACHE).then(cache => cache.put(event.request, clone));
                }
                return fetchResponse;
            });
        }).catch(() => {
            if (event.request.mode === "navigate") {
                return caches.match("./index.html");
            }
        })
    );
});