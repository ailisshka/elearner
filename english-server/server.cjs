const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User.cjs');
const statsRouter = require('./routes/Stats.cjs');

const app = express();

// Настройки
app.use(cors());
app.use(express.json());
app.use('/api/stats', statsRouter);

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB подключена'))
  .catch((err) => console.error('❌ MongoDB ошибка:', err.message));

// --- РЕГИСТРАЦИЯ (БЕЗ КОДА) ---
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Заполни все поля!' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Этот email уже используется' });
    }

    const hashed = await bcrypt.hash(String(password), 10);

    const newUser = await User.create({
      username: name, // Убедись, что в схеме User.cjs это поле называется username
      email,
      password: hashed,
      isVerified: true, // Сразу подтверждаем
      streak: 0,
      lessonsCompleted: 0,
      favorites: []
    });

    console.log('👤 Новый пользователь:', email);

    res.status(201).json({ 
      user: { 
        id: newUser._id, 
        name: newUser.username, 
        email: newUser.email,
        streak: 0,
        lessonsCompleted: 0,
        favorites: []
      } 
    });
  } catch (err) {
    console.error('❌ Ошибка регистрации:', err.message);
    res.status(500).json({ error: 'Ошибка сервера: ' + err.message });
  }
});

// --- ВХОД ---
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: 'Пользователь не найден' });

    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) return res.status(400).json({ error: 'Неверный пароль' });

    console.log('🔑 Вход выполнен:', email);
    res.json({ 
      user: { 
        id: user._id, 
        name: user.username, 
        email: user.email, 
        streak: user.streak || 0, 
        lessonsCompleted: user.lessonsCompleted || 0, 
        favorites: user.favorites || [] 
      } 
    });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка входа' });
  }
});

// --- ЛИДЕРБОРД ---
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ streak: -1 }).limit(10);
    res.json(users.map(u => ({
      id: u._id,
      name: u.username,
      streak: u.streak || 0,
      lessonsCompleted: u.lessonsCompleted || 0
    })));
  } catch (err) {
    res.status(500).json({ error: 'Ошибка загрузки лидерборда' });
  }
});

// --- ОБНОВЛЕНИЕ ПРОГРЕССА ---
app.post('/api/update-progress', async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Юзер не найден' });

    user.streak += 1;
    user.lessonsCompleted += 1;
    await user.save();

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сохранения' });
  }
});

// Запуск
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));