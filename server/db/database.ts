import { Sequelize } from 'sequelize';
import { config } from '../../config';

const { host, username, database, password } = config.SQL;
export const sequelize = new Sequelize({
  database,
  username,
  password,
  host,
  dialect: 'postgres',
  logging: false,
});
