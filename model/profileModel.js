const mongoose = require('mongooose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  job: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  favContent: {
    type: [String],
    required: true,
  },
  intContent: {
    type: [String],
  },
  types: {
    type: [String],
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
