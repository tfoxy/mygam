const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const babelOptions = require('./.babelrc.json');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'mygam',
    }),
  ],
};
