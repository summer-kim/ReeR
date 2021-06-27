import express from 'express';
import isAuth from '../middleware/auth';
import * as validate from '../middleware/validation';
import * as authController from '../controller/userController';

const router = express.Router();

router.post('/register', validate.validateSignup, authController.signUp);

router.post('/login', validate.validateSignIn, authController.signIn);

router.get('/me', isAuth, authController.getMe);

router.put('/mybag/:postid', isAuth, authController.addToMyBag);

router.put('/mybagUndo/:postid', isAuth, authController.removeFromMyBag);

router.put('/likes/:postid', isAuth, authController.likePost);

router.put('/likesUndo/:postid', isAuth, authController.likePostUndo);

export default router;
