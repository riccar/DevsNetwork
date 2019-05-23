const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');

const auth = require('../../middleware/auth');
const profileController = require('../../controllers/profileController');

/**
 * @route   GET api/profile/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', auth, profileController.getUserProfile);


/**
 * @route   POST api/profile
 * @desc    Create or update user profile
 * @access  Private
 */
router.post('/', [auth, [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty()
]], profileController.createOrUpdateProfile);

/**
 * @route   GET api/profile
 * @desc    Get all profiles
 * @access  Public
 */

 router.get('/', profileController.getProfiles);

 /**
 * @route   GET api/profile/user/:userId
 * @desc    Get user profile by id
 * @access  Public
 */

router.get('/user/:userId', profileController.getUserProfileById);

module.exports = router;