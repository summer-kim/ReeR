import User from '../model/userMySQL';
import jwt from 'jsonwebtoken';
import { config } from '../../config.ts';

export async function createUser(userInfo) {
  return User.create(userInfo).then((data) => data.dataValues);
}

export async function createJWTToken(userId) {
  return jwt.sign({ userId }, config.jwt.secret, { expiresIn: '5days' });
}

export async function findByEmail(email) {
  return User.findOne({ where: { email } });
}

export async function findById(userId) {
  return User.findByPk(userId);
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
