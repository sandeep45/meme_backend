var webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: "./src/js/index.js",
  output: {
    path: "./dist",
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    inline: true,
    contentBase: "./dist",
    hot: true,
    proxy: {
      '/api*': {
        target: 'http://localhost:3000'
      },
      '/phone_number*': {
        target: 'http://localhost:3000'
      },
      '/message*': {
        target: 'http://localhost:3000'
      }
    }
  },
  module: {
    loaders: [
      {
        test: /.css$/,
        loader: "style!css"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "react-hot"
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          presets: ["es2015", "react", "stage-1"]
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=8192" // inline base64 URLs for <=8k images, direct URLs for the rest
      },
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
    ]
  }
};
