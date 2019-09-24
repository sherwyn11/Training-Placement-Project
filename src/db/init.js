var admin = require('firebase-admin')

var serviceAccount = require("/Users/kad99kev/Desktop/Training-Placement-Project/src/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://training-and-placement-1110.firebaseio.com"
});