import dotenv from 'dotenv';
dotenv.config();

export function getConfig(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`value of ${key} has not defined`);
  }
  return value;
}

export const config = {
  mongoDB: {
    url: getConfig('MONGO_URL'),
  },
  jwt: {
    secret: getConfig('JWT_SECRET'),
  },
  bcrypt: {
    salt: getConfig('BCRYPT_SALT'),
  },
  AWSS3: {
    id: getConfig('AWS_ID'),
    secret: getConfig('AWS_SECRET'),
    bucketName: getConfig('AWS_BUCKET_NAME'),
  },
  mySQL: {
    host: getConfig('MYSQL_HOST'),
    user: getConfig('MYSQL_USER'),
    database: getConfig('MYSQL_DB'),
    password: getConfig('MYSQL_PASSWORD'),
  },
};
