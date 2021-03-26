const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkObjectId = require('../middleware/checkObjectId');

const Post = require('../model/postModel');

// @route    PUT /post/tags/:id
// @desc     attach tag on the post
// @access   Private
router.put('/tags/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const newTag = {
      tagName: req.body.tagName,
      user: req.user.id,
    };
    post.tags.unshift(newTag);

    await post.save();
    res.json(post.tags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route    PUT /post/tags/likes/:postid/:tagid
// @desc     liking tag
// @access   Private
router.put(
  '/tags/likes/:postid/:tagid',
  [auth, checkObjectId('postid'), checkObjectId('tagid')],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postid);
      const tag = post.tags.find(
        (tag) => tag._id.toString() === req.params.tagid
      );
      if (tag.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'has already been Liked' });
      }
      const newLike = {
        user: req.user.id,
      };
      tag.likes.unshift(newLike);
      await post.save();

      res.json(post.tags);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route    PUT /post/tags/unlikes/:postid/:tagid
// @desc     unliking tag
// @access   Private
router.put(
  '/tags/unlikes/:postid/:tagid',
  [auth, checkObjectId('postid'), checkObjectId('tagid')],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postid);
      const tag = post.tags.find(
        (tag) => tag._id.toString() === req.params.tagid
      );
      if (
        tag.unlikes.some((unlike) => unlike.user.toString() === req.user.id)
      ) {
        return res.status(400).json({ msg: 'has already been Unliked' });
      }
      const newUnlike = {
        user: req.user.id,
      };
      tag.unlikes.unshift(newUnlike);
      await post.save();

      res.json(post.tags);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route    PUT /post/tags/likesBack/:postid/:tagid
// @desc     undo liking tag
// @access   Private
router.put(
  '/tags/likesBack/:postid/:tagid',
  [auth, checkObjectId('postid'), checkObjectId('tagid')],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postid);
      const tag = post.tags.find(
        (tag) => tag._id.toString() === req.params.tagid
      );
      if (!tag.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'has not been Liked' });
      }
      tag.likes = tag.likes.filter(
        (like) => like.user.toString() !== req.user.id
      );
      await post.save();
      res.json(post.tags);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route    PUT /post/tags/unlikesBack/:postid/:tagid
// @desc     undo unliking tag
// @access   Private
router.put(
  '/tags/unlikesBack/:postid/:tagid',
  [auth, checkObjectId('postid'), checkObjectId('tagid')],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postid);
      const tag = post.tags.find(
        (tag) => tag._id.toString() === req.params.tagid
      );
      if (
        !tag.unlikes.some((unlike) => unlike.user.toString() === req.user.id)
      ) {
        return res.status(400).json({ msg: 'has not been Unliked' });
      }
      tag.unlikes = tag.unlikes.filter(
        (unlike) => unlike.user.toString() !== req.user.id
      );
      await post.save();
      res.json(post.tags);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT /post/tags/delete/:postid/:tagid
// @desc     delete the tag
// @access   Private
router.put(
  '/tags/delete/:postid/:tagid',
  [auth, checkObjectId('postid'), checkObjectId('tagid')],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postid);
      const tag = post.tags.find(
        (tag) => tag._id.toString() === req.params.tagid
      );
      if (!tag) {
        return res.status(400).json({ msg: 'No tag matched' });
      }
      if (tag.user.toString() !== req.user.id) {
        return res.status(400).json({ msg: 'only author can delete the tag' });
      }
      post.tags = post.tags.filter(
        (eachTag) => eachTag._id.toString() !== req.params.tagid
      );
      await post.save();
      res.json(post.tags);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
