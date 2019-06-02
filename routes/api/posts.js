const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator/check');


const postController = require('../../controllers/postController');

/**
 * @route   POST api/posts
 * @desc    Create a post
 * @access  Private
 */
router.post('/', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], postController.postPost); //PUN!

module.exports = router;