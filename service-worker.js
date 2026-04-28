// DS Vedanta Academy — Service Worker
// Minimal: enables PWA install prompt, no offline caching

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  clients.claim();
});