const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    // filename: "bundle.js"//打包后输出文件的文件名
    filename: "[name]-[hash].js",//缓存
    publicPath:'public/' //注意这里哦，分离出来的模块会按这个路径来加载静态资源
  },
  
  module: {//在配置文件里添加JSON loader
    rules: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    getLocalIdent: (context, localIdentName, localName, options) => {
                        return localName
                    }           //css类名不设置为hash值
                }
            },
            'postcss-loader',
            'less-loader'
          ]
        })
      }
    ]
  },
  
  plugins: [
    new webpack.BannerPlugin("《《《《《版权归大家所有》》》》》"),//在这个数组中new一个就可以了
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin(),//热加载插件
    new webpack.optimize.OccurrenceOrderPlugin(),//为组件分配ID
    new webpack.optimize.UglifyJsPlugin(), //压缩js
    // new ExtractTextPlugin("styles.css")
    new ExtractTextPlugin("[name]-[hash].css")//压缩css
  ]
}
