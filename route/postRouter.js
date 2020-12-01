const express = require('express');
const router = express.Router();

// GET '/post'
// Test
// Public
router.get('', (req, res) => {
  res.json('post router');
});

module.exports = router;
