import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setLeaders(data))
      .catch(err => console.error('Ошибка загрузки лидеров:', err));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Лига лидеров 🏆</h2>
      <div style={styles.list}>
        {leaders.map((player, index) => (
          <div key={player.id} style={styles.row}>
            <span style={styles.rank}>{index + 1}</span>
            <div style={styles.avatarPlaceholder}>{player.name[0]}</div>
            <div style={styles.info}>
              <span style={styles.name}>{player.name}</span>
              <span style={styles.subline}>Уроков: {player.lessonsCompleted} • Избранное: {player.favoritesCount}</span>
            </div>
            <span style={styles.streak}>
              <span style={{ marginRight: '5px' }}>🔥</span>
              {player.streak}
            </span>
          </div>
        ))}
        {leaders.length === 0 && <div style={styles.empty}>Нет данных для лидерборда</div>}
      </div>
    </div>
  );
};

const styles = {
  container: { 
    padding: '20px', 
    backgroundColor: '#ffffff', 
    minHeight: '100vh' 
  },
  title: { 
    textAlign: 'center', 
    fontWeight: '900', 
    marginBottom: '30px', 
    color: '#4b4b4b', 
    fontSize: '28px'
  },
  list: {
    maxWidth: '720px',
    margin: '0 auto'
  },
  row: { 
    display: 'flex', 
    alignItems: 'center', 
    padding: '16px 20px', 
    backgroundColor: '#ffffff', 
    borderRadius: '16px', 
    marginBottom: '14px',
    border: '2px solid #e5e5e5', 
    transition: 'transform 0.2s ease'
  },
  rank: { 
    width: '40px', 
    fontWeight: '900', 
    color: '#afb4bd', 
    fontSize: '18px' 
  },
  avatarPlaceholder: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#ce93d8',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '15px',
    fontWeight: '800',
    fontSize: '18px'
  },
  info: { flex: 1, display: 'flex', flexDirection: 'column' },
  name: { 
    fontWeight: '700', 
    color: '#4b4b4b',
    fontSize: '17px'
  },
  subline: { fontSize: '12px', color: '#8f95a1', marginTop: '4px' },
  streak: { 
    fontWeight: '900', 
    color: '#ff9600', 
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center'
  },
  empty: { textAlign: 'center', padding: '40px 20px', color: '#afb4bd' }
};

export default Leaderboard;