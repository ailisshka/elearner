import React from 'react';

const Quests = () => {
  const dailyQuests = [
    { id: 1, title: 'Заработай 10 XP', progress: 0, target: 10, icon: '⚡', color: '#58CC02' },
    { id: 2, title: 'Пройди 2 урока без ошибок', progress: 1, target: 2, icon: '🎯', color: '#1CB0F6' },
    { id: 3, title: 'Выучи 5 новых слов', progress: 5, target: 5, icon: '📖', color: '#FFC800' },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.mainTitle}>Дневные задания</h2>
      <p style={styles.subtitle}>Завершай задания, чтобы получать награды!</p>

      <div style={styles.questList}>
        {dailyQuests.map((quest) => (
          <div key={quest.id} style={styles.questCard}>
            <div style={{...styles.iconBox, backgroundColor: quest.color + '20', color: quest.color}}>
              {quest.icon}
            </div>
            
            <div style={styles.content}>
              <div style={styles.questTitle}>{quest.title}</div>
              <div style={styles.progressWrapper}>
                <div style={styles.track}>
                  <div 
                    style={{
                      ...styles.fill, 
                      backgroundColor: quest.color,
                      width: `${Math.min((quest.progress / quest.target) * 100, 100)}%`
                    }}
                  ></div>
                </div>
                <span style={styles.num}>{quest.progress}/{quest.target}</span>
              </div>
            </div>

            {quest.progress >= quest.target && <div style={styles.check}>✅</div>}
          </div>
        ))}
      </div>

      <div style={styles.infoBox}>
        <h4>Следующее обновление через 12 часов</h4>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '600px', margin: '0 auto' },
  mainTitle: { fontSize: '28px', fontWeight: '900', color: '#3C3C3C', marginBottom: '10px' },
  subtitle: { color: '#777', marginBottom: '30px', fontWeight: '600' },
  questList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  questCard: { 
    display: 'flex', alignItems: 'center', padding: '20px', 
    borderRadius: '20px', border: '2px solid #E5E7EB', backgroundColor: '#fff' 
  },
  iconBox: { 
    width: '50px', height: '50px', borderRadius: '12px', 
    display: 'flex', alignItems: 'center', justifyContent: 'center', 
    fontSize: '24px', marginRight: '20px' 
  },
  content: { flex: 1 },
  questTitle: { fontWeight: '800', fontSize: '16px', color: '#4B4B4B', marginBottom: '8px' },
  progressWrapper: { display: 'flex', alignItems: 'center', gap: '12px' },
  track: { flex: 1, height: '12px', backgroundColor: '#E5E7EB', borderRadius: '10px' },
  fill: { height: '100%', borderRadius: '10px', transition: '0.5s ease' },
  num: { fontSize: '13px', fontWeight: '800', color: '#AFB4BD', width: '40px' },
  check: { fontSize: '20px', marginLeft: '10px' },
  infoBox: { marginTop: '40px', textAlign: 'center', color: '#AFB4BD', fontSize: '13px', fontWeight: '700' }
};

export default Quests;