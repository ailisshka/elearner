const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
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

// Nodemailer — один раз при старте
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.error('❌ SMTP ошибка:', err.message);
  } else {
    console.log('✅ SMTP готов:', process.env.MAIL_USER);
  }
});

async function sendCode(email, code) {
  try {
    await transporter.sendMail({
      from: `"Учебное приложение" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Код подтверждения',
      html: `<h2>Ваш код: <b style="color:#7c5fe6">${code}</b></h2><p>Действителен 15 минут.</p>`,
    });
    console.log('📬 Письмо отправлено на', email);
    return true;
  } catch (err) {
    console.error('❌ Письмо не отправлено:', err.message);
    return false;
  }
}

// РЕГИСТРАЦИЯ
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: 'Заполни все поля!' });

    const existing = await User.findOne({ email });
    if (existing && existing.isVerified)
      return res.status(400).json({ error: 'Этот email уже используется' });

    const hashed = await bcrypt.hash(String(password), 10);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    if (existing && !existing.isVerified) {
      existing.username = name;
      existing.password = hashed;
      existing.verificationCode = code;
      existing.verificationExpires = expires;
      await existing.save();
    } else {
      await User.create({
        username: name,
        email,
        password: hashed,
        isVerified: false,
        verificationCode: code,
        verificationExpires: expires,
        streak: 0,
        lessonsCompleted: 0,
        favorites: [],
      });
    }

    const sent = await sendCode(email, code);
    // if (!sent)
    //   return res.status(500).json({ error: 'Не удалось отправить письмо. Попробуй позже.' });

    res.status(201).json({ verificationPending: true, email, message: 'Код отправлен на почту' });
  } catch (err) {
    console.error('❌ Регистрация:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ПОДТВЕРЖДЕНИЕ EMAIL
app.post('/api/verify-email', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code)
      return res.status(400).json({ error: 'Нужен email и код' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Пользователь не найден' });
    if (user.isVerified) return res.status(400).json({ error: 'Email уже подтверждён' });
    if (user.verificationCode !== code) return res.status(400).json({ error: 'Неверный код' });
    if (new Date() > user.verificationExpires) return res.status(400).json({ error: 'Код истёк. Запросите новый.' });

    user.isVerified = true;
    user.verificationCode = '';
    user.verificationExpires = null;
    await user.save();

    console.log('✅ Подтверждён:', email);
    res.json({ user: { id: user._id, name: user.username, email: user.email, streak: user.streak || 0, lessonsCompleted: user.lessonsCompleted || 0, favorites: user.favorites || [] } });
  } catch (err) {
    console.error('❌ Подтверждение:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ПОВТОРНАЯ ОТПРАВКА КОДА
app.post('/api/resend-code', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Нужен email' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Пользователь не найден' });
    if (user.isVerified) return res.status(400).json({ error: 'Email уже подтверждён' });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = code;
    user.verificationExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const sent = await sendCode(email, code);
    if (!sent) return res.status(500).json({ error: 'Не удалось отправить письмо' });

    res.json({ message: 'Код отправлен повторно' });
  } catch (err) {
    console.error('❌ Повтор кода:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ВХОД
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Введи email и пароль' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Пользователь не найден' });
    if (!user.isVerified) return res.status(403).json({ error: 'Email не подтверждён. Проверь почту.' });

    const ok = await bcrypt.compare(String(password), user.password);
    if (!ok) return res.status(400).json({ error: 'Неверный пароль' });

    console.log('🔑 Вход:', email);
    res.json({ user: { id: user._id, name: user.username, email: user.email, streak: user.streak || 0, lessonsCompleted: user.lessonsCompleted || 0, favorites: user.favorites || [] } });
  } catch (err) {
    console.error('❌ Вход:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ЛИДЕРБОРД
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({ isVerified: true }).sort({ streak: -1, lessonsCompleted: -1 }).limit(10);
    res.json(users.map(u => ({ id: u._id, name: u.username, streak: u.streak || 0, lessonsCompleted: u.lessonsCompleted || 0, favoritesCount: (u.favorites || []).length })));
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ПРОФИЛЬ
app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Не найден' });
    res.json({ user: { id: user._id, name: user.username, email: user.email, streak: user.streak || 0, lessonsCompleted: user.lessonsCompleted || 0, favorites: user.favorites || [] } });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ПРОГРЕСС
const lessonHandler = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'Нужен userId' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Не найден' });

    user.streak += 1;
    user.lessonsCompleted += 1;
    await user.save();

    res.json({ success: true, user: { id: user._id, name: user.username, email: user.email, streak: user.streak, lessonsCompleted: user.lessonsCompleted, favorites: user.favorites || [] } });
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
    if (!userId || wordId === undefined) return res.status(400).json({ error: 'Нужен userId и wordId' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Не найден' });

    const id = Number(wordId);
    const favs = user.favorites || [];
    user.favorites = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
    await user.save();

    res.json({ success: true, favorites: user.favorites, favoritesCount: user.favorites.length });
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
