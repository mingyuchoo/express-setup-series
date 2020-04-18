var path = require('path');

module.exports = {
  entry: './client/app/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './client/dist'),
    publicPath: './server/public/javascripts/'
  }
};
