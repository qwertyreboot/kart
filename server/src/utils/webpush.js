const webpush = require("web-push");
const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = require("../config");

webpush.setVapidDetails(
  "mailto:khavinshankar@gmail.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

module.exports = webpush;
