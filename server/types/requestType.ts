import { Request } from 'express';
export interface RequestTypeCustomed extends Request {
  userId?: number;
}
