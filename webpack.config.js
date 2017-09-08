/* eslint global-require: "off" */
if (process.env.npm_lifecycle_event === 'build') {
  module.exports = require('./config/webpack.prod.js');
} else {
  module.exports = require('./config/webpack.dev.js');
}
