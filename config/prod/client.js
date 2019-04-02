import path from 'path';
import webpack from 'webpack';
import WebpackBar from 'webpackbar';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import BrotilPlugin from 'brotli-webpack-plugin';
import commonConfig from './common';

const { module, ...config } = commonConfig;

export default {
	...config,
	module: {
		rules: [
			...module.rules,
			{
				test: /\.css$/,
				use: [MiniCSSExtractPlugin.loader, 'css-loader'],
			},
		],
	},
	name: 'client',
	entry: {
		vendor: ['react', 'react-dom'],
		main: [
			'@babel/polyfill',
			'./src/main.js',
		],
	},
	output: {
		filename: '[name]-bundle.js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, '../../dist'),
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
		new MiniCSSExtractPlugin(),
		new CompressionPlugin({
			algorithm: 'gzip',
		}),
		new BrotilPlugin(),
		new WebpackBar({
			color: 'green',
			name: 'client',
		}),
	],
};
