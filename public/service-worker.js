const CACHE_NAME = 'ds-wow-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/src/index.html',
  '/src/Style/main.scss',
];

// Instala e adiciona arquivos ao cache
self.addEventListener('install', (event) => {
    console.log('Service Worker: Install event');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(URLS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Ativa e Remove caches antigos
self.addEventListener('activate'), (event => {
    console.log('Service Worker: Activate event');
    event.waitUntil(
        caches.keys().then((keys) => 
            Promise.all(
                keys
                .filter((key) => key !== CACHE_NAME)
                .map((key) => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// Intercepta requisições e serve do cache quando possível
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
            .then((response) => response)
            .catch(() => caches.match('/index.html'))
        );
    } else {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request);
            })
        )
    }
});