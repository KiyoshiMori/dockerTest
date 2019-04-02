import { makeExecutableSchema } from 'graphql-tools';
import _ from 'lodash';

import RootDefinition from './RootDefinition';
import RootResolver from './RootResolver';

import DataDefinition from './Data/Definition';
import DataResolver from './Data/Resolver';

const index = makeExecutableSchema({
	typeDefs: [RootDefinition, DataDefinition],
	resolvers: _.merge({}, RootResolver, DataResolver),
});

export default index;
