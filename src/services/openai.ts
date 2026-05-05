import type { ChatMessage, DailyChallenge, GeneratedPhrase, PronunciationResult, WritingResult } from '../types/ai.types';
import { getStoredApiKey } from './storage';

type Lang = 'en' | 'es';

class OpenAIServiceError extends Error {
  constructor(message: string, public code: 'missing_key' | 'network' | 'parse' | 'api') {
    super(message);
  }
}

const endpoint = 'https://api.openai.com/v1/chat/completions';

const request = async <T>(messages: ChatMessage[], lang: Lang, parser: (content: string) => T, retry = true): Promise<T> => {
  const apiKey = getStoredApiKey();
  if (!apiKey) throw new OpenAIServiceError(lang === 'en' ? 'OpenAI key is missing.' : 'Falta la clave de OpenAI.', 'missing_key');
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({ model: 'gpt-4o', messages: messages.map(({ role, content }) => ({ role, content })), temperature: 0.35 })
    });
    if (!response.ok) throw new OpenAIServiceError(await response.text(), 'api');
    const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content ?? '';
    return parser(content);
  } catch (error) {
    if (retry && (!(error instanceof OpenAIServiceError) || error.code === 'network')) {
      await new Promise((resolve) => setTimeout(resolve, 650));
      return request(messages, lang, parser, false);
    }
    if (error instanceof OpenAIServiceError) throw error;
    throw new OpenAIServiceError(lang === 'en' ? 'Network request failed.' : 'Falló la conexión.', 'network');
  }
};

const parseJson = <T>(content: string, validate: (value: unknown) => value is T): T => {
  const clean = content.trim().replace(/^```json\s*/i, '').replace(/```$/i, '');
  const parsed = JSON.parse(clean) as unknown;
  if (!validate(parsed)) throw new OpenAIServiceError('Invalid JSON shape.', 'parse');
  return parsed;
};

const isPronunciation = (value: unknown): value is PronunciationResult => {
  const v = value as PronunciationResult;
  return typeof v?.score === 'number' && Array.isArray(v.errors) && typeof v.tip === 'string' && typeof v.encouragement === 'string' && typeof v.passed === 'boolean';
};

export const evaluatePronunciation = (targetPhrase: string, heard: string, lang: Lang): Promise<PronunciationResult> =>
  request(
    [
      { role: 'system', content: 'You are a Russian A1 pronunciation evaluator. Return ONLY valid JSON with score:number 0-100, errors:string[], tip:string, encouragement:string, passed:boolean. Be kind and concise.' },
      { role: 'user', content: `Target: ${targetPhrase}\nHeard: ${heard}\nFeedback language: ${lang}` }
    ],
    lang,
    (content) => parseJson(content, isPronunciation)
  );

export const getHint = (question: string, lang: Lang): Promise<string> =>
  request(
    [{ role: 'system', content: `Give one short A1-friendly hint in ${lang}.` }, { role: 'user', content: question }],
    lang,
    (content) => content.trim()
  );

export const explainError = (question: string, correct: string, chosen: string, lang: Lang): Promise<string> =>
  request(
    [{ role: 'system', content: `Explain the mistake in two concise sentences in ${lang}.` }, { role: 'user', content: `Question: ${question}\nCorrect: ${correct}\nChosen: ${chosen}` }],
    lang,
    (content) => content.trim()
  );

export const getDailyChallenge = (lang: Lang): Promise<DailyChallenge> =>
  request(
    [{ role: 'system', content: 'Return ONLY JSON: ru, translit, translation, tip. A1 Russian daily challenge.' }, { role: 'user', content: `Language: ${lang}` }],
    lang,
    (content) =>
      parseJson<DailyChallenge>(content, (v): v is DailyChallenge => {
        const x = v as DailyChallenge;
        return ['ru', 'translit', 'translation', 'tip'].every((k) => typeof x[k as keyof DailyChallenge] === 'string');
      })
  );

export const generatePhrases = (topic: string, lang: Lang): Promise<GeneratedPhrase[]> =>
  request(
    [{ role: 'system', content: 'Return ONLY JSON array with ru, translit, translation for five A1 Russian phrases.' }, { role: 'user', content: `${topic}. Language: ${lang}` }],
    lang,
    (content) => parseJson<GeneratedPhrase[]>(content, (v): v is GeneratedPhrase[] => Array.isArray(v))
  );

export const checkWriting = (sentence: string, lang: Lang): Promise<WritingResult> =>
  request(
    [{ role: 'system', content: 'Return ONLY JSON: correct:boolean, feedback:string, corrected?:string. Assess A1 Russian writing.' }, { role: 'user', content: `${sentence}. Feedback language: ${lang}` }],
    lang,
    (content) => parseJson<WritingResult>(content, (v): v is WritingResult => typeof (v as WritingResult).correct === 'boolean')
  );

export const chatWithNatasha = (messages: ChatMessage[], currentLesson: string, weakAreas: string[], lang: Lang): Promise<string> =>
  request(
    [
      { role: 'system', content: `You are Natasha, a warm Russian A1 tutor. Reply in ${lang}, keep Russian examples simple. Current lesson: ${currentLesson}. Weak areas: ${weakAreas.join(', ') || 'none'}.` },
      ...messages
    ],
    lang,
    (content) => content.trim()
  );
