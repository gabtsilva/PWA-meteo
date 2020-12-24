//https://codelabs.developers.google.com/codelabs/offline/#6 
self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('cache-man').then(function(cache) {
        return cache.addAll([
          '/',
          'images/icon.png',
          'images/icons.png',
          'index.html',
          'scss/bootstrap.min.css',
          'scss/style.css',
          'js/jquery-3.5.1.min.js',
          'js/index.js',
        ]);
      })
    );
   });
  
  //https://codelabs.developers.google.com/codelabs/offline/#7
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  