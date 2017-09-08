// Add additional logic (not covered by OfflinePlugin) here
self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(clients.claim() || location.reload());
});
