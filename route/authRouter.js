const express = require('express');
const router = express.Router();
//middleware
const Auth = require('../middleware/auth');
const User = require('../model/userModel');

// POST '/auth'
// Test
// Public
router.post('/', async (req, res) => {
  try {
    await User.find();
  } catch (err) {}
});

module.exports = router;
