const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

// @route  POST api/user
// @desc   Register user
// @access Public
router.post('/', [
    check('email', 'Please enter valid email').isEmail(),
    check('phone', 'Please enter valid phone number').isMobilePhone('ru-RU'),
    check('password', 'Please enter password with minimum length 6 characters')
        .isLength({min: 6})
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    res.send('User route');
});

module.exports = router;