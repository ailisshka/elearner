import React, { useState, useEffect } from 'react';
import Learn from './pages/Learn'; 
import AboutUs from './pages/AboutUs'; 
import Dictionary from './pages/Dictionary';
import Auth from './pages/Auth';
import Alphabet from './pages/Alphabet';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import CatStage1 from './components/CatStage1'; 

function App() {
  const [activeTab, setActiveTab] = useState('aboutus'); 
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuth(true);
    }
  }, []);

  const normalizeUser = (userData) => {
    if (!userData) return userData;
    const id = userData.id || userData._id;
    return { ...userData, id, _id: userData._id || userData.id };
  };

  const handleLogin = (userData) => {
    const normalized = normalizeUser(userData);
    setUser(normalized);
    setIsAuth(true);
    localStorage.setItem('user', JSON.stringify(normalized));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem('user');
  };

  const updateUserData = (updatedUser) => {
    const normalized = normalizeUser(updatedUser);
    setUser(normalized);
    localStorage.setItem('user', JSON.stringify(normalized));
  };

  const updateStreak = async () => {
    const userId = user?.id || user?._id;
    if (!userId) return;
    try {
      const response = await fetch(`http://localhost:5000/api/stats/${userId}`);
      const data = await response.json();
      if (data) {
        updateUserData({
          ...user,
          streak: data.streak,
          lessonsCompleted: data.lessonsCompleted,
          email: data.email || user.email
        });
      }
    } catch (err) {
      console.error('Ошибка обновления прогресса:', err);
    }
  };

  if (!isAuth) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'aboutus': return <AboutUs user={user} />;
      case 'learn': return <Learn user={user} onStatsUpdate={updateStreak} />; 
      case 'alphabet': return <Alphabet />; 
      case 'dict': return <Dictionary user={user} setUser={updateUserData} />;
      case 'leaders': return <Leaderboard />;
      case 'profile': return <Profile user={user} setUser={updateUserData} />;
      default: return <AboutUs user={user} />;
    }
  };

  const menuItems = [
    { id: 'aboutus', label: 'О ПРОЕКТЕ', icon: '📖' },
    { id: 'learn', label: 'ОБУЧЕНИЕ', icon: '🏠' },
    { id: 'alphabet', label: 'БУКВЫ', icon: 'あ' },
    { id: 'dict', label: 'СЛОВАРЬ', icon: '🔖' },
    { id: 'leaders', label: 'ЛИДЕРЫ', icon: '🏆' },
    { id: 'profile', label: 'ПРОФИЛЬ', icon: '👤' },
  ];

  return (
    <div style={styles.layout}>
      {/* СЛЕВА: НАВИГАЦИЯ */}
      <nav style={styles.sidebar}>
        <div style={styles.logo}>
          <span style={{color: '#58CC02'}}>ENGLISH</span><br/>
          <span style={{color: '#1CB0F6'}}>LEARNER</span>
        </div>
        
        <div style={styles.menuGroup}>
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)} 
              style={activeTab === item.id ? styles.activeBtn : styles.menuButton}
            >
              <span style={styles.menuIcon}>{item.icon}</span>
              {item.label}
            </button>
          ))}
          
          <button onClick={handleLogout} style={styles.logoutBtn}>
            <span style={styles.menuIcon}>🚪</span> ВЫЙТИ
          </button>
        </div>
      </nav>

      {/* ЦЕНТР: КОНТЕНТ */}
      <main style={styles.main}>
        <section style={styles.contentArea}>
          {renderContent()}
        </section>
      </main>

      {/* СПРАВА: ПАНЕЛЬ ПРОГРЕССА */}
      <aside style={styles.rightPanel}>
        <div style={styles.characterCard}>
          <div style={styles.imgWrapper}><CatStage1 /></div>
          <h4 style={styles.charName}>Твой Спутник</h4>
          <p style={styles.charLevel}>УРОВЕНЬ {Math.floor((user?.streak || 0) / 10) + 1}</p>
          <div style={styles.levelBar}>
            <div style={{...styles.levelProgress, width: `${(user?.streak % 10) * 10}%`}}></div>
          </div>
          <span style={styles.statusBadge}>НОВИЧОК</span>
        </div>

        <div style={styles.statsCard}>
          <div style={styles.statBlock}>
            <span style={styles.statNumber}>{user?.streak || 0}</span>
            <span style={styles.statLabel}>ДНЕЙ ПОДРЯД</span>
          </div>
          <div style={styles.statBlock}>
            <span style={styles.statNumber}>{user?.lessonsCompleted || 0}</span>
            <span style={styles.statLabel}>УРОКОВ</span>
          </div>
          <div style={styles.statBlock}>
            <span style={styles.statNumber}>{user?.favorites?.length || 0}</span>
            <span style={styles.statLabel}>ИЗБРАННОЕ</span>
          </div>
        </div>

        <div style={styles.promoCard}>
          <h4 style={{margin: '0 0 10px 0', fontSize: '16px', color: '#4b4b4b'}}>Профиль готов</h4>
          <p style={{fontSize: '12px', color: '#777', marginBottom: '15px'}}>{user?.name}</p>
          <button style={styles.promoBtn} onClick={() => setActiveTab('profile')}>ИЗМЕНИТЬ</button>
        </div>
      </aside>
    </div>
  );
}

const styles = {
  layout: { display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: "'Nunito', sans-serif", color: '#4b4b4b' },
  sidebar: { width: '240px', borderRight: '2px solid #e5e5e5', padding: '30px 16px', position: 'fixed', height: '100vh', backgroundColor: '#FFFFFF' },
  logo: { fontSize: '22px', fontWeight: '900', marginBottom: '40px', paddingLeft: '20px' },
  menuGroup: { display: 'flex', flexDirection: 'column', gap: '4px' },
  menuButton: { display: 'flex', alignItems: 'center', padding: '12px 20px', border: '2px solid transparent', background: 'none', cursor: 'pointer', color: '#777', fontWeight: '700', borderRadius: '12px', fontSize: '15px', textAlign: 'left', transition: 'background 0.2s' },
  activeBtn: { display: 'flex', alignItems: 'center', padding: '12px 20px', backgroundColor: '#ddf4ff', color: '#1CB0F6', border: '2px solid #84d8ff', borderRadius: '12px', fontWeight: '800' },
  logoutBtn: { display: 'flex', alignItems: 'center', padding: '12px 20px', border: 'none', background: 'none', cursor: 'pointer', color: '#FF4B4B', fontWeight: '700', borderRadius: '12px', fontSize: '15px', marginTop: '20px' },
  menuIcon: { marginRight: '15px', fontSize: '20px' },
  main: { marginLeft: '240px', marginRight: '350px', flex: 1, padding: '40px' },
  contentArea: { maxWidth: '1000px', margin: '0 auto' },
  rightPanel: { width: '350px', position: 'fixed', right: 0, top: 0, height: '100vh', padding: '30px 24px', borderLeft: '2px solid #e5e5e5', display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#FFFFFF' },
  characterCard: { padding: '25px', borderRadius: '20px', border: '2px solid #e5e5e5', textAlign: 'center', backgroundColor: '#fff' },
  imgWrapper: { marginBottom: '10px' },
  charName: { fontSize: '18px', fontWeight: '800', margin: '10px 0 5px', color: '#4b4b4b' },
  charLevel: { color: '#afb4bd', fontSize: '12px', fontWeight: '800' },
  levelBar: { width: '100%', height: '12px', backgroundColor: '#e5e5e5', borderRadius: '10px', margin: '12px 0' },
  levelProgress: { height: '100%', backgroundColor: '#58CC02', borderRadius: '10px', transition: 'width 0.3s ease' },
  statusBadge: { display: 'inline-block', padding: '8px 20px', backgroundColor: '#58CC02', color: '#fff', borderRadius: '12px', fontSize: '12px', fontWeight: '900', boxShadow: '0 4px 0 #46A302' },
  statsCard: { padding: '20px', borderRadius: '20px', border: '2px solid #e5e5e5', backgroundColor: '#fff', display: 'grid', gap: '12px' },
  statBlock: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  statNumber: { fontSize: '22px', fontWeight: '900', color: '#3C3C3C' },
  statLabel: { fontSize: '12px', color: '#afb4bd', fontWeight: '800' },
  promoCard: { padding: '20px', borderRadius: '20px', border: '2px solid #e5e5e5', backgroundColor: '#fff' },
  promoBtn: { width: '100%', marginTop: '10px', padding: '10px', borderRadius: '12px', border: '2px solid #e5e5e5', backgroundColor: '#fff', color: '#1CB0F6', fontWeight: '800', cursor: 'pointer', boxShadow: '0 2px 0 #e5e5e5' }
};

export default App;