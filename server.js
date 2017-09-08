const express = require('express');
const morgan = require('morgan');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('tiny'));
} else {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hitch-A-Ride coming soon!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Hitch-A-Ride app served at', port)
});
