import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import { config } from '../../config.js';

export async function createUser(userInfo) {
  const user = new User(userInfo);
  await user.save();
  return user.id;
}

export async function createJWTToken(userId) {
  return jwt.sign({ userId }, config.jwt.secret, { expiresIn: '5days' });
}

export async function findByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

export async function findById(userId) {
  const user = await User.findById(userId).select('-password');
  return user;
}

export function alreadyAdded(array, id) {
  return array.myBag.some((element) => element.toString() === id);
}

export async function addToData(user, id) {
  user.myBag.unshift(id);
  await user.save();
  return user.myBag;
}

export async function removeData(user, id) {
  const idx = user.myBag.indexOf(id);
  user.myBag.splice(idx, 1);
  await user.save();
  return user.myBag;
}
