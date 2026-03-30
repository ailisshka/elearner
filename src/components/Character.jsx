import React from 'react';

// Представь, что это пути к твоим будущим SVG котятам
// Для высшего балла используем формат .svg 
const stages = {
  baby: 'https://img.icons8.com/bubbles/200/kitten.png', 
  student: 'https://img.icons8.com/bubbles/200/cat.png',
  professor: 'https://img.icons8.com/bubbles/200/cat-with-glasses.png'
};

const Character = ({ level }) => {
  // Логика эволюции (Критерий: Интерактивность) 
  const getStage = () => {
    if (level < 5) return stages.baby;
    if (level < 15) return stages.student;
    return stages.professor;
  };

  return (
    <div style={styles.charBox}>
      <img src={getStage()} alt="Твой кот" style={styles.img} />
      <div style={styles.bubble}>
        {level < 5 ? "Мяу! Давай учиться?" : "Пора за кодинг, коллега!"}
      </div>
    </div>
  );
};

const styles = {
  charBox: { textAlign: 'center', position: 'relative' },
  img: { width: '150px', transition: 'all 0.5s ease' }, // Плавная смена 
  bubble: {
    background: '#fff',
    border: '2px solid #3B82F6',
    borderRadius: '15px',
    padding: '5px 10px',
    fontSize: '12px',
    position: 'absolute',
    top: '-20px',
    right: '-10px'
  }
};

export default Character;