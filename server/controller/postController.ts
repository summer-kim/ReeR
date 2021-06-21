import { RequestTypeCustomed } from '../types/requestType';
import { Response } from 'express';
import {
  updatePostData,
  createPostData,
  getAll,
  getPostById,
} from '../data/postDataLogic';

//@todo divide function into 2
export async function createPost(req: RequestTypeCustomed, res: Response) {
  if (req.body.id) {
    const post = await updatePostData(req.body);
    return res.json(post);
  }
  const post = await createPostData({ ...req.body, userId: req.userId! });
  res.status(201).json(post);
}

export async function getAllPosts(req: RequestTypeCustomed, res: Response) {
  const posts = await getAll();
  res.status(200).json(posts);
}

export async function getPost(req: RequestTypeCustomed, res: Response) {
  const id = Number(req.params.id);
  const post = await getPostById(id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ msg: 'Post not found' });
  }
}
