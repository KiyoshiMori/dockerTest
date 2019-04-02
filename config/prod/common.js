import path from 'path';

export default {
	mode: 'production',
	resolve: {
		alias: {
			components: path.resolve(__dirname, '../../src/client/components'),
			containers: path.resolve(__dirname, '../../src/client/containers'),
			lib: path.resolve(__dirname, '../../src/lib'),
		},
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'files/'
					}
				}]
			},
		],
	},
	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	}
};
