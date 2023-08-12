var admin = require("firebase-admin");

var serviceAccount = require("./firebaseApiKey.json.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// this is the code for verifying the token coming from frontend to backend whether user is valid or not..

module.exports = admin;
// in js we need to export using module not like reacts
