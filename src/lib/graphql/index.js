import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const port = process.env.PORT || 8080;
const domain = process.env.DOMEN || 'localhost';

console.log({ env: process.env });

const client = new ApolloClient({
	link: createHttpLink({
		uri: `http://${domain}:${port}/graphql`,
		credentials: 'include',
	}),
	cache: new InMemoryCache(),
	connectToDevTools: true,
	ssrMode: true,
});

export default client;
