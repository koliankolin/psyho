const express = require('express');
const router = express.Router();
const passwordService = require('../../library/passwordService');
const tokenService = require('../../library/tokenService');
const textService = require('../../library/textService');
const {check, oneOf, validationResult} = require('express-validator');
const gravatar = require('gravatar');

const User = require('../../models/User');

// @route  POST api/user
// @desc   Register user
// @access Public
router.post('/', [
    check('email', 'Please enter valid email').isEmail(),
    check('phone', 'Please enter valid phone number').isMobilePhone('ru-RU'),
    check('password', 'Please enter password with minimum length 6 characters').isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    let {email, phone, password} = req.body;
    phone = textService.cleanPhone(phone);

    try {
        const userByEmail = await User.findOne({ email: email });
        const userByPhone = await User.findOne({ phone: phone });

        if (userByEmail) {
            return res.status(400).json({ errors: [ { msg: 'User with that email already exists' } ] });
        } else if (userByPhone) {
            return res.status(400).json({ errors: [ { msg: 'User with that phone already exists' } ] });
        }

        const avatar = await gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        let user = User({
            email,
            phone,
            password,
            avatar
        });

        user.password = await passwordService.hashPassword(password);
        await user.save();
        return res.json({ token: await tokenService.getTokenForUser(user) });
    } catch (err) {
        console.error(err.message);
        return res.status(400).send('Server error');
    }
});

// @route  POST api/user/login
// @desc   Login user
// @access Public
router.post('/login', [
    oneOf([
        check('login')
            .exists()
            .withMessage('Login is required')
            .isEmail(),

        check('login')
            .isLength({ min: 11 })
            .isMobilePhone('ru-RU')
    ], 'Login must be email or phone starts with 7'),
    check('password').exists().withMessage('Password is required')
], async (req, res) => {
    try {
        let {login, password} = req.body;
        const user = await User.findOne({ email: login }) || await User.findOne({ phone: textService.cleanPhone(login) });

        if (!user || !await passwordService.comparePasswords(password, user.password)) {
            return res.status(400).json({ errors: [ { msg: 'Invalid credentials: Login must be email or phone starts with 7 or password invalid' } ] });
        }
        return res.json({ token: await tokenService.getTokenForUser(user) });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err})
    }
});

module.exports = router;