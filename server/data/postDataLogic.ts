import { OrderItem } from 'sequelize/types';
import Post from '../model/postMySQL';
import { GenreType, PostType } from '../types/modelType';

interface updatePostType {
  movieName?: string;
  summary?: string;
  genre?: GenreType[];
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
  return Post.update(updateInfo, { where: { id }, fields: keys });
}

export async function createPostData(postInfo: PostType) {
  return Post.create(postInfo);
}

//@todo - blueBird?
export async function getAll() {
  return Post.findAll({ ...INCLUDE_POST, ...ORDER_DESC });
}

export async function getPostById(id: number) {
  return Post.findByPk(id);
}
