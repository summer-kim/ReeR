import { Request } from 'express';
import multer, { Multer } from 'multer';
export interface RequestTypeCustomed extends Request {
  userId?: number;
}
