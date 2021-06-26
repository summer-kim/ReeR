import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/database';
import { TagType, TagCreationAttributes } from '../types/modelType';
import Post from './postDB';

export interface TagInstance
  extends Model<TagType, TagCreationAttributes>,
    TagType {}

const Tag = sequelize.define<TagInstance>(
  'tag',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    likes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    unlikes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default Tag;
