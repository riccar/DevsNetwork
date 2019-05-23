const profileService = require('../services/profileService');
const { validationResult } = require('express-validator/check');

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
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch(err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
}