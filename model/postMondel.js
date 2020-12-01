const mongoose = require('mongooose');

const PostSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  types: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      movieType: {
        type: [String],
        required: true,
      },
    },
    {
      date: { type: Date, default: Date.now },
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
    {
      date: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', PostSchema);
