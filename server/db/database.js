import mysql from 'mysql2';
import { config } from '../../config.js';

const pool = mysql.createPool({
  host: config.mySQL.host,
  user: config.mySQL.user,
  database: config.mySQL.database,
  password: config.mySQL.password,
});

export const db = pool.promise();
