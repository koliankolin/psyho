const express = require('express');
const router = express.Router();

// @route  GET api/article
// @desc   Test route
// @access Public
router.get('/', (req, res) => {
    res.send('Article route');
});

module.exports = router;