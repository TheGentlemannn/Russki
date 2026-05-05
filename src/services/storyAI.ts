import type { StoryChoice, StoryMessage, StoryScenario, StorySession } from '../types/story.types';
import { getStoredApiKey } from './storage';

const endpoint = 'https://api.openai.com/v1/chat/completions';

const jsonRequest = async <T>(messages: Array<{ role: 'system' | 'user'; content: string }>, fallback: T, validate: (value: unknown) => value is T): Promise<T> => {
  const apiKey = getStoredApiKey();
  if (!apiKey) return fallback;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'gpt-4o', temperature: 0.35, messages })
    });
    if (!response.ok) return fallback;
    const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content?.trim().replace(/^```json\s*/i, '').replace(/```$/i, '') ?? '';
    const parsed = JSON.parse(content) as unknown;
    return validate(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const choiceFallback = (lang: 'en' | 'es'): StoryChoice[] => [
  { id: 'c1', ru: 'Можно билет?', translit: 'Mozhno bilet?', translation: { en: 'May I have a ticket?', es: 'Me da un boleto?' }, isCorrect: true },
  { id: 'c2', ru: 'Где метро?', translit: 'Gde metro?', translation: { en: 'Where is the metro?', es: 'Donde esta el metro?' }, isCorrect: true },
  { id: 'c3', ru: 'Я билет хорошо.', translit: 'Ya bilet khorosho.', translation: { en: 'I ticket good.', es: 'Yo boleto bien.' }, isCorrect: false, hint: { en: 'Use Можно when asking politely.', es: 'Usa Можно para pedir con cortesia.' } }
].map((item) => ({ ...item, translation: { ...item.translation, [lang]: item.translation[lang] } }));

export const startScenario = async (scenario: StoryScenario, userLevel: number, weakAreas: string[], lang: 'en' | 'es'): Promise<{ opening: StoryMessage; choices: StoryChoice[] }> => {
  const fallback = {
    opening: { role: 'npc' as const, content: 'Здравствуйте! Чем могу помочь?', translit: 'Zdravstvuyte! Chem mogu pomoch?', translation: { en: 'Hello! How can I help?', es: 'Hola. Como puedo ayudar?' }, isRevealed: false },
    choices: choiceFallback(lang)
  };
  return jsonRequest(
    [
      {
        role: 'system',
        content: `You are running an interactive Russian language learning story for an A1 beginner.
Location: ${scenario.location}. Situation: ${scenario.description[lang]}.
Generate an opening NPC line in simple A1 Russian (Cyrillic), its transliteration,
and its translation in ${lang}. Then generate exactly 3 player response choices:
2 correct ones (natural Russian), 1 wrong one (common A1 mistake).
Adapt difficulty based on weak areas: ${weakAreas.join(', ') || 'none'}.
Respond ONLY in this JSON format:
{
  "opening": { "ru": string, "translit": string, "translation": string },
  "choices": [{ "id": string, "ru": string, "translit": string, "translation": string, "isCorrect": boolean, "hint": string }]
}`
      },
      { role: 'user', content: `User level ${userLevel}` }
    ],
    fallback,
    (value): value is { opening: StoryMessage; choices: StoryChoice[] } => {
      const raw = value as { opening?: { ru?: string; translit?: string; translation?: string }; choices?: Array<{ id: string; ru: string; translit: string; translation: string; isCorrect: boolean; hint?: string }> };
      if (!raw.opening?.ru || !Array.isArray(raw.choices) || raw.choices.length !== 3) return false;
      (value as { opening: StoryMessage; choices: StoryChoice[] }).opening = { role: 'npc', content: raw.opening.ru, translit: raw.opening.translit, translation: { en: raw.opening.translation ?? '', es: raw.opening.translation ?? '' }, isRevealed: false };
      (value as { opening: StoryMessage; choices: StoryChoice[] }).choices = raw.choices.map((choice) => ({ id: choice.id, ru: choice.ru, translit: choice.translit, translation: { en: choice.translation, es: choice.translation }, isCorrect: choice.isCorrect, hint: choice.hint ? { en: choice.hint, es: choice.hint } : undefined }));
      return true;
    }
  );
};

export const continueScenario = async (scenario: StoryScenario, history: StoryMessage[], playerChoice: StoryChoice, mistakeCount: number, lang: 'en' | 'es'): Promise<{ npcReply: StoryMessage; choices: StoryChoice[]; isComplete: boolean; feedback?: string }> => {
  const fallback = {
    npcReply: { role: 'npc' as const, content: playerChoice.isCorrect ? 'Хорошо. Идите прямо.' : 'Почти. Попробуйте ещё раз.', translit: playerChoice.isCorrect ? 'Khorosho. Idite pryamo.' : 'Pochti. Poprobuyte yeshchyo raz.', translation: { en: playerChoice.isCorrect ? 'Good. Go straight.' : 'Almost. Try again.', es: playerChoice.isCorrect ? 'Bien. Siga derecho.' : 'Casi. Intenta otra vez.' }, isRevealed: false },
    choices: choiceFallback(lang),
    isComplete: history.filter((message) => message.role === 'player').length >= 2,
    feedback: playerChoice.isCorrect ? (lang === 'en' ? 'Natural answer.' : 'Respuesta natural.') : playerChoice.hint?.[lang]
  };
  return jsonRequest(
    [
      { role: 'system', content: `Continue an A1 Russian story in ${scenario.location}. Return ONLY JSON with npcReply:{ru,translit,translation}, choices[3], isComplete:boolean, feedback:string.` },
      { role: 'user', content: JSON.stringify({ history, playerChoice, mistakeCount, lang }) }
    ],
    fallback,
    (value): value is typeof fallback => {
      const raw = value as { npcReply?: { ru?: string; translit?: string; translation?: string }; choices?: StoryChoice[]; isComplete?: boolean };
      if (!raw.npcReply?.ru) return false;
      (value as typeof fallback).npcReply = { role: 'npc', content: raw.npcReply.ru, translit: raw.npcReply.translit ?? '', translation: { en: raw.npcReply.translation ?? '', es: raw.npcReply.translation ?? '' }, isRevealed: false };
      return true;
    }
  );
};

export const getScenarioSummary = async (session: StorySession, lang: 'en' | 'es'): Promise<{ summary: string; score: number; xpEarned: number; tips: string[] }> => {
  const score = Math.max(0, Math.min(100, session.score - session.mistakeCount * 10));
  const fallback = { summary: lang === 'en' ? 'You completed the scene and practiced useful A1 phrases.' : 'Completaste la escena y practicaste frases A1 utiles.', score, xpEarned: session.xpEarned, tips: ['Можно + noun', 'Где + place'] };
  return jsonRequest([{ role: 'system', content: 'Summarize this A1 Russian story session. Return ONLY JSON: summary, score, xpEarned, tips[].' }, { role: 'user', content: JSON.stringify(session) }], fallback, (value): value is typeof fallback => typeof (value as typeof fallback).summary === 'string');
};
