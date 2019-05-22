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
 * @desc    Get authorized user's details
 * @access  Protected
 * By passing the auth export function, this route is now protected.
 */
router.get('/', auth, authController.getAuthorizedUser);

/**
 * @route   POST api/auth
 * @desc    Authenticate user & get token
 * @access  Public - No token needed
 */
router.post('/', [
  check('email', 'Email is invalid').isEmail(),
  check('password', 'Password is required').exists()
], authController.signUserToken);


module.exports = router;