import React from 'react';
import img from '../assets/CatStage1.png'; // Проверь, что расширение .png

const CatStage1 = () => (
  <div style={styles.container}>
    <img src={img} alt="Котёнок-новичок" style={styles.img} />
    <div style={styles.bubble}>Привет! Начнем учить английский? </div>
  </div>
);

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  img: { width: '120px', transition: 'transform 0.3s' },
  bubble: { 
    marginTop: '10px', padding: '10px', borderRadius: '15px', 
    backgroundColor: '#F3F4F6', fontSize: '14px', border: '1px solid #E5E7EB' 
  }
};
export default CatStage1;