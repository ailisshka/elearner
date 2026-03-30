import React, { useState } from 'react';
import Learn from './pages/Learn'; 
import catStage1 from './assets/CatStage1.png'; 

function App() {
  // Состояние для работы Навбара
  const [activeTab, setActiveTab] = useState('learn');

  return (
    <div style={styles.layout}>
      {/* 1. ЛЕВАЯ ПАНЕЛЬ (Навбар) */}
      <nav style={styles.sidebar}>
        <div style={styles.logo}>ENGLISH<span style={{color: '#3B82F6'}}>LEARNER</span></div>
        <div style={styles.menuGroup}>
          <button 
            onClick={() => setActiveTab('learn')} 
            style={activeTab === 'learn' ? styles.activeBtn : styles.menuButton}
          >
            📖 Обучение
          </button>
          <button 
            onClick={() => setActiveTab('dict')} 
            style={activeTab === 'dict' ? styles.activeBtn : styles.menuButton}
          >
            🔖 Словарь
          </button>
          <button 
            onClick={() => setActiveTab('tasks')} 
            style={activeTab === 'tasks' ? styles.activeBtn : styles.menuButton}
          >
            🎯 Задания
          </button>
          <button 
            onClick={() => setActiveTab('profile')} 
            style={activeTab === 'profile' ? styles.activeBtn : styles.menuButton}
          >
            👤 Профиль
          </button>
        </div>
      </nav>

      {/* 2. ЦЕНТРАЛЬНАЯ ЧАСТЬ */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h2>{activeTab === 'learn' ? 'Обучение' : activeTab === 'dict' ? 'Словарь' : activeTab === 'tasks' ? 'Задания' : 'Профиль'}</h2>
          <div style={styles.topStats}>
            <span title="Твой страйк!">🔥 5 дней</span>
            {/* Гемы убраны */}
          </div>
        </header>
        
        <section style={styles.contentArea}>
          {activeTab === 'learn' ? <Learn /> : <div style={{padding: '40px', textAlign: 'center', color: '#6B7280'}}>Раздел "{activeTab}" в разработке...</div>}
        </section>
      </main>

      {/* 3. ПРАВАЯ ПАНЕЛЬ (Котёнок) */}
      <aside style={styles.rightPanel}>
        <div style={styles.characterCard}>
          <div style={styles.imgWrapper}>
             <img src={catStage1} alt="Спутник" style={styles.catImg} />
          </div>
          <div style={styles.charInfo}>
            <h4 style={styles.charName}>Твой Спутник</h4>
            <p style={styles.charLevel}>Уровень: 1</p>
            <span style={styles.statusBadge}>Новичок 🌱</span>
          </div>
        </div>
      </aside>
    </div>
  );
}

const styles = {
  layout: { display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB', fontFamily: 'sans-serif' },
  sidebar: { width: '250px', backgroundColor: '#fff', borderRight: '1px solid #E5E7EB', padding: '30px 20px', position: 'fixed', height: '100vh', top: 0, left: 0 },
  logo: { fontSize: '22px', fontWeight: '800', marginBottom: '40px' },
  menuGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  menuButton: { padding: '12px 15px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', color: '#6B7280', fontWeight: '600', borderRadius: '12px', transition: '0.2s' },
  activeBtn: { padding: '12px 15px', border: 'none', backgroundColor: '#EFF6FF', color: '#3B82F6', borderRadius: '12px', textAlign: 'left', fontWeight: '700' },
  main: { marginLeft: '250px', marginRight: '320px', flex: 1, padding: '40px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  topStats: { fontSize: '18px', fontWeight: 'bold', color: '#ef4444' }, // Красный цвет для огня
  contentArea: { backgroundColor: '#fff', borderRadius: '24px', minHeight: '500px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  rightPanel: { width: '320px', position: 'fixed', right: 0, top: 0, height: '100vh', padding: '40px 20px' },
  characterCard: { backgroundColor: '#fff', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center' },
  catImg: { width: '130px', height: '130px', objectFit: 'contain' },
  charInfo: { borderTop: '1px solid #F3F4F6', paddingTop: '20px', marginTop: '15px' },
  charName: { margin: '0 0 5px 0', fontSize: '18px', fontWeight: '700' },
  charLevel: { color: '#6B7280', margin: '0 0 10px 0' },
  statusBadge: { padding: '6px 16px', backgroundColor: '#EFF6FF', color: '#1E3A8A', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }
};

export default App;