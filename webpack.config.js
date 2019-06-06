const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function generateHtmls(pageNames = []) {
	const htmls = [];

	pageNames.forEach((name) => {
		htmls.push(
			new HtmlWebpackPlugin({
				template: './src/tpl.html',
				filename: `./views/${name}.html`,
				chunks: [ `${name}`, 'vendors' ]
			})
		);
	});

	return htmls;
}

module.exports = {
	mode: 'development',
	entry: {
		page1: './src/page1/index.js',
		page2: './src/page2/index.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									loose: true,
									modules: 'commonjs',
									useBuiltIns: 'entry'
								}
							]
						]
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it uses publicPath in webpackOptions.output
							publicPath: '../',
							hmr: process.env.NODE_ENV === 'development'
						}
					},
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
              outputPath: 'img',
							limit: 1
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: 'css/[name].css',
			chunkFilename: 'css/[id].css'
		}),
		...generateHtmls([ 'page1', 'page2' ])
	],
	externals: {
		jquery: 'window.jQuery'
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		},
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					ie8: true
				}
			})
		]
	}
};
