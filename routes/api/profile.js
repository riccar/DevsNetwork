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

/**
 * @route   DELETE api/profile
 * @desc    Delete profile, user & posts for currently registered user
 * @access  Private
 */
router.delete('/', auth, profileController.deleteProfileUserAndPosts);

/**
 * @route   PUT api/profile/experience
 * @desc    Add profile experience of currently registered user
 * @access  Private
 */
router.put('/experience', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
]], profileController.addProfileExperience);

/**
 * @route   DELETE api/profile/experience/:experienceId
 * @desc    Delete profile experience of currently registered user
 * @access  Private
 */
router.delete('/experience/:experienceId', auth, profileController.deleteProfileExperience);

/**
 * @route   PUT api/profile/experience
 * @desc    Add profile education of currently registered user
 * @access  Private
 */
router.put('/education', [auth, [
  check('school', 'School is required').not().isEmpty(),
  check('degree', 'Degree is required').not().isEmpty(),
  check('fieldofstudy', 'Field of study is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
]], profileController.addProfileEducation);

/**
 * @route   DELETE api/profile/education/:educationId
 * @desc    Delete profile education of currently registered user
 * @access  Private
 */
router.delete('/education/:educationId', auth, profileController.deleteProfileEducation);
 
module.exports = router;