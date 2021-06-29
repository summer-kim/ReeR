import dotenv from 'dotenv';
dotenv.config();

export function getConfig(key: string, defaultValue = '') {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`value of ${key} has not defined`);
  }
  return value;
}

export const config = {
  host: {
    port: getConfig('PORT', '5000'),
  },
  jwt: {
    secret: getConfig('JWT_SECRET'),
  },
  bcrypt: {
    salt: Number(getConfig('BCRYPT_SALT')),
  },
  AWSS3: {
    id: getConfig('AWS_ID'),
    secret: getConfig('AWS_SECRET'),
    bucketName: getConfig('AWS_BUCKET_NAME'),
  },
  SQL: {
    host: getConfig('SQL_HOST'),
    username: getConfig('SQL_USER'),
    database: getConfig('SQL_DB'),
    password: getConfig('SQL_PASSWORD'),
    port: getConfig('DB_PORT'),
  },
};
