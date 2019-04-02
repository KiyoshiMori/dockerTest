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

export const addFieldMutation = gql`
	mutation($id: Int, $firstName: String, $lastName: String, $email: String, $phone: String) {
		addField(input: {id: $id, firstName: $firstName, lastName: $lastName, email: $email, phone: $phone}) {
			id
			firstName
			lastName
			email
			phone
		}
	}
`;
