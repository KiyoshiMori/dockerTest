import { getData } from '../../../api/Data';

export default {
	Query: {
		async getData(_, { input }) {
			return await getData(input);
		},
	},
}