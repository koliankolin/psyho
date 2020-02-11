const express = require('express');
const router = express.Router();

// @route  GET api/news
// @desc   Test route
// @access Public
router.get('/', (req, res) => {
    res.send('News route');
});

module.exports = router;