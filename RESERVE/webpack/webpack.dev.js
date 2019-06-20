const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  //output: {
  //  publicPath: '/',
  //},
  devServer: {
    contentBase: `./dist/`,
    historyApiFallback: {
      //index: '/index.html',
      rewrites: [
        { from: /^\/$/, to: '/calendar.html' },
        { from: /^\/confirmation/, to: '/confirmation.html' },
        { from: /^\/class/, to: '/class.html' },
        { from: /./, to: '/calendar.html' }

        //{ from: /^.*$/, to: '/calendar.html' },
      ]
    }
  }
});