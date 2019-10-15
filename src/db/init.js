var admin = require('firebase-admin')

var serviceAccount = require("C:\\Users\\MAYANK\\Documents\\Training-Placement-Project-kevlynsucks\\src\\serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://training-and-placement-1110.firebaseio.com"
});