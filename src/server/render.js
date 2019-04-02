import React from 'react';
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../client/index';
import client from '../lib/graphql';

const Html = ({ content, Scripts, Css, Styles }) => (
	<html>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>RabbitCRUD</title>
			<Styles />
		</head>
		<body>
			<div id="root" dangerouslySetInnerHTML={{
				__html: renderToString(content)
			}} />
			<Scripts />
	</body>
	</html>
);

export default ({ clientStats }) => (req, res) => {
	const { Js, Styles, Css } = flushChunks(clientStats, {
		chunkNames: flushChunkNames(),
	});

	const context = {};

	const content = (
		<ApolloProvider
			client={client}
		>
			<StaticRouter location={req.url} context={context}>
				<App />
			</StaticRouter>
		</ApolloProvider>
	);

	getDataFromTree(content).then(() => {
		const html = Html({ content, Scripts: Js, Css, Styles });

		console.log(html);

		res.status(200);
		res.send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
		res.end();
	}).catch(e => res.json({ error: e }));
}