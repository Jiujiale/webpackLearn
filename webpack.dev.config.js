const { merge } = require('webpack-merge')
const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    port: 3000,
    progress: true,
    contentBase: './build'
  },
  devtool: 'eval-cheap-source-map',
})