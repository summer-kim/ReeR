import express, { Response } from 'express';
import checkAuth from '../middleware/auth';
import multer from 'multer';
import AWS from 'aws-sdk';
import * as postContr from '../controller/postController';
import { validateCreatePost } from '../middleware/validation';

const router = express.Router();

router.post('/create', checkAuth, validateCreatePost, postContr.createPost);

router.put('/update/:id', checkAuth, postContr.updatePost);

router.get('/', postContr.getAllPosts);

router.get('/:id', checkAuth, postContr.getPost);

// router.delete('/:id', checkAuth, async (req: RequestTypeCustomed, res) => {
//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ msg: 'Post not found' });
//     }
//     //check if user has right to delete
//     if (post.user.toString() !== req.userId) {
//       return res.status(401).json({ msg: 'User not Authorized' });
//     }
//     const user = await User.findById(req.userId);
//     user.mybag = user.mybag.filter((id) => id.toString() !== req.params.id);
//     user.likes = user.likes.filter((id) => id.toString() !== req.params.id);

//     if (post.img) {
//       const oldparams = {
//         BucketName,
//         Key: `uploads/${post.img}`,
//       };

//       s3.deleteObject(oldparams, (error, data) => {
//         if (error) {
//           return res.status(400).json({ msg: 'delete img fail' });
//         }
//       });
//     }
//     await user.save();
//     await post.remove();
//     res.json({ msg: 'Post removed' });

// });
// const s3 = new AWS.S3({
//   accessKeyId: config.AWSS3.id,
//   secretAccessKey: config.AWSS3.secret,
//   region: 'ap-northeast-2',
// });

// const BucketName = config.AWSS3.bucketName;
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 1024 * 1024 * 3,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
//       return cb(new Error('JPG, JPEG, PNG file Only'));

//     cb(null, true);
//   },
// }).single('img');

// @route    POST '/post/img'
// @desc     Create a post if it has image
// @access   Private
// router.post(
//   '/img',
//   [
//     checkAuth,
//     check('movieName', 'please fill out the movie title').not().isEmpty(),
//     check('summary', 'please fill out the summary').not().isEmpty(),
//     check('genre', 'please fill out genre of the movie').not().isEmpty(),
//     upload,
//   ],
// async (req: RequestTypeCustomed, res: Response) => {
//   const errors = validationResult(req.body);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   try {
//     const { movieName, summary, genre, postid = '' } = req.body;

//     //if user Edit post, not create
//     if (postid) {
//       const old_post = await Post.findById(postid);
//       if (old_post.img) {
//         //Delete image of old post
//         const oldparams = {
//           BucketName,
//           Key: `uploads/${old_post.img}`,
//         };

//         s3.deleteObject(oldparams, (error, data) => {
//           if (error) {
//             return res.status(400).json({ msg: 'delete img fail' });
//           }
//         });
//       }
//       const post = await Post.findOneAndUpdate(
//         { _id: postid },
//         {
//           $set: {
//             movieName,
//             summary,
//             genre: genre.split(','),
//             img: req.file.originalname,
//           },
//         },
//         { new: true }
//       );
//       const params = {
//         BucketName,
//         Key: `uploads/${req.file.originalname}`,
//         Body: req.file.buffer,
//       };
//       s3.upload(params, (err, data) => {
//         if (err) {
//           return res.status(400).json({ msg: 'upload fail' });
//         }
//       });
//       return res.json(post);
//     }
//     const post = new Post({
//       movieName,
//       summary,
//       img: req.file.originalname,
//       genre: genre.split(','),
//       user: req.userId,
//     });
//     await post.save();
//     const params = {
//       BucketName,
//       Key: `uploads/${req.file.originalname}`,
//       Body: req.file.buffer,
//     };
//     s3.upload(params, (err, data) => {
//       if (err) {
//         return res.status(400).json({ msg: 'upload fail' });
//       }
//       if (data) {
//         console.log('Upload Success', data.Location);
//       }
//     });
//     res.json(post);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ errors: err.message });
//   }
// }
// );

// @route    PUT /post/likes/:id
// @desc     Like a post
// @access   Private
// router.put('/likes/:id', checkAuth, async (req: RequestTypeCustomed, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     //check if the post has already been liked
//     if (post.likes.some((like) => like.user.toString() === req.userId)) {
//       return res.status(400).json({ msg: 'Post already liked' });
//     }
//     post.likes.unshift({ user: req.userId });
//     await post.save();

//     return res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });
// @route    PUT /post/likesBack/:id
// @desc     Undo Liking a post
// @access   Private
// router.put(
//   '/likesBack/:id',
//   checkAuth,
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
// router.put('/unlikes/:id', checkAuth, async (req: RequestTypeCustomed, res) => {
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
//   checkAuth,
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
