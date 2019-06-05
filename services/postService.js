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

exports.isLikedByUser = (post, userId) => {
  //filter likes array by user id
  return post.likes.filter(like => like.user.toString() === userId).length > 0;
}

exports.likePost = async (post, userId) => {
  //unshift inserts at the beginning of the array
  post.likes.unshift({ user: userId});
  await post.save();
  return post.likes;
}

exports.unlikePost = async (post, userId) => {
  //Delete post using $pull mongoose command to remove items from array
  /*const likeId = post.likes.map(like => {
    if (like.user.toString() === userId) return like.id
  })
  if (likeId) {
    post.likes.pull(likeId);
    await post.save();
  }*/
  console.log(post.id, userId);
  post = await Post.findOneAndUpdate(
    { _id: post.id },
    { $pull: { 'likes': { user: userId } } },
    { new: true }
  );
  await post.save();
  return post.likes;
}