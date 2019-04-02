import path from 'path';
import webpack from 'webpack';
import commonConfig from './common';

const { module, ...config } = commonConfig;

export default {
	...config,
	module: {
		rules: [
			...module.rules,
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
				],
			},
			{
				test: /\.styl$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[local]-[hash]',
						},
					},
					'postcss-loader',
					'stylus-loader',
				],
			},
		],
	},
	name: 'client',
	entry: {
		vendor: ['react', 'react-dom'],
		main: [
			'@babel/polyfill',
			'react-hot-loader/patch',
			'webpack-hot-middleware/client?reload=true',
			'./src/main.js',
		],
	},
	output: {
		filename: '[name]-bundle.js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/',
	},
	devServer: {
		contentBase: 'dist',
		overlay: true,
		hot: true,
		stats: {
			colors: true,
		},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	]
}