const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../model/userModel');
//middleware
const auth = require('../middleware/auth');

// @route    GET /auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// @route    POST /auth/login
// @desc     Authenticate user & get token(login)
// @access   Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
// @route    PUT /auth/myBag/:postid
// @desc     add content to myBag
// @access   Private
router.put('/myBag/:postid', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user.myBag.some((list) => list.post.toString() === req.params.postid)) {
      return res.status(400).json({ msg: 'Already add this content' });
    }
    user.myBag.unshift({
      post: req.params.postid,
    });
    await user.save();
    res.json(user.myBag);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// @route    PUT /auth/myBagUndo/:postid
// @desc     remove content to myBag
// @access   Private
router.put('/myBagUndo/:postid', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (
      !user.myBag.some((list) => list.post.toString() === req.params.postid)
    ) {
      return res.status(400).json({ msg: 'this content never been added' });
    }
    user.myBag = user.myBag.filter(
      (list) => list.post.toString() !== req.params.postid
    );
    await user.save();
    res.json(user.myBag);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// @route    PUT /auth/likes/:postid
// @desc     add content to likes
// @access   Private
router.put('/likes/:postid', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user.likes.some((list) => list.post.toString() === req.params.postid)) {
      return res.status(400).json({ msg: 'Already add this content' });
    }
    console.log(1);
    user.likes.unshift({
      post: req.params.postid,
    });
    await user.save();
    console.log(user.likes);
    res.json(user.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// @route    PUT /auth/likesUndo/:postid
// @desc     remove content to likes
// @access   Private
router.put('/likesUndo/:postid', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (
      !user.likes.some((list) => list.post.toString() === req.params.postid)
    ) {
      return res.status(400).json({ msg: 'this content never been added' });
    }
    user.likes = user.likes.filter(
      (list) => list.post.toString() !== req.params.postid
    );
    await user.save();
    res.json(user.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
