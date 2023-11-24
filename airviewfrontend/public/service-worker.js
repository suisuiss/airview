self.addEventListener('push', (event) => {
  console.log('Service-worker : push event');
  const options = {
    body: event.data.text(),
  };
  event.waitUntil(
    self.registration.showNotification('Airview', options)
  );
});

self.addEventListener( 'install', () => {
  console.log('service worker: install')
  self.skipWaiting();
});

