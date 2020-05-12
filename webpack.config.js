const path = require('path')
module.exports = {
  mode: 'development',
  entry: './src/app1.ts',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: "dist"
  },
  devtool: 'inline-source-map',
  module: {
    rules:[
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(csv|tsv)$/,
        loader: 'csv-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
