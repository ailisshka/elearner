import React, { useState } from 'react';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);

  const normalizeUser = (userData) => {
    if (!userData) return userData;
    const id = userData.id || userData._id;
    return { ...userData, id, _id: userData._id || userData.id };
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      const body = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(`https://elearner-kxix.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        onLogin(normalizeUser(data.user));
      } else {
        alert('Ошибка: ' + (data.error || 'Что-то пошло не так'));
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка сервера. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.authCard}>
        <div style={styles.iconCircle}>{isLogin ? '👋' : '✨'}</div>
        <h2 style={styles.title}>
          {isLogin ? 'С возвращением!' : 'Создай профиль'}
        </h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              name="name"
              type="text"
              placeholder="КАК ТЕБЯ ЗОВУТ?"
              style={styles.input}
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="ЭЛЕКТРОННАЯ ПОЧТА"
            style={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="ПАРОЛЬ"
            style={styles.input}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" style={styles.mainBtn} disabled={loading}>
            {loading ? '...' : isLogin ? 'ВОЙТИ' : 'ПОЕХАЛИ!'}
          </button>
        </form>

        <div style={styles.divider}> ИЛИ </div>
        <button onClick={() => {
          setIsLogin(!isLogin);
          setFormData({ email: '', password: '', name: '' });
        }} style={styles.secondaryBtn}>
          {isLogin ? 'ЗАРЕГИСТРИРОВАТЬСЯ' : 'УЖЕ ЕСТЬ ПРОФИЛЬ'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#fff' },
  authCard: { width: '380px', padding: '40px 30px', borderRadius: '28px', border: '2px solid #E5E7EB', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' },
  iconCircle: { width: '80px', height: '80px', backgroundColor: '#F7F7F7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 20px auto', border: '2px solid #E5E7EB' },
  title: { fontSize: '24px', fontWeight: '900', color: '#3C3C3C', marginBottom: '30px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: { padding: '16px', borderRadius: '16px', border: '2px solid #E5E7EB', backgroundColor: '#F7F7F7', fontWeight: '600', outline: 'none' },
  mainBtn: { marginTop: '10px', padding: '16px', borderRadius: '16px', border: 'none', backgroundColor: '#58CC02', color: '#fff', fontWeight: '800', cursor: 'pointer', boxShadow: '0 5px 0 #46A302' },
  divider: { margin: '25px 0', color: '#AFAFAF', fontWeight: '800', fontSize: '12px' },
  secondaryBtn: { width: '100%', padding: '14px', borderRadius: '16px', border: '2px solid #E5E7EB', backgroundColor: '#fff', color: '#1CB0F6', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 0 #E5E7EB' }
};

export default Auth;