import express, { Request, Response, NextFunction } from 'express';
import Server from './server';
import * as path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import { sequelize } from './server/db/database';
import { config } from './config';

const server = new Server();
const app = server.getInstance();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import * as userRouter from './server/route/userRouter';
import * as tagRouter from './server/route/tagRouter';
import * as postRouter from './server/route/postRouter';

app.use('/user', userRouter.default);
app.use('/post', postRouter.default);
app.use('/tag', tagRouter.default);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(404);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('./client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

sequelize.sync().then(() => {
  console.log('mySQL DB has successfully connected');
  const server = app.listen(config.host.port);
});
