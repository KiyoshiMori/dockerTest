import rp from 'request-promise';

export default async (options) => {
	const {
		method,
		uri,
		contentType,
		headers,
		...rest
	} = options;

	const rpOptions = {
		method: method || 'GET',
		uri: `http://www.filltext.com${uri}`,
		headers: {
			...headers,
			"Content-Type": contentType || 'application/json',
		},
		...rest,
	};

	console.log({ rpOptions });

	const response = await rp(rpOptions);

	console.log({ response });

	return response;
};
