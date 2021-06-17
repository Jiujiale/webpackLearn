const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devServer: {
    port: 3000,
    progress: true,
    contentBase: './build'
  },
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
  // mode: 'development', //development production
  mode: 'production', //development production
  entry: './src/index.js',
  output: {
    filename:'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
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
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[hash:8].css',
      insert: 'test'
    })
  ]
}