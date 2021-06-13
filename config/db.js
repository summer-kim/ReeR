import mongoose from 'mongoose';
import config from 'config';

const dbURL = config.get('mongoDBUrl');
const connectDB = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;
