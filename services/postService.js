const Post = require('../models/Post');

exports.postPost = async postData => { //PUN!
  console.log(postData);
  post = new Post(postData);
  console.log(post);
  return await post.save();

}
