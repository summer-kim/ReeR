const express = require('express');
const router = express.Router();

// GET '/auth'
// Test
// Public
router.get('', (req, res) => {
  res.send('auth router');
});

module.exports = router;
