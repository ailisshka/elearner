const mongoose = require('mongoose');
const User = require('./User.cjs');

const statsSchema = new mongoose.Schema({
  // Связь с юзером из твоей модели User.cjs
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: { type: String, default: '' },
  streak: { type: Number, default: 0 },
  lastCompletedDate: { type: String, default: "" }, // Формат "2026-04-01"
  completedLessons: { type: [Number], default: [] }, // Массив ID пройденных уроков
  history: [{
    lessonId: Number,
    score: Number,
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Stats', statsSchema);