const path = require('path');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      { test: /.js$/, use: 'babel-loader' },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
