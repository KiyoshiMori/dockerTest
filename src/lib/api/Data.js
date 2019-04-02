import request from './request';

const generateDataTypeUrl = type => {
	let rows = 0;
	let delay = 0;

	if (type === 'small') {
		rows = 32;
	} else {
		rows = 1000;
		delay = 3;
	}

	return `/?rows=${rows}&id={number|1000}&firstName={firstName}&delay=${delay}&lastName={lastName}&email={email}`
	+ '&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
};

export const getData = async input => {
	return await request({
		uri: generateDataTypeUrl(input.type),
		json: true,
	});
};
