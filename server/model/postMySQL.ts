import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/database.js';
import { PostType } from '../types/modelType';

interface PostInstance extends Model<PostType>, PostType {}

const Post = sequelize.define<PostInstance>(
  'post',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    movieName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING, //array
      allowNull: false,
    },
    likes: {
      type: DataTypes.STRING, //array
      allowNull: true,
    },
    unlikes: {
      type: DataTypes.STRING, //array
      allowNull: true,
    },
  },
  { timestamps: true }
);

export default Post;
