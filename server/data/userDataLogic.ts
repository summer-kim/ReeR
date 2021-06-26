import User from '../model/userDB';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { UserType } from '../types/modelType';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../db/database';

export async function createUser(userInfo: UserType) {
  return User.create(userInfo).then((data) => {
    return data.email;
  });
}

export async function createJWTToken(email: string) {
  return jwt.sign({ email }, config.jwt.secret, { expiresIn: '5days' });
}

export async function findByEmail(email: string) {
  return User.findOne({ where: { email } });
}

export async function findById(userId: number) {
  return User.findByPk(userId);
}

export function alreadyAdded(array: number[], id: number) {
  return array.some((element) => element === id);
}

export async function updateUserArray(
  userId: number,
  postId: number,
  column: string,
  update: string
) {
  return sequelize.query(
    `
  UPDATE users
  SET ${column} = array_${update}(${column}, ${postId})
  WHERE id = ${userId}
  `,
    { type: QueryTypes.UPDATE }
  );
}
