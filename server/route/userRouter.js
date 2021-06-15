import express from 'express';
import expressValidator from 'express-validator';
import User from '../model/userModel.js';
import auth from '../middleware/auth.js';
import * as validate from '../middleware/validation.js';
import * as authController from '../controller/userController.js';

const { check, validationResult } = expressValidator;
const router = express.Router();

router.post('/register', validate.validateSignup, authController.signUp);

router.post('/login', validate.validateSignIn, authController.signIn);

router.get('/', auth, authController.getMe);

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
