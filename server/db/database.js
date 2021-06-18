import SQ from 'sequelize';
import { config } from '../../config.ts';

const { host, username, database, password } = config.mySQL;
export const sequelize = new SQ.Sequelize({
  database,
  username,
  password,
  host,
  dialect: 'mysql',
  logging: false,
});
