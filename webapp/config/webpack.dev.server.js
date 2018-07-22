const path = require('path');

module.exports = {
  contentBase: path.join(__dirname, '../dev'),
  hot: true,
  historyApiFallback: {
    rewrites: [
      { from: /^\/[^(vendor|vr\-player)]/, to: '/index.html' },
    ]
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  inline: true,
  progress: true,
  quiet: true,
  compress: true,
  disableHostCheck: true,
};
