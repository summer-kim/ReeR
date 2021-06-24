import express from 'express';
import isAuth from '../middleware/auth';
import * as postContr from '../controller/postController';
import { validatePost } from '../middleware/validation';
import { uploadImg } from '../db/s3storage';

const router = express.Router();

router.post('/create', isAuth, validatePost, postContr.createPost);

router.post('/img', isAuth, uploadImg, validatePost, postContr.createPostImg);

router.put('/update/:id', isAuth, postContr.updatePost);

router.get('/', postContr.getAllPosts);

router.get('/:id', isAuth, postContr.getPost);

router.delete('/:id', isAuth, postContr.deletePost);

router.put('/likes/:id', isAuth, postContr.likePost);
// @route    PUT /post/likesBack/:id
// @desc     Undo Liking a post
// @access   Private
// router.put(
//   '/likesBack/:id',
//   isAuth,
//   async (req: RequestTypeCustomed, res) => {
//     try {
//       const post = await Post.findById(req.params.id);
//       //check if the post has not already been liked
//       if (!post.likes.some((like) => like.user.toString() === req.userId)) {
//         return res.status(400).json({ msg: 'Post not been liked yet' });
//       }
//       post.likes = post.likes.filter(
//         (like) => like.user.toString() !== req.userId
//       );
//       await post.save();
//       return res.json(post.likes);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ msg: 'Error detected' });
//     }
//   }
// );
// @route    PUT /post/unlikes/:id
// @desc     unLike a post
// @access   Private
// router.put('/unlikes/:id', isAuth, async (req: RequestTypeCustomed, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     //check if the post has already been liked
//     if (post.unlikes.some((unlike) => unlike.user.toString() === req.userId)) {
//       return res.status(400).json({ msg: 'Post already unliked' });
//     }
//     post.unlikes.unshift({ user: req.userId });
//     await post.save();

//     return res.json(post.unlikes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });
// @route    PUT /post/unlikesBack/:id
// @desc     Undo unLiking a post
// @access   Private
// router.put(
//   '/unlikesBack/:id',
//   isAuth,
//   async (req: RequestTypeCustomed, res: Response) => {
//     try {
//       const post = await Post.findById(req.params.id);
//       //check if the post has not already been liked
//       if (
//         !post.unlikes.some((unlike) => unlike.user.toString() === req.userId)
//       ) {
//         return res.status(400).json({ msg: 'Post not been liked yet' });
//       }
//       post.unlikes = post.unlikes.filter(
//         (unlike) => unlike.user.toString() !== req.userId
//       );
//       await post.save();
//       return res.json(post.unlikes);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

export default router;
