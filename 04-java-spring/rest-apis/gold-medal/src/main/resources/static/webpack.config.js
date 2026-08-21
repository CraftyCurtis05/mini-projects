/* Gold Medal API: JavaScript for the behavior I practiced in this project. */

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'app.bundle.js'
  },
  module: {
      loaders: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              query: {
                  presets: ['es2015', 'react']
              }
          }
      ]
  },
  stats: {
      colors: true
  },
  devtool: 'source-map'
};
