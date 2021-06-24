import { OrderItem } from 'sequelize/types';
import Post from '../model/postDB';
import { GenreType, PostType } from '../types/modelType';

interface updatePostType {
  movieName?: string;
  summary?: string;
  genre?: GenreType[];
  likes?: number[];
  unlikes?: number[];
  id: number;
}

const INCLUDE_POST = {
  attributes: ['id', 'genre', 'summary', 'createdAt'],
};
const ORDER_DESC = {
  order: [['createdAt', 'DESC']] as OrderItem[],
};

//Post Data Functions
export async function updatePostData({ id, ...updateInfo }: updatePostType) {
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

export function removeFromArray(array: number[], userId: number): number[] {
  const index = array.indexOf(userId);
  array.splice(index, 1);
  return array;
}
