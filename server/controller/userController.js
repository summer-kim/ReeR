import { config } from '../../config.js';
import { createJWTToken, createUser } from '../data/userDataLogic.js';

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const userExisted = await User.findOne({ email });
  if (userExisted) {
    return res.status(400).json({ errors: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, config.bcrypt.salt);
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
