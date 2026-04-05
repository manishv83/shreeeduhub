const CACHE_NAME = 'svt-v2'; // Increment version when you update assets
const ASSETS = [
    '/',
    '/index.html',
    '/storefront.html',
    '/style.css',
    '/script.js',
    '/store-logic.js',
    '/data/store-db.js',
    '/assets/audio/correct.mp3',
    '/assets/audio/wrong.mp3',
    '/assets/audio/final.mp3'
];

// Install Event: Same as yours
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Optimized Fetch Event: Caches new images on the fly
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;

            return fetch(e.request).then((networkResponse) => {
                // Only cache successful GET requests (like your Amazon book images)
                if (networkResponse && networkResponse.status === 200 && e.request.method === 'GET') {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(e.request, responseClone);
                    });
                }
                return networkResponse;
            });
        }).catch(() => {
            // Optional: You could return a local 'offline.png' here if the image fails
        })
    );
});