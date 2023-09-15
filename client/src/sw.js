self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());

self.addEventListener("push", function (event) {
  console.log("push", event);
  const data = event.data.json();
  console.log("notification", data);
  if (data) {
    self.registration.showNotification(data.title, {
      body: data.body,
    });
  }
});
