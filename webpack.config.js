const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
			}
		]
  },
  externals: {
    jquery: 'jQuery'
  },
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					ie8: true
				}
			})
		]
	}
};
