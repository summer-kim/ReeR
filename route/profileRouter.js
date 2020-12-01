const express = require('express');
const router = express.Router();

// GET '/profile'
// Test
// Public
router.get('', (req, res) => {
  res.json('profile router');
});

module.exports = router;
