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

/**
 * @route GET api/posts/get
 * @desc Get all posts 
 * @access Private
 */

 router.get('/', auth, postController.getPosts);

 /**
 * @route GET api/posts/:id
 * @desc Get post by id 
 * @access Private
 */

router.get('/:id', auth, postController.getPost);

/**
 * @route DELETE api/posts/:id
 * @desc Delete post by id 
 * @access Private
 */

router.delete('/:id', auth, postController.deletePost);

/**
 * @route PUT api/posts/like/:id
 * @desc Like a post
 * @access Private
 */

router.put('/like/:id', auth, postController.likePost);

/**
 * @route PUT api/posts/unlike/:id
 * @desc Remove a post like
 * @access Private
 */

router.put('/unlike/:id', auth, postController.unlikePost);

/**
 * @route PUT api/posts/comment/:postId
 * @desc Comment a post
 * @access Private
 */

router.put('/comment/:postId', [auth,[
  check('text', 'Text is required').not().isEmpty()
]], postController.commentPost);

/**
 * @route DELETE api/posts/comment/:postId/:commentId
 * @desc Comment a post
 * @access Private
 */

router.delete('/comment/:postId/:commentId', auth, postController.deletePostComment);


module.exports = router;