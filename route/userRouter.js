const express = require('express');
const router = express.Router();

// GET '/user'
// Test
// Public
router.get('', (req, res) => {
  res.json('user router');
});

module.exports = router;
