module.exports = {
  entry: './src/js/index.js',
  output: {
    path: './dist/js/',
    publicPath: '/js/',
    filename: 'index.js'
  },
  module: {
    loaders: [
      { test: /\.(jsx|js)$/, exclude: /node_modules/, loader: 'babel-loader?experimental'}
      // { test: /\.jsx$/, loader: 'jsx-loader?harmony' }, // loaders can take parameters as a querystring
      // { test: /\.css$/, loader: 'style-loader!css-loader' },
      // { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },
  resolve: {
    extensions: ['', '.js', 'jsx', '.json']
  }
};
