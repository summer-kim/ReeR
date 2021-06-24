import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config';
import { Response, NextFunction } from 'express';
import { RequestTypeCustomed } from '../types/requestType';
import { findByEmail } from '../data/userDataLogic';
const jwtSecret = config.jwt.secret;

function isAuth(req: RequestTypeCustomed, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }
  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await findByEmail((decoded as decodedType).email!);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id;
    next();
  });
}

const AUTH_ERROR = { msg: 'Authentication Error' };
interface decodedType extends JwtPayload {
  email?: string;
}
export default isAuth;
