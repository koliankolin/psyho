const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

const Profile = require('../../models/Profile');

// @route  GET api/profile/me
// @desc   Get auth user's profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(400).json({ msg: 'No such profile' });
        }
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

// @route  POST api/profile/me/create
// @desc   Create profile for auth user
// @access Private
router.post('/me/create', [
    auth, [
        check('first_name', 'First name is required').exists(),
        check('last_name', 'Last name is required').exists(),
        check('location', 'Location is required').exists(),
        check('sex', 'Sex is required').exists()
    ]
], async (req, res) => {
   try {
       const errors = await validationResult(req);
       if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() })
       }
       const profileFields = getProfileFields(req);

       const profile = await Profile.findOne({ user: profileFields.user });
       if (profile) {
           return res.status(400).json({ msg: 'Profile for that user exists' });
       }
       const newProfile = await Profile(profileFields).save();
       return res.json(newProfile);
   } catch (err) {
       console.error(err.message);
       return res.status(500).send('Server error');
   }
});

// @route  PUT api/profile/me/update
// @desc   Update profile for auth user
// @access Private
router.put('/me/update', auth, async (req, res) => {
   try {
       const profileFields = getProfileFields(req);
       let profile = await Profile.findOneAndUpdate(
           { user: profileFields.user },
           { $set: profileFields },
           { new: true });
       if (!profile) {
           return res.status(400).json({ msg: 'There no profile for that user' });
       }
       return res.json(profile);
   } catch (err) {
       console.error(err.message);
       return res.status(500).send('Server error');
   }
});

function getProfileFields(req) {
    const userId = req.user.id;
    const {
        first_name,
        last_name,
        bio,
        location,
        age,
        sex
    } = req.body;

    const profileFields = {};
    if (userId) profileFields.user = userId;
    if (first_name) profileFields.first_name = first_name;
    if (last_name) profileFields.last_name = last_name;
    if (bio) profileFields.bio = bio;
    if (location) profileFields.location = location;
    if (age) profileFields.age = age;
    if (sex) profileFields.sex = sex;

    return profileFields;
}

module.exports = router;