const CACHE_NAME = 'HimnarioApp',
  urlsToCache = [
    './',
    './index.html',
    './css/style.css',
    './css/boxicons.min.css',
    './css/himnos.css',
    './css/porNombre.css',
    './css/porNumero.css',
    './css/portada.css',
    './css/categories.css',
    './css/settings.css',

    './js/script.js',
    './js/number.js',
    './js/hymn-view.js',
    './js/categories.js',
    './js/settings.js',
    './js/jquery-3.6.0.js',

    './regist_serviceWorker.js',
    './pwa/images/icons/icon-512x512.png',
    './pwa/images/icons/icon-72x72.png',
    './data/hymns.json',

    './img/icon.png',
    './img/imagen4.jpg',
    './img/logonavbar.png',
    './img/portada.jpg',

    './buscarPorNombre.html',
    './buscarPorNumero.html',
    './categories.html',
    './hymns.html',
    './portada.html',
    './settings.html'
  ]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('hymns.json')) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      }).catch(() => {
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});