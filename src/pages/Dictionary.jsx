import React, { useState, useEffect } from 'react';

const Dictionary = () => {
  const [filter, setFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('my_fav_words');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('my_fav_words', JSON.stringify(favorites));
  }, [favorites]);

  const allWords = [
    // --- BUSINESS (34 слова) ---
    { id: 1, word: 'Negotiate', translate: 'Вести переговоры', category: 'Business', level: 'Intermediate' },
    { id: 2, word: 'Revenue', translate: 'Доход', category: 'Business', level: 'Advanced' },
    { id: 3, word: 'Agreement', translate: 'Соглашение', category: 'Business', level: 'Beginner' },
    { id: 4, word: 'Stakeholder', translate: 'Заинтересованное лицо', category: 'Business', level: 'Advanced' },
    { id: 5, word: 'Strategy', translate: 'Стратегия', category: 'Business', level: 'Intermediate' },
    { id: 6, word: 'Inquiry', translate: 'Запрос', category: 'Business', level: 'Beginner' },
    { id: 7, word: 'Liability', translate: 'Обязательство', category: 'Business', level: 'Advanced' },
    { id: 8, word: 'Contract', translate: 'Контракт', category: 'Business', level: 'Beginner' },
    { id: 9, word: 'Market share', translate: 'Доля рынка', category: 'Business', level: 'Intermediate' },
    { id: 10, word: 'Profit', translate: 'Прибыль', category: 'Business', level: 'Beginner' },
    { id: 11, word: 'Investment', translate: 'Инвестиции', category: 'Business', level: 'Intermediate' },
    { id: 12, word: 'Bankruptcy', translate: 'Банкротство', category: 'Business', level: 'Advanced' },
    { id: 13, word: 'Launch', translate: 'Запуск (продукта)', category: 'Business', level: 'Intermediate' },
    { id: 14, word: 'Wholesale', translate: 'Оптовая торговля', category: 'Business', level: 'Intermediate' },
    { id: 15, word: 'Retail', translate: 'Розничная торговля', category: 'Business', level: 'Beginner' },
    { id: 16, word: 'Deadline', translate: 'Крайний срок', category: 'Business', level: 'Beginner' },
    { id: 17, word: 'Incentive', translate: 'Стимул', category: 'Business', level: 'Advanced' },
    { id: 18, word: 'Redundancy', translate: 'Сокращение штата', category: 'Business', level: 'Advanced' },
    { id: 19, word: 'Merge', translate: 'Слияние', category: 'Business', level: 'Advanced' },
    { id: 20, word: 'Supplier', translate: 'Поставщик', category: 'Business', level: 'Intermediate' },
    { id: 21, word: 'Outsource', translate: 'Аутсорс', category: 'Business', level: 'Intermediate' },
    { id: 22, word: 'Equity', translate: 'Капитал', category: 'Business', level: 'Advanced' },
    { id: 23, word: 'Venture', translate: 'Предприятие', category: 'Business', level: 'Advanced' },
    { id: 24, word: 'Recruit', translate: 'Нанимать', category: 'Business', level: 'Beginner' },
    { id: 25, word: 'Payroll', translate: 'Ведомость зарплат', category: 'Business', level: 'Intermediate' },
    { id: 26, word: 'Overhead', translate: 'Накладные расходы', category: 'Business', level: 'Advanced' },
    { id: 27, word: 'Branch', translate: 'Филиал', category: 'Business', level: 'Beginner' },
    { id: 28, word: 'Workflow', translate: 'Рабочий процесс', category: 'Business', level: 'Beginner' },
    { id: 29, word: 'Feedback', translate: 'Обратная связь', category: 'Business', level: 'Beginner' },
    { id: 30, word: 'Agenda', translate: 'Повестка дня', category: 'Business', level: 'Intermediate' },
    { id: 31, word: 'Asset', translate: 'Актив', category: 'Business', level: 'Advanced' },
    { id: 32, word: 'Forecast', translate: 'Прогноз', category: 'Business', level: 'Intermediate' },
    { id: 33, word: 'Brand awareness', translate: 'Узнаваемость бренда', category: 'Business', level: 'Intermediate' },
    { id: 34, word: 'Scalability', translate: 'Масштабируемость', category: 'Business', level: 'Advanced' },

    // --- DAILY (33 слова) ---
    { id: 35, word: 'Neighborhood', translate: 'Окрестности', category: 'Daily', level: 'Beginner' },
    { id: 36, word: 'Commute', translate: 'Поездка на работу', category: 'Daily', level: 'Intermediate' },
    { id: 37, word: 'Punctual', translate: 'Пунктуальный', category: 'Daily', level: 'Advanced' },
    { id: 38, word: 'Grocery', translate: 'Продуктовый', category: 'Daily', level: 'Beginner' },
    { id: 39, word: 'Chores', translate: 'Дела по дому', category: 'Daily', level: 'Intermediate' },
    { id: 40, word: 'Routine', translate: 'Рутина', category: 'Daily', level: 'Beginner' },
    { id: 41, word: 'Habit', translate: 'Привычка', category: 'Daily', level: 'Beginner' },
    { id: 42, word: 'Exhausted', translate: 'Истощенный', category: 'Daily', level: 'Intermediate' },
    { id: 43, word: 'Laundry', translate: 'Стирка', category: 'Daily', level: 'Beginner' },
    { id: 44, word: 'Appliance', translate: 'Бытовой прибор', category: 'Daily', level: 'Intermediate' },
    { id: 45, word: 'Procrastinate', translate: 'Откладывать дела', category: 'Daily', level: 'Advanced' },
    { id: 46, word: 'Maintenance', translate: 'Обслуживание', category: 'Daily', level: 'Advanced' },
    { id: 47, word: 'Errand', translate: 'Поручение/дело', category: 'Daily', level: 'Intermediate' },
    { id: 48, word: 'Cousin', translate: 'Двоюродный брат/сестра', category: 'Daily', level: 'Beginner' },
    { id: 49, word: 'Appointment', translate: 'Встреча/запись', category: 'Daily', level: 'Beginner' },
    { id: 50, word: 'Sibling', translate: 'Брат или сестра', category: 'Daily', level: 'Intermediate' },
    { id: 51, word: 'Spouse', translate: 'Супруг(а)', category: 'Daily', level: 'Advanced' },
    { id: 52, word: 'Vibrant', translate: 'Живой/яркий', category: 'Daily', level: 'Advanced' },
    { id: 53, word: 'Leisure', translate: 'Досуг', category: 'Daily', level: 'Advanced' },
    { id: 54, word: 'Nap', translate: 'Дневной сон', category: 'Daily', level: 'Beginner' },
    { id: 55, word: 'Recipe', translate: 'Рецепт', category: 'Daily', level: 'Beginner' },
    { id: 56, word: 'Ingredients', translate: 'Ингредиенты', category: 'Daily', level: 'Intermediate' },
    { id: 57, word: 'Nutrition', translate: 'Питание', category: 'Daily', level: 'Advanced' },
    { id: 58, word: 'Meditation', translate: 'Медитация', category: 'Daily', level: 'Intermediate' },
    { id: 59, word: 'Gym', translate: 'Спортзал', category: 'Daily', level: 'Beginner' },
    { id: 60, word: 'Belongings', translate: 'Личные вещи', category: 'Daily', level: 'Intermediate' },
    { id: 61, word: 'Tidy', translate: 'Опрятный', category: 'Daily', level: 'Beginner' },
    { id: 62, word: 'Clutter', translate: 'Беспорядок', category: 'Daily', level: 'Advanced' },
    { id: 63, word: 'Sustainability', translate: 'Устойчивость', category: 'Daily', level: 'Advanced' },
    { id: 64, word: 'Eco-friendly', translate: 'Экологичный', category: 'Daily', level: 'Intermediate' },
    { id: 65, word: 'Community', translate: 'Сообщество', category: 'Daily', level: 'Beginner' },
    { id: 66, word: 'Drought', translate: 'Засуха', category: 'Daily', level: 'Advanced' },
    { id: 67, word: 'Mood', translate: 'Настроение', category: 'Daily', level: 'Beginner' },

    // --- TRAVEL (33 слова) ---
    { id: 68, word: 'Destination', translate: 'Пункт назначения', category: 'Travel', level: 'Beginner' },
    { id: 69, word: 'Itinerary', translate: 'Маршрут', category: 'Travel', level: 'Intermediate' },
    { id: 70, word: 'Accommodation', translate: 'Жилье', category: 'Travel', level: 'Advanced' },
    { id: 71, word: 'Departure', translate: 'Отправление', category: 'Travel', level: 'Beginner' },
    { id: 72, word: 'Arrival', translate: 'Прибытие', category: 'Travel', level: 'Beginner' },
    { id: 73, word: 'Passport', translate: 'Паспорт', category: 'Travel', level: 'Beginner' },
    { id: 74, word: 'Embassy', translate: 'Посольство', category: 'Travel', level: 'Advanced' },
    { id: 75, word: 'Customs', translate: 'Таможня', category: 'Travel', level: 'Intermediate' },
    { id: 76, word: 'Boarding pass', translate: 'Посадочный талон', category: 'Travel', level: 'Beginner' },
    { id: 77, word: 'Sightseeing', translate: 'Осмотр достопримечательностей', category: 'Travel', level: 'Intermediate' },
    { id: 78, word: 'Landmark', translate: 'Достопримечательность', category: 'Travel', level: 'Beginner' },
    { id: 79, word: 'Baggage', translate: 'Багаж', category: 'Travel', level: 'Beginner' },
    { id: 80, word: 'Currency', translate: 'Валюта', category: 'Travel', level: 'Intermediate' },
    { id: 81, word: 'Exchange', translate: 'Обмен', category: 'Travel', level: 'Beginner' },
    { id: 82, word: 'Travel insurance', translate: 'Страховка', category: 'Travel', level: 'Intermediate' },
    { id: 83, word: 'Delay', translate: 'Задержка', category: 'Travel', level: 'Beginner' },
    { id: 84, word: 'Cancellation', translate: 'Отмена', category: 'Travel', level: 'Intermediate' },
    { id: 85, word: 'Guidebook', translate: 'Путеводитель', category: 'Travel', level: 'Beginner' },
    { id: 86, word: 'Hiking', translate: 'Поход', category: 'Travel', level: 'Beginner' },
    { id: 87, word: 'Jet lag', translate: 'Усталость от перелета', category: 'Travel', level: 'Advanced' },
    { id: 88, word: 'Souvenir', translate: 'Сувенир', category: 'Travel', level: 'Beginner' },
    { id: 89, word: 'Lush', translate: 'Пышный/густой', category: 'Travel', level: 'Advanced' },
    { id: 90, word: 'Remote', translate: 'Удаленный', category: 'Travel', level: 'Advanced' },
    { id: 91, word: 'Reservation', translate: 'Бронь', category: 'Travel', level: 'Beginner' },
    { id: 92, word: 'Spectacular', translate: 'Захватывающий', category: 'Travel', level: 'Advanced' },
    { id: 93, word: 'Voyage', translate: 'Путешествие (морское)', category: 'Travel', level: 'Advanced' },
    { id: 94, word: 'Wanderlust', translate: 'Жажда странствий', category: 'Travel', level: 'Advanced' },
    { id: 95, word: 'Expedition', translate: 'Экспедиция', category: 'Travel', level: 'Advanced' },
    { id: 96, word: 'Check-in', translate: 'Регистрация', category: 'Travel', level: 'Beginner' },
    { id: 97, word: 'Carry-on', translate: 'Ручная кладь', category: 'Travel', level: 'Intermediate' },
    { id: 98, word: 'Layover', translate: 'Пересадка', category: 'Travel', level: 'Intermediate' },
    { id: 99, word: 'Locals', translate: 'Местные жители', category: 'Travel', level: 'Beginner' },
    { id: 100, word: 'Urban', translate: 'Городской', category: 'Travel', level: 'Intermediate' },
  ];

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const filteredWords = allWords.filter(w => {
    const matchesTab = filter === 'All' ? true : (filter === 'Favorites' ? favorites.includes(w.id) : w.category === filter);
    const matchesLevel = levelFilter === 'All' ? true : w.level === levelFilter;
    const matchesSearch = w.word.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesLevel && matchesSearch;
  });

  return (
    <div style={styles.container}>
      <input 
        type="text" 
        placeholder="🔍 Поиск слова среди 100 лучших..." 
        style={styles.searchInput}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div style={styles.section}>
        <div style={styles.btnGroup}>
          {['All', 'Business', 'Daily', 'Travel', 'Favorites'].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={filter === cat ? styles.activeTab : styles.tab}>
              {cat === 'Favorites' ? '❤️ Избранное' : cat === 'All' ? 'Все темы' : cat}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.btnGroup}>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
            <button 
              key={lvl} 
              onClick={() => setLevelFilter(lvl)}
              style={levelFilter === lvl ? styles.activeLevel : styles.levelBtn}
            >
              {lvl === 'All' ? 'Любой уровень' : lvl}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.grid}>
        {filteredWords.map(item => (
          <div key={item.id} style={styles.card}>
            <div style={styles.cardTop}>
              <span style={{...styles.lvlBadge, color: item.level === 'Advanced' ? '#FF4B4B' : item.level === 'Intermediate' ? '#1CB0F6' : '#58CC02'}}>
                {item.level}
              </span>
              <button onClick={() => toggleFavorite(item.id)} style={styles.heartBtn}>
                {favorites.includes(item.id) ? '❤️' : '🤍'}
              </button>
            </div>
            <h3 style={styles.wordText}>{item.word}</h3>
            <p style={styles.transText}>{item.translate}</p>
            <button onClick={() => speak(item.word)} style={styles.audioBtn}>🔊 Голос</button>
          </div>
        ))}
      </div>
      {filteredWords.length === 0 && (
        <div style={{textAlign: 'center', marginTop: '40px', color: '#AFB4BD'}}>Слова не найдены...</div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '5px' },
  searchInput: { width: '100%', padding: '15px', borderRadius: '16px', border: '2px solid #E5E7EB', marginBottom: '20px', outline: 'none', fontWeight: '600' },
  section: { marginBottom: '15px' },
  btnGroup: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  tab: { padding: '10px 16px', borderRadius: '12px', border: '2px solid #E5E7EB', backgroundColor: '#fff', cursor: 'pointer', fontWeight: '800', color: '#777', fontSize: '12px' },
  activeTab: { padding: '10px 16px', borderRadius: '12px', border: '2px solid #1CB0F6', backgroundColor: '#DDF4FF', color: '#1CB0F6', fontWeight: '800', fontSize: '12px', boxShadow: '0 3px 0 #84D8FF' },
  levelBtn: { padding: '8px 14px', borderRadius: '12px', border: '2px solid #E5E7EB', backgroundColor: '#fff', cursor: 'pointer', fontWeight: '700', color: '#999', fontSize: '11px' },
  activeLevel: { padding: '8px 14px', borderRadius: '12px', border: '2px solid #58CC02', backgroundColor: '#E5FFD1', color: '#58CC02', fontWeight: '800', fontSize: '11px', boxShadow: '0 3px 0 #46A302' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' },
  card: { padding: '20px', borderRadius: '24px', border: '2px solid #E5E7EB', textAlign: 'center', backgroundColor: '#fff', transition: '0.2s' },
  cardTop: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  lvlBadge: { fontSize: '10px', fontWeight: '900' },
  heartBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' },
  wordText: { fontSize: '18px', fontWeight: '900', margin: '5px 0' },
  transText: { color: '#777', fontSize: '14px', marginBottom: '15px' },
  audioBtn: { width: '100%', padding: '10px', borderRadius: '12px', border: '2px solid #E5E7EB', backgroundColor: '#fff', fontWeight: '800', fontSize: '12px', cursor: 'pointer' }
};

export default Dictionary;