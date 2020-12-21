const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const checkObjectId = require('../middleware/checkObjectId');

const Post = require('../model/postModel');
const User = require('../model/userModel');

// @route    POST '/post'
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [
    auth,
    check('movieName', 'please fill out the movie title').not().isEmpty(),
    check('summary', 'please fill out the summary').not().isEmpty(),
    check('genre', 'please fill out genre of the movie').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { movieName, summary, img = '', genre } = req.body;
      const post = new Post({
        movieName,
        summary,
        img,
        genre: Array.isArray(genre)
          ? genre
          : genre.split(',').map((sth) => sth.trim()),
        user: req.user.id,
      });

      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
// @route    GET /post
// @desc     Get all posts
// @access   Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route    GET /post/posts
// @desc     Get all post by ID
// @access   Private
router.get('/posts', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let posts = [];
    const findPost = async (id) => {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      await posts.push(post);
      console.log(posts);
      console.log(1);
    };

    user.myBag.length > 0 &&
      (await user.myBag.map(async (list) => {
        await findPost(list.post);
      }));
    console.log(posts);
    console.log(2);

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route    GET /post/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route    DELETE /post/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    //Todo
    //erase post from myBag
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    //check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route    PUT /post/likes/:id
// @desc     Like a post
// @access   Private
router.put('/likes/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route    PUT /post/likesBack/:id
// @desc     Undo Liking a post
// @access   Private
router.put('/likesBack/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if the post has not already been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post not been liked yet' });
    }
    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route    PUT /post/unlikes/:id
// @desc     unLike a post
// @access   Private
router.put('/unlikes/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if the post has already been liked
    if (post.unlikes.some((unlike) => unlike.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already unliked' });
    }
    post.unlikes.unshift({ user: req.user.id });
    await post.save();

    return res.json(post.unlikes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route    PUT /post/unlikesBack/:id
// @desc     Undo unLiking a post
// @access   Private
router.put(
  '/unlikesBack/:id',
  [auth, checkObjectId('id')],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      //check if the post has not already been liked
      if (
        !post.unlikes.some((unlike) => unlike.user.toString() === req.user.id)
      ) {
        return res.status(400).json({ msg: 'Post not been liked yet' });
      }
      post.unlikes = post.unlikes.filter(
        (unlike) => unlike.user.toString() !== req.user.id
      );
      await post.save();
      return res.json(post.unlikes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Tags of the Post

// @route    PUT /post/tags/:id
// @desc     attach tag on the post
// @access   Private
router.put(
  '/tags/:id',
  [
    auth,
    checkObjectId('id'),
    check('tagName', 'please fill out the name of tag').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
  }
);
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

      res.json(tag);
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

      res.json(tag);
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
      res.json(tag);
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
      res.json(tag);
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
