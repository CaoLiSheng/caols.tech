const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: '../src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dev'),
    filename: '[name][chunkhash:8].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../public/index.html',
      chunks: ['index.js'],
      template: path.resolve(__dirname, '../dev/index.html'),
    }),
  ],
};
