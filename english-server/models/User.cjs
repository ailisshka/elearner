const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  streak: { type: Number, default: 0 },
  lessonsCompleted: { type: Number, default: 0 },
  favorites: { type: [Number], default: [] }
});

module.exports = mongoose.model('User', userSchema);