import { RequestTypeCustomed } from '../types/requestType';
import { Response } from 'express';
import * as postData from '../data/postDataLogic';

export async function createPost(req: RequestTypeCustomed, res: Response) {
  const post = await postData.createPostData({
    ...req.body,
    userId: req.userId!,
  });
  res.status(201).json(post);
}

export async function updatePost(req: RequestTypeCustomed, res: Response) {
  const id = Number(req.params.id);
  const userId = req.userId;
  const [num] = await postData.updatePostData({ ...req.body, id, userId });
  if (num === 0) {
    return res.sendStatus(403);
  }
  const post = await postData.getPostById(id);
  res.status(201).json(post);
}

export async function getAllPosts(req: RequestTypeCustomed, res: Response) {
  const posts = await postData.getAll();
  res.status(200).json(posts);
}

export async function getPost(req: RequestTypeCustomed, res: Response) {
  const id = Number(req.params.id);
  const post = await postData.getPostById(id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ msg: 'Post not found' });
  }
}
