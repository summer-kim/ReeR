import { Sequelize } from 'sequelize';
import { config } from '../../config';

const { host, port, username, database, password } = config.SQL;
export const sequelize = new Sequelize(database, username, password, {
  host,
  port: Number(port),
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
