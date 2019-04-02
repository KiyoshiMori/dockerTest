import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import App from './client';
import client from './lib/graphql';

import './styles.styl';

library.add(faPlus);

const render = Component => {
	ReactDOM.hydrate(
		<ApolloProvider client={client}>
			<AppContainer>
				<BrowserRouter>
					<Component />
				</BrowserRouter>
			</AppContainer>
		</ApolloProvider>,
		document.getElementById("root")
	);
};

render (App);

if (module.hot) {
	module.hot.accept('./client', () => {
		const newApp = require('./client').default;
		render(newApp);
	})
}