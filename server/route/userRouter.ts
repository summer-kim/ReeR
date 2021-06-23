import express from 'express';
import checkAuth from '../middleware/auth';
import * as validate from '../middleware/validation';
import * as authController from '../controller/userController';

const router = express.Router();

router.post('/register', validate.validateSignup, authController.signUp);

router.post('/login', validate.validateSignIn, authController.signIn);

router.get('/me', checkAuth, authController.getMe);

router.put('/mybag/:postid', checkAuth, authController.addToMyBag);

router.put('/mybagUndo/:postid', checkAuth, authController.removeFromMyBag);

router.put('/likes/:postid', checkAuth, authController.likePost);

router.put('/likesUndo/:postid', checkAuth, authController.likePostUndo);

export default router;
