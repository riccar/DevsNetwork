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
    console.log(err.message);
    res.status(500).send('Server Error');
  }   
}