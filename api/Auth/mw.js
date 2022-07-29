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

export const verifySuperAdminPermission = async (req, res) => {
	try {
		const token = req.body.headers.authorization.split(" ")[1];
		const res = await axios.get(
			"https://dev-33fzkaw8.us.auth0.com/userinfo",
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);
		const userInfo = res.data;
		console.log(userInfo)
	} catch (error) {
		
	}
}