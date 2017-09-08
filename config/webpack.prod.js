const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
require('dotenv').config({ path: '../.env' });

const BUILD_DIR = path.resolve(__dirname, '../static');
const APP_DIR = path.resolve(__dirname, '../src');
const PUBLIC_DIR = path.resolve(__dirname, '../public');

const ExtractAppCSS = new ExtractTextPlugin({
  filename: 'css/main.css',
  allChunks: true
});

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
    filename: 'js/main.js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      CLIENT_ID: process.env.CLIENT_ID
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'js/vendor.js',
      minChunks: module => (
        typeof module.context === 'string' && module.context.indexOf('node_modules') >= 0
      )
    }),
    ExtractAppCSS,
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      comments: false,
      sourceMap: true
    }),
    new HTMLWebpackPlugin({
      inject: false,
      template: `${PUBLIC_DIR}/index.ejs`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new OfflinePlugin({
      caches: {
        main: [
          'index.html',
          // 'favicon.ico',
          'css/main.css',
          'js/vendor.js',
          'js/main.js',
          // 'img/logo-128x128.png',
          ':externals:'
        ],
      },
      responseStrategy: 'cache-first',
      updateStrategy: 'all',
      externals: [
        'https://apis.google.com/js/api:client.js',
        'https://fonts.googleapis.com/css?family=Roboto:700,500,400,300,100',
        'https://cdnjs.cloudflare.com/ajax/libs/muicss/0.9.25/css/mui.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/muicss/0.9.25/js/mui.min.js'
      ],
      events: true,
      version: 'hitch-a-ride-[hash]',
      ServiceWorker: {
        output: './service-worker.js',
        entry: `${PUBLIC_DIR}/service-worker.js`,
        navigateFallbackURL: '/'
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
        test: /\.scss$/,
        loader: ExtractAppCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap!csso-loader!sass-loader'
        })
      },
      {
        test: /\.css$/,
        loader: ExtractAppCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap!csso-loader'
        })
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
        loaders: [
          {
            loader: 'file-loader',
            query: {
              name: 'img/[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              }
            }
          }
        ]
      }
    ]
  }
};
