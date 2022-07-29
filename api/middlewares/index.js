import { expressjwt } from 'express-jwt';
import jwks from 'jwks-rsa';

const jwt = expressjwt;

export const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-lj2esmaq.us.auth0.com/.well-known/jwks.json'
    }),
  audience: 'unique identifier',
  issuer: 'https://dev-lj2esmaq.us.auth0.com/',
  algorithms: ['RS256']
});