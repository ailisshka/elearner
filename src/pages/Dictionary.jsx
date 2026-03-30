import React, { useState } from 'react';

function Dictionary() {
  const [words, setWords] = useState([
    { id: 1, eng: "Developer", rus: "Разработчик" }
  ]);
  const [newWord, setNewWord] = useState({ eng: '', rus: '' });

  const addWord = () => {
    // Валидация (Критерий 1: Обработка ошибок)
    if (!newWord.eng || !newWord.rus) {
      alert("Заполни оба поля!");
      return;
    }
    setWords([...words, { ...newWord, id: Date.now() }]);
    setNewWord({ eng: '', rus: '' });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Мой словарь</h3>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          placeholder="English" 
          value={newWord.eng}
          onChange={(e) => setNewWord({...newWord, eng: e.target.value})}
          style={inputStyle}
        />
        <input 
          placeholder="Русский" 
          value={newWord.rus}
          onChange={(e) => setNewWord({...newWord, rus: e.target.value})}
          style={inputStyle}
        />
        <button onClick={addWord} style={buttonStyle}>Добавить</button>
      </div>

      <div style={{ display: 'grid', gap: '10px' }}>
        {words.map(word => (
          <div key={word.id} style={cardStyle}>
            <strong>{word.eng}</strong> — {word.rus}
          </div>
        ))}
      </div>
    </div>
  );
}

// Стили вынеси в отдельный CSS позже для чистоты кода
const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #ddd' };
const buttonStyle = { padding: '10px 20px', background: '#3B82F6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' };
const cardStyle = { padding: '15px', background: '#f9f9f9', borderRadius: '12px', border: '1px solid #eee' };

export default Dictionary;