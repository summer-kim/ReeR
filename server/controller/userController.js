import { config } from '../../config.js';
import * as userData from '../data/userDataLogic.js';
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

  const userId = userData.createUser({
    name,
    email,
    hashedPassword,
    myBag: [],
    likes: [],
  });

  const token = await userData.createJWTToken(userId);
  res.status(201).json({ token });
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const user = await userData.findByEmail(email);
  if (!user) {
    return res.status(401).json({ msg: 'Invalid user or password' });
  }
  const passwordIsMatched = await bcrypt.compare(password, user.password);
  if (!passwordIsMatched) {
    return res.statis(401).json({ msg: 'Invalid user or password' });
  }

  const token = await createJWTToken(user.id);
  res.status(200).json({ token });
}

export async function getMe(req, res) {
  const user = await userData.findById(req.userId);
  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }
  res.status(200).json(user);
}

export async function addToMyBag(req, res) {
  const user = await userData.findById(req.userId).select('-password');
  if (userData.alreadyAdded(user.myBag, req.params.postid)) {
    return res.status(404).json({ msg: 'Already add this content' });
  }
  const myBag = await userData.addToData(user, req.params.postid);
  res.status(201).json(myBag);
}

export async function removeFromMyBag(req, res) {
  const user = await User.findById(req.userId).select('-password');

  if (!userData.alreadyAdded(user.myBag, req.params.postid)) {
    return res.status(404).json({ msg: "this content hasn't been added" });
  }
  const myBag = await userData.removeData(user, req.params.postid);
  res.status(204).json(myBag);
}

export async function likePost(req, res) {
  const user = await User.findById(req.userId).select('-password');

  if (userData.alreadyAdded(user.likes, req.params.postid)) {
    return res.status(404).json({ msg: 'Already add this content' });
  }
  user.likes.unshift(req.params.postid);
  await user.save();
  res.status(201).json(user.likes);
}

export async function likePostUndo(req, res) {
  const user = await User.findById(req.userId).select('-password');

  if (!userData.alreadyAdded(user.likes, req.params.postid)) {
    return res.status(404).json({ msg: 'this content never been added' });
  }
  user.likes.splice(user.likes.indexOf(req.params.postid), 1);
  await user.save();
  res.status(204).json(user.likes);
}
