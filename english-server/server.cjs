const express = require('express');
const statsRouter = require('./routes/Stats.cjs');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const User = require('./models/User.cjs');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/stats', statsRouter);

async function createTransporter() {
  if (process.env.MAIL_HOST && process.env.MAIL_USER && process.env.MAIL_PASS) {
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 587,
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
  }

  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
}

async function sendVerificationCode(email, code) {
  const transporter = await createTransporter();
  const mailOptions = {
    from: process.env.MAIL_FROM || process.env.MAIL_USER || 'no-reply@example.com',
    to: email,
    subject: 'Код подтверждения регистрации',
    text: `Ваш код подтверждения: ${code}`,
    html: `<p>Ваш код подтверждения: <strong>${code}</strong></p>`
  };

  const info = await transporter.sendMail(mailOptions);
  const previewUrl = nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(info) : null;
  return { info, previewUrl };
}

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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Этот email уже используется" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(String(password), salt);

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationExpires = new Date(Date.now() + 15 * 60 * 1000);

    const newUser = new User({ 
      username: name, 
      email: email, 
      password: hashedPassword,
      isVerified: false,
      verificationCode,
      verificationExpires,
      streak: 0,
      lessonsCompleted: 0,
      favorites: []
    });

    await newUser.save();
    const mailResult = await sendVerificationCode(email, verificationCode);

    console.log(`👤 Новый пользователь: ${email}`);
    if (mailResult.previewUrl) {
      console.log('🧪 Email preview:', mailResult.previewUrl);
    }

    res.status(201).json({ 
      verificationPending: true,
      email,
      message: "Код подтверждения отправлен на почту",
      debugCode: process.env.MAIL_HOST ? null : verificationCode,
      previewUrl: mailResult.previewUrl
    });

  } catch (error) {
    console.log("❌ Ошибка регистрации:", error.message);
    res.status(500).json({ error: "Ошибка сервера при регистрации" });
  }
});

app.post('/api/verify-email', async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ error: 'Требуется email и код подтверждения' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Пользователь не найден' });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: 'Email уже подтверждён' });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ error: 'Неверный код подтверждения' });
    }

    if (!user.verificationExpires || new Date() > user.verificationExpires) {
      return res.status(400).json({ error: 'Код подтверждения истёк' });
    }

    user.isVerified = true;
    user.verificationCode = '';
    user.verificationExpires = null;
    await user.save();

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
    console.log('❌ Ошибка подтверждения:', error.message);
    res.status(500).json({ error: 'Ошибка сервера при подтверждении почты' });
  }
});

app.post('/api/resend-code', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Требуется email' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Пользователь не найден' });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: 'Email уже подтверждён' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    user.verificationExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const mailResult = await sendVerificationCode(email, verificationCode);
    if (mailResult.previewUrl) {
      console.log('🧪 Email preview:', mailResult.previewUrl);
    }

    res.json({ message: 'Код отправлен повторно', debugCode: process.env.MAIL_HOST ? null : verificationCode, previewUrl: mailResult.previewUrl });
  } catch (error) {
    console.log('❌ Ошибка отправки кода:', error.message);
    res.status(500).json({ error: 'Ошибка сервера при отправке кода' });
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

    if (!user.isVerified) {
      return res.status(403).json({ error: "Email не подтверждён. Проверьте почту." });
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