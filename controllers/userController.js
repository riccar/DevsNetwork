const userService = require('../services/userService');
const jwtService = require('../services/jwtService');
const { validationResult } = require('express-validator/check');


exports.registerUser = async (req, res) => {

  //get any possible error
  const errors = validationResult(req);

  //return a response with 400 status and the errors found
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { name, email, password } = req.body;

  try {

    let user = await userService.getUserByEmail(email);
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    const avatar = await userService.getUserAvatar(email);
    
    user = await userService.postUser(name, email, password, avatar);

    jwtService.signToken(user, function(err, token) {
      if (err) throw err;
      res.json({ token });
    });

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');    
  }

}