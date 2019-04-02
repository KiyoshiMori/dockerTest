import express from 'express';
import graphqlExpress from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';

import schema from '../lib/graphql/schema';

const server = express();

export default () => {
	server.use(
		'/graphql',
		graphqlExpress((req, res) => ({
			schema,
		})),
	);
	server.use(
		'/playground',
		expressPlayground({
			endpointURL: '/graphql',
		}),
	);

	return server;
};