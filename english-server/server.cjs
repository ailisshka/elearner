const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User.cjs');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// подключение к базе
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Подключено к MongoDB'))
  .catch(err => console.log('❌ Ошибка подключения:', err.message));

// 🔹 РЕГИСТРАЦИЯ
app.post('/api/register', async (req, res) => {
  console.log("BODY:", req.body);
  try {
    const { username, email, password } = req.body;

    // проверка на пустые поля
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Заполни все поля' });
    }

    // проверка: есть ли уже такой email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email уже используется' });
    }

    // хеширование пароля
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // создание пользователя
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    console.log('🎉 Пользователь создан');

    res.status(201).json({
      message: 'Регистрация успешна'
    });

  } catch (error) {
    console.log('❌ Ошибка сервера:', error);
    res.status(500).json({
      message: 'Ошибка сервера',
      error: error.message
    });
  }
});

// запуск сервера
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});