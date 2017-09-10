require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const firebaseAdmin = require("firebase-admin");
const bodyParser = require('body-parser');

const { injectApiDependencies } = require('./api');
const { setWatchOnDatabaseReferences } = require('./snapshots');

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
const watchdog = setWatchOnDatabaseReferences(database);


app.use(morgan('tiny'));
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());
app.use('/api', injectApiDependencies(router, watchdog));
app.use(express.static(path.join(__dirname, 'static')));

app.get('*', (req, res) => {
  res.sendFile(path.join(path.join(__dirname, 'static'), 'index.html'));
});


app.listen(port, () => {
  console.log('Hitch-A-Ride app served at', port);
});