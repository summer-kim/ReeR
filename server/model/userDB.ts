import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/database';
import { UserCreationAttributes, UserType } from '../types/modelType';
import Post from './postDB';

interface UserInstance
  extends Model<UserType, UserCreationAttributes>,
    UserType {}

const User = sequelize.define<UserInstance>(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    myBag: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    likes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
  },
  { timestamps: true }
);

export default User;
