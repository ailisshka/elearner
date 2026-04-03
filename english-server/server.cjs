const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User.cjs');
const statsRouter = require('./routes/Stats.cjs');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/stats', statsRouter);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB подключена'))
  .catch((err) => console.error('❌ MongoDB ошибка:', err.message));

// РЕГИСТРАЦИЯ (без подтверждения email)
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: 'Заполни все поля!' });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: 'Этот email уже используется' });

    const hashed = await bcrypt.hash(String(password), 10);

    const user = await User.create({
      username: name,
      email,
      password: hashed,
      isVerified: true,
      streak: 0,
      lessonsCompleted: 0,
      favorites: [],
    });

    console.log('👤 Новый пользователь:', email);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        streak: user.streak,
        lessonsCompleted: user.lessonsCompleted,
        favorites: user.favorites,
      },
    });
  } catch (err) {
    console.error('❌ Регистрация:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ВХОД
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Введи email и пароль' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: 'Пользователь не найден' });

    const ok = await bcrypt.compare(String(password), user.password);
    if (!ok)
      return res.status(400).json({ error: 'Неверный пароль' });

    console.log('🔑 Вход:', email);

    res.json({
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        streak: user.streak || 0,
        lessonsCompleted: user.lessonsCompleted || 0,
        favorites: user.favorites || [],
      },
    });
  } catch (err) {
    console.error('❌ Вход:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ЛИДЕРБОРД
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find()
      .sort({ streak: -1, lessonsCompleted: -1 })
      .limit(10);

    res.json(
      users.map((u) => ({
        id: u._id,
        name: u.username,
        streak: u.streak || 0,
        lessonsCompleted: u.lessonsCompleted || 0,
        favoritesCount: (u.favorites || []).length,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ПРОФИЛЬ
app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Не найден' });

    res.json({
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        streak: user.streak || 0,
        lessonsCompleted: user.lessonsCompleted || 0,
        favorites: user.favorites || [],
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ПРОГРЕСС / ЗАВЕРШЕНИЕ УРОКА
const lessonHandler = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'Нужен userId' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Не найден' });

    user.streak += 1;
    user.lessonsCompleted += 1;
    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        streak: user.streak,
        lessonsCompleted: user.lessonsCompleted,
        favorites: user.favorites || [],
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

app.post('/api/update-progress', lessonHandler);
app.post('/api/user/complete-lesson', lessonHandler);

// ИЗБРАННОЕ
app.post('/api/user/favorite', async (req, res) => {
  try {
    const { userId, wordId } = req.body;
    if (!userId || wordId === undefined)
      return res.status(400).json({ error: 'Нужен userId и wordId' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Не найден' });

    const id = Number(wordId);
    const favs = user.favorites || [];
    user.favorites = favs.includes(id)
      ? favs.filter((f) => f !== id)
      : [...favs, id];

    await user.save();

    res.json({
      success: true,
      favorites: user.favorites,
      favoritesCount: user.favorites.length,
    });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: `Маршрут ${req.method} ${req.path} не найден` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Сервер: http://127.0.0.1:${PORT}`));
