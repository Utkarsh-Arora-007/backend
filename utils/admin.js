
var admin = require("firebase-admin");
var serviceAccount = require("../privateKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://notifications-92f9a-default-rtdb.firebaseio.com"
});

const db = admin.database();
module.exports = { admin, db };