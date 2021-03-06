const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');

const userController = require('../../controllers/userController');


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
], userController.registerUser);


module.exports = router;