import type { Phrase, PhraseCategory } from '../types/vocabulary.types';

export const phraseCategories: PhraseCategory[] = [
  { id: 'greetings', en: 'Greetings', es: 'Saludos' },
  { id: 'travel', en: 'Travel', es: 'Viajes' },
  { id: 'shopping', en: 'Shopping', es: 'Compras' },
  { id: 'emergency', en: 'Emergency', es: 'Emergencias' },
  { id: 'politeness', en: 'Politeness', es: 'Cortesía' },
  { id: 'smalltalk', en: 'Small Talk', es: 'Conversación' }
];

const p = (category: string, rows: Array<[string, string, string, string]>): Phrase[] =>
  rows.map(([ru, translit, en, es], index) => ({ id: `${category}-${index + 1}`, category, ru, translit, en, es }));

export const phrasebook: Phrase[] = [
  ...p('greetings', [
    ['Привет!', 'Privet!', 'Hi!', '¡Hola!'], ['Здравствуйте!', 'Zdravstvuyte!', 'Hello!', '¡Buenos días!'], ['Доброе утро!', 'Dobroye utro!', 'Good morning!', '¡Buenos días!'],
    ['Добрый день!', 'Dobryy den!', 'Good afternoon!', '¡Buenas tardes!'], ['Добрый вечер!', 'Dobryy vecher!', 'Good evening!', '¡Buenas noches!'], ['Как дела?', 'Kak dela?', 'How are things?', '¿Cómo va todo?'],
    ['Хорошо, спасибо.', 'Khorosho, spasibo.', 'Good, thank you.', 'Bien, gracias.'], ['А у вас?', 'A u vas?', 'And you?', '¿Y usted?'], ['Очень приятно.', 'Ochen priyatno.', 'Nice to meet you.', 'Mucho gusto.'],
    ['Меня зовут Анна.', 'Menya zovut Anna.', 'My name is Anna.', 'Me llamo Anna.'], ['Как вас зовут?', 'Kak vas zovut?', 'What is your name?', '¿Cómo se llama?'], ['До свидания!', 'Do svidaniya!', 'Goodbye!', '¡Adiós!'],
    ['До завтра!', 'Do zavtra!', 'See you tomorrow!', '¡Hasta mañana!'], ['Увидимся!', 'Uvidimsya!', 'See you!', '¡Nos vemos!']
  ]),
  ...p('travel', [
    ['Где метро?', 'Gde metro?', 'Where is the metro?', '¿Dónde está el metro?'], ['Где автобус?', 'Gde avtobus?', 'Where is the bus?', '¿Dónde está el autobús?'], ['Мне нужен билет.', 'Mne nuzhen bilet.', 'I need a ticket.', 'Necesito un boleto.'],
    ['Один билет, пожалуйста.', 'Odin bilet, pozhaluysta.', 'One ticket, please.', 'Un boleto, por favor.'], ['Сколько стоит билет?', 'Skolko stoit bilet?', 'How much is the ticket?', '¿Cuánto cuesta el boleto?'], ['Я еду в центр.', 'Ya yedu v tsentr.', 'I am going to the center.', 'Voy al centro.'],
    ['Идите прямо.', 'Idite pryamo.', 'Go straight.', 'Siga derecho.'], ['Поверните налево.', 'Povernite nalevo.', 'Turn left.', 'Gire a la izquierda.'], ['Поверните направо.', 'Povernite napravo.', 'Turn right.', 'Gire a la derecha.'],
    ['Это далеко?', 'Eto daleko?', 'Is it far?', '¿Está lejos?'], ['Это близко?', 'Eto blizko?', 'Is it close?', '¿Está cerca?'], ['Где мой отель?', 'Gde moy otel?', 'Where is my hotel?', '¿Dónde está mi hotel?'],
    ['Мне нужно такси.', 'Mne nuzhno taksi.', 'I need a taxi.', 'Necesito un taxi.'], ['Я потерялся.', 'Ya poteryalsya.', 'I am lost.', 'Estoy perdido.']
  ]),
  ...p('shopping', [
    ['Сколько это стоит?', 'Skolko eto stoit?', 'How much does this cost?', '¿Cuánto cuesta esto?'], ['Это дорого.', 'Eto dorogo.', 'This is expensive.', 'Esto es caro.'], ['Это дёшево.', 'Eto dyoshevo.', 'This is cheap.', 'Esto es barato.'],
    ['Можно посмотреть?', 'Mozhno posmotret?', 'May I look?', '¿Puedo mirar?'], ['Я хочу это.', 'Ya khochu eto.', 'I want this.', 'Quiero esto.'], ['У вас есть вода?', 'U vas yest voda?', 'Do you have water?', '¿Tiene agua?'],
    ['Мне нужна сумка.', 'Mne nuzhna sumka.', 'I need a bag.', 'Necesito una bolsa.'], ['Можно картой?', 'Mozhno kartoy?', 'Can I pay by card?', '¿Puedo pagar con tarjeta?'], ['Можно наличными?', 'Mozhno nalichnymi?', 'Can I pay cash?', '¿Puedo pagar en efectivo?'],
    ['Где касса?', 'Gde kassa?', 'Where is the checkout?', '¿Dónde está la caja?'], ['Есть скидка?', 'Yest skidka?', 'Is there a discount?', '¿Hay descuento?'], ['Мне нужен чек.', 'Mne nuzhen chek.', 'I need a receipt.', 'Necesito un recibo.'],
    ['Открыто?', 'Otkryto?', 'Is it open?', '¿Está abierto?'], ['Закрыто?', 'Zakryto?', 'Is it closed?', '¿Está cerrado?']
  ]),
  ...p('emergency', [
    ['Помогите!', 'Pomogite!', 'Help!', '¡Ayuda!'], ['Мне нужна помощь.', 'Mne nuzhna pomoshch.', 'I need help.', 'Necesito ayuda.'], ['Вызовите врача.', 'Vyzovite vracha.', 'Call a doctor.', 'Llame a un médico.'],
    ['Вызовите полицию.', 'Vyzovite politsiyu.', 'Call the police.', 'Llame a la policía.'], ['Где больница?', 'Gde bolnitsa?', 'Where is the hospital?', '¿Dónde está el hospital?'], ['Где аптека?', 'Gde apteka?', 'Where is the pharmacy?', '¿Dónde está la farmacia?'],
    ['У меня болит голова.', 'U menya bolit golova.', 'My head hurts.', 'Me duele la cabeza.'], ['У меня болит живот.', 'U menya bolit zhivot.', 'My stomach hurts.', 'Me duele el estómago.'], ['Я не понимаю.', 'Ya ne ponimayu.', 'I do not understand.', 'No entiendo.'],
    ['Я потерял паспорт.', 'Ya poteryal pasport.', 'I lost my passport.', 'Perdí mi pasaporte.'], ['Это срочно.', 'Eto srochno.', 'It is urgent.', 'Es urgente.'], ['Мне плохо.', 'Mne plokho.', 'I feel bad.', 'Me siento mal.'],
    ['Остановитесь, пожалуйста.', 'Ostanovites, pozhaluysta.', 'Stop, please.', 'Deténgase, por favor.'], ['Где выход?', 'Gde vykhod?', 'Where is the exit?', '¿Dónde está la salida?']
  ]),
  ...p('politeness', [
    ['Спасибо.', 'Spasibo.', 'Thank you.', 'Gracias.'], ['Большое спасибо.', 'Bolshoye spasibo.', 'Thank you very much.', 'Muchas gracias.'], ['Пожалуйста.', 'Pozhaluysta.', 'Please.', 'Por favor.'],
    ['Не за что.', 'Ne za chto.', 'You are welcome.', 'De nada.'], ['Извините.', 'Izvinite.', 'Excuse me.', 'Disculpe.'], ['Простите.', 'Prostite.', 'Sorry.', 'Perdón.'],
    ['Можно?', 'Mozhno?', 'May I?', '¿Se puede?'], ['Конечно.', 'Konechno.', 'Of course.', 'Claro.'], ['Ничего страшного.', 'Nichego strashnogo.', 'No problem.', 'No pasa nada.'],
    ['Будьте добры.', 'Budte dobry.', 'Be so kind.', 'Sea tan amable.'], ['Повторите, пожалуйста.', 'Povtorite, pozhaluysta.', 'Repeat, please.', 'Repita, por favor.'], ['Говорите медленно.', 'Govorite medlenno.', 'Speak slowly.', 'Hable despacio.'],
    ['Я немного говорю по-русски.', 'Ya nemnogo govoryu po-russki.', 'I speak a little Russian.', 'Hablo un poco de ruso.'], ['Можно по-английски?', 'Mozhno po-angliyski?', 'Can we use English?', '¿Podemos hablar en inglés?']
  ]),
  ...p('smalltalk', [
    ['Откуда вы?', 'Otkuda vy?', 'Where are you from?', '¿De dónde es?'], ['Я из Мексики.', 'Ya iz Meksiki.', 'I am from Mexico.', 'Soy de México.'], ['Я из США.', 'Ya iz SShA.', 'I am from the USA.', 'Soy de Estados Unidos.'],
    ['Вы говорите по-английски?', 'Vy govorite po-angliyski?', 'Do you speak English?', '¿Habla inglés?'], ['Вы говорите по-испански?', 'Vy govorite po-ispanski?', 'Do you speak Spanish?', '¿Habla español?'], ['Мне нравится Россия.', 'Mne nravitsya Rossiya.', 'I like Russia.', 'Me gusta Rusia.'],
    ['Сегодня хорошая погода.', 'Segodnya khoroshaya pogoda.', 'The weather is nice today.', 'Hoy hace buen tiempo.'], ['Сегодня холодно.', 'Segodnya kholodno.', 'It is cold today.', 'Hoy hace frío.'], ['Сегодня жарко.', 'Segodnya zharko.', 'It is hot today.', 'Hoy hace calor.'],
    ['Что вы делаете?', 'Chto vy delayete?', 'What are you doing?', '¿Qué está haciendo?'], ['Я учу русский.', 'Ya uchu russkiy.', 'I am learning Russian.', 'Estoy aprendiendo ruso.'], ['Это интересно.', 'Eto interesno.', 'This is interesting.', 'Esto es interesante.'],
    ['Очень хорошо!', 'Ochen khorosho!', 'Very good!', '¡Muy bien!'], ['Удачи!', 'Udachi!', 'Good luck!', '¡Buena suerte!']
  ])
];
