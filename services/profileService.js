const Profile = require('../models/Profile');
const User = require('../models/User');

exports.getUserProfile = async userId => {
  /**
   * the find one receives the user field defined in the Profile model
   * as the id of the user table
   * The populate function returns the name and the avatar of the user found
   */
  return await Profile.findOne({ user: userId }).populate('user', ['name', 'avatar']);
}

exports.postProfile = async (profileFields) => {
  if (profileFields.skills) {
    profileFields.skills = profileFields.skills.split(",").map(skill => skill.trim());
  }
  //populate social object
  profileFields.social = {};
  ['youtube', 'twitter', 'facebook', 'linkedin', 'instagram'].map(key => {
    if (profileFields[key]) {
      profileFields.social[key] = profileFields[key];
    }
  });
  //Update profile if exists
  let profile = await Profile.findOneAndUpdate(
    { user: profileFields.user },
    { $set: profileFields },
    { new: true }
  )
  //Create profile if it doesn't exist
  if (!profile) {
    profile = new Profile(profileFields);
  }
  await profile.save();
  return profile;

}

exports.getProfiles = async () => {
  return await Profile.find().populate('user', ['name', 'avatar']);
}