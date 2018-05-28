import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import webpack from 'webpack'
import webpackNodeExternals from 'webpack-node-externals'

export default {
  mode: 'development',
  entry: './lib/simple-prettier-atom.js',
  target: 'node',
  devtool: 'source-map',
  output: {
    filename: 'index.bundle.js',
    libraryExport: 'default',
    libraryTarget: 'commonjs2',
    path: __dirname,
  },
  externals: [
    {
      atom: 'atom',
      prettier: 'prettier',
    },
    webpackNodeExternals(),
  ],
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
}
