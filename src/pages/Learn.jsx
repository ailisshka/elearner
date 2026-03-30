import React, { useState } from 'react';

function Learn() {
  const [isLessonStarted, setIsLessonStarted] = useState(false);

  // Контент самого урока
  if (isLessonStarted) {
    return (
      <div style={styles.container}>
        <button onClick={() => setIsLessonStarted(false)} style={styles.backBtn}>← Назад</button>
        <h1 style={styles.title}>Урок: IT Vocabulary</h1>
        <div style={styles.lessonContent}>
          <div style={styles.wordCard}><strong>Frontend</strong> — Внешняя часть сайта</div>
          <div style={styles.wordCard}><strong>Backend</strong> — Серверная часть</div>
          <div style={styles.wordCard}><strong>Framework</strong> — Каркас для разработки</div>
          <button style={styles.completeBtn} onClick={() => alert('Урок пройден!')}>Завершить</button>
        </div>
      </div>
    );
  }

  // Начальный экран (то, что ты видела раньше)
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Обучение</h1>
      <div style={styles.card}>
        <h3 style={styles.subtitle}>Твой следующий урок: "IT Vocabulary"</h3>
        <p style={styles.text}>Давай разберем термины, которые пригодятся в разработке.</p>
        {/* ТЕПЕРЬ КНОПКА РАБОТАЕТ */}
        <button 
          style={styles.startBtn} 
          onClick={() => setIsLessonStarted(true)}
        >
          Начать сейчас
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  title: { fontSize: '28px', fontWeight: '800', marginBottom: '25px', color: '#1F2937' },
  card: { backgroundColor: '#fff', padding: '60px 40px', borderRadius: '24px', border: '1px solid #E5E7EB', textAlign: 'center' },
  subtitle: { fontSize: '20px', marginBottom: '10px' },
  text: { color: '#6B7280', marginBottom: '20px' },
  startBtn: { backgroundColor: '#3B82F6', color: '#fff', border: 'none', padding: '14px 40px', borderRadius: '16px', fontWeight: '700', cursor: 'pointer' },
  backBtn: { background: 'none', border: 'none', color: '#3B82F6', cursor: 'pointer', marginBottom: '10px', fontWeight: '600' },
  lessonContent: { display: 'flex', flexDirection: 'column', gap: '15px' },
  wordCard: { padding: '20px', backgroundColor: '#F3F4F6', borderRadius: '15px', border: '1px solid #E5E7EB' },
  completeBtn: { marginTop: '20px', backgroundColor: '#10B981', color: '#fff', border: 'none', padding: '12px', borderRadius: '12px', cursor: 'pointer' }
};

export default Learn;