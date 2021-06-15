import { config } from '../../config.js';
import { createJWTToken, createUser } from '../data/userDataLogic.js';
import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const userExisted = await User.findOne({ email });
  if (userExisted) {
    return res.status(400).json({ errors: 'User already exists' });
  }
  const salt = config.bcrypt.salt;
  console.log(salt);
  console.log(typeof salt);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userId = createUser({
    name,
    email,
    hashedPassword,
    myBag: [],
    likes: [],
  });

  const token = await createJWTToken(userId);
  res.status(201).json({ token });
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ errors: 'Invalid user or password' });
  }
  const passwordIsMatched = await bcrypt.compare(password, user.password);
  if (!passwordIsMatched) {
    return res.statis(401).json({ errors: 'Invalid user or password' });
  }

  const token = await createJWTToken(user.id);
  res.status(200).json({ token });
}

export async function getMe(req, res) {
  const user = await User.findById(req.userId).select('-password');
  if (!user) {
    return res.status(404).json({ errors: 'User not found' });
  }
  res.status(200).json(user);
}
