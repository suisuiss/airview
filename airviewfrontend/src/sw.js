// console.log('this is service worker!')
// self.addEventListener('push', (event) => {
//     const options = {
//       body: event.data.text(),
//     };
  
//     event.waitUntil(
//       self.registration.showNotification('Weather alerts', options)
//     );
// });
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
  };
  event.waitUntil(
    self.registration.showNotification('Weather alerts', options)
  );
});




// self.addEventListener("push", function(event) {
//   console.log("[Service Worker] Push Received.", event.data.text());
//   var options = {
//     body: "This notification was generated from a push!"
//   };
//   event.waitUntil(self.registration.showNotification("Hello world!", options));
// });

// console.log("Service Worker Loaded...");

// self.addEventListener("push", e => {
//   const data = e.data.json();
//   console.log("Push Recieved...");
//   self.registration.showNotification(data.title, {
//     body: "Notified by Traversy Media!",
//     icon: "http://image.ibb.co/frYOFd/tmlogo.png"
//   });
// });