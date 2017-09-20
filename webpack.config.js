const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  	entry: __dirname + "/app/main.js",//唯一入口文件
  	output: {
	    path: __dirname+"/public", //打包后的文件存放的地方
	    filename: "bundle.js"//打包后输出文件的文件名
	},

	devtool:'eval-source-map',//在同一个文件中生成干净的完整的source map

	devServer:{
		contentBase:__dirname + '/public',//本地服务器所加载的页面所在的目录
		port:8080,
		historyApiFallback:true,//如果设置为true，所有的跳转将指向index.html
		inline:true,//实时刷新
        stats: { colors: true }
	},

	module: {
        rules: [
            {
                test: /\.js$/,   //babel
                loader: "babel-loader",
                options:{
                    presets: [
                        "es2015"
                    ]
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,  //css
                use: [
                    'style-loader',
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
            }
        ]
    },

    plugins: [
        new webpack.BannerPlugin('何彪版权所有~~'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ]


}
