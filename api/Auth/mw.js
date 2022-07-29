import jwt from 'express-jwt';
import jwksr from 'jwks-rsa'
const { expressjwt: expressJwt } = jwt
export const verifyJwt = expressJwt({
	secret: jwksr.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: 'https://dev-33fzkaw8.us.auth0.com/.well-known/jwks.json'
	}),
	audience: "endpointPF",
	issuer: "https://dev-33fzkaw8.us.auth0.com/",
	algorithms: ['RS256']
})