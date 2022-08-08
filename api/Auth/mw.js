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
	audience: process.env.AUDIENCE,
	issuer: process.env.ISSUER,
	algorithms: ['RS256']
})

export const verifySuperAdminPermission = (req, res, next) => {
    if(req.auth){const permissions = req.auth.permissions[0]
        permissions === 'SuperAdmin' ? next() : res.status(403).send('Not authorized'); }

}

export const verifyAdminOrSuperAdminPermission = (req, res, next) => {

        const permissions = req.auth.permissions[0]
    permissions === 'SuperAdmin' ? next() : permissions === 'Admin'? next() : res.status(403).send('Not authorized'); 

}