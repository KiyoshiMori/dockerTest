import webpack from 'webpack';

import expressStaticGzip from 'express-static-gzip';

import { client as clientDev, server as serverDev } from '../../config/webpack.dev';
import { client as clientProd, server as serverProd } from '../../config/webpack.prod';

export const webpackHotLoader = (server) => {
	const compiler = webpack([clientDev, serverDev]);

	const clientCompiler = compiler.compilers[0];

	const webpackDevMW = require('webpack-dev-middleware');
	const webpackHotMW = require('webpack-hot-middleware');
	const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
	server.use(webpackDevMW(compiler, clientDev.devServer));
	server.use(webpackHotMW(clientCompiler, clientDev.devServer));
	server.use(webpackHotServerMiddleware(compiler));
};

export const webpackSSR = (server, cb) => {
	webpack([clientProd, serverProd]).run((err, stats) => {
		server.use(expressStaticGzip('dist', {
			enableBrotli: true,
		}));

		const clientStats = stats.toJson().children[0];

		console.log(stats.toString({
			colors: true,
		}));

		const render = require('../../build/prod-server-bundle.js').default;

		server.use(render({ clientStats }));
		cb();
	});
};
