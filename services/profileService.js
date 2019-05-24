const Profile = require('../models/Profile');

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

exports.deleteUserProfile = async (userRef) => {
  return await Profile.findOneAndRemove(userRef);
}

exports.addProfileExperience = async (userId, experience) => {
  
  //Find the profile to be updated
  let profile = await this.getUserProfile(userId); 
  //Insert the new experience at the beginner of the experience array
  await profile.experience.unshift(experience);
  //save profile
  await profile.save();
  return profile;
}

exports.deleteProfileExperience = async (userId, experienceId) => {
  const profile = await Profile.findOneAndUpdate(
    { user: userId },
    { $pull: { experience: { _id: experienceId } } },
    { new: true }
  );
  
  if (!profile) return null
  await profile.save();
  return profile;
}

exports.addProfileEducation = async (userId, education) => {
  
  //Find the profile to be updated
  let profile = await this.getUserProfile(userId); 
  //Insert the new experience at the beginner of the experience array
  await profile.education.unshift(education);
  //save profile
  await profile.save();
  return profile;
}

exports.deleteProfileEducation = async (userId, educationId) => {
  const profile = await Profile.findOneAndUpdate(
    { user: userId },
    { $pull: { education: { _id: educationId } } },
    { new: true }
  );
  
  if (!profile) return null
  await profile.save();
  return profile;
}