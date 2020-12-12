const mongoose = require('mongooose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  job: {
    type: String,
  },
  sex: {
    type: String,
  },
  favContent: {
    type: [String],
    required: true,
  },
  intContent: {
    //interesting contents
    type: [String],
  },
  types: {
    type: [String],
    required: true,
  },
  frequency: {
    //how often watching movie or series?
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
