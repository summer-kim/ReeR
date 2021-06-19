import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config';
import { Response, NextFunction } from 'express';
import { RequestTypeCustomed } from '../types/requestType';
const jwtSecret = config.jwt.secret;

function checkAuth(
  req: RequestTypeCustomed,
  res: Response,
  next: NextFunction
) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No Token : authorized denied' });
  }
  try {
    const decoded: decodedType | string = jwt.verify(token, jwtSecret);
    req.userId = (decoded as decodedType).userId;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
}

interface decodedType extends JwtPayload {
  userId?: number;
}
export default checkAuth;
