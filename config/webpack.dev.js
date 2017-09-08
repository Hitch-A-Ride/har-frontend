const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

const BUILD_DIR = path.resolve(__dirname, '../static');
const APP_DIR = path.resolve(__dirname, '../src');
const PUBLIC_DIR = path.resolve(__dirname, '../public');

module.exports = {
  devtool: 'source-map',
  resolve: {
    alias: {
      app: APP_DIR,
      public: PUBLIC_DIR,
    },
    extensions: ['.js', '.jsx'],
  },
  entry: `${APP_DIR}/index.jsx`,
  target: 'web',
  output: {
    path: BUILD_DIR,
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      CLIENT_ID: process.env.CLIENT_ID,
    }),
    new HTMLWebpackPlugin({
      inject: false,
      template: `${PUBLIC_DIR}/index.ejs`
    })
  ],
  devServer: {
    publicPath: '/',
    compress: true,
    host: '0.0.0.0',
    port: 3000,
    clientLogLevel: 'none',
    hot: true,
    inline: true,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
    }
  },
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
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ico|json)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'file-loader',
        query: {
          name: 'img/[name].[ext]'
        }
      }
    ]
  }
};
