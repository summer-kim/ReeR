export interface PostType {
  id?: number;
  userId: UserType['id'];
  movieName: string;
  summary: string;
  img?: string;
  genre: GenreType[];
  likes?: UserType['id'][];
  unlikes?: UserType['id'][];
}

export interface UserType {
  id?: number;
  userName: string;
  password: string;
  email: string;
  myBag: PostType['id'][];
  likes: PostType['id'][];
}

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
