const { validationResult } = require('express-validator/check');
const request = require('request');
const profileService = require('../services/profileService');
const userService = require('../services/userService');
const config = require('config');


exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const profile = await profileService.getUserProfile(userId);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  
}

exports.createOrUpdateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      errors: errors.array() 
    });
  }

  const profileFields = {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;
  profileFields.user = req.user.id;
  try {
    const profile = await profileService.postProfile(profileFields);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await profileService.getProfiles();
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

exports.getUserProfileById = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const profile = await profileService.getUserProfile(userId);
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch(err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
}

exports.deleteProfileUserAndPosts = async (req, res) => {
  //@TODO: remove users posts

  try {
    //remove profile
    userId = req.user.id;
    await profileService.deleteUserProfile({ user: userId });
    //remove user
    await userService.deleteUser({ _id: userId });

    res.json({ msg: 'User deleted' });  
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

exports.addProfileExperience = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      errors: errors.array() 
    });
  }

  //Create an experience object with all the expected fields from the req.body
  const experience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body;
  
  try {
    const userId = req.user.id;
    //Call the service to update the profile with the new experience object
    const profile = await profileService.addProfileExperience(userId, experience);
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

exports.deleteProfileExperience = async (req, res) => {
  experienceId = req.params.experienceId;
  userId = req.user.id;
  try {
    const profile = await profileService.deleteProfileExperience(userId, experienceId);
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  
}

exports.addProfileEducation = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      errors: errors.array() 
    });
  }

  //Create an education object with all the expected fields from the req.body
  const education = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body;
  
  try {
    const userId = req.user.id;
    //Call the service to update the profile with the new experience object
    const profile = await profileService.addProfileEducation(userId, education);
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

exports.deleteProfileEducation = async (req, res) => {
  educationId = req.params.educationId;
  userId = req.user.id;
  try {
    const profile = await profileService.deleteProfileEducation(userId, educationId);
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  
}

exports.getUserGithubRepos = async (req, res) => {
  try {
    const userName = req.params.username;
    const githubClientId = config.get('githubClientId');
    const githubSecret = config.get('githubSecret')
    const options = {
      uri: `https://api.github.com/users/${userName}/repos?per_page5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubSecret}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };
    //request receives the options and a callback function 
    //with the params: error (if any), response, and body
    request(options, (error, response, body) => {
      if(error) console.error(error);

      if(response.statusCode !== 200) {
        return res.status(404).json({ msg: 'no Github profile found'});
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

}
