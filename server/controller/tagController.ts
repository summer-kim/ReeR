import { RequestTypeCustomed } from '../types/requestType';
import { Response } from 'express';
import * as tagData from '../data/tagDataLogic';

export async function addTag(req: RequestTypeCustomed, res: Response) {
  const postId = Number(req.params.id);
  const userId = req.userId!;
  const tag = await tagData.createTag({
    ...req.body,
    postId,
    userId,
    likes: [],
    unlikes: [],
  });
  return res.status(201).json(tag);
}
