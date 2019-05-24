const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * Middleware function. It has access to the request and response object
 * and a callback called next() to be executed after finished so the next piece of 
 * middleware can be executed.
 */
module.exports = function(req, res, next) {
  //Get the token from the header when requests are sent
  const token = req.header('x-auth-token');

  //Validate if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //verify token 
  try {
    const decodedToken = jwt.verify(token, config.get('jwtSecret'));

    //assign to the request object user attribute the user within the token payload. 
    //This is the id saved in the database. 
    //Then we can access user id from any of the protected routes 
    req.user = decodedToken.user;
    
    next();

  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}