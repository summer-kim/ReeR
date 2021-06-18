import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import { config } from '../../config.ts';

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
  return array.some((element) => element.toString() === id);
}

export async function addToData(user, object, id) {
  user[object].unshift(id);
  await user.save();
  return user[object];
}

export async function removeData(user, object, id) {
  const idx = user[object].indexOf(id);
  user[object].splice(idx, 1);
  await user.save();
  return user[object];
}
