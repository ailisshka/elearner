import React from 'react';
import img from '../assets/CatStage2.png';

const CatStage2 = () => (
  <div style={styles.container}>
    <img src={img} alt="Кот-студент" style={styles.img} />
    <div style={styles.bubble}>Вижу прогресс! Ты уже почти профи. ✨</div>
  </div>
);

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  img: { width: '150px' },
  bubble: { 
    marginTop: '10px', padding: '10px', borderRadius: '15px', 
    backgroundColor: '#DBEAFE', color: '#1E3A8A', fontSize: '14px', fontWeight: 'bold' 
  }
};
export default CatStage2;