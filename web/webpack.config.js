const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');

const clientPath = path.resolve(__dirname, 'client')
const bundlePath = path.resolve(__dirname, 'dist')


const config = {
  entry: path.join(clientPath, 'components/index.jsx'),
  output: {
    path: bundlePath,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|json)$/,
        include: [
          clientPath,
          'node_modules'
        ],
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
  ],
  resolve: {
    modules: ['node_modules', clientPath],
    extensions: ['.js', '.json', '.jsx', '.scss', '.css']
  }
}

module.exports = config;
