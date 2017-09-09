require('dotenv').config();

const express = require('express');
const firebase = require('firebase');
const morgan = require('morgan');
const path = require('path');
const firebaseAdmin = require("firebase-admin");
const bodyParser = require('body-parser');

const { api, getSlackUserId } = require('./api');
const { 
  handleSnapshotError,
  handleSnapshotUpdate,
} = require('./snapshots');

const {
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGER,
} = process.env

const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;

const serviceAccount = require("./serviceAccountKey.json");
const fireApp = firebaseAdmin
  .initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_DATABASE_URL,
  });

const database = fireApp.database();

database
  .ref('/users')
  .once('value')
  .then(handleSnapshotUpdate)
  .catch(handleSnapshotError);
  

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/api', api(router));
app.use(express.static(path.join(__dirname, 'static')));
app.get('*', (req, res) => {
  res.sendFile(path.join(path.join(__dirname, 'static'), 'index.html'));
});


const messageBroadcast = (req, res, next) => {
  // broadcast message to slack location for user.
  // - get country from geocoords;
  // - post to slack location
  // https://api.slack.com/methods/chat.postMessage
}


app.listen(port, () => {
  console.log('Hitch-A-Ride app served at', port);
});