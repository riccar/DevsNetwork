const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

/**
 * @route   POST api/user
 * @desc    Register user
 * @access  Public - No token needed
 */
router.post('/', [
    /***
     * Express validator check function requires the following
     * name of the filed, error message, validation rules
     */
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password must have 6 or more characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
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
      //Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      //Grab use gravatar
      const avatar = gravatar.url(email, {
        s: '200', //px size
        r: 'pg',  //rate (to avoid nudity)
        d: 'mm'   //send default image if user has no image
      });

      //Create new User instance
      user = new User({
        name,
        email,
        avatar,
        password
      });

      //Encrypt password
      //request a salt generation with 10 rounds (standard) 
      const salt = await bcrypt.genSalt(10);
      //request a hash for the password using provided salt
      user.password = await bcrypt.hash(password, salt);
      //save user in DB
      await user.save();

      //Return jsonwebtoken. It requires a payload and the secret
      //create payload 
      const payload = {
        user: {
          id: user.id //the id created in MongoDB and returned by user.save()
        }
      };

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