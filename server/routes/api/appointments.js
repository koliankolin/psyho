const express = require('express');
const router = express.Router();

// @route  GET api/appointment
// @desc   Test route
// @access Public
router.get('/', (req, res) => {
    res.send('Appointment route');
});

module.exports = router;