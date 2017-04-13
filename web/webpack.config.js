const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');


const config = {
  entry: './static/js/index.jsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        use: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'less-loader']
        })
      }
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel', query: { presets: ['es2015','react'], exclude: /node_modules/ } },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: 'localhost',
    port: 3000,
    proxy: {
      '^/api/*': {
        target: 'http://localhost:8080/api/',
        secure: false
      }
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
    // minify the JS bundle
    // new webpack.optimize.UglifyJsPlugin({
    //   output: { comments: false },
    //   exclude: [ /\.min\.js$/gi ]   // skip pre-minified libs
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    })
  ]
};

module.exports = config;
