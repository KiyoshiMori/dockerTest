import { makeExecutableSchema } from 'graphql-tools';
import _ from 'lodash';

import RootDefinition from './RootDefinition';
import RootResolver from './RootResolver';

const index = makeExecutableSchema({
	typeDefs: [RootDefinition],
	resolvers: _.merge({}, RootResolver),
});

export default index;
