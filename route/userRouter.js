const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../model/userModel');
const Post = require('../model/postModel');

const checkObjectId = require('../middleware/checkObjectId');
const auth = require('../middleware/auth');

// POST '/user/register'
// register
// Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide valid email').isEmail(),
    check('password', 'Provide password at least 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
        myBag: [],
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5days' },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
// PUT '/user/myBag/:postid'
// add post to myBag
// Private
router.put(
  '/myBag/:postid',
  [auth, checkObjectId('postid')],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.postid);

      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      if (user.myBag.some((bag) => bag.post.toString() === req.params.postid)) {
        return res.status(404).json({ msg: 'Post already been liked' });
      }
      user.myBag.unshift({ post: req.params.postid });
      await user.save();
      res.json(user.myBag);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
// PUT '/user/myBag/undo/:postid'
// remove post from myBag
// Private
router.put(
  '/myBag/undo/:postid',
  [auth, checkObjectId('postid')],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.postid);

      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      if (
        !user.myBag.some((bag) => bag.post.toString() === req.params.postid)
      ) {
        return res.status(404).json({ msg: 'Post not been liked' });
      }
      user.myBag = user.myBag.filter(
        (bag) => bag.post.toString() !== req.params.postid
      );
      await user.save();
      res.json(user.myBag);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
