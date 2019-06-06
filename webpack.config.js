const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry: {
		page1: './src/page1/index.js',
		page2: './src/page2/index.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js'
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
			}
		]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
	externals: {
		jquery: 'jQuery'
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
