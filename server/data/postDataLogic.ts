import { OrderItem } from 'sequelize/types';
import Post from '../model/postDB';
import { GenreType, PostType } from '../types/modelType';

interface updatePostType {
  movieName?: string;
  summary?: string;
  genre?: GenreType[];
  id: number;
  userId: number;
}

const INCLUDE_POST = {
  attributes: ['id', 'genre', 'summary', 'createdAt'],
};
const ORDER_DESC = {
  order: [['createdAt', 'DESC']] as OrderItem[],
};

//Post Data Functions
export async function updatePostData({
  id,
  userId,
  ...updateInfo
}: updatePostType) {
  const keys = Object.keys(updateInfo) as (keyof PostType)[];
  return Post.update(updateInfo, {
    where: { id },
    fields: keys,
    returning: true,
  });
}

export async function createPostData(postInfo: PostType) {
  return Post.create(postInfo);
}

export async function getAll() {
  return Post.findAll(ORDER_DESC);
}

export async function getPostById(id: number) {
  return Post.findByPk(id);
}
