const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function generateHtmlWebpackPlugins(filename_template, config) {
  return Object.keys(filename_template).map(filename => new HtmlWebpackPlugin({
    filename, 
    template: filename_template[filename], 
    ...config
  }));
}