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

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          return res
        }
        return fetch(e.request)
      })
  )
})
