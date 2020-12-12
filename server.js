const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();

// Init Middleware
app.use(express.json());

app.use('/auth', require('./route/authRouter'));
app.use('/user', require('./route/userRouter'));
app.use('/profile', require('./route/profileRouter'));
app.use('/post', require('./route/postRouter'));

app.listen(PORT, () => {
  console.log(`Server starts on ${PORT}`);
});
