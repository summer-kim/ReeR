import { RequestTypeCustomed } from '../types/requestType';
import { Response } from 'express';
import * as postData from '../data/postDataLogic';
import { s3, BucketName } from '../db/s3storage';
import { alreadyAdded } from '../data/userDataLogic';

const POST_NOT_FOUND = { msg: 'Post not found' };
const ALREADY_ADDED = { msg: 'Post has been already added' };
const NEVER_BEEN_ADDED = { msg: "Post hasn't been added yet" };

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
  const params = {
    Bucket: BucketName,
    Key: `uploads/${req.file?.originalname}`,
    Body: req.file?.buffer,
  };
  s3.upload(params, async (err: any, data: any) => {
    if (err) {
      console.log(err);
      return res.status(404).json({ msg: 'upload fail' });
    }
    if (data) {
      console.log('Upload Success', data.Location);
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
  const [num, data] = await postData.updatePostData({
    ...req.body,
    id,
  });
  res.status(201).json(data[0]);
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
//update post with img
// if (postid) {
//   const old_post = await Post.findById(postid);
//   if (old_post.img) {
//     //Delete image of old post
//     const oldparams = {
//       BucketName,
//       Key: `uploads/${old_post.img}`,
//     };

//     s3.deleteObject(oldparams, (error, data) => {
//       if (error) {
//         return res.status(400).json({ msg: 'delete img fail' });
//       }
//     });
//   }
//   const post = await Post.findOneAndUpdate(
//     { id: postid },
//     {
//       $set: {
//         movieName,
//         summary,
//         genre: genre.split(','),
//         img: req.file.originalname,
//       },
//     },
//     { new: true }
//   );
//   const params = {
//     BucketName,
//     Key: `uploads/${req.file.originalname}`,
//     Body: req.file.buffer,
//   };
//   s3.upload(params, (err, data) => {
//     if (err) {
//       return res.status(400).json({ msg: 'upload fail' });
//     }
//   });
//   return res.json(post);
// }
