import React from 'react';

const AboutUs = ({ user }) => {
  return (
    <div style={styles.container}>
      {/* Приветственный блок */}
      <header style={styles.header}>
        <div style={styles.badge}>✨ ТВОЙ ПУТЬ К УСПЕХУ</div>
        <h1 style={styles.mainTitle}>
          Добро пожаловать в <span style={styles.accentText}>EnglishLearner</span>
        </h1>
        <p style={styles.subTitle}>
          Привет, <span style={{color: '#1CB0F6', fontWeight: '800'}}>{user?.name || 'Друг'}</span>! 👋 
          Мы создали это пространство, чтобы твое обучение было не рутиной, а захватывающим приключением.
        </p>
      </header>

      {/* Сетка преимуществ */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={{...styles.iconBox, backgroundColor: '#DDF4FF'}}>🚀</div>
          <h3 style={styles.cardTitle}>Роадмап обучения</h3>
          <p style={styles.cardText}>Пошаговая программа, которая ведет тебя от основ до свободного общения.</p>
        </div>

        <div style={styles.card}>
          <div style={{...styles.iconBox, backgroundColor: '#FFF4E5'}}>🔥</div>
          <h3 style={styles.cardTitle}>Система стрейков</h3>
          <p style={styles.cardText}>Поддерживай огонь знаний! Твой прогресс растет с каждым днем практики.</p>
        </div>

        <div style={styles.card}>
          <div style={{...styles.iconBox, backgroundColor: '#E5F9E0'}}>🐱</div>
          <h3 style={styles.cardTitle}>Верный спутник</h3>
          <p style={styles.cardText}>Твой кот-помощник растет и меняется вместе с твоими достижениями.</p>
        </div>

        <div style={styles.card}>
          <div style={{...styles.iconBox, backgroundColor: '#F3E8FF'}}>🏆</div>
          <h3 style={styles.cardTitle}>Лига лидеров</h3>
          <p style={styles.cardText}>Соревнуйся с другими студентами и докажи, что ты лучший в английском.</p>
        </div>
      </div>

      {/* Блок призыва к действию */}
      <div style={styles.footerBox}>
        <h2 style={{margin: '0 0 10px 0'}}>Готов начать?</h2>
        <p style={{color: '#777', marginBottom: '20px'}}>Переходи в раздел «Обучение» и сделай первый шаг!</p>
        <div style={styles.decoration}>🌟 📖 🎓</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px 0',
    animation: 'fadeIn 0.5s ease-in'
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px'
  },
  badge: {
    display: 'inline-block',
    padding: '6px 16px',
    backgroundColor: '#F7F7F7',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '800',
    color: '#AFB4BD',
    marginBottom: '15px',
    letterSpacing: '1px'
  },
  mainTitle: {
    fontSize: '36px',
    fontWeight: '900',
    color: '#3C3C3C',
    margin: '0 0 15px 0',
    lineHeight: '1.2'
  },
  accentText: {
    color: '#1CB0F6',
    background: 'linear-gradient(to right, #1CB0F6, #58CC02)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subTitle: {
    fontSize: '18px',
    color: '#777',
    maxWidth: '500px',
    margin: '0 auto',
    lineHeight: '1.5'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '50px'
  },
  card: {
    padding: '25px',
    borderRadius: '24px',
    border: '2px solid #E5E7EB',
    transition: 'transform 0.2s, border-color 0.2s',
    cursor: 'default',
    backgroundColor: '#fff'
  },
  iconBox: {
    width: '50px',
    height: '50px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginBottom: '15px'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#3C3C3C',
    margin: '0 0 10px 0'
  },
  cardText: {
    fontSize: '14px',
    color: '#777',
    lineHeight: '1.4',
    margin: 0
  },
  footerBox: {
    textAlign: 'center',
    padding: '40px',
    borderRadius: '24px',
    backgroundColor: '#F7F7F7',
    border: '2px dashed #E5E7EB'
  },
  decoration: {
    fontSize: '24px',
    letterSpacing: '15px',
    opacity: 0.6
  }
};

export default AboutUs;