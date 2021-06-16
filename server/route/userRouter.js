import express from 'express';
import checkAuth from '../middleware/auth.js';
import * as validate from '../middleware/validation.js';
import * as authController from '../controller/userController.js';

const router = express.Router();

router.post('/register', validate.validateSignup, authController.signUp);

router.post('/login', validate.validateSignIn, authController.signIn);

router.get('/me', checkAuth, authController.getMe);

router.put('/myBag/:postid', checkAuth, authController.addToMyBag);

router.put('/myBagUndo/:postid', checkAuth, authController.removeFromMyBag);

router.put('/likes/:postid', checkAuth, authController.likePost);

router.put('/likesUndo/:postid', checkAuth, authController.likePostUndo);

export default router;
