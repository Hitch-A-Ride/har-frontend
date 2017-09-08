const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'static')));
app.get('*', (req, res) => {
  res.sendFile(path.join(path.join(__dirname, 'static'), 'index.html'));
});

app.listen(port, () => {
  console.log('Hitch-A-Ride app served at', port);
});
