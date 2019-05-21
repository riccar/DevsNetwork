const userService = require('../services/userService');
const jwtService = require('../services/jwtService');
const { check, validationResult } = require('express-validator/check');

exports.getUser = async (req, res) => {
  //Attempt to find and return the user matching the id in the req object, which
  //was set by the middleware during the token validation.
  //-password doesn't return this field.
  try {
    const userId = req.user.id;
    const user = await userService.getUser(userId);//User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }   
}

exports.postUser = async (req, res) => {  
  
  /*
  //get any possible error in the request object
  const errors = validationResult(req);

  //return a response with 400 status and the errors found
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  */

  try {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials1' }] });
    }

    const validPassword = await userService.isValidPassword(password, user);

    if (!validPassword) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials2' }] });
    }

    const token = await jwtService.signToken(user, function(err, token) {
      if (err) throw err;
      res.json({ token });
    });
    
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

}