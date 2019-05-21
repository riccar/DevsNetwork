const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getUser = async userId => {
  return await User.findById(userId).select('-password');
}

exports.getUserByEmail = async email => {
  return await User.findOne({ email });
}

exports.isValidPassword = async (password, user) => {
  return await bcrypt.compare(password, user.password);
}
