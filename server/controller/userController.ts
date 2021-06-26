import { Request, Response } from 'express';
import { config } from '../../config';
import * as userData from '../data/userDataLogic';
import bcrypt from 'bcrypt';
import { RequestTypeCustomed } from '../types/requestType';
import * as errMsg from '../types/errorMessage';

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  const userExisted = await userData.findByEmail(email);
  if (userExisted) {
    return res.status(409).json(errMsg.USER_EXISTED);
  }
  const hashedPassword = await bcrypt.hash(password, config.bcrypt.salt);
  const userEmail = (await userData.createUser({
    ...req.body,
    password: hashedPassword,
    mybag: [],
    likes: [],
  })) as string;
  const token = await userData.createJWTToken(userEmail);
  res.status(201).json({ token });
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await userData.findByEmail(email);
  if (!user) {
    return res.status(401).json(errMsg.INVALID_INPUT);
  }
  const passwordIsMatched = await bcrypt.compare(password, user.password);
  if (!passwordIsMatched) {
    return res.status(401).json(errMsg.INVALID_INPUT);
  }
  const token = await userData.createJWTToken(user.email);
  res.status(200).json({ token });
}

export async function getMe(req: RequestTypeCustomed, res: Response) {
  const user = await userData.findById(req.userId!);
  if (!user) {
    return res.status(401).json(errMsg.NOT_FOUND('User'));
  }
  res.status(200).json(user);
}

export async function addToMyBag(req: RequestTypeCustomed, res: Response) {
  const postId = Number(req.params.postid);
  const user = await userData.findById(req.userId!);
  if (!user) {
    return res.status(401).json(errMsg.NOT_FOUND('User'));
  }
  const existed = userData.alreadyAdded(user.mybag, postId);
  if (existed) {
    return res.status(401).json(errMsg.ALREADY_ADDED('Post'));
  }
  await userData.updateUserArray(req.userId!, postId, 'mybag', 'append');
  await user.reload();
  res.status(201).json(user.mybag);
}

export async function removeFromMyBag(req: RequestTypeCustomed, res: Response) {
  const postId = Number(req.params.postid);
  const user = await userData.findById(req.userId!);
  if (!user) {
    return res.status(401).json(errMsg.NOT_FOUND('User'));
  }
  const existed = userData.alreadyAdded(user.mybag, postId);
  if (!existed) {
    return res.status(401).json(errMsg.NEVER_BEEN_ADDED('Post'));
  }
  await userData.updateUserArray(req.userId!, postId, 'mybag', 'remove');
  await user.reload();
  res.status(201).json(user.mybag);
}

export async function likePost(req: RequestTypeCustomed, res: Response) {
  const postId = Number(req.params.postid);
  console.log(postId);
  const user = await userData.findById(req.userId!);
  console.log(1, user);
  if (!user) {
    return res.status(401).json(errMsg.NOT_FOUND('User'));
  }
  const existed = userData.alreadyAdded(user.likes, postId);
  console.log(2, existed);
  if (existed) {
    return res.status(401).json(errMsg.ALREADY_ADDED('Post'));
  }
  await userData.updateUserArray(req.userId!, postId, 'likes', 'append');
  console.log(3, 's');

  await user.reload();
  res.status(201).json(user.likes);
}

export async function likePostUndo(req: RequestTypeCustomed, res: Response) {
  const postId = Number(req.params.postid);
  const user = await userData.findById(req.userId!);
  if (!user) {
    return res.status(401).json(errMsg.NOT_FOUND('User'));
  }
  const existed = userData.alreadyAdded(user.likes, postId);
  if (!existed) {
    return res.status(401).json(errMsg.NEVER_BEEN_ADDED('Post'));
  }
  await userData.updateUserArray(req.userId!, postId, 'likes', 'remove');
  await user.reload();
  res.status(201).json(user.likes);
}
