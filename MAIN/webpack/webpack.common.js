const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const I18NPlugin = require('i18n-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const generateHtmlWebpackPlugins = require('./generateHtmlWebpackPlugins');

module.exports = {
  entry: {
    index: './src/assets/js/index.js',
    panes: './src/assets/js/panes.js',
    statistics: './src/assets/js/statistics.js',
    //cookie: './src/js/cookie.js',
    //contact: './src/js/contact.js',
    //'fa-custom': './src/js/fa-custom.js',
    'custom-css': './src/assets/css/custom.js',
  },
  plugins: [
    new CleanWebpackPlugin([`dist`], {
      root: path.resolve(__dirname, '..')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    ...generateHtmlWebpackPlugins({
      'index.html': 'src/index.html',
      'about.html': 'src/about.html',
      'support.html': 'src/support.html',
      'tutorials.html': 'src/tutorials.html',
      'partners.html': 'src/partners.html',
      'legal/index.html': 'src/legal/index.html',
      'services/overview.html': 'src/services/overview.html',
      'services/management.html': 'src/services/management.html',
      'services/monitor.html': 'src/services/monitor.html',
      'services/loyalty.html': 'src/services/loyalty.html',
      'services/marketing.html': 'src/services/marketing.html',
    }, {
      templateParameters: function templateParametersGenerator (compilation, assets, options) { 
        // https://github.com/jantimon/html-webpack-plugin/issues/1004#issuecomment-411311939
        return { 
          compilation: compilation, 
          webpack: compilation.getStats().toJson(), 
          webpackConfig: compilation.options, 
          htmlWebpackPlugin: { 
            files: assets, 
            options: options 
          },
          // custom
          //lang: l,
          base_url: (process.env.NODE_ENV == 'production') ? 'ausva04.com' : 'localhost:8080', 
        }; 
      }, 
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: false,
        useShortDoctype: false
      }
    }),
    /*
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: 'src/index.html',
      templateParameters: function templateParametersGenerator (compilation, assets, options) { 
        // https://github.com/jantimon/html-webpack-plugin/issues/1004#issuecomment-411311939
        return { 
          compilation: compilation, 
          webpack: compilation.getStats().toJson(), 
          webpackConfig: compilation.options, 
          htmlWebpackPlugin: { 
            files: assets, 
            options: options 
          },
          // custom
          //lang: l,
          base_url: (process.env.NODE_ENV == 'production') ? 'ausva04.com' : 'localhost:8080', 
        }; 
      }, 
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: false,
        useShortDoctype: false
      }
    }),
    */
  ],
  output: {
    filename: `[name].bundle.js`,
    path: path.resolve(__dirname, `../dist`),
  },
  
  //optimization: {
  //  splitChunks: {
  //    chunks: 'all'
  //  }
  //},

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          //'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          'file-loader'
        ]
      },
      {
        test: /.html$/,
        use: [
          'underscore-template-loader'
        ]
      }
    ]
  }
}