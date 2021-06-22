import { Request, Response } from 'express';
import { config } from '../../config';
import * as userData from '../data/userDataLogic';
import bcrypt from 'bcrypt';
import { RequestTypeCustomed } from '../types/requestType';

export async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const userExisted = await userData.findByEmail(email);
  if (userExisted) {
    return res.status(400).json({ errors: 'User already exists' });
  }
  console.log(userExisted);
  const hashedPassword = await bcrypt.hash(password, config.bcrypt.salt);
  const userId = (await userData.createUser({
    userName: name,
    email,
    password: hashedPassword,
  })) as number;

  const token = await userData.createJWTToken(userId);
  res.status(201).json({ token });
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await userData.findByEmail(email);
  if (!user) {
    return res.status(401).json({ msg: 'Invalid user or password' });
  }
  const passwordIsMatched = await bcrypt.compare(password, user.password);
  if (!passwordIsMatched) {
    return res.status(401).json({ msg: 'Invalid user or password' });
  }

  const token = await userData.createJWTToken(user.id!);
  res.status(200).json({ token });
}

export async function getMe(req: RequestTypeCustomed, res: Response) {
  const user = await userData.findById(req.userId!);
  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }
  res.status(200).json(user);
}

export async function addToMyBag(req: RequestTypeCustomed, res: Response) {
  const user = await userData.findById(req.userId!);
  const existed =
    user?.myBag && userData.alreadyAdded(user?.myBag, req.params.postid);
  if (existed) {
    return res.status(404).json({ msg: 'Already add this content' });
  }
  const myBag = await userData.addToData(
    user,
    'myBag',
    Number(req.params.postid)
  );
  res.status(201).json(myBag);
}

export async function removeFromMyBag(req: RequestTypeCustomed, res: Response) {
  const user = await userData.findById(req.userId!);
  const notExisted =
    user?.myBag && userData.alreadyAdded(user?.myBag, req.params.postid);
  if (notExisted) {
    return res.status(404).json({ msg: "this content hasn't been added" });
  }
  const myBag = await userData.removeData(
    user,
    'myBag',
    Number(req.params.postid)
  );
  console.log(myBag);
  res.status(201).json(myBag);
}

export async function likePost(req: RequestTypeCustomed, res: Response) {
  const user = await userData.findById(req.userId!);
  const existed =
    user?.likes && userData.alreadyAdded(user?.likes, req.params.postid);
  if (existed) {
    return res.status(404).json({ msg: 'Already add this content' });
  }
  const myLikes = await userData.addToData(
    user,
    'likes',
    Number(req.params.postid)
  );
  res.status(201).json(myLikes);
}

export async function likePostUndo(req: RequestTypeCustomed, res: Response) {
  const user = await userData.findById(req.userId!);
  const notExisted =
    user?.likes && userData.alreadyAdded(user?.likes, req.params.postid);
  if (notExisted) {
    return res.status(404).json({ msg: 'this content never been added' });
  }
  const myLikes = await userData.removeData(
    user,
    'likes',
    Number(req.params.postid)
  );
  res.status(201).json(myLikes);
}
