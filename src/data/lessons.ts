import type { Lesson } from '../types/lesson.types';
import type { VocabularyWord } from '../types/vocabulary.types';

const words = (lessonId: number, entries: Array<[string, string, string, string, string]>): VocabularyWord[] =>
  entries.map(([ru, translit, en, es, emoji], index) => ({
    id: `l${lessonId}-w${index + 1}`,
    ru,
    translit,
    en,
    es,
    emoji,
    lessonId
  }));

export const lessons: Lesson[] = [
  {
    id: 1,
    title: { en: 'Greetings and Basics', es: 'Saludos y básicos' },
    description: { en: 'Say hello, goodbye, and use your first polite words.', es: 'Saluda, despídete y usa tus primeras palabras corteses.' },
    vocabulary: words(1, [
      ['привет', 'privet', 'hi', 'hola', '👋'], ['здравствуйте', 'zdravstvuyte', 'hello', 'buenos días', '🤝'], ['пока', 'poka', 'bye', 'adiós', '👋'], ['спасибо', 'spasibo', 'thank you', 'gracias', '🙏'],
      ['пожалуйста', 'pozhaluysta', 'please', 'por favor', '✨'], ['да', 'da', 'yes', 'sí', '✅'], ['нет', 'net', 'no', 'no', '❌'], ['извините', 'izvinite', 'excuse me', 'disculpe', '🙇'],
      ['хорошо', 'khorosho', 'good', 'bien', '👍'], ['плохо', 'plokho', 'bad', 'mal', '👎'], ['как', 'kak', 'how', 'cómo', '❓'], ['вы', 'vy', 'you formal', 'usted', '🧑']
    ]),
    grammar: { en: 'Russian has formal and informal you. Use вы with strangers and teachers; ты is for friends.', es: 'El ruso tiene usted formal e informal. Usa вы con desconocidos y profesores; ты es para amigos.' },
    sentences: [
      { ru: 'Здравствуйте, как вы?', translit: 'Zdravstvuyte, kak vy?', en: 'Hello, how are you?', es: 'Hola, ¿cómo está?' },
      { ru: 'Спасибо, хорошо.', translit: 'Spasibo, khorosho.', en: 'Thank you, good.', es: 'Gracias, bien.' },
      { ru: 'Извините, пожалуйста.', translit: 'Izvinite, pozhaluysta.', en: 'Excuse me, please.', es: 'Disculpe, por favor.' }
    ],
    quiz: [
      { id: 'q1-1', ru: 'спасибо', options: [{ en: 'please', es: 'por favor' }, { en: 'thank you', es: 'gracias' }, { en: 'bye', es: 'adiós' }, { en: 'bad', es: 'mal' }], correctIndex: 1 },
      { id: 'q1-2', ru: 'да', options: [{ en: 'yes', es: 'sí' }, { en: 'no', es: 'no' }, { en: 'how', es: 'cómo' }, { en: 'hello', es: 'hola' }], correctIndex: 0 },
      { id: 'q1-3', ru: 'пожалуйста', options: [{ en: 'good', es: 'bien' }, { en: 'you', es: 'usted' }, { en: 'please', es: 'por favor' }, { en: 'hi', es: 'hola' }], correctIndex: 2 },
      { id: 'q1-4', ru: 'пока', options: [{ en: 'bye', es: 'adiós' }, { en: 'hello', es: 'buenos días' }, { en: 'thank you', es: 'gracias' }, { en: 'no', es: 'no' }], correctIndex: 0 },
      { id: 'q1-5', ru: 'как', options: [{ en: 'bad', es: 'mal' }, { en: 'how', es: 'cómo' }, { en: 'formal you', es: 'usted' }, { en: 'good', es: 'bien' }], correctIndex: 1 }
    ]
  },
  {
    id: 2,
    title: { en: 'People and Family', es: 'Personas y familia' },
    description: { en: 'Name people around you and introduce family.', es: 'Nombra a las personas cercanas y presenta a tu familia.' },
    vocabulary: words(2, [
      ['я', 'ya', 'I', 'yo', '🙋'], ['ты', 'ty', 'you informal', 'tú', '🙂'], ['он', 'on', 'he', 'él', '👨'], ['она', 'ona', 'she', 'ella', '👩'],
      ['мы', 'my', 'we', 'nosotros', '👥'], ['они', 'oni', 'they', 'ellos', '👨‍👩‍👧'], ['мама', 'mama', 'mom', 'mamá', '👩'], ['папа', 'papa', 'dad', 'papá', '👨'],
      ['семья', 'semya', 'family', 'familia', '🏠'], ['друг', 'drug', 'friend', 'amigo', '🤗'], ['имя', 'imya', 'name', 'nombre', '🏷️'], ['человек', 'chelovek', 'person', 'persona', '🧍']
    ]),
    grammar: { en: 'The verb to be is usually omitted in the present tense: Я Анна means I am Anna.', es: 'El verbo ser/estar normalmente se omite en presente: Я Анна significa Soy Anna.' },
    sentences: [
      { ru: 'Это моя семья.', translit: 'Eto moya semya.', en: 'This is my family.', es: 'Esta es mi familia.' },
      { ru: 'Он мой друг.', translit: 'On moy drug.', en: 'He is my friend.', es: 'Él es mi amigo.' },
      { ru: 'Как вас зовут?', translit: 'Kak vas zovut?', en: 'What is your name?', es: '¿Cómo se llama?' }
    ],
    quiz: [
      { id: 'q2-1', ru: 'семья', options: [{ en: 'friend', es: 'amigo' }, { en: 'family', es: 'familia' }, { en: 'name', es: 'nombre' }, { en: 'person', es: 'persona' }], correctIndex: 1 },
      { id: 'q2-2', ru: 'я', options: [{ en: 'I', es: 'yo' }, { en: 'we', es: 'nosotros' }, { en: 'they', es: 'ellos' }, { en: 'she', es: 'ella' }], correctIndex: 0 },
      { id: 'q2-3', ru: 'друг', options: [{ en: 'dad', es: 'papá' }, { en: 'mom', es: 'mamá' }, { en: 'friend', es: 'amigo' }, { en: 'you', es: 'tú' }], correctIndex: 2 },
      { id: 'q2-4', ru: 'они', options: [{ en: 'he', es: 'él' }, { en: 'they', es: 'ellos' }, { en: 'we', es: 'nosotros' }, { en: 'I', es: 'yo' }], correctIndex: 1 },
      { id: 'q2-5', ru: 'имя', options: [{ en: 'name', es: 'nombre' }, { en: 'person', es: 'persona' }, { en: 'family', es: 'familia' }, { en: 'friend', es: 'amigo' }], correctIndex: 0 }
    ]
  },
  {
    id: 3,
    title: { en: 'Food and Cafe', es: 'Comida y café' },
    description: { en: 'Order simple food and drinks.', es: 'Pide comida y bebidas sencillas.' },
    vocabulary: words(3, [
      ['вода', 'voda', 'water', 'agua', '💧'], ['чай', 'chay', 'tea', 'té', '🍵'], ['кофе', 'kofe', 'coffee', 'café', '☕'], ['хлеб', 'khleb', 'bread', 'pan', '🍞'],
      ['сыр', 'syr', 'cheese', 'queso', '🧀'], ['суп', 'sup', 'soup', 'sopa', '🥣'], ['салат', 'salat', 'salad', 'ensalada', '🥗'], ['рыба', 'ryba', 'fish', 'pescado', '🐟'],
      ['мясо', 'myaso', 'meat', 'carne', '🥩'], ['яблоко', 'yabloko', 'apple', 'manzana', '🍎'], ['сахар', 'sakhar', 'sugar', 'azúcar', '🧂'], ['меню', 'menyu', 'menu', 'menú', '📋']
    ]),
    grammar: { en: 'To request something politely, say Можно plus the item: Можно чай?', es: 'Para pedir algo con cortesía, di Можно más el objeto: Можно чай?' },
    sentences: [
      { ru: 'Можно кофе?', translit: 'Mozhno kofe?', en: 'May I have coffee?', es: '¿Me da café?' },
      { ru: 'Я хочу воду.', translit: 'Ya khochu vodu.', en: 'I want water.', es: 'Quiero agua.' },
      { ru: 'Где меню?', translit: 'Gde menyu?', en: 'Where is the menu?', es: '¿Dónde está el menú?' }
    ],
    quiz: [
      { id: 'q3-1', ru: 'вода', options: [{ en: 'tea', es: 'té' }, { en: 'water', es: 'agua' }, { en: 'bread', es: 'pan' }, { en: 'sugar', es: 'azúcar' }], correctIndex: 1 },
      { id: 'q3-2', ru: 'хлеб', options: [{ en: 'bread', es: 'pan' }, { en: 'fish', es: 'pescado' }, { en: 'soup', es: 'sopa' }, { en: 'coffee', es: 'café' }], correctIndex: 0 },
      { id: 'q3-3', ru: 'яблоко', options: [{ en: 'cheese', es: 'queso' }, { en: 'meat', es: 'carne' }, { en: 'apple', es: 'manzana' }, { en: 'menu', es: 'menú' }], correctIndex: 2 },
      { id: 'q3-4', ru: 'чай', options: [{ en: 'tea', es: 'té' }, { en: 'coffee', es: 'café' }, { en: 'water', es: 'agua' }, { en: 'salad', es: 'ensalada' }], correctIndex: 0 },
      { id: 'q3-5', ru: 'сыр', options: [{ en: 'sugar', es: 'azúcar' }, { en: 'cheese', es: 'queso' }, { en: 'fish', es: 'pescado' }, { en: 'bread', es: 'pan' }], correctIndex: 1 }
    ]
  },
  {
    id: 4,
    title: { en: 'Numbers and Time', es: 'Números y tiempo' },
    description: { en: 'Count, ask the time, and talk about today.', es: 'Cuenta, pregunta la hora y habla de hoy.' },
    vocabulary: words(4, [
      ['один', 'odin', 'one', 'uno', '1️⃣'], ['два', 'dva', 'two', 'dos', '2️⃣'], ['три', 'tri', 'three', 'tres', '3️⃣'], ['четыре', 'chetyre', 'four', 'cuatro', '4️⃣'],
      ['пять', 'pyat', 'five', 'cinco', '5️⃣'], ['шесть', 'shest', 'six', 'seis', '6️⃣'], ['семь', 'sem', 'seven', 'siete', '7️⃣'], ['восемь', 'vosem', 'eight', 'ocho', '8️⃣'],
      ['девять', 'devyat', 'nine', 'nueve', '9️⃣'], ['десять', 'desyat', 'ten', 'diez', '🔟'], ['сегодня', 'segodnya', 'today', 'hoy', '📅'], ['час', 'chas', 'hour', 'hora', '🕐']
    ]),
    grammar: { en: 'Numbers change word endings in advanced Russian, but at A1 you can use them as fixed forms for counting.', es: 'Los números cambian terminaciones en ruso avanzado, pero en A1 úsalos como formas fijas para contar.' },
    sentences: [
      { ru: 'Сегодня один час.', translit: 'Segodnya odin chas.', en: 'Today at one o clock.', es: 'Hoy a la una.' },
      { ru: 'У меня три яблока.', translit: 'U menya tri yabloka.', en: 'I have three apples.', es: 'Tengo tres manzanas.' },
      { ru: 'Сколько это?', translit: 'Skolko eto?', en: 'How much is this?', es: '¿Cuánto es esto?' }
    ],
    quiz: [
      { id: 'q4-1', ru: 'пять', options: [{ en: 'four', es: 'cuatro' }, { en: 'five', es: 'cinco' }, { en: 'six', es: 'seis' }, { en: 'ten', es: 'diez' }], correctIndex: 1 },
      { id: 'q4-2', ru: 'сегодня', options: [{ en: 'hour', es: 'hora' }, { en: 'today', es: 'hoy' }, { en: 'three', es: 'tres' }, { en: 'seven', es: 'siete' }], correctIndex: 1 },
      { id: 'q4-3', ru: 'два', options: [{ en: 'one', es: 'uno' }, { en: 'two', es: 'dos' }, { en: 'nine', es: 'nueve' }, { en: 'eight', es: 'ocho' }], correctIndex: 1 },
      { id: 'q4-4', ru: 'десять', options: [{ en: 'ten', es: 'diez' }, { en: 'seven', es: 'siete' }, { en: 'hour', es: 'hora' }, { en: 'today', es: 'hoy' }], correctIndex: 0 },
      { id: 'q4-5', ru: 'час', options: [{ en: 'hour', es: 'hora' }, { en: 'six', es: 'seis' }, { en: 'four', es: 'cuatro' }, { en: 'one', es: 'uno' }], correctIndex: 0 }
    ]
  },
  {
    id: 5,
    title: { en: 'Places in Town', es: 'Lugares en la ciudad' },
    description: { en: 'Find your way around a city.', es: 'Oriéntate por una ciudad.' },
    vocabulary: words(5, [
      ['город', 'gorod', 'city', 'ciudad', '🏙️'], ['улица', 'ulitsa', 'street', 'calle', '🛣️'], ['дом', 'dom', 'house', 'casa', '🏠'], ['школа', 'shkola', 'school', 'escuela', '🏫'],
      ['банк', 'bank', 'bank', 'banco', '🏦'], ['метро', 'metro', 'metro', 'metro', '🚇'], ['музей', 'muzey', 'museum', 'museo', '🏛️'], ['парк', 'park', 'park', 'parque', '🌳'],
      ['магазин', 'magazin', 'store', 'tienda', '🏪'], ['ресторан', 'restoran', 'restaurant', 'restaurante', '🍽️'], ['отель', 'otel', 'hotel', 'hotel', '🏨'], ['аэропорт', 'aeroport', 'airport', 'aeropuerto', '✈️']
    ]),
    grammar: { en: 'Где means where. Use Где plus a place noun to ask where something is.', es: 'Где significa dónde. Usa Где más un lugar para preguntar dónde está algo.' },
    sentences: [
      { ru: 'Где метро?', translit: 'Gde metro?', en: 'Where is the metro?', es: '¿Dónde está el metro?' },
      { ru: 'Это мой город.', translit: 'Eto moy gorod.', en: 'This is my city.', es: 'Esta es mi ciudad.' },
      { ru: 'Магазин там.', translit: 'Magazin tam.', en: 'The store is there.', es: 'La tienda está allí.' }
    ],
    quiz: [
      { id: 'q5-1', ru: 'улица', options: [{ en: 'street', es: 'calle' }, { en: 'school', es: 'escuela' }, { en: 'airport', es: 'aeropuerto' }, { en: 'park', es: 'parque' }], correctIndex: 0 },
      { id: 'q5-2', ru: 'музей', options: [{ en: 'bank', es: 'banco' }, { en: 'museum', es: 'museo' }, { en: 'hotel', es: 'hotel' }, { en: 'city', es: 'ciudad' }], correctIndex: 1 },
      { id: 'q5-3', ru: 'магазин', options: [{ en: 'restaurant', es: 'restaurante' }, { en: 'store', es: 'tienda' }, { en: 'metro', es: 'metro' }, { en: 'house', es: 'casa' }], correctIndex: 1 },
      { id: 'q5-4', ru: 'аэропорт', options: [{ en: 'airport', es: 'aeropuerto' }, { en: 'park', es: 'parque' }, { en: 'school', es: 'escuela' }, { en: 'street', es: 'calle' }], correctIndex: 0 },
      { id: 'q5-5', ru: 'дом', options: [{ en: 'city', es: 'ciudad' }, { en: 'hotel', es: 'hotel' }, { en: 'house', es: 'casa' }, { en: 'museum', es: 'museo' }], correctIndex: 2 }
    ]
  },
  {
    id: 6,
    title: { en: 'Travel Moves', es: 'Movimientos de viaje' },
    description: { en: 'Use essential travel verbs and transport words.', es: 'Usa verbos y palabras esenciales para viajar.' },
    vocabulary: words(6, [
      ['билет', 'bilet', 'ticket', 'boleto', '🎟️'], ['паспорт', 'pasport', 'passport', 'pasaporte', '🛂'], ['поезд', 'poezd', 'train', 'tren', '🚆'], ['автобус', 'avtobus', 'bus', 'autobús', '🚌'],
      ['машина', 'mashina', 'car', 'coche', '🚗'], ['такси', 'taksi', 'taxi', 'taxi', '🚕'], ['ехать', 'yekhat', 'to go by vehicle', 'ir en vehículo', '➡️'], ['идти', 'idti', 'to go on foot', 'ir a pie', '🚶'],
      ['налево', 'nalevo', 'left', 'izquierda', '⬅️'], ['направо', 'napravo', 'right', 'derecha', '➡️'], ['прямо', 'pryamo', 'straight', 'derecho', '⬆️'], ['остановка', 'ostanovka', 'stop', 'parada', '🚏']
    ]),
    grammar: { en: 'Use идти for walking and ехать for riding in transport.', es: 'Usa идти para caminar y ехать para ir en transporte.' },
    sentences: [
      { ru: 'Где остановка?', translit: 'Gde ostanovka?', en: 'Where is the stop?', es: '¿Dónde está la parada?' },
      { ru: 'Мне нужен билет.', translit: 'Mne nuzhen bilet.', en: 'I need a ticket.', es: 'Necesito un boleto.' },
      { ru: 'Идите прямо.', translit: 'Idite pryamo.', en: 'Go straight.', es: 'Siga derecho.' }
    ],
    quiz: [
      { id: 'q6-1', ru: 'билет', options: [{ en: 'passport', es: 'pasaporte' }, { en: 'ticket', es: 'boleto' }, { en: 'taxi', es: 'taxi' }, { en: 'stop', es: 'parada' }], correctIndex: 1 },
      { id: 'q6-2', ru: 'налево', options: [{ en: 'left', es: 'izquierda' }, { en: 'right', es: 'derecha' }, { en: 'straight', es: 'derecho' }, { en: 'train', es: 'tren' }], correctIndex: 0 },
      { id: 'q6-3', ru: 'поезд', options: [{ en: 'bus', es: 'autobús' }, { en: 'car', es: 'coche' }, { en: 'train', es: 'tren' }, { en: 'passport', es: 'pasaporte' }], correctIndex: 2 },
      { id: 'q6-4', ru: 'идти', options: [{ en: 'to go on foot', es: 'ir a pie' }, { en: 'to go by vehicle', es: 'ir en vehículo' }, { en: 'left', es: 'izquierda' }, { en: 'stop', es: 'parada' }], correctIndex: 0 },
      { id: 'q6-5', ru: 'остановка', options: [{ en: 'ticket', es: 'boleto' }, { en: 'stop', es: 'parada' }, { en: 'right', es: 'derecha' }, { en: 'bus', es: 'autobús' }], correctIndex: 1 }
    ]
  },
  {
    id: 7,
    title: { en: 'Home and Objects', es: 'Casa y objetos' },
    description: { en: 'Name common objects and rooms.', es: 'Nombra objetos y habitaciones comunes.' },
    vocabulary: words(7, [
      ['комната', 'komnata', 'room', 'habitación', '🚪'], ['стол', 'stol', 'table', 'mesa', '🪑'], ['стул', 'stul', 'chair', 'silla', '🪑'], ['книга', 'kniga', 'book', 'libro', '📚'],
      ['телефон', 'telefon', 'phone', 'teléfono', '📱'], ['окно', 'okno', 'window', 'ventana', '🪟'], ['дверь', 'dver', 'door', 'puerta', '🚪'], ['ключ', 'klyuch', 'key', 'llave', '🔑'],
      ['сумка', 'sumka', 'bag', 'bolsa', '👜'], ['ручка', 'ruchka', 'pen', 'pluma', '🖊️'], ['кровать', 'krovat', 'bed', 'cama', '🛏️'], ['лампа', 'lampa', 'lamp', 'lámpara', '💡']
    ]),
    grammar: { en: 'Это means this is. Use it to identify objects: Это книга.', es: 'Это significa esto es. Úsalo para identificar objetos: Это книга.' },
    sentences: [
      { ru: 'Это моя книга.', translit: 'Eto moya kniga.', en: 'This is my book.', es: 'Este es mi libro.' },
      { ru: 'Где ключ?', translit: 'Gde klyuch?', en: 'Where is the key?', es: '¿Dónde está la llave?' },
      { ru: 'Телефон на столе.', translit: 'Telefon na stole.', en: 'The phone is on the table.', es: 'El teléfono está en la mesa.' }
    ],
    quiz: [
      { id: 'q7-1', ru: 'книга', options: [{ en: 'book', es: 'libro' }, { en: 'bag', es: 'bolsa' }, { en: 'lamp', es: 'lámpara' }, { en: 'key', es: 'llave' }], correctIndex: 0 },
      { id: 'q7-2', ru: 'окно', options: [{ en: 'door', es: 'puerta' }, { en: 'window', es: 'ventana' }, { en: 'bed', es: 'cama' }, { en: 'table', es: 'mesa' }], correctIndex: 1 },
      { id: 'q7-3', ru: 'стул', options: [{ en: 'chair', es: 'silla' }, { en: 'room', es: 'habitación' }, { en: 'phone', es: 'teléfono' }, { en: 'pen', es: 'pluma' }], correctIndex: 0 },
      { id: 'q7-4', ru: 'сумка', options: [{ en: 'bag', es: 'bolsa' }, { en: 'key', es: 'llave' }, { en: 'lamp', es: 'lámpara' }, { en: 'door', es: 'puerta' }], correctIndex: 0 },
      { id: 'q7-5', ru: 'кровать', options: [{ en: 'table', es: 'mesa' }, { en: 'bed', es: 'cama' }, { en: 'window', es: 'ventana' }, { en: 'book', es: 'libro' }], correctIndex: 1 }
    ]
  },
  {
    id: 8,
    title: { en: 'Daily Life', es: 'Vida diaria' },
    description: { en: 'Talk about everyday actions and routines.', es: 'Habla de acciones y rutinas cotidianas.' },
    vocabulary: words(8, [
      ['работа', 'rabota', 'work', 'trabajo', '💼'], ['учёба', 'uchyoba', 'study', 'estudio', '🎓'], ['читать', 'chitat', 'to read', 'leer', '📖'], ['писать', 'pisat', 'to write', 'escribir', '✍️'],
      ['говорить', 'govorit', 'to speak', 'hablar', '💬'], ['слушать', 'slushat', 'to listen', 'escuchar', '👂'], ['смотреть', 'smotret', 'to watch', 'mirar', '👀'], ['делать', 'delat', 'to do', 'hacer', '🛠️'],
      ['утро', 'utro', 'morning', 'mañana', '🌅'], ['день', 'den', 'day', 'día', '☀️'], ['вечер', 'vecher', 'evening', 'tarde', '🌆'], ['ночь', 'noch', 'night', 'noche', '🌙']
    ]),
    grammar: { en: 'Russian infinitives often end in -ть. You will recognize many verbs by that ending.', es: 'Los infinitivos rusos suelen terminar en -ть. Reconocerás muchos verbos por esa terminación.' },
    sentences: [
      { ru: 'Я читаю книгу.', translit: 'Ya chitayu knigu.', en: 'I read a book.', es: 'Leo un libro.' },
      { ru: 'Она говорит по-русски.', translit: 'Ona govorit po-russki.', en: 'She speaks Russian.', es: 'Ella habla ruso.' },
      { ru: 'Вечером я слушаю музыку.', translit: 'Vecherom ya slushayu muzyku.', en: 'In the evening I listen to music.', es: 'Por la tarde escucho música.' }
    ],
    quiz: [
      { id: 'q8-1', ru: 'читать', options: [{ en: 'to write', es: 'escribir' }, { en: 'to read', es: 'leer' }, { en: 'to do', es: 'hacer' }, { en: 'to watch', es: 'mirar' }], correctIndex: 1 },
      { id: 'q8-2', ru: 'работа', options: [{ en: 'work', es: 'trabajo' }, { en: 'study', es: 'estudio' }, { en: 'morning', es: 'mañana' }, { en: 'night', es: 'noche' }], correctIndex: 0 },
      { id: 'q8-3', ru: 'вечер', options: [{ en: 'day', es: 'día' }, { en: 'evening', es: 'tarde' }, { en: 'morning', es: 'mañana' }, { en: 'study', es: 'estudio' }], correctIndex: 1 },
      { id: 'q8-4', ru: 'слушать', options: [{ en: 'to speak', es: 'hablar' }, { en: 'to listen', es: 'escuchar' }, { en: 'to read', es: 'leer' }, { en: 'to do', es: 'hacer' }], correctIndex: 1 },
      { id: 'q8-5', ru: 'ночь', options: [{ en: 'night', es: 'noche' }, { en: 'day', es: 'día' }, { en: 'work', es: 'trabajo' }, { en: 'evening', es: 'tarde' }], correctIndex: 0 }
    ]
  },
  {
    id: 9,
    title: { en: 'Feelings and Health', es: 'Sentimientos y salud' },
    description: { en: 'Say how you feel and ask for help.', es: 'Di cómo te sientes y pide ayuda.' },
    vocabulary: words(9, [
      ['рад', 'rad', 'glad', 'contento', '😊'], ['грустно', 'grustno', 'sad', 'triste', '😔'], ['устал', 'ustal', 'tired', 'cansado', '😴'], ['болит', 'bolit', 'hurts', 'duele', '🤕'],
      ['голова', 'golova', 'head', 'cabeza', '🧠'], ['живот', 'zhivot', 'stomach', 'estómago', '🤰'], ['врач', 'vrach', 'doctor', 'médico', '🩺'], ['аптека', 'apteka', 'pharmacy', 'farmacia', '💊'],
      ['помощь', 'pomoshch', 'help', 'ayuda', '🆘'], ['можно', 'mozhno', 'may I', 'se puede', '🙋'], ['нужно', 'nuzhno', 'need', 'necesario', '📌'], ['здоровье', 'zdorovye', 'health', 'salud', '💚']
    ]),
    grammar: { en: 'Мне нужно means I need. It is a useful A1 pattern for help, medicine, and travel.', es: 'Мне нужно significa necesito. Es una estructura útil para ayuda, medicina y viaje.' },
    sentences: [
      { ru: 'Мне нужна помощь.', translit: 'Mne nuzhna pomoshch.', en: 'I need help.', es: 'Necesito ayuda.' },
      { ru: 'У меня болит голова.', translit: 'U menya bolit golova.', en: 'My head hurts.', es: 'Me duele la cabeza.' },
      { ru: 'Где аптека?', translit: 'Gde apteka?', en: 'Where is the pharmacy?', es: '¿Dónde está la farmacia?' }
    ],
    quiz: [
      { id: 'q9-1', ru: 'врач', options: [{ en: 'doctor', es: 'médico' }, { en: 'help', es: 'ayuda' }, { en: 'health', es: 'salud' }, { en: 'stomach', es: 'estómago' }], correctIndex: 0 },
      { id: 'q9-2', ru: 'болит', options: [{ en: 'glad', es: 'contento' }, { en: 'hurts', es: 'duele' }, { en: 'tired', es: 'cansado' }, { en: 'need', es: 'necesario' }], correctIndex: 1 },
      { id: 'q9-3', ru: 'аптека', options: [{ en: 'pharmacy', es: 'farmacia' }, { en: 'doctor', es: 'médico' }, { en: 'sad', es: 'triste' }, { en: 'head', es: 'cabeza' }], correctIndex: 0 },
      { id: 'q9-4', ru: 'помощь', options: [{ en: 'help', es: 'ayuda' }, { en: 'may I', es: 'se puede' }, { en: 'health', es: 'salud' }, { en: 'stomach', es: 'estómago' }], correctIndex: 0 },
      { id: 'q9-5', ru: 'голова', options: [{ en: 'head', es: 'cabeza' }, { en: 'tired', es: 'cansado' }, { en: 'need', es: 'necesario' }, { en: 'glad', es: 'contento' }], correctIndex: 0 }
    ]
  },
  {
    id: 10,
    title: { en: 'A1 Survival Review', es: 'Repaso de supervivencia A1' },
    description: { en: 'Blend greetings, travel, food, and help into real mini-dialogues.', es: 'Combina saludos, viaje, comida y ayuda en mini diálogos reales.' },
    vocabulary: words(10, [
      ['понимаю', 'ponimayu', 'I understand', 'entiendo', '💡'], ['не понимаю', 'ne ponimayu', 'I do not understand', 'no entiendo', '❓'], ['медленно', 'medlenno', 'slowly', 'despacio', '🐢'], ['повторите', 'povtorite', 'repeat', 'repita', '🔁'],
      ['русский', 'russkiy', 'Russian', 'ruso', '🇷🇺'], ['английский', 'angliyskiy', 'English', 'inglés', '🇬🇧'], ['испанский', 'ispanskiy', 'Spanish', 'español', '🇪🇸'], ['язык', 'yazyk', 'language', 'idioma', '🗣️'],
      ['дорого', 'dorogo', 'expensive', 'caro', '💸'], ['дёшево', 'dyoshevo', 'cheap', 'barato', '🏷️'], ['открыто', 'otkryto', 'open', 'abierto', '🟢'], ['закрыто', 'zakryto', 'closed', 'cerrado', '🔴']
    ]),
    grammar: { en: 'Use Не before a verb or adjective to make a negative: не понимаю, не дорого.', es: 'Usa Не antes de un verbo o adjetivo para negar: не понимаю, не дорого.' },
    sentences: [
      { ru: 'Я не понимаю по-русски.', translit: 'Ya ne ponimayu po-russki.', en: 'I do not understand Russian.', es: 'No entiendo ruso.' },
      { ru: 'Повторите, пожалуйста.', translit: 'Povtorite, pozhaluysta.', en: 'Repeat, please.', es: 'Repita, por favor.' },
      { ru: 'Это дорого?', translit: 'Eto dorogo?', en: 'Is this expensive?', es: '¿Esto es caro?' }
    ],
    quiz: [
      { id: 'q10-1', ru: 'повторите', options: [{ en: 'slowly', es: 'despacio' }, { en: 'repeat', es: 'repita' }, { en: 'language', es: 'idioma' }, { en: 'closed', es: 'cerrado' }], correctIndex: 1 },
      { id: 'q10-2', ru: 'не понимаю', options: [{ en: 'I understand', es: 'entiendo' }, { en: 'I do not understand', es: 'no entiendo' }, { en: 'open', es: 'abierto' }, { en: 'cheap', es: 'barato' }], correctIndex: 1 },
      { id: 'q10-3', ru: 'дорого', options: [{ en: 'expensive', es: 'caro' }, { en: 'cheap', es: 'barato' }, { en: 'Spanish', es: 'español' }, { en: 'Russian', es: 'ruso' }], correctIndex: 0 },
      { id: 'q10-4', ru: 'язык', options: [{ en: 'English', es: 'inglés' }, { en: 'language', es: 'idioma' }, { en: 'slowly', es: 'despacio' }, { en: 'open', es: 'abierto' }], correctIndex: 1 },
      { id: 'q10-5', ru: 'закрыто', options: [{ en: 'open', es: 'abierto' }, { en: 'closed', es: 'cerrado' }, { en: 'repeat', es: 'repita' }, { en: 'cheap', es: 'barato' }], correctIndex: 1 }
    ]
  }
];

export const allVocabulary = lessons.flatMap((lesson) => lesson.vocabulary);
