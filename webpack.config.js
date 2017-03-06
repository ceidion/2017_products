let webpack = require("webpack");
let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractSass = new ExtractTextPlugin({
    filename: "[name].bundle.css",
});


module.exports = {
  entry: {
    app: './src/app.js',
    "font-awesome": "./src/font-awesome.js"
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dest')
  },

  module: {
      rules: [{
          test: /\.scss$/,
          loader: extractSass.extract({
              use: [{
                  loader: "css-loader"
              }, {
                  loader: "sass-loader"
              }],
              // use style-loader in development
              fallback: "style-loader"
          })
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=50000&name=[path][name].[ext]'
      }]
  },

  plugins: [
    extractSass
  ]


};
