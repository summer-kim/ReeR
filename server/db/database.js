import mysql from 'mysql2';
import { config } from '../../config.js';

export const db = mysql.createPool({
  host: config.mySQL.host,
  user: config.mySQL.user,
  database: config.mySQL.database,
  password: config.mySQL.password,
});
