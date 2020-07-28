// Register event listener for the 'push' event.
self.addEventListener("push", function (event) {
  payload = event.data.text();
  // Keep the service worker alive until the notification is created.
  event.waitUntil(
    // Show a notification with title and use the payload
    // as the body.
    self.registration.showNotification(payload.title, payload.options)
  );
});

// Event Listener for notification click
self.addEventListener('notificationclick', function(event) {
 event.notification.close();
 event.waitUntil(
   clients.openWindow(<URL>)
 );
});