import React from 'react';

const Alphabet = () => {
  const alphabetData = [
    { letter: 'Aa', trans: '[æ]', word: 'Apple', translate: 'Яблоко', icon: '🍎' },
    { letter: 'Bb', trans: '[b]', word: 'Book', translate: 'Книга', icon: '📖' },
    { letter: 'Cc', trans: '[k]', word: 'Cat', translate: 'Кот', icon: '🐱' },
    { letter: 'Dd', trans: '[d]', word: 'Dog', translate: 'Собака', icon: '🐶' },
    { letter: 'Ee', trans: '[e]', word: 'Egg', translate: 'Яйцо', icon: '🥚' },
    { letter: 'Ff', trans: '[f]', word: 'Fish', translate: 'Рыба', icon: '🐟' },
    { letter: 'Gg', trans: '[g]', word: 'Grape', translate: 'Виноград', icon: '🍇' },
    { letter: 'Hh', trans: '[h]', word: 'Hat', translate: 'Шляпа', icon: '👒' },
    { letter: 'Ii', trans: '[ɪ]', word: 'Ice cream', translate: 'Мороженое', icon: '🍦' },
    { letter: 'Jj', trans: '[dʒ]', word: 'Jam', translate: 'Джем', icon: '🍯' },
    { letter: 'Kk', trans: '[k]', word: 'Kite', translate: 'Змей', icon: '🪁' },
    { letter: 'Ll', trans: '[l]', word: 'Lemon', translate: 'Лимон', icon: '🍋' },
    { letter: 'Mm', trans: '[m]', word: 'Mouse', translate: 'Мышь', icon: '🐭' },
    { letter: 'Nn', trans: '[n]', word: 'Nose', translate: 'Нос', icon: '👃' },
    { letter: 'Oo', trans: '[ɒ]', word: 'Orange', translate: 'Апельсин', icon: '🍊' },
    { letter: 'Pp', trans: '[p]', word: 'Pen', translate: 'Ручка', icon: '🖊️' },
    { letter: 'Qq', trans: '[kw]', word: 'Queen', translate: 'Королева', icon: '👑' },
    { letter: 'Rr', trans: '[r]', word: 'Rabbit', translate: 'Кролик', icon: '🐰' },
    { letter: 'Ss', trans: '[s]', word: 'Sun', translate: 'Солнце', icon: '☀️' },
    { letter: 'Tt', trans: '[t]', word: 'Tiger', translate: 'Тигр', icon: '🐯' },
    { letter: 'Uu', trans: '[ʌ]', word: 'Umbrella', translate: 'Зонт', icon: '☂️' },
    { letter: 'Vv', trans: '[v]', word: 'Van', translate: 'Фургон', icon: '🚐' },
    { letter: 'Ww', trans: '[w]', word: 'Watch', translate: 'Часы', icon: '⌚' },
    { letter: 'Xx', trans: '[ks]', word: 'Xylophone', translate: 'Ксилофон', icon: '🎹' },
    { letter: 'Yy', trans: '[j]', word: 'Yo-yo', translate: 'Йо-йо', icon: '🪀' },
    { letter: 'Zz', trans: '[z]', word: 'Zebra', translate: 'Зебра', icon: '🦓' },
  ];

  const speak = (letter, word) => {
    window.speechSynthesis.cancel();

    const letterToSpeak = new SpeechSynthesisUtterance(letter[0]);
    letterToSpeak.lang = 'en-US';
    letterToSpeak.rate = 0.8;

    const wordToSpeak = new SpeechSynthesisUtterance(word);
    wordToSpeak.lang = 'en-US';
    wordToSpeak.rate = 0.9;

    window.speechSynthesis.speak(letterToSpeak);
    window.speechSynthesis.speak(wordToSpeak);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Учим звуки ✨</h1>
        <p style={styles.subtitle}>Нажми на карточку, чтобы услышать чистый звук</p>
      </header>

      <div style={styles.grid}>
        {alphabetData.map((item, index) => (
          <div 
            key={index} 
            style={styles.card} 
            onClick={() => speak(item.letter, item.word)}
          >
            <div style={styles.letter}>{item.letter}</div>
            <div style={styles.transcription}>{item.trans}</div>
            <div style={styles.exampleText}>{item.word}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '900px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '28px', fontWeight: '900', color: '#3C3C3C' },
  subtitle: { color: '#AFB4BD', fontWeight: '700' },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
    gap: '20px' 
  },
  card: {
    backgroundColor: '#fff',
    border: '2px solid #E5E7EB',
    borderRadius: '24px',
    padding: '25px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.1s',
    boxShadow: '0 4px 0 #E5E7EB',
  },
  letter: { fontSize: '32px', fontWeight: '900', color: '#1CB0F6', marginBottom: '5px' },
  transcription: { fontSize: '16px', color: '#AFB4BD', fontWeight: '800', marginBottom: '10px' },
  exampleText: { color: '#777', fontWeight: '600', fontSize: '14px' }
};

export default Alphabet;