const express = require('express');
const router = express.Router();
const Stats = require('../models/Stats.cjs');
const User = require('../models/User.cjs');

router.post('/update', async (req, res) => {
  const { userId, lessonId, score } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const numericLessonId = Number(lessonId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    let userStats = await Stats.findOne({ userId });
    if (!userStats) {
      userStats = new Stats({
        userId,
        email: user.email,
        name: user.username
      });
    } else {
      if (user.email && userStats.email !== user.email) {
        userStats.email = user.email;
      }
      if (user.username && userStats.name !== user.username) {
        userStats.name = user.username;
      }
    }

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (score >= 7 && userStats.lastCompletedDate !== today) {
      if (userStats.lastCompletedDate === yesterdayStr) {
        userStats.streak += 1;
      } else {
        userStats.streak = 1;
      }
      userStats.lastCompletedDate = today;
    }

    if (score >= 7 && !userStats.completedLessons.includes(numericLessonId)) {
      userStats.completedLessons.push(numericLessonId);
    }

    userStats.history.push({ lessonId: numericLessonId, score });

    await userStats.save();

    if (score >= 7) {
      user.streak = userStats.streak;
      user.lessonsCompleted = userStats.completedLessons.length;
      await user.save();
    }

    res.json({
      userId: userStats.userId,
      email: userStats.email,
      name: userStats.name,
      streak: userStats.streak,
      lessonsCompleted: userStats.completedLessons.length,
      completedLessons: userStats.completedLessons,
      lastScore: score,
      lessonId: numericLessonId,
      history: userStats.history
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера при сохранении' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const stats = await Stats.findOne({ userId: req.params.userId });
    if (!stats) {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      return res.json({
        userId: user._id,
        email: user.email,
        name: user.username,
        streak: user.streak || 0,
        lessonsCompleted: user.lessonsCompleted || 0,
        completedLessons: [],
        history: []
      });
    }

    res.json({
      userId: stats.userId,
      email: stats.email,
      name: stats.name,
      streak: stats.streak,
      lessonsCompleted: stats.completedLessons.length,
      completedLessons: stats.completedLessons,
      history: stats.history
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка загрузки данных' });
  }
});

module.exports = router;
