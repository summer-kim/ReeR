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