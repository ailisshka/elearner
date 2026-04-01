const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User.cjs');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ ПОДКЛЮЧЕНО К MONGODB'))
  .catch(err => console.log('❌ ОШИБКА БАЗЫ:', err.message));

// --- 1. РЕГИСТРАЦИЯ ---
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Заполни все поля!" });
    }

    // Проверка, есть ли уже такой пользователь
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Этот email уже используется" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(String(password), salt);

    const newUser = new User({ 
      username: name, 
      email: email, 
      password: hashedPassword,
      streak: 1,
      lessonsCompleted: 0,
      favorites: []
    });

    await newUser.save();
    console.log(`👤 Новый пользователь: ${email}`);
    
    res.status(201).json({ 
      message: "Success", 
      user: { 
        id: newUser._id, 
        name: newUser.username, 
        email: newUser.email, 
        streak: newUser.streak,
        lessonsCompleted: newUser.lessonsCompleted,
        favorites: newUser.favorites
      } 
    });

  } catch (error) {
    console.log("❌ Ошибка регистрации:", error.message);
    res.status(500).json({ error: "Ошибка сервера при регистрации" });
  }
});

// --- 2. ВХОД ---
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Неверный пароль" });
    }

    console.log(`🔑 Вход выполнен: ${email}`);
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
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера при входе" });
  }
});

// --- 3. ТАБЛИЦА ЛИДЕРОВ ---
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ streak: -1, lessonsCompleted: -1 }).limit(10);
    const formattedUsers = users.map(u => ({
      id: u._id,
      name: u.username,
      streak: u.streak || 0,
      lessonsCompleted: u.lessonsCompleted || 0,
      favoritesCount: (u.favorites || []).length
    }));
    res.json(formattedUsers);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении списка лидеров" });
  }
});

// --- 4. ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ ---
app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

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
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при загрузке профиля' });
  }
});

const updateProgressHandler = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "Пользователь не найден" });

    user.streak += 1;
    user.lessonsCompleted += 1;
    await user.save();

    res.json({ success: true, user: {
      id: user._id,
      name: user.username,
      email: user.email,
      streak: user.streak,
      lessonsCompleted: user.lessonsCompleted,
      favorites: user.favorites || []
    }});
  } catch (error) {
    res.status(500).json({ error: "Не удалось сохранить прогресс" });
  }
};

app.post('/api/update-progress', updateProgressHandler);
app.post('/api/user/complete-lesson', updateProgressHandler);

app.post('/api/user/favorite', async (req, res) => {
  try {
    const { userId, wordId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    const id = Number(wordId);
    const favorites = user.favorites || [];
    if (favorites.includes(id)) {
      user.favorites = favorites.filter(item => item !== id);
    } else {
      user.favorites = [...favorites, id];
    }

    await user.save();

    res.json({ success: true, favorites: user.favorites, favoritesCount: user.favorites.length });
  } catch (error) {
    res.status(500).json({ error: 'Не удалось обновить избранное' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер летит на: http://127.0.0.1:${PORT}`);
});