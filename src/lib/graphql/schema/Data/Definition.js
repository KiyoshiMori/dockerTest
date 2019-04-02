export default `
	type Address {
		streetAddress: String
		city: String
		state: String
		zip: String
	}

	type DataResponse {
		id: Int!
		firstName: String
		lastName: String
		email: String
		phone: String
		address: Address
		description: String
	}
	
	input getDataInput {
		type: String
	}
	
	input addFieldInput {
		id: Int
		firstName: String
		lastName: String
		email: String
		phone: String
	}

	extend type Query {
		getData(input: getDataInput): [DataResponse!]!
	}
	
	extend type Mutation {
		addField(input: addFieldInput): DataResponse
	}
`;