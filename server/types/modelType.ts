import { Optional } from 'sequelize';

export interface PostType {
  id: number;
  userId?: UserType['id'];
  movieName: string;
  summary: string;
  img?: string;
  genre: GenreType[];
  likes: UserType['id'][];
  unlikes: UserType['id'][];
}
export interface PostCreationAttributes extends Optional<PostType, 'id'> {}

export interface UserType {
  id: number;
  userName: string;
  password: string;
  email: string;
  mybag: PostType['id'][];
  likes: PostType['id'][];
}
export interface UserCreationAttributes extends Optional<UserType, 'id'> {}

export interface TagType {
  id: number;
  tagName: string;
  likes: UserType['id'][];
  unlikes: UserType['id'][];
  userId: UserType['id'];
  postId: PostType['id'];
}
export interface TagCreationAttributes extends Optional<TagType, 'id'> {}

const GenreObject = {
  SF: 'SF',
  Fantasy: 'Fantasy',
  Drama: 'Drama',
  Comedy: 'Comedy',
  Horror: 'Horror',
  Thriller: 'Thriller',
  Kids: 'Kids',
  Family: 'Family',
  Animation: 'Animation',
  Action: 'Action',
  Crime: 'Crime',
  Romance: 'Romance',
} as const;

export type GenreType = typeof GenreObject[keyof typeof GenreObject];
