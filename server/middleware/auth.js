const tokenService = require('../library/tokenService');
const headerName = require('config').get('headerTokenName');

module.exports = async (req, res, next) => {
    const token = req.header(headerName);

    if (!token) {
        return res.status(401).json({ msg: 'Authorization denied, no token' });
    }
    try {
        req.user = await tokenService.getUserFromToken(token);
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid token' });
    }
};