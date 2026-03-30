import React from 'react';
import img from '../assets/CatStage3.png';

const CatStage3 = () => (
  <div style={styles.container}>
    <img src={img} alt="Профессор-Кот" style={styles.img} />
    <div style={styles.bubble}>Senior Developer на связи! Горжусь тобой. 🔥</div>
  </div>
);

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  img: { width: '180px' },
  bubble: { 
    marginTop: '10px', padding: '10px', borderRadius: '15px', 
    backgroundColor: '#3B82F6', color: '#fff', fontSize: '14px', fontWeight: '800' 
  }
};
export default CatStage3;