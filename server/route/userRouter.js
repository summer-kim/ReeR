import express from 'express';
import expressValidator from 'express-validator';
import jwt from 'jsonwebtoken';
import { config } from '../../config.js';
import bcrypt from 'bcryptjs';
import User from '../model/userModel.js';
import auth from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { signUp } from '../controller/userController.js';

const { check, validationResult } = expressValidator;
const router = express.Router();

// POST '/user/register'
// register
// Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide valid Email').isEmail(),
    check('password', 'Password has to be at least 6 letters').isLength({
      min: 6,
    }),
    validate,
  ],
  signUp
);

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
        config.jwt.secret,
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

    if (user.myBag.some((list) => list.toString() === req.params.postid)) {
      return res.status(400).json({ msg: 'Already add this content' });
    }
    user.myBag.unshift(req.params.postid);

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

    if (!user.myBag.some((list) => list.toString() === req.params.postid)) {
      return res.status(400).json({ msg: 'this content never been added' });
    }
    user.myBag.splice(user.myBag.indexOf(req.params.postid), 1);

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

    if (user.likes.some((list) => list.toString() === req.params.postid)) {
      return res.status(400).json({ msg: 'Already add this content' });
    }
    user.likes.unshift(req.params.postid);

    await user.save();
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

    if (!user.likes.some((list) => list.toString() === req.params.postid)) {
      return res.status(400).json({ msg: 'this content never been added' });
    }
    user.likes.splice(user.likes.indexOf(req.params.postid), 1);

    await user.save();
    res.json(user.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
