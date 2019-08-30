const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator')


const db = require('../../models');




// @route GET api/profile/me
// @desc  Get current users profile
// @access Public
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await db.Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route POST api/profile
// @desc  Create or Update user profile
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const {
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
      linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await db.Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


// @route Get api/profile
// @desc  get ALL profiles
// @access Private
router.get('/', async (req, res) => {
  try {
    const profiles = await db.Profile.find().populate('user', ['name', 'avatar']);
    res.status(200).json(profiles);
  } catch (error) {
    console.log(error);
    res.status(500).send(`ServerError ${error.message}`)
  }
});

// @route Get api/profile
// @desc  delete user and profile and posts
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    await db.Profile.findOneAndDelete({ user: req.user.id });
    await db.User.findOneAndDelete({ _id: req.user.id })
    res.status(200).json({ msg: 'User Deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send(`ServerError ${error.message}`)
  }
});

// @route PUT api/profile/experience
// @desc  Add profile experience
// @access Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is Required')
        .not()
        .isEmpty(),
      check('company', 'Company Is Required')
        .not()
        .isEmpty(),
      check('from', 'From Date Is Required')
        .not()
        .isEmpty(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await db.Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExperience);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }


  });

// @route DELETE api/profile/experience/:exp_id
// @desc  Delete expreience from profile
// @access Private


router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience
      .map(exp => exp.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }

})





// @route PUT api/profile/education
// @desc  Add profile education
// @access Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is Required')
        .not()
        .isEmpty(),
      check('degree', 'Degree Is Required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of Study Is Required')
        .not()
        .isEmpty(),
      check('from', 'From Date Is Required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await db.Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducation);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }


  });

// @route DELETE api/profile/educatoin/:edu_id
// @desc  Delete edcation from profile
// @access Private


router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map(exp => exp.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }

})




module.exports = router;

