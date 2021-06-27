import express from 'express';
import isAuth from '../middleware/auth';
import * as postContr from '../controller/postController';
import { validatePost } from '../middleware/validation';
import { uploadImg } from '../db/s3storage';

const router = express.Router();

router.post('/create', isAuth, validatePost, postContr.createPost);

router.post(
  '/createImg',
  isAuth,
  uploadImg,
  validatePost,
  postContr.createPostImg
);

router.put('/update/:id', isAuth, postContr.updatePost);

router.put('/updateImg/:id', isAuth, uploadImg, postContr.updatePostImg);

router.get('/', postContr.getAllPosts);

router.get('/:id', isAuth, postContr.getPost);

router.delete('/:id', isAuth, postContr.deletePost);

router.put('/likes/:id', isAuth, postContr.likePost);

router.put('/likesBack/:id', isAuth, postContr.likePostUndo);

router.put('/unlikes/:id', isAuth, postContr.unlikePost);

router.put('/unlikesBack/:id', isAuth, postContr.unlikePostUndo);

export default router;
