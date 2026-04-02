import React, { useState } from 'react';

const Learn = ({ user, onStatsUpdate }) => {
  const userId = user?.id || user?._id;
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [isLessonFinished, setIsLessonFinished] = useState(false);

  // ДАННЫЕ: 30 ТЕМ ПО 10 СЛОВ С ПЕРЕВОДОМ
  const lessons = [
    {
      id: 1,
      title: 'THE HOUSE',
      icon: '🏠',
      vocab: [
        { word: 'Kitchen', translation: 'Кухня' },
        { word: 'Bedroom', translation: 'Спальня' },
        { word: 'Roof', translation: 'Крыша' },
        { word: 'Window', translation: 'Окно' },
        { word: 'Door', translation: 'Дверь' },
        { word: 'Floor', translation: 'Пол' },
        { word: 'Wall', translation: 'Стена' },
        { word: 'Garage', translation: 'Гараж' },
        { word: 'Garden', translation: 'Сад' },
        { word: 'Attic', translation: 'Чердак' }
      ],
      grammar: 'There is / There are',
      questions: [
        { q: 'Where do we cook?', options: ['Kitchen', 'Garden', 'Bedroom'], a: 'Kitchen' },
        { q: 'There ___ a cat on the roof.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'There ___ two windows.', options: ['is', 'are', 'was'], a: 'are' },
        { q: 'Where do we sleep?', options: ['Kitchen', 'Bedroom', 'Garage'], a: 'Bedroom' },
        { q: 'Top of the house is the ___.', options: ['Floor', 'Roof', 'Wall'], a: 'Roof' },
        { q: 'There ___ a door and a window.', options: ['is', 'are', 'am'], a: 'are' },
        { q: 'The garage is next to the ___.', options: ['Garden', 'Attic', 'Bathroom'], a: 'Garden' },
        { q: 'The ___ is under the roof.', options: ['Window', 'Attic', 'Bed'], a: 'Attic' },
        { q: 'There ___ a floor in every room.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'A ___ separates rooms.', options: ['Door', 'Wall', 'Garden'], a: 'Wall' }
      ]
    },
    {
      id: 2,
      title: 'BODY PARTS',
      icon: '👤',
      vocab: [
        { word: 'Head', translation: 'Голова' },
        { word: 'Shoulders', translation: 'Плечи' },
        { word: 'Knees', translation: 'Колени' },
        { word: 'Toes', translation: 'Пальцы ног' },
        { word: 'Eyes', translation: 'Глаза' },
        { word: 'Ears', translation: 'Уши' },
        { word: 'Mouth', translation: 'Рот' },
        { word: 'Nose', translation: 'Нос' },
        { word: 'Teeth', translation: 'Зубы' },
        { word: 'Feet', translation: 'Ступни' }
      ],
      grammar: 'Irregular plurals: foot -> feet, tooth -> teeth, person -> people',
      questions: [
        { q: 'One foot, two ___.', options: ['Foots', 'Feet', 'Feets'], a: 'Feet' },
        { q: 'One tooth, ten ___.', options: ['Teeth', 'Tooths', 'Tooths'], a: 'Teeth' },
        { q: 'See with your ___.', options: ['Ears', 'Eyes', 'Nose'], a: 'Eyes' },
        { q: 'Smell with your ___.', options: ['Mouth', 'Nose', 'Hands'], a: 'Nose' },
        { q: 'One person, two ___.', options: ['People', 'Persons', 'Peoples'], a: 'People' },
        { q: 'Hear with your ___.', options: ['Ears', 'Eyes', 'Nose'], a: 'Ears' },
        { q: 'One child, three ___.', options: ['Children', 'Childs', 'Childrens'], a: 'Children' },
        { q: 'Put the hat on your ___.', options: ['Head', 'Feet', 'Hand'], a: 'Head' },
        { q: 'A dog has four ___.', options: ['Toes', 'Eyes', 'Hands'], a: 'Toes' },
        { q: 'Your ___ help you chew.', options: ['Teeth', 'Lips', 'Nails'], a: 'Teeth' }
      ]
    },
    {
      id: 3,
      title: 'FAMILY',
      icon: '👨‍👩‍👧',
      vocab: [
        { word: 'Aunt', translation: 'Тётя' },
        { word: 'Uncle', translation: 'Дядя' },
        { word: 'Cousin', translation: 'Кузен / кузина' },
        { word: 'Niece', translation: 'Племянница' },
        { word: 'Nephew', translation: 'Племянник' },
        { word: 'Parents', translation: 'Родители' },
        { word: 'Grandson', translation: 'Внук' },
        { word: 'Sister', translation: 'Сестра' },
        { word: 'Brother', translation: 'Брат' },
        { word: 'Wife', translation: 'Жена' }
      ],
      grammar: "Possessive 's: my sister's book, Tom's car",
      questions: [
        { q: "Father's sister is a ___.", options: ['Aunt', 'Uncle', 'Niece'], a: 'Aunt' },
        { q: 'This is my ___ book.', options: ["brother's", "brothers", "brother"], a: "brother's" },
        { q: "Mother's brother is a ___.", options: ['Uncle', 'Aunt', 'Cousin'], a: 'Uncle' },
        { q: 'This is my ___ toy.', options: ["sister's", "sisters", "sister"], a: "sister's" },
        { q: 'The son of my aunt is my ___.', options: ['Nephew', 'Cousin', 'Uncle'], a: 'Cousin' },
        { q: 'My ___ are visiting today.', options: ['Parents', 'Children', 'Friends'], a: 'Parents' },
        { q: 'The daughter of my brother is my ___.', options: ['Niece', 'Aunt', 'Cousin'], a: 'Niece' },
        { q: 'The brother of my father is my ___.', options: ['Uncle', 'Grandson', 'Cousin'], a: 'Uncle' },
        { q: 'My __ has two children.', options: ['Sister', 'Aunt', 'Teacher'], a: 'Sister' },
        { q: 'My wife is my ___.', options: ['Wife', 'Mother', 'Cousin'], a: 'Wife' }
      ]
    },
    {
      id: 4,
      title: 'FOOD',
      icon: '🍎',
      vocab: [
        { word: 'Apple', translation: 'Яблоко' },
        { word: 'Bread', translation: 'Хлеб' },
        { word: 'Milk', translation: 'Молоко' },
        { word: 'Cheese', translation: 'Сыр' },
        { word: 'Egg', translation: 'Яйцо' },
        { word: 'Fish', translation: 'Рыба' },
        { word: 'Meat', translation: 'Мясо' },
        { word: 'Rice', translation: 'Рис' },
        { word: 'Sugar', translation: 'Сахар' },
        { word: 'Butter', translation: 'Масло' }
      ],
      grammar: 'A / An / Some для еды',
      questions: [
        { q: 'I want ___ apple.', options: ['a', 'an', 'some'], a: 'an' },
        { q: 'Can I have ___ bread?', options: ['a', 'an', 'some'], a: 'some' },
        { q: 'I need ___ egg.', options: ['a', 'an', 'the'], a: 'an' },
        { q: 'He eats ___ cheese.', options: ['some', 'a', 'an'], a: 'some' },
        { q: 'I drink ___ milk.', options: ['some', 'a', 'an'], a: 'some' },
        { q: 'She buys ___ fish.', options: ['a', 'an', 'some'], a: 'some' },
        { q: 'I want ___ meat.', options: ['some', 'an', 'a'], a: 'some' },
        { q: 'Give me ___ rice.', options: ['some', 'a', 'an'], a: 'some' },
        { q: 'I eat ___ apple every day.', options: ['an', 'a', 'some'], a: 'an' },
        { q: 'Please pass ___ butter.', options: ['the', 'a', 'an'], a: 'the' }
      ]
    },
    {
      id: 5,
      title: 'ANIMALS',
      icon: '🐶',
      vocab: [
        { word: 'Dog', translation: 'Собака' },
        { word: 'Cat', translation: 'Кошка' },
        { word: 'Bird', translation: 'Птица' },
        { word: 'Horse', translation: 'Лошадь' },
        { word: 'Cow', translation: 'Корова' },
        { word: 'Fish', translation: 'Рыба' },
        { word: 'Sheep', translation: 'Овца' },
        { word: 'Pig', translation: 'Свинья' },
        { word: 'Mouse', translation: 'Мышь' },
        { word: 'Lion', translation: 'Лев' }
      ],
      grammar: 'Regular plural nouns: dog -> dogs, cat -> cats',
      questions: [
        { q: 'One dog, two ___.', options: ['Dogs', 'Dogss', 'Dog'], a: 'Dogs' },
        { q: 'One cat, three ___.', options: ['Cats', 'Cat', 'Cates'], a: 'Cats' },
        { q: 'A baby sheep is a ___.', options: ['Sheep', 'Sheeps', 'Sheepes'], a: 'Sheep' },
        { q: 'A male cow is a ___.', options: ['Bull', 'Cow', 'Horse'], a: 'Bull' },
        { q: 'A small mouse is a ___.', options: ['Mouse', 'Mice', 'Mouses'], a: 'Mouse' },
        { q: 'A bird can ___.', options: ['Fly', 'Swim', 'Run'], a: 'Fly' },
        { q: 'A horse lives in a ___.', options: ['Stable', 'Cage', 'Nest'], a: 'Stable' },
        { q: 'A lion is a ___.', options: ['Cat', 'Dog', 'Fish'], a: 'Cat' },
        { q: 'A cow gives ___.', options: ['Milk', 'Bread', 'Eggs'], a: 'Milk' },
        { q: 'A pig lives on a ___.', options: ['Farm', 'House', 'School'], a: 'Farm' }
      ]
    },
    {
      id: 6,
      title: 'CLOTHES',
      icon: '👕',
      vocab: [
        { word: 'Shirt', translation: 'Рубашка' },
        { word: 'Pants', translation: 'Штаны' },
        { word: 'Shoes', translation: 'Обувь' },
        { word: 'Hat', translation: 'Шляпа' },
        { word: 'Dress', translation: 'Платье' },
        { word: 'Coat', translation: 'Пальто' },
        { word: 'Socks', translation: 'Носки' },
        { word: 'Skirt', translation: 'Юбка' },
        { word: 'Jacket', translation: 'Куртка' },
        { word: 'Gloves', translation: 'Перчатки' }
      ],
      grammar: 'This / That / These / Those',
      questions: [
        { q: '___ shirt is blue.', options: ['This', 'Those', 'These'], a: 'This' },
        { q: '___ shoes are new.', options: ['These', 'This', 'That'], a: 'These' },
        { q: '___ hat is on the table.', options: ['That', 'These', 'Those'], a: 'That' },
        { q: '___ gloves belong to me.', options: ['These', 'This', 'Those'], a: 'These' },
        { q: '___ dress looks beautiful.', options: ['That', 'These', 'This'], a: 'That' },
        { q: '___ pants are too big.', options: ['These', 'This', 'Those'], a: 'Those' },
        { q: '___ jacket is warm.', options: ['This', 'Those', 'These'], a: 'This' },
        { q: '___ skirt is red.', options: ['That', 'This', 'These'], a: 'That' },
        { q: '___ coat is heavy.', options: ['This', 'Those', 'These'], a: 'This' },
        { q: '___ socks are clean.', options: ['Those', 'This', 'These'], a: 'Those' }
      ]
    },
    {
      id: 7,
      title: 'SCHOOL',
      icon: '🏫',
      vocab: [
        { word: 'Teacher', translation: 'Учитель' },
        { word: 'Student', translation: 'Ученик' },
        { word: 'Book', translation: 'Книга' },
        { word: 'Desk', translation: 'Парта' },
        { word: 'Lesson', translation: 'Урок' },
        { word: 'Class', translation: 'Класс' },
        { word: 'Homework', translation: 'Домашняя работа' },
        { word: 'Pen', translation: 'Ручка' },
        { word: 'Pencil', translation: 'Карандаш' },
        { word: 'Schoolbag', translation: 'Рюкзак' }
      ],
      grammar: 'Can / Can’t для умения',
      questions: [
        { q: 'I ___ read this book.', options: ['can', 'can’t', 'is'], a: 'can' },
        { q: 'She ___ write with a pen.', options: ['can', 'can’t', 'does'], a: 'can' },
        { q: 'He ___ solve this math problem.', options: ['can', 'can’t', 'does'], a: 'can' },
        { q: 'We ___ sleep in class.', options: ['can’t', 'can', 'must'], a: 'can’t' },
        { q: 'They ___ draw a picture.', options: ['can', 'can’t', 'should'], a: 'can' },
        { q: 'You ___ forget your homework.', options: ['can’t', 'can', 'do'], a: 'can’t' },
        { q: 'My friend ___ speak English.', options: ['can', 'can’t', 'does'], a: 'can' },
        { q: 'The student ___ open the book.', options: ['can', 'can’t', 'is'], a: 'can' },
        { q: 'I ___ use a pencil.', options: ['can', 'can’t', 'does'], a: 'can' },
        { q: 'She ___ carry her schoolbag.', options: ['can', 'can’t', 'does'], a: 'can' }
      ]
    },
    {
      id: 8,
      title: 'COLORS',
      icon: '🎨',
      vocab: [
        { word: 'Red', translation: 'Красный' },
        { word: 'Blue', translation: 'Синий' },
        { word: 'Green', translation: 'Зелёный' },
        { word: 'Yellow', translation: 'Жёлтый' },
        { word: 'Black', translation: 'Чёрный' },
        { word: 'White', translation: 'Белый' },
        { word: 'Purple', translation: 'Фиолетовый' },
        { word: 'Orange', translation: 'Оранжевый' },
        { word: 'Pink', translation: 'Розовый' },
        { word: 'Brown', translation: 'Коричневый' }
      ],
      grammar: 'Color adjectives after this/that/these/those',
      questions: [
        { q: 'This ball is ___.', options: ['red', 'blue', 'chair'], a: 'red' },
        { q: 'Those flowers are ___.', options: ['yellow', 'table', 'house'], a: 'yellow' },
        { q: 'This car is ___.', options: ['green', 'run', 'play'], a: 'green' },
        { q: 'That dress is ___.', options: ['pink', 'book', 'friend'], a: 'pink' },
        { q: 'These shoes are ___.', options: ['black', 'apple', 'sun'], a: 'black' },
        { q: 'This hat is ___.', options: ['orange', 'swim', 'eat'], a: 'orange' },
        { q: 'Those clouds are ___.', options: ['white', 'laugh', 'sing'], a: 'white' },
        { q: 'This frog is ___.', options: ['green', 'blue', 'cold'], a: 'green' },
        { q: 'That bag is ___.', options: ['brown', 'sweet', 'hard'], a: 'brown' },
        { q: 'These books are ___.', options: ['purple', 'small', 'fast'], a: 'purple' }
      ]
    },
    {
      id: 9,
      title: 'WEATHER',
      icon: '☀️',
      vocab: [
        { word: 'Sunny', translation: 'Солнечно' },
        { word: 'Rainy', translation: 'Дождливо' },
        { word: 'Cloudy', translation: 'Облачно' },
        { word: 'Windy', translation: 'Ветрено' },
        { word: 'Snowy', translation: 'Снежно' },
        { word: 'Hot', translation: 'Жарко' },
        { word: 'Cold', translation: 'Холодно' },
        { word: 'Stormy', translation: 'Шторм' },
        { word: 'Foggy', translation: 'Туманно' },
        { word: 'Warm', translation: 'Тепло' }
      ],
      grammar: 'It is + adjective',
      questions: [
        { q: '___ is sunny today.', options: ['It', 'They', 'We'], a: 'It' },
        { q: 'The weather is ___.', options: ['rainy', 'read', 'runny'], a: 'rainy' },
        { q: 'Today is ___.', options: ['cloudy', 'clumsy', 'clubby'], a: 'cloudy' },
        { q: 'The day is ___.', options: ['windy', 'window', 'wind'], a: 'windy' },
        { q: 'Yesterday was ___.', options: ['snowy', 'slowly', 'soggy'], a: 'snowy' },
        { q: 'In summer it is ___.', options: ['hot', 'cold', 'grey'], a: 'hot' },
        { q: 'In winter it is ___.', options: ['cold', 'hot', 'green'], a: 'cold' },
        { q: 'It is a ___.', options: ['stormy', 'story', 'stony'], a: 'stormy' },
        { q: 'In the morning it is ___.', options: ['foggy', 'funny', 'fog'], a: 'foggy' },
        { q: 'At noon it is ___.', options: ['warm', 'worm', 'wind',], a: 'warm' }
      ]
    },
    {
      id: 10,
      title: 'TRANSPORT',
      icon: '🚗',
      vocab: [
        { word: 'Bus', translation: 'Автобус' },
        { word: 'Car', translation: 'Машина' },
        { word: 'Train', translation: 'Поезд' },
        { word: 'Plane', translation: 'Самолёт' },
        { word: 'Boat', translation: 'Лодка' },
        { word: 'Bicycle', translation: 'Велосипед' },
        { word: 'Taxi', translation: 'Такси' },
        { word: 'Tram', translation: 'Трамвай' },
        { word: 'Metro', translation: 'Метро' },
        { word: 'Motorcycle', translation: 'Мотоцикл' }
      ],
      grammar: 'By + transport',
      questions: [
        { q: 'I go to school by ___.', options: ['bus', 'car', 'walk'], a: 'bus' },
        { q: 'She travels by ___.', options: ['train', 'road', 'foot'], a: 'train' },
        { q: 'We fly by ___.', options: ['plane', 'ship', 'bike'], a: 'plane' },
        { q: 'He goes to the park by ___.', options: ['bike', 'house', 'school'], a: 'bike' },
        { q: 'They take a ___.', options: ['boat', 'shirt', 'door'], a: 'boat' },
        { q: 'I ride a ___.', options: ['bicycle', 'dog', 'pizza'], a: 'bicycle' },
        { q: 'We catch a ___.', options: ['tram', 'phone', 'sun'], a: 'tram' },
        { q: 'I take the ___.', options: ['metro', 'cat', 'bag'], a: 'metro' },
        { q: 'She hails a ___.', options: ['taxi', 'table', 'hat'], a: 'taxi' },
        { q: 'He drives a ___.', options: ['car', 'book', 'tree'], a: 'car' }
      ]
    },
    {
      id: 11,
      title: 'CITY',
      icon: '🏙️',
      vocab: [
        { word: 'Street', translation: 'Улица' },
        { word: 'Square', translation: 'Площадь' },
        { word: 'Shop', translation: 'Магазин' },
        { word: 'Park', translation: 'Парк' },
        { word: 'Building', translation: 'Здание' },
        { word: 'Museum', translation: 'Музей' },
        { word: 'Restaurant', translation: 'Ресторан' },
        { word: 'Hospital', translation: 'Больница' },
        { word: 'Cinema', translation: 'Кинотеатр' },
        { word: 'Library', translation: 'Библиотека' }
      ],
      grammar: 'In / At / On для места',
      questions: [
        { q: 'I am ___ the street.', options: ['on', 'in', 'at'], a: 'on' },
        { q: 'She is ___ the park.', options: ['in', 'on', 'at'], a: 'in' },
        { q: 'He is ___ the museum.', options: ['at', 'in', 'on'], a: 'at' },
        { q: 'They are ___ the restaurant.', options: ['at', 'in', 'on'], a: 'at' },
        { q: 'The shop is ___ the corner.', options: ['on', 'in', 'at'], a: 'on' },
        { q: 'The library is ___ the street.', options: ['on', 'in', 'at'], a: 'on' },
        { q: 'The hospital is ___ the city.', options: ['in', 'at', 'on'], a: 'in' },
        { q: 'The cinema is ___ the square.', options: ['at', 'in', 'on'], a: 'at' },
        { q: 'The building is ___ the center.', options: ['in', 'on', 'at'], a: 'in' },
        { q: 'We meet ___ the square.', options: ['at', 'in', 'on'], a: 'at' }
      ]
    },
    {
      id: 12,
      title: 'NATURE',
      icon: '🌳',
      vocab: [
        { word: 'Tree', translation: 'Дерево' },
        { word: 'River', translation: 'Река' },
        { word: 'Mountain', translation: 'Гора' },
        { word: 'Lake', translation: 'Озеро' },
        { word: 'Forest', translation: 'Лес' },
        { word: 'Flower', translation: 'Цветок' },
        { word: 'Grass', translation: 'Трава' },
        { word: 'Sky', translation: 'Небо' },
        { word: 'Stone', translation: 'Камень' },
        { word: 'Beach', translation: 'Пляж' }
      ],
      grammar: 'There is / There are + nature',
      questions: [
        { q: 'There ___ a river.', options: ['is', 'are', 'was'], a: 'is' },
        { q: 'There ___ many trees.', options: ['are', 'is', 'am'], a: 'are' },
        { q: 'There ___ a lake.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'There ___ a mountain.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'There ___ flowers.', options: ['are', 'is', 'does'], a: 'are' },
        { q: 'There ___ grass in the park.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'There ___ a beach near the sea.', options: ['is', 'are', 'do'], a: 'is' },
        { q: 'There ___ stones on the path.', options: ['are', 'is', 'was'], a: 'are' },
        { q: 'There ___ blue sky today.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'There ___ a forest behind the house.', options: ['is', 'are', 'am'], a: 'is' }
      ]
    },
    {
      id: 13,
      title: 'TIME',
      icon: '⏰',
      vocab: [
        { word: 'Hour', translation: 'Час' },
        { word: 'Minute', translation: 'Минута' },
        { word: 'Second', translation: 'Секунда' },
        { word: 'Morning', translation: 'Утро' },
        { word: 'Afternoon', translation: 'День / После полудня' },
        { word: 'Evening', translation: 'Вечер' },
        { word: 'Night', translation: 'Ночь' },
        { word: 'Today', translation: 'Сегодня' },
        { word: 'Tomorrow', translation: 'Завтра' },
        { word: 'Yesterday', translation: 'Вчера' }
      ],
      grammar: 'What time is it? / It is ... o’clock',
      questions: [
        { q: 'What time is it? It is ___.', options: ['five o’clock', 'red', 'fast'], a: 'five o’clock' },
        { q: 'The lesson is at ___.', options: ['nine o’clock', 'big', 'blue'], a: 'nine o’clock' },
        { q: 'We eat lunch in the ___.', options: ['afternoon', 'tree', 'house'], a: 'afternoon' },
        { q: 'The party is in the ___.', options: ['evening', 'apple', 'river'], a: 'evening' },
        { q: 'I sleep at ___.', options: ['night', 'sun', 'desk'], a: 'night' },
        { q: 'Today is ___.', options: ['today', 'tomorrow', 'yesterday'], a: 'today' },
        { q: 'Tomorrow is ___.', options: ['tomorrow', 'yesterday', 'today'], a: 'tomorrow' },
        { q: 'Yesterday was ___.', options: ['yesterday', 'tomorrow', 'tonight'], a: 'yesterday' },
        { q: 'I wake up in the ___.', options: ['morning', 'evening', 'winter'], a: 'morning' },
        { q: 'I rest after school in the ___.', options: ['afternoon', 'spring', 'garden'], a: 'afternoon' }
      ]
    },
    {
      id: 14,
      title: 'NUMBERS',
      icon: '🔢',
      vocab: [
        { word: 'One', translation: 'Один' },
        { word: 'Two', translation: 'Два' },
        { word: 'Three', translation: 'Три' },
        { word: 'Four', translation: 'Четыре' },
        { word: 'Five', translation: 'Пять' },
        { word: 'Six', translation: 'Шесть' },
        { word: 'Seven', translation: 'Семь' },
        { word: 'Eight', translation: 'Восемь' },
        { word: 'Nine', translation: 'Девять' },
        { word: 'Ten', translation: 'Десять' }
      ],
      grammar: 'How many? / There are ...',
      questions: [
        { q: 'How many apples? There are ___.', options: ['five', 'red', 'fast'], a: 'five' },
        { q: 'How many books? ___.', options: ['seven', 'blue', 'tall'], a: 'seven' },
        { q: 'There are ___ dogs.', options: ['three', 'apple', 'home'], a: 'three' },
        { q: 'How many chairs? ___.', options: ['four', 'green', 'hot'], a: 'four' },
        { q: 'There are ___ cats.', options: ['two', 'many', 'fast'], a: 'two' },
        { q: 'There are ___ windows.', options: ['eight', 'cold', 'red'], a: 'eight' },
        { q: 'How many pencils? ___.', options: ['six', 'long', 'new'], a: 'six' },
        { q: 'There are ___ birds.', options: ['nine', 'happy', 'small'], a: 'nine' },
        { q: 'How many students? ___.', options: ['ten', 'black', 'tall'], a: 'ten' },
        { q: 'There are ___ tables.', options: ['one', 'blue', 'fast'], a: 'one' }
      ]
    },
    {
      id: 15,
      title: 'EMOTIONS',
      icon: '😊',
      vocab: [
        { word: 'Happy', translation: 'Счастливый' },
        { word: 'Sad', translation: 'Грустный' },
        { word: 'Angry', translation: 'Злой' },
        { word: 'Scared', translation: 'Напуганный' },
        { word: 'Excited', translation: 'Взволнованный' },
        { word: 'Tired', translation: 'Усталый' },
        { word: 'Calm', translation: 'Спокойный' },
        { word: 'Surprised', translation: 'Удивлённый' },
        { word: 'Bored', translation: 'Скучающий' },
        { word: 'Proud', translation: 'Гордый' }
      ],
      grammar: 'To be + adjective: I am happy',
      questions: [
        { q: 'I __ happy.', options: ['am', 'is', 'are'], a: 'am' },
        { q: 'She __ sad.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'They __ angry.', options: ['are', 'is', 'am'], a: 'are' },
        { q: 'He __ scared.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'We __ excited.', options: ['are', 'is', 'am'], a: 'are' },
        { q: 'I __ tired.', options: ['am', 'is', 'are'], a: 'am' },
        { q: 'The baby __ calm.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'She __ surprised.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'They __ bored.', options: ['are', 'is', 'am'], a: 'are' },
        { q: 'He __ proud.', options: ['is', 'are', 'am'], a: 'is' }
      ]
    },
    {
      id: 16,
      title: 'JOBS',
      icon: '👩‍⚕️',
      vocab: [
        { word: 'Doctor', translation: 'Доктор' },
        { word: 'Teacher', translation: 'Учитель' },
        { word: 'Farmer', translation: 'Фермер' },
        { word: 'Driver', translation: 'Водитель' },
        { word: 'Chef', translation: 'Повар' },
        { word: 'Police', translation: 'Полицейский' },
        { word: 'Artist', translation: 'Художник' },
        { word: 'Nurse', translation: 'Медсестра' },
        { word: 'Builder', translation: 'Строитель' },
        { word: 'Singer', translation: 'Певец' }
      ],
      grammar: 'He / She is a ...',
      questions: [
        { q: 'She is a ___.', options: ['doctor', 'car', 'school'], a: 'doctor' },
        { q: 'He is a ___.', options: ['teacher', 'tree', 'game'], a: 'teacher' },
        { q: 'The man is a ___.', options: ['farmer', 'chair', 'book'], a: 'farmer' },
        { q: 'The woman is a ___.', options: ['driver', 'apple', 'green'], a: 'driver' },
        { q: 'He is a ___.', options: ['chef', 'dog', 'hat'], a: 'chef' },
        { q: 'She is a ___.', options: ['police', 'cup', 'door'], a: 'police' },
        { q: 'She is an ___.', options: ['artist', 'orange', 'ice'], a: 'artist' },
        { q: 'He is a ___.', options: ['nurse', 'bus', 'flower'], a: 'nurse' },
        { q: 'He is a ___.', options: ['builder', 'pencil', 'music'], a: 'builder' },
        { q: 'She is a ___.', options: ['singer', 'paper', 'sun'], a: 'singer' }
      ]
    },
    {
      id: 17,
      title: 'HEALTH',
      icon: '💊',
      vocab: [
        { word: 'Doctor', translation: 'Доктор' },
        { word: 'Medicine', translation: 'Медицина' },
        { word: 'Hospital', translation: 'Больница' },
        { word: 'Pain', translation: 'Боль' },
        { word: 'Healthy', translation: 'Здоровый' },
        { word: 'Sick', translation: 'Больной' },
        { word: 'Exercise', translation: 'Упражнение' },
        { word: 'Diet', translation: 'Диета' },
        { word: 'Water', translation: 'Вода' },
        { word: 'Rest', translation: 'Отдых' }
      ],
      grammar: 'Should / Shouldn’t',
      questions: [
        { q: 'You ___ drink water.', options: ['should', 'shouldn’t', 'can'], a: 'should' },
        { q: 'He ___ eat too much sugar.', options: ['shouldn’t', 'should', 'can'], a: 'shouldn’t' },
        { q: 'She ___ rest when sick.', options: ['should', 'shouldn’t', 'can'], a: 'should' },
        { q: 'You ___ ignore pain.', options: ['shouldn’t', 'should', 'must'], a: 'shouldn’t' },
        { q: 'We ___ exercise every day.', options: ['should', 'shouldn’t', 'can'], a: 'should' },
        { q: 'They ___ sleep enough.', options: ['should', 'shouldn’t', 'can'], a: 'should' },
        { q: 'He ___ visit the hospital if he is sick.', options: ['should', 'shouldn’t', 'must'], a: 'should' },
        { q: 'You ___ take medicine when needed.', options: ['should', 'shouldn’t', 'can'], a: 'should' },
        { q: 'She ___ skip breakfast.', options: ['shouldn’t', 'should', 'can'], a: 'shouldn’t' },
        { q: 'We ___ drink enough water.', options: ['should', 'can', 'must'], a: 'should' }
      ]
    },
    {
      id: 18,
      title: 'SPORTS',
      icon: '⚽',
      vocab: [
        { word: 'Football', translation: 'Футбол' },
        { word: 'Basketball', translation: 'Баскетбол' },
        { word: 'Tennis', translation: 'Теннис' },
        { word: 'Swimming', translation: 'Плавание' },
        { word: 'Running', translation: 'Бег' },
        { word: 'Cycling', translation: 'Велоспорт' },
        { word: 'Gym', translation: 'Тренажёрный зал' },
        { word: 'Coach', translation: 'Тренер' },
        { word: 'Team', translation: 'Команда' },
        { word: 'Goal', translation: 'Гол' }
      ],
      grammar: 'Like / Love + verb+ing',
      questions: [
        { q: 'I ___ football.', options: ['like', 'likes', 'liked'], a: 'like' },
        { q: 'She ___ swimming.', options: ['loves', 'love', 'liked'], a: 'loves' },
        { q: 'They ___ running.', options: ['like', 'likes', 'liked'], a: 'like' },
        { q: 'He ___ cycling.', options: ['likes', 'like', 'loved'], a: 'likes' },
        { q: 'We ___ basketball.', options: ['love', 'loves', 'liked'], a: 'love' },
        { q: 'I ___ tennis.', options: ['like', 'likes', 'love'], a: 'like' },
        { q: 'You ___ gym.', options: ['like', 'likes', 'love'], a: 'like' },
        { q: 'She ___ her coach.', options: ['loves', 'like', 'loved'], a: 'loves' },
        { q: 'They ___ their team.', options: ['love', 'loves', 'liked'], a: 'love' },
        { q: 'He ___ to score a ___.', options: ['goal', 'water', 'food'], a: 'goal' }
      ]
    },
    {
      id: 19,
      title: 'HOLIDAYS',
      icon: '🎉',
      vocab: [
        { word: 'Christmas', translation: 'Рождество' },
        { word: 'Birthday', translation: 'День рождения' },
        { word: 'Vacation', translation: 'Отпуск' },
        { word: 'Party', translation: 'Вечеринка' },
        { word: 'Gift', translation: 'Подарок' },
        { word: 'Cake', translation: 'Торт' },
        { word: 'Family', translation: 'Семья' },
        { word: 'Summer', translation: 'Лето' },
        { word: 'Winter', translation: 'Зима' },
        { word: 'Holiday', translation: 'Праздник' }
      ],
      grammar: 'Past simple: went / had / saw',
      questions: [
        { q: 'I ___ to the party yesterday.', options: ['went', 'go', 'gone'], a: 'went' },
        { q: 'We ___ cake at the birthday.', options: ['had', 'have', 'has'], a: 'had' },
        { q: 'She ___ a nice gift.', options: ['got', 'gets', 'get'], a: 'got' },
        { q: 'They ___ Christmas with family.', options: ['celebrated', 'celebrate', 'celebrates'], a: 'celebrated' },
        { q: 'He ___ on vacation last summer.', options: ['went', 'goes', 'gone'], a: 'went' },
        { q: 'I ___ new clothes.', options: ['bought', 'buy', 'buys'], a: 'bought' },
        { q: 'We ___ songs at the party.', options: ['sang', 'sing', 'sung'], a: 'sang' },
        { q: 'She ___ a card.', options: ['wrote', 'writes', 'write'], a: 'wrote' },
        { q: 'They ___ the fireworks.', options: ['saw', 'see', 'seen'], a: 'saw' },
        { q: 'He ___ a winter holiday.', options: ['had', 'has', 'have'], a: 'had' }
      ]
    },
    {
      id: 20,
      title: 'SHOPPING',
      icon: '🛍️',
      vocab: [
        { word: 'Price', translation: 'Цена' },
        { word: 'Money', translation: 'Деньги' },
        { word: 'Buy', translation: 'Покупать' },
        { word: 'Sell', translation: 'Продавать' },
        { word: 'Cash', translation: 'Наличные' },
        { word: 'Cart', translation: 'Корзина' },
        { word: 'Market', translation: 'Рынок' },
        { word: 'Bag', translation: 'Сумка' },
        { word: 'Shop', translation: 'Магазин' },
        { word: 'Sale', translation: 'Распродажа' }
      ],
      grammar: 'How much is ...?',
      questions: [
        { q: 'How much is the ___.', options: ['bag', 'run', 'green'], a: 'bag' },
        { q: 'The price is ___.', options: ['ten dollars', 'red', 'fast'], a: 'ten dollars' },
        { q: 'I want to ___.', options: ['buy', 'play', 'read'], a: 'buy' },
        { q: 'She will ___.', options: ['sell', 'sleep', 'jump'], a: 'sell' },
        { q: 'He pays with ___.', options: ['cash', 'water', 'food'], a: 'cash' },
        { q: 'Put items in the ___.', options: ['cart', 'box', 'chair'], a: 'cart' },
        { q: 'They go to the ___.', options: ['market', 'bed', 'school'], a: 'market' },
        { q: 'Take your ___.', options: ['bag', 'book', 'dog'], a: 'bag' },
        { q: 'The store is a ___.', options: ['shop', 'park', 'room'], a: 'shop' },
        { q: 'There is a big ___.', options: ['sale', 'sun', 'table'], a: 'sale' }
      ]
    },
    {
      id: 21,
      title: 'TECHNOLOGY',
      icon: '💻',
      vocab: [
        { word: 'Computer', translation: 'Компьютер' },
        { word: 'Phone', translation: 'Телефон' },
        { word: 'Internet', translation: 'Интернет' },
        { word: 'Email', translation: 'Электронная почта' },
        { word: 'Tablet', translation: 'Планшет' },
        { word: 'Screen', translation: 'Экран' },
        { word: 'Keyboard', translation: 'Клавиатура' },
        { word: 'Mouse', translation: 'Мышь' },
        { word: 'Battery', translation: 'Батарея' },
        { word: 'Camera', translation: 'Камера' }
      ],
      grammar: 'Can / Can’t for devices',
      questions: [
        { q: 'I ___ use the computer.', options: ['can', 'can’t', 'does'], a: 'can' },
        { q: 'She ___ send an email.', options: ['can', 'can’t', 'do'], a: 'can' },
        { q: 'He ___ open the app on the phone.', options: ['can', 'can’t', 'may'], a: 'can' },
        { q: 'They ___ charge the battery.', options: ['can', 'can’t', 'will'], a: 'can' },
        { q: 'We ___ take a photo with the camera.', options: ['can', 'can’t', 'do'], a: 'can' },
        { q: 'I ___ use a tablet.', options: ['can', 'can’t', 'may'], a: 'can' },
        { q: 'She ___ type on the keyboard.', options: ['can', 'can’t', 'is'], a: 'can' },
        { q: 'He ___ move the mouse.', options: ['can', 'can’t', 'must'], a: 'can' },
        { q: 'The screen ___ show pictures.', options: ['can', 'can’t', 'does'], a: 'can' },
        { q: 'The phone ___ ring.', options: ['can', 'can’t', 'will'], a: 'can' }
      ]
    },
    {
      id: 22,
      title: 'COUNTRIES',
      icon: '🌍',
      vocab: [
        { word: 'Russia', translation: 'Россия' },
        { word: 'France', translation: 'Франция' },
        { word: 'Japan', translation: 'Япония' },
        { word: 'Spain', translation: 'Испания' },
        { word: 'Italy', translation: 'Италия' },
        { word: 'China', translation: 'Китай' },
        { word: 'Brazil', translation: 'Бразилия' },
        { word: 'Canada', translation: 'Канада' },
        { word: 'India', translation: 'Индия' },
        { word: 'Germany', translation: 'Германия' }
      ],
      grammar: 'I am from ... / He is from ...',
      questions: [
        { q: 'I am from ___.', options: ['Russia', 'Blue', 'Car'], a: 'Russia' },
        { q: 'She is from ___.', options: ['France', 'Happy', 'School'], a: 'France' },
        { q: 'He is from ___.', options: ['Japan', 'Green', 'House'], a: 'Japan' },
        { q: 'We are from ___.', options: ['Spain', 'Fast', 'Desk'], a: 'Spain' },
        { q: 'They are from ___.', options: ['Italy', 'Cold', 'Bread'], a: 'Italy' },
        { q: 'I am from ___.', options: ['China', 'Warm', 'Light'], a: 'China' },
        { q: 'She is from ___.', options: ['Brazil', 'Tall', 'Soft'], a: 'Brazil' },
        { q: 'He is from ___.', options: ['Canada', 'Short', 'Loud'], a: 'Canada' },
        { q: 'We are from ___.', options: ['India', 'Sweet', 'Blue'], a: 'India' },
        { q: 'They are from ___.', options: ['Germany', 'Green', 'Happy'], a: 'Germany' }
      ]
    },
    {
      id: 23,
      title: 'DAILY ROUTINE',
      icon: '📅',
      vocab: [
        { word: 'Wake up', translation: 'Просыпаться' },
        { word: 'Brush', translation: 'Чистить' },
        { word: 'Eat breakfast', translation: 'Завтракать' },
        { word: 'Go to school', translation: 'Идти в школу' },
        { word: 'Study', translation: 'Учиться' },
        { word: 'Play', translation: 'Играть' },
        { word: 'Sleep', translation: 'Спать' },
        { word: 'Read', translation: 'Читать' },
        { word: 'Walk', translation: 'Гулять' },
        { word: 'Cook', translation: 'Готовить' }
      ],
      grammar: 'Present simple: I get up at 7',
      questions: [
        { q: 'I ___ up at 7.', options: ['wake', 'wakes', 'woke'], a: 'wake' },
        { q: 'She ___ her teeth.', options: ['brushes', 'brush', 'brushed'], a: 'brushes' },
        { q: 'We ___ breakfast.', options: ['eat', 'eats', 'ate'], a: 'eat' },
        { q: 'He ___ to school.', options: ['goes', 'go', 'went'], a: 'goes' },
        { q: 'They ___ after school.', options: ['study', 'studies', 'studied'], a: 'study' },
        { q: 'I ___ with my friends.', options: ['play', 'plays', 'played'], a: 'play' },
        { q: 'She ___ at night.', options: ['sleeps', 'sleep', 'slept'], a: 'sleeps' },
        { q: 'He ___ a book.', options: ['reads', 'read', 'reading'], a: 'reads' },
        { q: 'We ___ in the park.', options: ['walk', 'walks', 'walked'], a: 'walk' },
        { q: 'She ___ dinner every evening.', options: ['cooks', 'cook', 'cooked'], a: 'cooks' }
      ]
    },
    {
      id: 24,
      title: 'KITCHEN',
      icon: '🍽️',
      vocab: [
        { word: 'Fridge', translation: 'Холодильник' },
        { word: 'Oven', translation: 'Духовка' },
        { word: 'Sink', translation: 'Раковина' },
        { word: 'Knife', translation: 'Нож' },
        { word: 'Plate', translation: 'Тарелка' },
        { word: 'Cup', translation: 'Чашка' },
        { word: 'Fork', translation: 'Вилка' },
        { word: 'Spoon', translation: 'Ложка' },
        { word: 'Stove', translation: 'Плита' },
        { word: 'Table', translation: 'Стол' }
      ],
      grammar: 'There is / There are in the kitchen',
      questions: [
        { q: 'There ___ a fridge.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'There ___ two plates.', options: ['are', 'is', 'am'], a: 'are' },
        { q: 'There ___ a stove.', options: ['is', 'are', 'was'], a: 'is' },
        { q: 'There ___ a sink.', options: ['is', 'are', 'do'], a: 'is' },
        { q: 'There ___ a cup on the table.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'There ___ four forks.', options: ['are', 'is', 'am'], a: 'are' },
        { q: 'There ___ a knife.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'There ___ two spoons.', options: ['are', 'is', 'was'], a: 'are' },
        { q: 'There ___ an oven.', options: ['is', 'are', 'has'], a: 'is' },
        { q: 'There ___ a table.', options: ['is', 'are', 'am'], a: 'is' }
      ]
    },
    {
      id: 25,
      title: 'MUSIC',
      icon: '🎵',
      vocab: [
        { word: 'Song', translation: 'Песня' },
        { word: 'Dance', translation: 'Танец' },
        { word: 'Guitar', translation: 'Гитара' },
        { word: 'Piano', translation: 'Пианино' },
        { word: 'Drum', translation: 'Барабан' },
        { word: 'Singer', translation: 'Певец' },
        { word: 'Rhythm', translation: 'Ритм' },
        { word: 'Melody', translation: 'Мелодия' },
        { word: 'Band', translation: 'Группа' },
        { word: 'Concert', translation: 'Концерт' }
      ],
      grammar: 'Like / Don’t like music',
      questions: [
        { q: 'I ___ songs.', options: ['like', 'likes', 'loves'], a: 'like' },
        { q: 'She ___ the piano.', options: ['plays', 'play', 'played'], a: 'plays' },
        { q: 'We ___ dancing.', options: ['love', 'loves', 'loved'], a: 'love' },
        { q: 'He ___ the guitar.', options: ['plays', 'play', 'played'], a: 'plays' },
        { q: 'They ___ the band.', options: ['like', 'likes', 'liked'], a: 'like' },
        { q: 'She ___ the concert.', options: ['loves', 'love', 'loved'], a: 'loves' },
        { q: 'I ___ the rhythm.', options: ['love', 'loves', 'liked'], a: 'love' },
        { q: 'He ___ the melody.', options: ['likes', 'like', 'liked'], a: 'likes' },
        { q: 'We ___ a song.', options: ['hear', 'hears', 'heard'], a: 'hear' },
        { q: 'She ___ the drum.', options: ['plays', 'play', 'played'], a: 'plays' }
      ]
    },
    {
      id: 26,
      title: 'FURNITURE',
      icon: '🛋️',
      vocab: [
        { word: 'Table', translation: 'Стол' },
        { word: 'Chair', translation: 'Стул' },
        { word: 'Sofa', translation: 'Диван' },
        { word: 'Bed', translation: 'Кровать' },
        { word: 'Shelf', translation: 'Полка' },
        { word: 'Couch', translation: 'Диван' },
        { word: 'Cupboard', translation: 'Шкаф' },
        { word: 'Desk', translation: 'Парта' },
        { word: 'Drawer', translation: 'Ящик' },
        { word: 'Lamp', translation: 'Лампа' }
      ],
      grammar: 'There is / There are + furniture',
      questions: [
        { q: 'There ___ a table.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'There ___ two chairs.', options: ['are', 'is', 'am'], a: 'are' },
        { q: 'There ___ a sofa.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'There ___ a bed.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'There ___ a shelf.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'There ___ a couch.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'There ___ a cupboard.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'There ___ a desk.', options: ['is', 'are', 'am'], a: 'is' },
        { q: 'There ___ three drawers.', options: ['are', 'is', 'am'], a: 'are' },
        { q: 'There ___ a lamp.', options: ['is', 'are', 'am'], a: 'is' }
      ]
    },
    {
      id: 27,
      title: 'SEASONS',
      icon: '🍂',
      vocab: [
        { word: 'Spring', translation: 'Весна' },
        { word: 'Summer', translation: 'Лето' },
        { word: 'Autumn', translation: 'Осень' },
        { word: 'Winter', translation: 'Зима' },
        { word: 'Rain', translation: 'Дождь' },
        { word: 'Snow', translation: 'Снег' },
        { word: 'Leaves', translation: 'Листья' },
        { word: 'Cold', translation: 'Холодно' },
        { word: 'Warm', translation: 'Тепло' },
        { word: 'Wind', translation: 'Ветер' }
      ],
      grammar: 'In + season',
      questions: [
        { q: 'I swim in ___.', options: ['summer', 'winter', 'spring'], a: 'summer' },
        { q: 'It is rainy in ___.', options: ['spring', 'summer', 'autumn'], a: 'spring' },
        { q: 'We ski in ___.', options: ['winter', 'summer', 'autumn'], a: 'winter' },
        { q: 'Leaves fall in ___.', options: ['autumn', 'spring', 'summer'], a: 'autumn' },
        { q: 'It is warm in ___.', options: ['summer', 'winter', 'spring'], a: 'summer' },
        { q: 'It is cold in ___.', options: ['winter', 'spring', 'autumn'], a: 'winter' },
        { q: 'It rains in ___.', options: ['spring', 'winter', 'summer'], a: 'spring' },
        { q: 'It snows in ___.', options: ['winter', 'autumn', 'summer'], a: 'winter' },
        { q: 'The wind is strong in ___.', options: ['autumn', 'summer', 'spring'], a: 'autumn' },
        { q: 'Flowers grow in ___.', options: ['spring', 'winter', 'autumn'], a: 'spring' }
      ]
    },
    {
      id: 28,
      title: 'FEELINGS',
      icon: '😌',
      vocab: [
        { word: 'Calm', translation: 'Спокойный' },
        { word: 'Nervous', translation: 'Нервный' },
        { word: 'Brave', translation: 'Храбрый' },
        { word: 'Shy', translation: 'Застенчивый' },
        { word: 'Curious', translation: 'Любопытный' },
        { word: 'Proud', translation: 'Гордый' },
        { word: 'Jealous', translation: 'Ревнивый' },
        { word: 'Relaxed', translation: 'Расслабленный' },
        { word: 'Confident', translation: 'Уверенный' },
        { word: 'Hungry', translation: 'Голодный' }
      ],
      grammar: 'I feel + adjective',
      questions: [
        { q: 'I feel ___.', options: ['calm', 'fast', 'hot'], a: 'calm' },
        { q: 'She feels ___.', options: ['nervous', 'heavy', 'loud'], a: 'nervous' },
        { q: 'He feels ___.', options: ['brave', 'blue', 'soft'], a: 'brave' },
        { q: 'They feel ___.', options: ['shy', 'tall', 'wide'], a: 'shy' },
        { q: 'We feel ___.', options: ['curious', 'green', 'square'], a: 'curious' },
        { q: 'I feel ___.', options: ['proud', 'cold', 'new'], a: 'proud' },
        { q: 'She feels ___.', options: ['jealous', 'quick', 'short'], a: 'jealous' },
        { q: 'He feels ___.', options: ['relaxed', 'heavy', 'sharp'], a: 'relaxed' },
        { q: 'We feel ___.', options: ['confident', 'pretty', 'happy'], a: 'confident' },
        { q: 'I feel ___.', options: ['hungry', 'bright', 'clean'], a: 'hungry' }
      ]
    },
    {
      id: 29,
      title: 'TRAVEL',
      icon: '✈️',
      vocab: [
        { word: 'Ticket', translation: 'Билет' },
        { word: 'Passport', translation: 'Паспорт' },
        { word: 'Hotel', translation: 'Отель' },
        { word: 'Map', translation: 'Карта' },
        { word: 'Guide', translation: 'Гид' },
        { word: 'Suitcase', translation: 'Чемодан' },
        { word: 'Airport', translation: 'Аэропорт' },
        { word: 'Train station', translation: 'Вокзал' },
        { word: 'Tour', translation: 'Тур' },
        { word: 'Booking', translation: 'Бронирование' }
      ],
      grammar: 'Must / Need to',
      questions: [
        { q: 'You ___ take a passport.', options: ['must', 'may', 'can'], a: 'must' },
        { q: 'She ___ buy a ticket.', options: ['needs to', 'need to', 'must'], a: 'needs to' },
        { q: 'We ___ book a hotel.', options: ['need to', 'needs to', 'can'], a: 'need to' },
        { q: 'He ___ use a map.', options: ['must', 'can', 'may'], a: 'must' },
        { q: 'They ___ pack a suitcase.', options: ['need to', 'needs to', 'must'], a: 'need to' },
        { q: 'You ___ arrive at the airport early.', options: ['must', 'can', 'may'], a: 'must' },
        { q: 'She ___ go to the train station.', options: ['needs to', 'need to', 'must'], a: 'needs to' },
        { q: 'We ___ follow the guide.', options: ['must', 'can', 'may'], a: 'must' },
        { q: 'They ___ do booking online.', options: ['need to', 'needs to', 'can'], a: 'need to' },
        { q: 'He ___ carry the passport.', options: ['must', 'can', 'may'], a: 'must' }
      ]
    },
    {
      id: 30,
      title: 'HABITATS',
      icon: '🏞️',
      vocab: [
        { word: 'Forest', translation: 'Лес' },
        { word: 'Desert', translation: 'Пустыня' },
        { word: 'Ocean', translation: 'Океан' },
        { word: 'River', translation: 'Река' },
        { word: 'Cave', translation: 'Пещера' },
        { word: 'Jungle', translation: 'Джунгли' },
        { word: 'Mountain', translation: 'Гора' },
        { word: 'Savannah', translation: 'Саванна' },
        { word: 'Arctic', translation: 'Арктика' },
        { word: 'Valley', translation: 'Долина' }
      ],
      grammar: 'Live in / Live on / Live at',
      questions: [
        { q: 'A tiger lives in the ___.', options: ['jungle', 'desert', 'city'], a: 'jungle' },
        { q: 'A camel lives in the ___.', options: ['desert', 'forest', 'ocean'], a: 'desert' },
        { q: 'A fish lives in the ___.', options: ['ocean', 'mountain', 'house'], a: 'ocean' },
        { q: 'A bear lives in the ___.', options: ['forest', 'city', 'shop'], a: 'forest' },
        { q: 'A penguin lives in the ___.', options: ['arctic', 'jungle', 'desert'], a: 'arctic' },
        { q: 'A frog lives near the ___.', options: ['river', 'house', 'bed'], a: 'river' },
        { q: 'A bat lives in a ___.', options: ['cave', 'school', 'car'], a: 'cave' },
        { q: 'A lion lives on the ___.', options: ['savannah', 'ocean', 'road'], a: 'savannah' },
        { q: 'Goat lives in the ___.', options: ['mountain', 'city', 'bed'], a: 'mountain' },
        { q: 'A valley is between two ___.', options: ['mountains', 'books', 'cars'], a: 'mountains' }
      ]
    }
  ];

  const handleAnswer = (option, correct) => {
    if (userAnswer !== null) return;
    setUserAnswer(option);
    const correctCheck = option === correct;
    setIsCorrect(correctCheck);
    if (correctCheck) setScore(prev => prev + 1);
  };

  const nextStep = () => {
    if (currentQuestionIndex < selectedLesson.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer(null);
      setIsCorrect(null);
    } else {
      setIsLessonFinished(true);
    }
  };

  const closeLesson = async () => {
    console.log("Отправка статов для пользователя:", userId);

    if (!userId) {
      alert('Нужно войти в систему, чтобы сохранить прогресс.');
      return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/stats/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                lessonId: selectedLesson.id,
                score: score
            })
        });
        const data = await response.json();
        console.log("Успешно сохранено:", data);

        if (response.ok && onStatsUpdate) onStatsUpdate();
    } catch (err) {
        console.error("Ошибка при сохранении в базу:", err);
    }

    // 2. СБРОС ТЕСТА
    setSelectedLesson(null);
    setCurrentQuestionIndex(0);
    setUserAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setIsLessonFinished(false);
  };

  // ЭКРАН РЕЗУЛЬТАТА
  if (isLessonFinished) {
    const isSuccess = score >= 7;
    return (
      <div style={styles.resultPage}>
        <div style={styles.resultCard}>
          <h1 style={{...styles.resultTitle, color: isSuccess ? '#58CC02' : '#EA2B2B'}}>
            {isSuccess ? 'Блестяще!' : 'Нужно еще подучить...'}
          </h1>
          <div style={{...styles.scoreCircle, borderColor: isSuccess ? '#58CC02' : '#EA2B2B'}}>
            <span style={styles.scoreText}>{score}</span>
            <span style={styles.scoreTotal}>/ 10</span>
          </div>
          <p style={styles.resultDesc}>
            Ты ответила правильно на {score} из 10 вопросов.
          </p>
          <div style={styles.lessonResultSummary}>
            <p style={styles.resultLine}><strong>Почта:</strong> {user?.email || 'Не указана'}</p>
            <p style={styles.resultLine}><strong>Стрейк:</strong> {user?.streak || 0}</p>
            <p style={styles.resultLine}><strong>Уроков пройдено:</strong> {user?.lessonsCompleted || 0}</p>
          </div>
          <button onClick={closeLesson} style={styles.continueBtn}>ЗАВЕРШИТЬ</button>
        </div>
      </div>
    );
  }

  // ЭКРАН ТЕСТА
  if (selectedLesson) {
    const currentQ = selectedLesson.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / 10) * 100;

    return (
      <div style={styles.lessonPage}>
        <div style={styles.lessonHeader}>
          <button onClick={() => setSelectedLesson(null)} style={styles.backBtn}>✕</button>
          <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: `${progress}%` }}></div></div>
        </div>

        <div style={styles.quizWrapper}>
            {/* БЛОК ТЕОРИИ (ОБЪЯСНЕНИЕ) */}
            <div style={styles.infoBox}>
                <div style={styles.theoryTag}>ТЕОРИЯ</div>
                <p style={styles.vocabSmall}><strong>Слова:</strong> {selectedLesson.vocab.map(item => `${item.word} — ${item.translation}`).join(', ')}</p>
                <p style={styles.grammarSmall}><strong>Правило:</strong> {selectedLesson.grammar}</p>
            </div>

            <h2 style={styles.questionText}>{currentQ.q}</h2>
            <div style={styles.optionsGrid}>
                {currentQ.options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt, currentQ.a)}
                    style={userAnswer === opt ? (isCorrect ? styles.correctBtn : styles.wrongBtn) : (userAnswer !== null && opt === currentQ.a ? styles.correctBtn : styles.optionBtn)}>
                    {opt}
                </button>
                ))}
            </div>
        </div>

        {userAnswer !== null && (
          <div style={{...styles.feedbackBar, backgroundColor: isCorrect ? '#D7FFB8' : '#FFDFE0'}}>
             <div style={styles.feedbackContent}>
                <span style={{color: isCorrect ? '#58CC02' : '#EA2B2B', fontWeight: '900', fontSize: '20px'}}>
                    {isCorrect ? 'ВЕРНО! ✨' : `ОШИБКА! ПРАВИЛЬНО: ${currentQ.a}`}
                </span>
                <button onClick={nextStep} style={styles.continueBtn}>ДАЛЕЕ</button>
             </div>
          </div>
        )}
      </div>
    );
  }

  // КАРТА УРОКОВ
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>ОБУЧЕНИЕ</h1>
      <div style={styles.roadmap}>
        {lessons.map((lesson, index) => {
          const isPassed = user?.completedLessons?.includes(lesson.id);
          return (
            <div key={lesson.id} style={styles.nodeContainer}>
              <div style={{...styles.node, marginLeft: index % 2 === 0 ? '-45px' : '45px', backgroundColor: isPassed ? '#58CC02' : '#E5E7EB'}} onClick={() => setSelectedLesson(lesson)}>
                <span style={styles.nodeIcon}>{lesson.icon}</span>
                {isPassed && <span style={styles.checkMark}>✅</span>}
              </div>
              <p style={{...styles.nodeLabel, marginLeft: index % 2 === 0 ? '-45px' : '45px'}}>{lesson.title}</p>
              {index < lessons.length - 1 && <div style={{...styles.line, marginLeft: index % 2 === 0 ? '-45px' : '45px'}}></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px 20px', backgroundColor: '#fff', minHeight: '100vh' },
  title: { fontWeight: '900', color: '#3C3C3C', marginBottom: '50px', fontSize: '26px', textAlign: 'center' },
  roadmap: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  nodeContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' },
  node: { width: '85px', height: '85px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', border: '4px solid #fff', boxShadow: '0 8px 0 #AFB4BD' },
  nodeIcon: { fontSize: '38px' },
  checkMark: { position: 'absolute', top: '-5px', right: '-5px', fontSize: '20px' },
  nodeLabel: { fontWeight: '900', color: '#4B4B4B', fontSize: '11px', marginTop: '8px', textTransform: 'uppercase' },
  line: { width: '10px', height: '40px', backgroundColor: '#E5E7EB' },
  
  lessonPage: { maxWidth: '600px', margin: '0 auto', padding: '20px', height: '100vh', display: 'flex', flexDirection: 'column' },
  lessonHeader: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' },
  backBtn: { background: 'none', border: 'none', fontSize: '26px', cursor: 'pointer', color: '#AFB4BD' },
  progressBar: { flex: 1, height: '16px', backgroundColor: '#E5E7EB', borderRadius: '15px', overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#58CC02', transition: 'width 0.3s' },
  
  quizWrapper: { flex: 1, display: 'flex', flexDirection: 'column' },
  infoBox: { backgroundColor: '#F0F7FF', padding: '15px', borderRadius: '15px', marginBottom: '25px', border: '2px solid #C2E0FF', position: 'relative' },
  theoryTag: { position: 'absolute', top: '-10px', right: '10px', backgroundColor: '#1CB0F6', color: '#fff', padding: '2px 10px', borderRadius: '10px', fontSize: '10px', fontWeight: '900' },
  vocabSmall: { fontSize: '14px', margin: '0 0 5px 0', color: '#1F2937' },
  grammarSmall: { fontSize: '13px', color: '#4B5563', margin: 0, fontStyle: 'italic' },
  
  questionText: { fontSize: '28px', fontWeight: '900', color: '#3C3C3C', marginBottom: '30px' },
  optionsGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  optionBtn: { padding: '20px', borderRadius: '18px', border: '2px solid #E5E7EB', backgroundColor: '#fff', fontWeight: '800', fontSize: '18px', textAlign: 'left', cursor: 'pointer', boxShadow: '0 4px 0 #E5E7EB' },
  correctBtn: { padding: '20px', borderRadius: '18px', border: '2px solid #58CC02', backgroundColor: '#D7FFB8', color: '#58CC02', fontWeight: '800', fontSize: '18px', boxShadow: '0 4px 0 #58CC02' },
  wrongBtn: { padding: '20px', borderRadius: '18px', border: '2px solid #EA2B2B', backgroundColor: '#FFDFE0', color: '#EA2B2B', fontWeight: '800', fontSize: '18px', boxShadow: '0 4px 0 #EA2B2B' },

  feedbackBar: { position: 'fixed', bottom: 0, left: 0, right: 0, padding: '30px', borderTop: '2px solid #E5E5E5', zIndex: 100 },
  feedbackContent: { maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  continueBtn: { padding: '15px 45px', backgroundColor: '#58CC02', color: '#fff', border: 'none', borderRadius: '15px', fontWeight: '900', fontSize: '17px', cursor: 'pointer', boxShadow: '0 5px 0 #46A302' },

  resultPage: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  resultCard: { textAlign: 'center', maxWidth: '400px', padding: '20px' },
  resultTitle: { fontSize: '34px', fontWeight: '900', marginBottom: '20px' },
  scoreCircle: { margin: '30px auto', width: '130px', height: '130px', borderRadius: '50%', border: '10px solid #58CC02', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  scoreText: { fontSize: '50px', fontWeight: '900', color: '#3C3C3C' },
  scoreTotal: { fontSize: '22px', color: '#AFB4BD', marginLeft: '5px' },
  resultDesc: { fontSize: '18px', color: '#777', marginBottom: '25px' },
  lessonResultSummary: { display: 'grid', gap: '8px', textAlign: 'left', margin: '0 auto 25px', maxWidth: '280px' },
  resultLine: { fontSize: '14px', color: '#4B5563', margin: 0 }
};

export default Learn;