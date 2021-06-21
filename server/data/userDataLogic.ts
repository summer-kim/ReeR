import User from '../model/userMySQL';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { createUserType } from '../types/variableType';

export async function createUser(userInfo: createUserType) {
  return User.create(userInfo).then((data) => {
    console.log('data', data);
    return data.id;
  });
}

export async function createJWTToken(userId: number) {
  return jwt.sign({ userId }, config.jwt.secret, { expiresIn: '5days' });
}

export async function findByEmail(email: string) {
  return User.findOne({ where: { email } }).then((data) => {
    console.log('data', data);
    return data;
  });
}

export async function findById(userId: number) {
  return User.findByPk(userId);
}

export function alreadyAdded(array: number[], id: string) {
  const idNumber = Number(id);
  return array.some((element) => element === idNumber);
}

export async function addToData(user: any, key: string, id: number) {
  user[key].unshift(id);
  await user.save();
  return user[key];
}

export async function removeData(user: any, key: string, id: number) {
  const idx = user[key].indexOf(id);
  user[key].splice(idx, 1);
  await user.save();
  return user[key];
}
