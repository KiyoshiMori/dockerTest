import webpack from 'webpack';
import path from 'path';
import WebpackBar from 'webpackbar'
import nodeExternals from 'webpack-node-externals';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
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
						loader: MiniCSSExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							minimize: true,
						},
					},
				],
			},
			{
				test: /\.styl$/,
				use: [
					'isomorphic-style-loader',
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
	externals: nodeExternals(),
	target: 'node',
	name: 'server',
	entry: './src/server/render.js',
	output: {
		filename: 'prod-server-bundle.js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, '../../build'),
		libraryTarget: 'commonjs2',
	},
	plugins: [
		new MiniCSSExtractPlugin(),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),
		new WebpackBar({
			color: 'yellow',
			name: 'server',
		}),
	],
};
