const CACHE_NAME = 'healthcalc-static-v4';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './favicon.svg',
  './apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  './manifest.json',
];

// Static asset extensions that are safe to cache from the same origin.
const CACHEABLE_DESTINATIONS = new Set(['style', 'script', 'image', 'font']);
const CACHEABLE_PATTERN = /\.(?:css|js|mjs|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|otf|eot)(?:$|\?)/i;

// Never intercept or cache these paths; they are dynamic, user-specific, or sensitive.
const BYPASS_PATHS = ['/api/', '/auth/', '/rest/', '/realtime/'];

const isSameOrigin = (url) => url.origin === self.location.origin;

const isBypassed = (url) =>
  BYPASS_PATHS.some((prefix) => url.pathname.includes(prefix));

const isCacheableAsset = (request, url) =>
  isSameOrigin(url) &&
  !isBypassed(url) &&
  (CACHEABLE_DESTINATIONS.has(request.destination) || CACHEABLE_PATTERN.test(url.pathname));

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.all(
          PRECACHE_ASSETS.map((asset) =>
            cache.add(asset).catch(() => undefined),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle same-origin GET requests for static assets. Everything else
  // (API calls, Supabase, auth, other origins, non-GET) passes straight through
  // to the network and is never cached.
  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  if (!isCacheableAsset(request, url)) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);
    }),
  );
});

self.addEventListener('push', (event) => {
  if (!event.data) return;
  try {
    const data = event.data.json();
    const options = {
      body: data.body || 'Check your daily health plan',
      icon: './icons/icon-192.png',
      badge: './icons/icon-192.png',
      vibrate: [100, 50, 100],
      data: { url: data.url || './' },
    };
    event.waitUntil(self.registration.showNotification(data.title || 'HealthCalc.ai', options));
  } catch (e) {
    // Ignore malformed push payloads.
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data?.url || './'));
});
