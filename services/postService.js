const Post = require('../models/Post');

exports.postPost = async postData => { //PUN!
  post = new Post(postData);
  return await post.save();
}

exports.getPosts = async () => {
  return await Post.find().sort({date: -1});
}

exports.getPost = async postId => {
  return await Post.findById(postId);
}
