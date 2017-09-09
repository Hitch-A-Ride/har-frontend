const path = require('path');
const webpack = require('webpack');
const WebpackConfig = require('webpack-config').default;
require('dotenv').config();

const BUILD_DIR = path.resolve(__dirname, '../static');
const APP_DIR = path.resolve(__dirname, '../src');
const PUBLIC_DIR = path.resolve(__dirname, '../public');

module.exports = new WebpackConfig().merge({
  devtool: 'source-map',
  resolve: {
    alias: {
      app: APP_DIR,
      public: PUBLIC_DIR,
    },
    extensions: ['.js', '.jsx'],
  },
  externals: {
    firebase: 'firebase',
  },
  entry: `${APP_DIR}/index.jsx`,
  target: 'web',
  output: {
    path: BUILD_DIR,
    filename: 'js/main.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      CLIENT_ID: JSON.stringify(process.env.CLIENT_ID),
      FIREBASE_CONFIG: {
        apiKey: JSON.stringify(process.env.FIREBASE_API_KEY),
        authDomain: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        databaseURL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        projectId: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        storageBucket: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        messagingSenderId: JSON.stringify(process.env.FIREBASE_MESSAGER)
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: APP_DIR,
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        include: APP_DIR,
        exclude: /node_modules/
      },
      {
        test: /\.(ico|json)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      },
    ]
  },
});
