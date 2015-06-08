var webpack = require('webpack');
var path = require('path');
var ReactMixinTransformer = require('react-mixin-transformer');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './js/index.js'
  ],
  output: {
    path: __dirname + '/js/',
    publicPath: '/js/',
    filename: 'bundle.js',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      ReactDebuggerMixin: path.join(__dirname, './js/components/mixins/highlight')
    })
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ },
      { test: /\.(jsx|js)$/, loader: 'babel-loader?experimental', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
      // { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },
  resolve: {
    extensions: ['', '.js', 'jsx', '.json']
  },

  esprima: {
    transforms: [
      ReactMixinTransformer.inject(['ReactDebuggerMixin'], false)
    ]
  }
};
