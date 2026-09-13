(function () {
  'use strict';

  var VERSION = 'v2.7.0';
  var CACHE_NAME = 'mecfs-graph-' + VERSION;
  var ASSETS = [
    './',
    './index.html',
    './style.css',
    './core.js',
    './app.js',
    './manifest.json',
    './icon.svg',
    './icons/icon-192.png',
    './icons/icon-512.png'
  ];

  self.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
        return cache.addAll(ASSETS);
      })
    );
    self.skipWaiting();
  });

  self.addEventListener('activate', function (event) {
    event.waitUntil(
      caches.keys().then(function (keys) {
        return Promise.all(
          keys.filter(function (key) { return key !== CACHE_NAME; })
            .map(function (key) { return caches.delete(key); })
        );
      })
        .then(function () {
          return self.clients.claim();
        })
        .then(function () {
          return self.clients.matchAll({ type: 'window' }).then(function (clients) {
            clients.forEach(function (client) {
              client.postMessage({ type: 'UPDATE_READY' });
            });
          });
        })
    );
  });

  self.addEventListener('fetch', function (event) {
    if (event.request.method !== 'GET') return;
    event.respondWith(
      caches.match(event.request).then(function (cached) {
        if (cached) return cached;
        return fetch(event.request).then(function (response) {
          // Nur erfolgreiche, gleich-origin Antworten cachen (keine Nutzerdaten).
          if (response && response.status === 200 && event.request.url.indexOf(self.location.origin) === 0) {
            var copy = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, copy);
            });
          }
          return response;
        }).catch(function () {
          return caches.match('./index.html');
        });
      })
    );
  });
})();