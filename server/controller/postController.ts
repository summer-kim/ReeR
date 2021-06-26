import { RequestTypeCustomed } from '../types/requestType';
import { Response } from 'express';
import * as postData from '../data/postDataLogic';
import { s3, BucketName } from '../db/s3storage';
import { alreadyAdded } from '../data/userDataLogic';

const POST_NOT_FOUND = { msg: 'Post not found' };
const ALREADY_ADDED = { msg: 'Post has been already added' };
const NEVER_BEEN_ADDED = { msg: "Post hasn't been added yet" };
const S3_UPLOAD_FAIL = { msg: 'upload fail' };

export async function createPost(req: RequestTypeCustomed, res: Response) {
  const post = await postData.createPostData({
    ...req.body,
    likes: [],
    unlikes: [],
    userId: req.userId!,
  });
  res.status(201).json(post);
}

export async function createPostImg(req: RequestTypeCustomed, res: Response) {
  const key = `uploads/${req.file?.originalname}`;
  const params = createParams(key, req.file?.buffer);
  s3.upload(params, async (err: any, data: any) => {
    if (err) {
      console.log(err);
      return res.status(404).json(S3_UPLOAD_FAIL);
    }
    if (data) {
      const genre = JSON.parse(req.body.genre);
      const post = await postData.createPostData({
        ...req.body,
        genre,
        img: req.file?.originalname,
        userId: req.userId!,
        likes: [],
        unlikes: [],
      });
      return res.status(201).json(post);
    }
  });
}

export async function updatePost(req: RequestTypeCustomed, res: Response) {
  const id = Number(req.params.id);
  const post = await postData.getPostById(id);
  if (!post) {
    return res.status(404).json(POST_NOT_FOUND);
  }
  if (post.userId !== req.userId) {
    return res.sendStatus(403);
  }
  console.log(req.body.genre);
  console.log(typeof req.body.genre);
  const [num, data] = await postData.updatePostData({
    ...req.body,
    id,
  });
  res.status(201).json(data[0]);
}

export async function updatePostImg(req: RequestTypeCustomed, res: Response) {
  const id = Number(req.params.id);
  const post = await postData.getPostById(id);
  if (!post) {
    return res.status(404).json(POST_NOT_FOUND);
  }
  if (post.userId !== req.userId) {
    return res.sendStatus(403);
  }
  if (post.img) {
    //delete previous img
    s3.deleteObject({ Bucket: BucketName, Key: post.img }, (err, data) => {
      if (err) {
        console.log(err);
      }
    });
  }
  const key = `uploads/${req.file?.originalname}`;
  const params = createParams(key, req.file?.buffer);
  console.log(params);
  s3.upload(params, async (err: any, data: any) => {
    if (err) {
      console.log(err);
      return res.status(404).json(S3_UPLOAD_FAIL);
    }
    if (data) {
      const genre = JSON.parse(req.body.genre);
      const [num, data] = await postData.updatePostData({
        ...req.body,
        genre,
        img: req.file?.originalname,
        id,
      });
      res.status(201).json(data[0]);
    }
  });
}

export async function getAllPosts(req: RequestTypeCustomed, res: Response) {
  const posts = await postData.getAll();
  res.status(200).json(posts);
}

export async function getPost(req: RequestTypeCustomed, res: Response) {
  const id = Number(req.params.id);
  const post = await postData.getPostById(id);
  if (post) {
    return res.status(200).json(post);
  } else {
    return res.status(404).json(POST_NOT_FOUND);
  }
}

export async function deletePost(req: RequestTypeCustomed, res: Response) {
  const id = Number(req.params.id);
  const post = await postData.getPostById(id);
  if (!post) {
    return res.status(404).json(POST_NOT_FOUND);
  }
  if (post.userId !== req.userId) {
    return res.sendStatus(403);
  }
  if (post.img) {
    //If there is img to delete
    const oldparams = {
      Bucket: BucketName,
      Key: `uploads/${post.img}`,
    };

    s3.deleteObject(oldparams, (error, data) => {
      if (error) {
        return res.status(404).json({ msg: 'delete img fail' });
      }
    });
  }
  await post.destroy();
  res.sendStatus(204);
}

export async function likePost(req: RequestTypeCustomed, res: Response) {
  const id = Number(req.params.id);
  const post = await postData.getPostById(id);
  if (!post) {
    return res.status(404).json(POST_NOT_FOUND);
  }
  const existed = alreadyAdded(post.likes, req.userId!);
  if (existed) {
    return res.status(400).json(ALREADY_ADDED);
  }
  const [num, postUpdated] = await postData.updatePostData({
    id,
    likes: [req.userId!, ...post.likes],
  });
  return res.json(postUpdated[0].likes);
}

export async function likePostUndo(req: RequestTypeCustomed, res: Response) {
  const id = Number(req.params.id);
  const post = await postData.getPostById(id);
  if (!post) {
    return res.status(404).json(POST_NOT_FOUND);
  }
  const existed = alreadyAdded(post.likes, req.userId!);
  if (!existed) {
    return res.status(400).json(NEVER_BEEN_ADDED);
  }
  const likes = postData.removeFromArray([...post.likes], req.userId!);
  const [num, postUpdated] = await postData.updatePostData({ id, likes });
  return res.json(postUpdated[0].likes);
}

export async function unlikePost(req: RequestTypeCustomed, res: Response) {
  const id = Number(req.params.id);
  const post = await postData.getPostById(id);
  if (!post) {
    return res.status(404).json(POST_NOT_FOUND);
  }
  const existed = alreadyAdded(post.unlikes, req.userId!);
  if (existed) {
    return res.status(400).json(ALREADY_ADDED);
  }
  const [num, postUpdated] = await postData.updatePostData({
    id,
    unlikes: [req.userId!, ...post.unlikes],
  });
  return res.json(postUpdated[0].unlikes);
}

export async function unlikePostUndo(req: RequestTypeCustomed, res: Response) {
  const id = Number(req.params.id);
  const post = await postData.getPostById(id);
  if (!post) {
    return res.status(404).json(POST_NOT_FOUND);
  }
  const existed = alreadyAdded(post.unlikes, req.userId!);
  if (!existed) {
    return res.status(400).json(NEVER_BEEN_ADDED);
  }
  const unlikes = postData.removeFromArray([...post.unlikes], req.userId!);
  const [num, postUpdated] = await postData.updatePostData({ id, unlikes });
  return res.json(postUpdated[0].unlikes);
}

function createParams(Key: string, Body: Buffer | undefined) {
  return {
    Bucket: BucketName,
    Key,
    Body,
  };
}
