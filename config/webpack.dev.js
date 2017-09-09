const path = require('path');
const webpack = require('webpack');
const WebpackConfig = require('webpack-config').default;
const HTMLWebpackPlugin = require('html-webpack-plugin');

const PUBLIC_DIR = path.resolve(__dirname, '../public');

module.exports = new WebpackConfig().extend('./config/webpack.base.js').merge({
  output: {
    publicPath: '/'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new HTMLWebpackPlugin({
      apiKey: process.env.API_KEY,
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
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
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
});
