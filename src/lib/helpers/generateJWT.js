import jwt from 'jsonwebtoken';

export const JWT_SECRET = 'secret';

export default user => {
	const token = jwt.sign(user, JWT_SECRET, {
		expiresIn: 60000,
		audience: user.role,
	});

	jwt.verify(token, JWT_SECRET, (err, data) => {
		console.log('token verification:', err, data);
	});

	return token;
};
