var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: "eval",
  entry: {
    app: [
      "webpack-dev-server/client?http://0.0.0.0:8080",
      "webpack/hot/only-dev-server",
      "./src/scripts/main.js"
    ]
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "runtime.CDS_HOOKS_URL": JSON.stringify(process.env.CDS_HOOKS_URL || "http://localhost:8081"),
      "runtime.FHIR_URL": JSON.stringify(process.env.FHIR_URL || "https://api.hspconsortium.org/cdshooksdstu2/open")
    })
  ],
  resolve: {
    modules: ['node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.json?$/,
        loader: "json-loader"
      },{
        test: /\.jsx?$/,
        loader: "babel-loader?presets[]=react,presets[]=es2015",
        exclude: /node_modules/
      },

      {
        test: /\.(sass|scss)$/,
        loader: "style-loader!css!sass?indentedSyntax=true&outputStyle=expanded"
      },
      {
        test: /\.(ttf|eot|svg)$/,
        loader: 'file-loader'
      },

      {
        test: /\.woff2?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },

      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },

      {
        test: /\.html$/,
        loader: "file-loader?name=[path][name].[ext]&context=./src"
      }
    ]
  }
};
