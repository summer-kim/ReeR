import { validationResult, check } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ msg: errors.array()[0].msg });
};

const validateCredential = [
  check('email', 'Please provide valid Email').isEmail(),
  check('password', 'Password has to be at least 6 letters').isLength({
    min: 6,
  }),
];

export const validateSignup = [
  ...validateCredential,
  check('name', 'Name is required').not().isEmpty(),
  validate,
];

export const validateSignIn = [...validateCredential, validate];

export const validateCreatePost = [
  check('movieName', 'please fill out the movie title').not().isEmpty(),
  check('summary', 'please fill out the summary').not().isEmpty(),
  check('genre', 'please fill out genre of the movie').not().isEmpty(),
  validate,
];
