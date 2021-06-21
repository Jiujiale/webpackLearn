const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new CssMinimizerPlugin()
    ]
  },
  entry: {
    'default': './src/index.js',
    'newIndex': './src/newIndex.js'
  },
  output: {
    filename:'[name].[hash:8].js',
    path: path.resolve(__dirname, 'build'),
    // publicPath: '/'
  },
  // 已经cdn 引用的包，去除import引用
  externals: {
    jquery: '$',
  },
  module: {
    rules: [
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     esModule: false,
          //     // outputPath: '/imgs/'
          //   }
          // },
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 8192,
              outputPath: '/imgs/',
              publicPath: '/imgs'
            },
          }
        ],
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: '$'
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,'css-loader','postcss-loader']
      },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader','less-loader']
      },
      {
        test: /\.js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              "@babel/plugin-transform-runtime"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new webpack.DefinePlugin({
      DEV: JSON.stringify('dev')
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      },
      chunks: ['default'],
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[hash:8].css',
      insert: 'test'
    })
  ]
}