import React, { useState } from 'react';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [verificationMode, setVerificationMode] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const normalizeUser = (userData) => {
    if (!userData) return userData;
    const id = userData.id || userData._id;
    return { ...userData, id, _id: userData._id || userData.id };
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerificationChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setInfoMessage('');

    try {
      if (!isLogin) {
        const response = await fetch('https://elearner-kxix.onrender.com/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok && data.verificationPending) {
          setPendingEmail(formData.email);
          setVerificationMode(true);
          setVerificationCode('');
          setInfoMessage(`Код отправлен на ${formData.email}`);
          return;
        }

        if (response.ok && data.user) {
          onLogin(normalizeUser(data.user));
        } else {
          alert('Ошибка: ' + (data.error || 'Не удалось зарегистрироваться'));
        }
      } else {
        const response = await fetch('https://elearner-kxix.onrender.com/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        const data = await response.json();

        if (response.ok && data.user) {
          onLogin(normalizeUser(data.user));
        } else {
          alert('Ошибка: ' + (data.error || 'Неверный логин или пароль'));
        }
      }
    } catch (error) {
      console.error('Ошибка сервера:', error);
      alert('Ошибка сервера. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setInfoMessage('');

    try {
      const response = await fetch('https://elearner-kxix.onrender.com/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail, code: verificationCode }),
      });

      const data = await response.json();
      if (response.ok && data.user) {
        onLogin(normalizeUser(data.user));
      } else {
        alert('Ошибка: ' + (data.error || 'Неверный код подтверждения'));
      }
    } catch (error) {
      console.error('Ошибка подтверждения:', error);
      alert('Ошибка сервера. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!pendingEmail) return;
    setLoading(true);
    setInfoMessage('');

    try {
      const response = await fetch('https://elearner-kxix.onrender.com/api/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail }),
      });

      const data = await response.json();
      if (response.ok) {
        setInfoMessage(`Код отправлен повторно на ${pendingEmail}`);
      } else {
        alert('Ошибка: ' + (data.error || 'Не удалось отправить код'));
      }
    } catch (error) {
      console.error('Ошибка отправки кода:', error);
      alert('Ошибка сервера. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelVerification = () => {
    setVerificationMode(false);
    setVerificationCode('');
    setInfoMessage('');
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.authCard}>
        <div style={styles.iconCircle}>{verificationMode ? '✉️' : isLogin ? '👋' : '✨'}</div>
        <h2 style={styles.title}>
          {verificationMode
            ? 'Подтвердите почту'
            : isLogin
            ? 'С возвращением!'
            : 'Создай профиль'}
        </h2>

        {infoMessage && <p style={styles.infoText}>{infoMessage}</p>}

        {verificationMode ? (
          <form onSubmit={handleVerificationSubmit} style={styles.form}>
            <p style={styles.caption}>Введите код, отправленный на {pendingEmail}</p>
            <input
              name="verificationCode"
              type="text"
              placeholder="КОД ИЗ ПИСЬМА"
              style={styles.input}
              value={verificationCode}
              onChange={handleVerificationChange}
              required
            />
            <button type="submit" style={styles.mainBtn} disabled={loading}>
              {loading ? '...' : 'ПОДТВЕРДИТЬ'}
            </button>
            <button type="button" onClick={handleResendCode} style={styles.secondaryBtn} disabled={loading}>
              ОТПРАВИТЬ КОД ЗАНОВО
            </button>
            <button type="button" onClick={handleCancelVerification} style={styles.secondaryBtn}>
              ОТМЕНИТЬ
            </button>
          </form>
        ) : (
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
        )}

        {!verificationMode && (
          <>
            <div style={styles.divider}> ИЛИ </div>
            <button onClick={() => {
              setIsLogin(!isLogin);
              setVerificationMode(false);
              setInfoMessage('');
              setFormData({ email: '', password: '', name: '' });
            }} style={styles.secondaryBtn}>
              {isLogin ? 'ЗАРЕГИСТРИРОВАТЬСЯ' : 'УЖЕ ЕСТЬ ПРОФИЛЬ'}
            </button>
          </>
        )}
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
  secondaryBtn: { width: '100%', padding: '14px', borderRadius: '16px', border: '2px solid #E5E7EB', backgroundColor: '#fff', color: '#1CB0F6', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 0 #E5E7EB' },
  infoText: { color: '#1C7ED6', fontWeight: '700', marginBottom: '16px' },
  caption: { color: '#6B7280', fontSize: '14px', marginBottom: '12px' }
};

export default Auth;