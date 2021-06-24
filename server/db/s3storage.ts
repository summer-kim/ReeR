import AWS from 'aws-sdk';
import { config } from '../../config';
import multer from 'multer';

export const s3 = new AWS.S3({
  accessKeyId: config.AWSS3.id,
  secretAccessKey: config.AWSS3.secret,
  region: 'ap-northeast-2',
});

export const BucketName = config.AWSS3.bucketName;

export const uploadImg = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(new Error('JPG, JPEG, PNG file Only'));

    cb(null, true);
  },
}).single('img');
