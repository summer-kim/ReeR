import { RequestTypeCustomed } from '../types/requestType';
import { Response } from 'express';
import * as tagData from '../data/tagDataLogic';
import { alreadyAdded } from '../data/userDataLogic';
import * as errMsg from '../types/errorMessage';

export async function addTag(req: RequestTypeCustomed, res: Response) {
  const postId = Number(req.params.postid);
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

export async function likeTag(req: RequestTypeCustomed, res: Response) {
  const tagId = Number(req.params.tagid);
  const tag = await tagData.getTagById(tagId);
  if (!tag) {
    return res.status(404).json(errMsg.NOT_FOUND('Tag'));
  }
  const existed = alreadyAdded(tag.likes, req.userId!);
  if (existed) {
    return res.status(404).json(errMsg.ALREADY_ADDED('Tag'));
  }
  await tagData.updateTagArray(req.userId!, tagId, 'likes', 'append');
  await tag.reload();
  return res.json(tag.likes);
}

export async function likeTagUndo(req: RequestTypeCustomed, res: Response) {
  const tagId = Number(req.params.tagid);
  const tag = await tagData.getTagById(tagId);
  if (!tag) {
    return res.status(404).json(errMsg.NOT_FOUND('Tag'));
  }
  const existed = alreadyAdded(tag.likes, req.userId!);
  if (!existed) {
    return res.status(404).json(errMsg.NEVER_BEEN_ADDED('Tag'));
  }
  await tagData.updateTagArray(req.userId!, tagId, 'likes', 'remove');
  await tag.reload();
  return res.json(tag.likes);
}

export async function unlikeTag(req: RequestTypeCustomed, res: Response) {
  const tagId = Number(req.params.tagid);
  const tag = await tagData.getTagById(tagId);
  if (!tag) {
    return res.status(404).json(errMsg.NOT_FOUND('Tag'));
  }
  const existed = alreadyAdded(tag.unlikes, req.userId!);
  if (existed) {
    return res.status(404).json(errMsg.ALREADY_ADDED('Tag'));
  }
  await tagData.updateTagArray(req.userId!, tagId, 'unlikes', 'append');
  await tag.reload();
  return res.json(tag.unlikes);
}

export async function unlikeTagUndo(req: RequestTypeCustomed, res: Response) {
  const tagId = Number(req.params.tagid);
  const tag = await tagData.getTagById(tagId);
  if (!tag) {
    return res.status(404).json(errMsg.NOT_FOUND('Tag'));
  }
  const existed = alreadyAdded(tag.unlikes, req.userId!);
  if (!existed) {
    return res.status(404).json(errMsg.NEVER_BEEN_ADDED('Tag'));
  }
  await tagData.updateTagArray(req.userId!, tagId, 'unlikes', 'remove');
  await tag.reload();
  return res.json(tag.unlikes);
}

// @todo change reducer to delete tag without any josn data
export async function deleteTag(req: RequestTypeCustomed, res: Response) {
  const tagId = Number(req.params.tagid);
  const tag = await tagData.getTagById(tagId);
  if (!tag) {
    return res.status(404).json(errMsg.NOT_FOUND('Tag'));
  }
  if (tag.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await tag.destroy();
  res.sendStatus(204);
}
