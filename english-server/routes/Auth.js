const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User.cjs');

const router = express.Router();

// --- Настройка отправки почты ---
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // добавь в .env
    pass: process.env.EMAIL_PASS  // app password или пароль от SMTP
  }
});

// --- Регистрация пользователя ---
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      username: name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationCode,
      verificationExpires: Date.now() + 10 * 60 * 1000 // 10 минут
    });

    await newUser.save();

    // Отправить письмо
    await transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Подтверждение регистрации',
      text: `Ваш код подтверждения: ${verificationCode}`
    });

    res.json({ verificationPending: true });
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    res.status(500).json({ error: 'Ошибка сервера при регистрации' });
  }
});

// --- Подтверждение email ---
router.post('/verify-email', async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
    if (user.isVerified) return res.json({ user });

    if (user.verificationCode !== code) {
      return res.status(400).json({ error: 'Неверный код' });
    }
    if (user.verificationExpires < Date.now()) {
      return res.status(400).json({ error: 'Срок действия кода истёк' });
    }

    user.isVerified = true;
    user.verificationCode = '';
    await user.save();

    res.json({ user });
  } catch (error) {
    console.error('Ошибка подтверждения:', error);
    res.status(500).json({ error: 'Ошибка сервера при подтверждении' });
  }
});

// --- Повторная отправка кода ---
router.post('/resend-code', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = newCode;
    user.verificationExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Новый код подтверждения',
      text: `Ваш новый код подтверждения: ${newCode}`
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка при повторной отправке кода:', error);
    res.status(500).json({ error: 'Ошибка сервера при повторной отправке' });
  }
});

module.exports = router;
