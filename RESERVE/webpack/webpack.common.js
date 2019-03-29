const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const generateHtmlWebpackPlugins = require('./generateHtmlWebpackPlugins');

module.exports = {
  entry: {
    calendar: './src/assets/scripts/calendar.ts',
    class: './src/assets/scripts/class.ts',
    'style': './src/assets/styles/index.js',
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(), // By default remove all files inside webpack's output.path directory
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    ...generateHtmlWebpackPlugins({
      'calendar.html': 'src/calendar.html',
      'class.html': 'src/class.html'
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
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
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