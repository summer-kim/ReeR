import express from 'express';
import connectDB from './config/db.js';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

connectDB();
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

import authRouter from './server/route/authRouter.js';
import userRouter from './server/route/userRouter.js';
import tagRouter from './server/route/tagRouter.js';
import postRouter from './server/route/postRouter.js';

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/post', tagRouter);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('./client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server starts on ${PORT}`);
});
