const User = require('../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');


exports.getUser = async userId => {
  return await User.findById(userId).select('-password');
}

exports.getUserByEmail = async email => {
  return await User.findOne({ email });
}

exports.isValidPassword = async (password, user) => {
  return await bcrypt.compare(password, user.password);
}

exports.postUser = async (name, email, password, avatar) => {

  //Create new user
  user = new User({
    name,
    email,
    avatar,
    password
  });

  //Encrypt password
  //request a salt generation with 10 rounds (standard) 
  const salt = await bcrypt.genSalt(10);
  //request a hash for the password using provided salt
  user.password = await bcrypt.hash(password, salt);
  //save user in DB
  return await user.save();
}

exports.getUserAvatar = async (email) => {
  return await gravatar.url(email, {
    s: '200', //px size
    r: 'pg',  //rate (to avoid nudity)
    d: 'mm'   //send default image if user has no image
  });
}

