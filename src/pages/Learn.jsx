import React, { useState } from 'react';

const Learn = ({ onComplete }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const lessons = [
    {
      id: 1, title: 'The House', icon: '🏠',
      vocabulary: [{ word: 'Kitchen', trans: 'Кухня', img: '🍳' }, { word: 'Bedroom', trans: 'Спальня', img: '🛏️' }],
      grammar: { title: 'There is / There are', rules: ['Is — ед. число', 'Are — мн. число'] },
      reading: { text: 'My house has a big kitchen.', question: 'Where is the food usually cooked?', options: ['Bedroom', 'Kitchen', 'Garden'], answer: 'Kitchen' }
    },
    {
      id: 2, title: 'Parts of the Body', icon: '👤',
      vocabulary: [{ word: 'Head', trans: 'Голова', img: '👤' }, { word: 'Feet', trans: 'Ступни', img: '👣' }],
      grammar: { title: 'Plurals', rules: ['Foot -> Feet', 'Hand -> Hands'] },
      reading: { text: 'We walk with our feet.', question: 'What do we use to walk?', options: ['Hands', 'Feet', 'Head'], answer: 'Feet' }
    },
    {
      id: 3, title: 'Family Members', icon: '👨‍👩‍👧',
      vocabulary: [{ word: 'Daughter', trans: 'Дочь', img: '👧' }, { word: 'Siblings', trans: 'Братья/сестры', img: '👫' }],
      grammar: { title: 'Possessive S', rules: ['My mother\'s car — машина мамы', 'Tom\'s dog — собака Тома'] },
      reading: { text: 'Mary has a brother named Sam.', question: 'Who is Sam to Mary?', options: ['Father', 'Brother', 'Son'], answer: 'Brother' }
    },
    {
      id: 4, title: 'Daily Routine', icon: '⏰',
      vocabulary: [{ word: 'Wake up', trans: 'Просыпаться', img: '🌅' }, { word: 'Brush teeth', trans: 'Чистить зубы', img: '🪥' }],
      grammar: { title: 'Present Simple', rules: ['I wake up at 7', 'He wakes up (добавляем -s)'] },
      reading: { text: 'I drink coffee every morning.', question: 'What does the author do in the morning?', options: ['Drinks coffee', 'Goes to sleep', 'Plays football'], answer: 'Drinks coffee' }
    },
    {
      id: 5, title: 'Food & Drinks', icon: '🍎',
      vocabulary: [{ word: 'Vegetables', trans: 'Овощи', img: '🥦' }, { word: 'Delicious', trans: 'Вкусно', img: '😋' }],
      grammar: { title: 'Much / Many', rules: ['Many — исчисляемые (apples)', 'Much — неисчисляемые (water)'] },
      reading: { text: 'Apples and bananas are healthy.', question: 'What kind of food is healthy?', options: ['Candy', 'Fruit', 'Pizza'], answer: 'Fruit' }
    },
    {
      id: 6, title: 'Animals', icon: '🦁',
      vocabulary: [{ word: 'Whale', trans: 'Кит', img: '🐋' }, { word: 'Wings', trans: 'Крылья', img: '🕊️' }],
      grammar: { title: 'Can / Can\'t', rules: ['Birds can fly.', 'Fish can\'t fly.'] },
      reading: { text: 'Whales live in the ocean.', question: 'Where do whales live?', options: ['Forest', 'Desert', 'Ocean'], answer: 'Ocean' }
    },
    {
      id: 7, title: 'Weather', icon: '☁️',
      vocabulary: [{ word: 'Thunderstorm', trans: 'Гроза', img: '⛈️' }, { word: 'Foggy', trans: 'Туманно', img: '🌫️' }],
      grammar: { title: 'It is...', rules: ['It is raining — идет дождь', 'It is sunny — солнечно'] },
      reading: { text: 'It is very cold in winter.', question: 'When is it cold?', options: ['Summer', 'Winter', 'Spring'], answer: 'Winter' }
    },
    {
      id: 8, title: 'Work & Jobs', icon: '💼',
      vocabulary: [{ word: 'Scientist', trans: 'Ученый', img: '🧬' }, { word: 'Salary', trans: 'Зарплата', img: '💵' }],
      grammar: { title: 'Articles A / An', rules: ['A doctor', 'An engineer (перед гласной)'] },
      reading: { text: 'Doctors work in hospitals.', question: 'Where do doctors work?', options: ['School', 'Hospital', 'Office'], answer: 'Hospital' }
    },
    {
      id: 9, title: 'Transport', icon: '✈️',
      vocabulary: [{ word: 'Subway', trans: 'Метро', img: '🚇' }, { word: 'Bicycle', trans: 'Велосипед', img: '🚲' }],
      grammar: { title: 'By + Transport', rules: ['By car', 'By bus', 'On foot (пешком — исключение)'] },
      reading: { text: 'The plane is faster than the train.', question: 'Which is faster?', options: ['Train', 'Plane', 'Bicycle'], answer: 'Plane' }
    },
    {
      id: 10, title: 'Hobbies', icon: '🎨',
      vocabulary: [{ word: 'Painting', trans: 'Рисование', img: '🖌️' }, { word: 'Chess', trans: 'Шахматы', img: '♟️' }],
      grammar: { title: 'Like + ing', rules: ['I like swimming', 'She enjoys dancing'] },
      reading: { text: 'I love playing chess with my dad.', question: 'What is the hobby?', options: ['Chess', 'Football', 'Singing'], answer: 'Chess' }
    }
  ];

  const handleAnswer = (option, correct) => {
    setUserAnswer(option);
    setIsCorrect(option === correct);
  };

  const resetQuiz = () => {
    setUserAnswer(null);
    setIsCorrect(null);
  };

  const finishLesson = () => {
    if (isCorrect && onComplete) {
      onComplete();
    }
    setSelectedLesson(null);
    resetQuiz();
  };

  if (selectedLesson) {
    return (
      <div style={styles.lessonPage}>
        <div style={styles.lessonHeader}>
          <button onClick={() => {setSelectedLesson(null); resetQuiz();}} style={styles.backBtn}>← К КАРТЕ</button>
          <div style={styles.progressBar}><div style={{...styles.progressFill, width: isCorrect ? '100%' : '30%'}}></div></div>
        </div>

        <h2 style={styles.mainTitle}>{selectedLesson.icon} {selectedLesson.title}</h2>

        <section style={styles.sectionCard}>
          <h3 style={styles.cardHeader}>Словарь</h3>
          <div style={styles.vocabGrid}>
            {selectedLesson.vocabulary.map((v, i) => (
              <div key={i} style={styles.vocabItem}><span style={styles.vocabEmoji}>{v.img}</span>
              <div><div style={styles.wordEn}>{v.word}</div><div style={styles.wordRu}>{v.trans}</div></div></div>
            ))}
          </div>
        </section>

        <section style={styles.sectionCard}>
          <h3 style={styles.cardHeader}>Грамматика: {selectedLesson.grammar.title}</h3>
          <ul style={styles.grammarList}>{selectedLesson.grammar.rules.map((r, i) => <li key={i}>{r}</li>)}</ul>
        </section>

        <section style={styles.sectionCard}>
          <h3 style={styles.cardHeader}>Тест</h3>
          <div style={styles.readingBox}>{selectedLesson.reading.text}</div>
          <p style={styles.questionText}>{selectedLesson.reading.question}</p>
          <div style={styles.optionsGrid}>
            {selectedLesson.reading.options.map((opt, i) => (
              <button 
                key={i} 
                disabled={userAnswer !== null && isCorrect}
                onClick={() => handleAnswer(opt, selectedLesson.reading.answer)}
                style={userAnswer === opt ? (isCorrect ? styles.correctBtn : styles.wrongBtn) : styles.optionBtn}
              >
                {opt} {userAnswer === opt && (isCorrect ? '✅' : '❌')}
              </button>
            ))}
          </div>
        </section>

        {userAnswer !== null && (
          <div style={{...styles.feedbackBar, backgroundColor: isCorrect ? '#D7FFB8' : '#FFDFE0', borderTop: `4px solid ${isCorrect ? '#58CC02' : '#EA2B2B'}`}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '600px', margin: '0 auto'}}>
              <span style={{color: isCorrect ? '#58CC02' : '#EA2B2B', fontWeight: '900', fontSize: '18px'}}>
                {isCorrect ? 'ВЕЛИКОЛЕПНО!' : 'ОШИБКА...'}
              </span>
              {!isCorrect && (
                <button onClick={resetQuiz} style={styles.retryBtn}>ПОПРОБОВАТЬ СНОВА</button>
              )}
              {isCorrect && (
                <button onClick={finishLesson} style={styles.continueBtn}>ПРОДОЛЖИТЬ</button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Твой путь английского 🚀</h1>
      <div style={styles.roadmap}>
        {lessons.map((lesson, index) => (
          <div key={lesson.id} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div 
              style={{...styles.node, marginLeft: index % 2 === 0 ? '-60px' : '60px'}}
              onClick={() => setSelectedLesson(lesson)}
            >
              <span style={styles.nodeIcon}>{lesson.icon}</span>
              <div style={styles.nodeTooltip}>{lesson.title}</div>
            </div>
            {index < lessons.length - 1 && <div style={{...styles.line, marginLeft: index % 2 === 0 ? '-60px' : '60px'}}></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px 20px', backgroundColor: '#fff' },
  title: { fontWeight: '900', color: '#3C3C3C', textAlign: 'center', marginBottom: '60px', fontSize: '28px' },
  roadmap: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
  node: { width: '85px', height: '85px', borderRadius: '50%', backgroundColor: '#58CC02', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 0 #46A302', position: 'relative', border: '3px solid #fff' },
  nodeIcon: { fontSize: '38px' },
  nodeTooltip: { position: 'absolute', bottom: '-25px', fontWeight: '800', color: '#AFB4BD', fontSize: '11px', textTransform: 'uppercase' },
  line: { width: '8px', height: '50px', backgroundColor: '#E5E7EB', borderRadius: '4px' },
  
  lessonPage: { padding: '20px', maxWidth: '700px', margin: '0 auto', animation: 'fadeIn 0.4s ease' },
  lessonHeader: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' },
  backBtn: { background: 'none', border: 'none', color: '#AFB4BD', fontWeight: '900', cursor: 'pointer', fontSize: '14px' },
  progressBar: { flex: 1, height: '16px', backgroundColor: '#E5E7EB', borderRadius: '12px' },
  progressFill: { height: '100%', backgroundColor: '#58CC02', borderRadius: '12px', transition: '0.5s' },
  mainTitle: { fontWeight: '900', fontSize: '32px', marginBottom: '25px', textAlign: 'center' },
  sectionCard: { backgroundColor: '#fff', border: '2px solid #E5E7EB', borderRadius: '24px', padding: '25px', marginBottom: '20px' },
  cardHeader: { color: '#1CB0F6', fontWeight: '900', fontSize: '18px', marginBottom: '15px', textTransform: 'uppercase' },
  vocabGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  vocabItem: { display: 'flex', alignItems: 'center', gap: '15px' },
  vocabEmoji: { fontSize: '28px' },
  wordEn: { fontWeight: '800', color: '#3C3C3C', fontSize: '16px' },
  wordRu: { color: '#777', fontSize: '14px' },
  grammarList: { paddingLeft: '20px', lineHeight: '1.8', fontWeight: '500' },
  readingBox: { padding: '20px', backgroundColor: '#F7F7F7', borderRadius: '18px', lineHeight: '1.6', fontSize: '16px', border: '2px solid #E5E7EB', marginBottom: '20px' },
  questionText: { fontWeight: '900', fontSize: '18px', marginBottom: '20px', color: '#3C3C3C' },
  optionsGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  optionBtn: { padding: '18px', borderRadius: '18px', border: '2px solid #E5E7EB', backgroundColor: '#fff', cursor: 'pointer', fontWeight: '800', textAlign: 'left', fontSize: '16px' },
  correctBtn: { padding: '18px', borderRadius: '18px', border: '2px solid #58CC02', backgroundColor: '#D7FFB8', color: '#58CC02', fontWeight: '800', textAlign: 'left', fontSize: '16px' },
  wrongBtn: { padding: '18px', borderRadius: '18px', border: '2px solid #EA2B2B', backgroundColor: '#FFDFE0', color: '#EA2B2B', fontWeight: '800', textAlign: 'left', fontSize: '16px' },
  
  feedbackBar: { position: 'fixed', bottom: 0, left: 0, right: 0, padding: '30px', zIndex: 100 },
  retryBtn: { padding: '12px 25px', backgroundColor: '#EA2B2B', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 4px 0 #B21D1D' },
  continueBtn: { padding: '12px 25px', backgroundColor: '#58CC02', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 4px 0 #46A302' }
};

export default Learn;