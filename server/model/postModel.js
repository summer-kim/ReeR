import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  movieName: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  genre: {
    type: [String],
    required: true,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  unlikes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  rating: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
  tags: [
    {
      tagName: {
        type: String,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
        },
      ],
      unlikes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model('Post', PostSchema);
