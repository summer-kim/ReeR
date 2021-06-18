import jwt from 'jsonwebtoken';
import { config } from '../../config.ts';

const jwtSecret = config.jwt.secret;

function checkAuth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No Token : authorized denied' });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    console.log('checkAuth', req.userId);
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
}

export default checkAuth;
