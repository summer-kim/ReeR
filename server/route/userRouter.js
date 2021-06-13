import express from 'express';
import expressValidator from 'express-validator';
import jwt from 'jsonwebtoken';
import { config } from '../../config.js';
import bcrypt from 'bcryptjs';
import User from '../model/userModel.js';
import checkObjectId from '../middleware/checkObjectId.js';
import auth from '../middleware/auth.js';

const { check, validationResult } = expressValidator;
const router = express.Router();

// POST '/user/register'
// register
// Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide valid Email').isEmail(),
    check('password', 'Password has to be at least 6 letters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
        myBag: [],
        likes: [],
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.jwt.secret,
        { expiresIn: '5days' },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

export default router;
