const CACHE = "forge50-v0.5";

const FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./data.js",

    "./js/app.js",
    "./js/storage.js",
    "./js/timer.js",

    "./pages/home.js",
    "./pages/workout.js",
    "./pages/progress.js",
    "./pages/settings.js"
];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE)

        .then(cache => cache.addAll(FILES))

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

        )

    );

    self.clients.claim();

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

        .then(response => response || fetch(event.request))

    );

});