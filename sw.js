// ==========================================
// ⚒ FORGE50 Service Worker v1.5 — Text Guides
// ==========================================

const CACHE = "forge50-v1.5-text-guides";
const STATIC_CACHE = "forge50-static-v1.5-text-guides";

const STATIC_FILES = [
    "./assets/icon-192.png",
    "./assets/icon-512.png"
];

const APP_FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./exercise-guides.css",
    "./exercise-guides.js",
    "./data.js",

    "./js/app.js",
    "./js/storage.js",
    "./js/logbook.js",
    "./js/timer.js",

    "./pages/home.js",
    "./pages/workout.js",
    "./pages/progress.js",
    "./pages/settings.js"
];

const ALL_FILES = [...new Set([...STATIC_FILES, ...APP_FILES])];

/* ── Install ─────────────────────────────── */

self.addEventListener("install", event => {
    event.waitUntil(
        Promise.all([
            caches.open(CACHE).then(cache => cache.addAll(APP_FILES)),
            caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_FILES))
        ])
    );
    self.skipWaiting();
});

/* ── Activate ────────────────────────────── */

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE && key !== STATIC_CACHE) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

/* ── Fetch ───────────────────────────────── */

self.addEventListener("fetch", event => {

    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET and cross-origin
    if (request.method !== "GET" || url.origin !== location.origin) return;

    const pathname = url.pathname;

    const isStatic = pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/i);
    const isAppFile = !isStatic && (pathname.match(/\.(html|css|js|json)$/i) || pathname === "/" || pathname === "");

    // ── Cache-First for static assets ──
    if (isStatic) {
        event.respondWith(
            caches.match(request).then(cached => cached || fetch(request).then(response => {
                const copy = response.clone();
                caches.open(STATIC_CACHE).then(cache => cache.put(request, copy));
                return response;
            }).catch(() => new Response("Offline", { status: 503 })))
        );
        return;
    }

    // ── Stale-While-Revalidate for app files ──
    if (isAppFile) {
        event.respondWith(
            caches.match(request).then(cached => {
                const fetchPromise = fetch(request).then(response => {
                    if (response && response.status === 200) {
                        const copy = response.clone();
                        caches.open(CACHE).then(cache => cache.put(request, copy));
                    }
                    return response;
                }).catch(() => cached);
                return cached || fetchPromise;
            }).catch(() => fetch(request))
        );
        return;
    }

    // ── Network-only for everything else ──
    event.respondWith(fetch(request).catch(() => caches.match("./index.html")));
});

/* ── Message: skip waiting (update notification) ── */

self.addEventListener("message", event => {
    if (event.data === "SKIP_WAITING") {
        self.skipWaiting();
    }
});
