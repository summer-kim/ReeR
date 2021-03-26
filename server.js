const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');

connectDB();

// Init Middleware
app.use(express.json());

app.use('/auth', require('./server/route/authRouter'));
app.use('/user', require('./server/route/userRouter'));
app.use('/profile', require('./server/route/profileRouter'));
app.use('/post', require('./server/route/postRouter'));
app.use('/post', require('./server/route/tagRouter'));

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
