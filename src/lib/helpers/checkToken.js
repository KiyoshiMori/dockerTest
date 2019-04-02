const checkToken = async (user, cb, additionalCheck = true) => {
	if (user?.username) {
		if (additionalCheck) {
			return await cb();
		}
	}
	throw Error('Unauthorized');
};

export default checkToken;
module.exports = checkToken;
