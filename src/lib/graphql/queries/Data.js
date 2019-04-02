import gql from 'graphql-tag';

export const getDataQuery = gql`
	query ($type: String) {
		getData(input: {type: $type}) {
			id
			firstName
			lastName
			email
			phone
			address {
				streetAddress
				city
				state
				zip
			}
			description
		}
	}
`;