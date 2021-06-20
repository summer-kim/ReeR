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
  attributes: ['id', 'genre', 'summary', 'createdAt', 'genre'],
};
const ORDER_DESC = {
  order: [['createdAt', 'DESC']] as OrderItem[],
};

//Post Data Functions
export async function updatePostData({
  movieName,
  summary,
  genre,
  id,
}: updatePostType) {
  return Post.findByPk(id, INCLUDE_POST).then((post) => {
    if (post) {
      if (movieName) post.movieName = movieName;
      if (summary) post.summary = summary;
      if (genre) post.genre = genre;
      return post.save();
    }
  });
}

export async function createPostData({
  movieName,
  summary,
  genre,
  userId,
}: PostType) {
  return Post.create({ movieName, summary, genre, userId }).then((post) => {
    console.log(post);
    return post;
  });
}

//@todo - blueBird?
export async function getAll() {
  return Post.findAll({ ...INCLUDE_POST, ...ORDER_DESC });
}

export async function getPostById(id: number) {
  return Post.findOne({
    where: { id },
    ...INCLUDE_POST,
  });
}
