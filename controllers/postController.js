const postService = require('../services/postService');
const { validationResult } = require('express-validator/check');
const userService = require('../services/userService');

/***
 * Create a new post
 */

exports.postPost = async (req, res) => {
  
  //get any possible error in the request object
  const errors = validationResult(req);
  //return a response with 400 status and the errors found
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {
    //Get user avatar and name
    const user = await userService.getUser(req.user.id);
    
    //create post object and save it in db
    const postData = {
      user: req.user.id,
      text: req.body.text,
      userName: user.name,
      avatar: user.avatar
    }
    
    const post = await postService.postPost(postData);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }   
}

exports.getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    res.json(posts);  
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

exports.getPost = async (req, res) => {
  try {
    const post = await postService.getPost(req.params.id);
    if(!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);  
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
}

exports.deletePost = async (req, res) => {
  try {
    const post = await postService.getPost(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await post.remove();    
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
}

exports.likePost = async (req, res) => {
  //Find the post by id
  postId = req.params.id
  userId = req.user.id
  try {
    const post = await postService.getPost(postId);
    
    if (postService.isLikedByUser(post, userId)) 
      return res.status(400).json({ msg: 'Post already liked'})

    likes = await postService.likePost(post, userId);
    res.json(likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    return res.status(500).send('Server Error');
  }
}

exports.unlikePost = async (req, res) => {
  postId = req.params.id
  userId = req.user.id
  
  try {
    //find the post
    const post = await postService.getPost(postId);

    //check if post was liked by user
    if (!postService.isLikedByUser(post, userId)) 
        return res.status(400).json({ msg: 'Post not liked'})

    //remove like
    likes = await postService.unlikePost(post, userId);
    return res.json(likes);
  } catch (err) {
    
  }
  
}