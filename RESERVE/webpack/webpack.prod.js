const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//const OmitJSforCSSPlugin = require("webpack-omit-js-for-css-plugin");
//const PurgecssPlugin = require('purgecss-webpack-plugin');
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const glob = require('glob');
//const MediaQueryPlugin = require('media-query-plugin');

const PATHS = {
  src: path.join(__dirname, '../src')
}


module.exports = merge(common, {
  mode: 'production',
  plugins: [
    
    //new OmitJSforCSSPlugin(),
    //new PurgecssPlugin({
    //  paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    //}),
    //new OptimizeCssAssetsPlugin({
    //  cssProcessor: require('cssnano'),
    //  cssProcessorPluginOptions: {
    //    preset: ['default', { discardComments: { removeAll: true } }],
    //  }
    //})
  ]
});