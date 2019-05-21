const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const authController = require('../../controllers/authController')

const User = require('../../models/User');
/**
 * @route   GET api/auth
 * @desc    Test route
 * @access  Protected
 * By passing the auth export function, this route is now protected.
 */
router.get('/', auth, authController.getUser);

/**
 * @route   POST api/auth
 * @desc    Authenticate user & get token
 * @access  Public - No token needed
 */
router.post('/', authController.postUser);

/**
 * @route   POST api/auth
 * @desc    Authenticate user & get token
 * @access  Public - No token needed
 */
router.post('/x', [
  /***
   * Express validator check function requires the following
   * name of the filed, error message, validation rules
   */
  check('email', 'Email is invalid').isEmail(),
  check('password', 'Password is required').exists()
],
async (req, res) => {
  //get any possible error in the request object
  const errors = validationResult(req);

  //return a response with 400 status and the errors found
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  try {
    //Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    //Check if provided password matches the one on the db
    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    //Return jsonwebtoken. It requires a payload and the secret
    //create payload 
    const payload = {
      user: {
        id: user.id //the id created in MongoDB and returned by user.save()
      }
    };

    //Sign token with secret word
    jwt.sign(
      payload, 
      config.get('jwtSecret'),
      { expiresIn: 360000 }, //TODO: change to 3600 before deploying to prod (use env variable)
      (err, token) => { //callback
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }  
});

module.exports = router;