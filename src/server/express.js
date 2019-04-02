import 'isomorphic-fetch';
import express from 'express';
import cors from 'cors';

import graphql from './graphql';

const server = express();

const serverPort = process.env.PORT || 8080;
const isDev = process.env.NODE_ENV === 'development';
let isBuilt = false;

server.use(cors({
	origin: 'localhost:8080',
	credentials: true,
}));

console.log({ env: process.env });

server.use('/static', express.static('static'));

const done = () => {
	if (isBuilt) return;

	server.listen(serverPort, () => {
		isBuilt = true;
		console.log(`Server started at ${serverPort}`);
	});
};

server.use(graphql());

if (isDev) {
	require('./webpackCompile').webpackHotLoader(server);
	done();
} else {
	require('./webpackCompile').webpackSSR(server, done);
}