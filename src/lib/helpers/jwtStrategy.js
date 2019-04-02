import { Strategy } from 'passport-jwt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from './generateJWT';

const cookieExtractor = req => {
	let token;

	console.log({ cookies: req.cookies });

	if (req?.cookies) {
		const cookiesJWT = req.cookies.jwt;

		if (cookiesJWT && jwt.verify(cookiesJWT, JWT_SECRET)) {
			token = cookiesJWT;
		}
	}

	return token;
};

const options = {
	jwtFromRequest: cookieExtractor,
	secretOrKey: JWT_SECRET,
};

export default new Strategy(options, (jwt_payload, next) => {
	console.log('JWT PAYLOAD:', jwt_payload);

	if (jwt_payload?.username) {
		next(null, jwt_payload);
	} else {
		next(null, null);
	}
});
