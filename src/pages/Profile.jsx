import React, { useState } from 'react';

const Profile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user?.name || 'Айли');
  const [tempAvatar, setTempAvatar] = useState(user?.avatar || '🐱');

  const avatars = ['🐱', '🐶', '🦊', '🐨', '🦁', '🐸', '🤖', '👾'];

  const handleSave = () => {
    setUser({ ...user, name: tempName, avatar: tempAvatar });
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>Твой профиль</h1>
      
      <div style={styles.profileCard}>
        {/* Аватар */}
        <div style={styles.avatarCircle}>
          <span style={{ fontSize: '50px' }}>{isEditing ? tempAvatar : (user?.avatar || '🐱')}</span>
          {isEditing && <div style={styles.editBadge}>✏️</div>}
        </div>

        {isEditing ? (
          <div style={styles.editForm}>
            <label style={styles.label}>Как тебя зовут?</label>
            <input 
              type="text" 
              value={tempName} 
              onChange={(e) => setTempName(e.target.value)} 
              style={styles.input}
              placeholder="Введите имя..."
            />

            <label style={styles.label}>Выбери персонажа:</label>
            <div style={styles.avatarGrid}>
              {avatars.map(a => (
                <button 
                  key={a} 
                  onClick={() => setTempAvatar(a)} 
                  style={{
                    ...styles.avatarOption, 
                    border: tempAvatar === a ? '2px solid #1CB0F6' : '2px solid #E5E7EB',
                    backgroundColor: tempAvatar === a ? '#DDF4FF' : '#fff'
                  }}
                >
                  {a}
                </button>
              ))}
            </div>

            <div style={styles.btnGroup}>
              <button onClick={handleSave} style={styles.saveBtn}>СОХРАНИТЬ</button>
              <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>ОТМЕНА</button>
            </div>
          </div>
        ) : (
          <div style={styles.viewMode}>
            <h2 style={styles.userName}>{user?.name || 'Айли'}</h2>
            
            <div style={styles.statsRow}>
              <div style={styles.statBox}>
                <span style={styles.statVal}>🔥 {user?.streak || 0}</span>
                <span style={styles.statLabel}>Стрейк</span>
              </div>
              <div style={styles.statBox}>
                <span style={styles.statVal}>{user?.lessonsCompleted || 0}</span>
                <span style={styles.statLabel}>Уроков</span>
              </div>
              <div style={styles.statBox}>
                <span style={styles.statVal}>{user?.favorites?.length || 0}</span>
                <span style={styles.statLabel}>Избранное</span>
              </div>
            </div>

            <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
              РЕДАКТИРОВАТЬ ПРОФИЛЬ
            </button>
          </div>
        )}
      </div>

      {/* Дополнительная карточка достижений */}
      {!isEditing && (
        <div style={styles.achievementsCard}>
          <h3 style={styles.achTitle}>Твои достижения</h3>
          <div style={styles.achItem}>
            <span style={styles.achIcon}>🎯</span>
            <div>
              <div style={styles.achName}>Первые шаги</div>
              <div style={styles.achDesc}>Пройдено {user?.lessonsCompleted || 0} уроков</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '500px', margin: '0 auto', padding: '20px' },
  mainTitle: { fontWeight: '900', textAlign: 'center', marginBottom: '30px', color: '#3C3C3C' },
  profileCard: { 
    backgroundColor: '#fff', border: '2px solid #E5E7EB', borderRadius: '24px', 
    padding: '40px 20px', textAlign: 'center', position: 'relative' 
  },
  avatarCircle: { 
    width: '120px', height: '120px', backgroundColor: '#F7F7F7', border: '2px solid #E5E7EB',
    borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', 
    justifyContent: 'center', position: 'relative' 
  },
  editBadge: { 
    position: 'absolute', bottom: '5px', right: '5px', backgroundColor: '#1CB0F6', 
    width: '30px', height: '30px', borderRadius: '50%', display: 'flex', 
    alignItems: 'center', justifyContent: 'center', fontSize: '14px', border: '2px solid #fff' 
  },
  userName: { fontSize: '28px', fontWeight: '900', margin: '0 0 5px 0' },
  emailText: { color: '#777', fontSize: '14px', marginBottom: '18px', fontWeight: '700' },
  userStatus: { color: '#AFB4BD', fontWeight: '700', fontSize: '14px', marginBottom: '25px' },
  
  statsRow: { display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px' },
  statBox: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  statVal: { fontWeight: '900', fontSize: '20px', color: '#3C3C3C' },
  statLabel: { fontSize: '12px', color: '#AFB4BD', fontWeight: '800', textTransform: 'uppercase' },

  editBtn: { 
    width: '100%', padding: '15px', borderRadius: '16px', border: '2px solid #E5E7EB', 
    background: '#fff', fontWeight: '800', cursor: 'pointer', color: '#1CB0F6' 
  },
  
  // Стили формы
  editForm: { textAlign: 'left' },
  label: { display: 'block', fontWeight: '800', color: '#4B4B4B', marginBottom: '8px', fontSize: '14px' },
  input: { 
    width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #E5E7EB', 
    marginBottom: '20px', outline: 'none', fontWeight: '600', boxSizing: 'border-box' 
  },
  avatarGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '25px' },
  avatarOption: { fontSize: '24px', padding: '10px', borderRadius: '12px', cursor: 'pointer', transition: '0.2s' },
  btnGroup: { display: 'flex', gap: '10px' },
  saveBtn: { flex: 1, padding: '12px', backgroundColor: '#58CC02', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 4px 0 #46A302' },
  cancelBtn: { flex: 1, padding: '12px', backgroundColor: '#fff', color: '#AFB4BD', border: '2px solid #E5E7EB', borderRadius: '12px', fontWeight: '900', cursor: 'pointer' },

  achievementsCard: { marginTop: '20px', padding: '20px', border: '2px solid #E5E7EB', borderRadius: '24px' },
  achTitle: { fontWeight: '900', marginBottom: '15px', fontSize: '18px' },
  achItem: { display: 'flex', alignItems: 'center', gap: '15px' },
  achIcon: { fontSize: '30px', backgroundColor: '#FFF4E5', padding: '10px', borderRadius: '12px' },
  achName: { fontWeight: '800', color: '#3C3C3C' },
  achDesc: { fontSize: '12px', color: '#AFB4BD', fontWeight: '700' }
};

export default Profile;