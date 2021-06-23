import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/database';
import { PostType, PostCreationAttributes } from '../types/modelType';
import User from './userDB';

interface PostInstance
  extends Model<PostType, PostCreationAttributes>,
    PostType {}

const Post = sequelize.define<PostInstance>(
  'post',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    likes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    unlikes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
  },
  { timestamps: true }
);
Post.belongsTo(User);

export default Post;
