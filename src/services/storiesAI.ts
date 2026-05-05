import type { GeneratedStory } from '../types/story.types';
import { getStoredApiKey } from './storage';

const fallbackStory = (topic: string, lang: 'en' | 'es'): GeneratedStory => {
  const words = [
    ['Анна', 'Anna', 'Anna'], ['живёт', 'zhivyot', lang === 'en' ? 'lives' : 'vive'], ['в', 'v', 'in'], ['Москве', 'Moskve', 'Moscow'], ['.', '.', '.'],
    ['Утром', 'Utrom', lang === 'en' ? 'in the morning' : 'por la manana'], ['она', 'ona', lang === 'en' ? 'she' : 'ella'], ['пьёт', 'pyot', lang === 'en' ? 'drinks' : 'bebe'], ['чай', 'chay', lang === 'en' ? 'tea' : 'te'], ['.', '.', '.'],
    ['Потом', 'Potom', lang === 'en' ? 'then' : 'luego'], ['она', 'ona', lang === 'en' ? 'she' : 'ella'], ['идёт', 'idyot', lang === 'en' ? 'goes' : 'va'], ['в', 'v', 'to'], ['школу', 'shkolu', lang === 'en' ? 'school' : 'escuela'], ['.', '.', '.']
  ];
  return {
    id: `story-${Date.now()}`,
    title: { ru: 'День Анны', translit: 'Den Anny', translation: lang === 'en' ? 'Anna’s Day' : 'El dia de Anna' },
    topic,
    wordCount: words.filter(([ru]) => ru !== '.').length,
    words: words.map(([ru, translit, translation], index) => ({ id: `w-${index}`, ru, translit, translation: { en: translation, es: translation }, isNew: index % 4 === 0, partOfSpeech: ru === '.' ? 'other' : 'noun' })),
    vocabulary: words.filter(([ru]) => ru !== '.').slice(0, 6).map(([ru, translit, translation]) => ({ ru, translit, translation })),
    readingTime: 45,
    questions: [
      { id: 'q1', type: 'multiple_choice', question: { en: 'Where does Anna live?', es: 'Donde vive Anna?' }, options: [{ en: 'Moscow', es: 'Moscu' }, { en: 'Cafe', es: 'Cafe' }, { en: 'Hotel', es: 'Hotel' }], correctAnswer: 0, explanation: { en: 'The story says she lives in Moscow.', es: 'La historia dice que vive en Moscu.' } },
      { id: 'q2', type: 'true_false', question: { en: 'Anna drinks tea.', es: 'Anna bebe te.' }, correctAnswer: true, explanation: { en: 'Утром она пьёт чай.', es: 'Утром она пьёт чай.' } },
      { id: 'q3', type: 'multiple_choice', question: { en: 'Where does she go?', es: 'A donde va?' }, options: [{ en: 'School', es: 'Escuela' }, { en: 'Market', es: 'Mercado' }, { en: 'Metro', es: 'Metro' }], correctAnswer: 0, explanation: { en: 'She goes to school.', es: 'Ella va a la escuela.' } },
      { id: 'q4', type: 'true_false', question: { en: 'The story is about a doctor.', es: 'La historia es sobre un medico.' }, correctAnswer: false, explanation: { en: 'It is about Anna’s morning.', es: 'Es sobre la manana de Anna.' } },
      { id: 'q5', type: 'multiple_choice', question: { en: 'What time of day appears?', es: 'Que momento del dia aparece?' }, options: [{ en: 'Morning', es: 'Manana' }, { en: 'Night', es: 'Noche' }, { en: 'Evening', es: 'Tarde' }], correctAnswer: 0, explanation: { en: 'Утром means in the morning.', es: 'Утром significa por la manana.' } }
    ]
  };
};

export const generateStory = async (userLevel: number, lessonsComplete: number[], preferredTopic: string, lang: 'en' | 'es'): Promise<GeneratedStory> => {
  const apiKey = getStoredApiKey();
  const fallback = fallbackStory(preferredTopic, lang);
  if (!apiKey) return fallback;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'gpt-4o', temperature: 0.35, messages: [{ role: 'system', content: `Generate an A1-level Russian story of 60-100 words. Topic: ${preferredTopic}. Only use vocabulary from lessons ${lessonsComplete.join(',')}. Return ONLY valid JSON GeneratedStory. Tokenize EVERY word separately. Generate 5 comprehension questions.` }, { role: 'user', content: JSON.stringify({ userLevel, lang }) }] })
    });
    if (!response.ok) return fallback;
    const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const parsed = JSON.parse(data.choices?.[0]?.message?.content?.trim().replace(/^```json\s*/i, '').replace(/```$/i, '') ?? '{}') as GeneratedStory;
    return parsed.words?.length && parsed.questions?.length ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export const getWordDetails = async (word: string, context: string, lang: 'en' | 'es'): Promise<{ definition: string; examples: string[]; tip: string }> => ({
  definition: lang === 'en' ? `${word} in this story context.` : `${word} en el contexto de esta historia.`,
  examples: [context],
  tip: lang === 'en' ? 'Read the full sentence aloud.' : 'Lee la oracion completa en voz alta.'
});
