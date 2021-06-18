import mongoose from 'mongoose';
import { config } from '../config.ts';

const mongoDBUrl = config.mongoDB.url;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBUrl, {
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
