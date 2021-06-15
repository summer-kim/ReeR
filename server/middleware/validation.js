import expressValidator from 'express-validator';
const { validationResult, check } = expressValidator;

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

export const validateSignup = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please provide valid Email').isEmail(),
  check('password', 'Password has to be at least 6 letters').isLength({
    min: 6,
  }),
  validate,
];

export const validateSignIn = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  validate,
];
