import { commonVerbs } from '../data/commonVerbs';
import { getStoredApiKey } from './storage';

export interface ConjugationRow {
  pronoun: string;
  pronounTranslit: string;
  form: string;
  translit: string;
}

export interface ConjugationResult {
  infinitive: string;
  infinitiveTranslit: string;
  meaning: { en: string; es: string };
  aspect: 'perfective' | 'imperfective';
  aspectExplain: { en: string; es: string };
  presentTense: ConjugationRow[];
  pastTense: { m: string; f: string; n: string; pl: string };
  futureTense: ConjugationRow[];
  imperativeS: string;
  imperativeP: string;
  exampleSentences: Array<{ ru: string; translit: string; translation: string }>;
  commonMistakes: { en: string; es: string };
  error?: string;
}

const fallback = (verb: string): ConjugationResult => {
  const known = commonVerbs.find((item) => item.ru === verb || item.translit.toLowerCase().includes(verb.toLowerCase())) ?? commonVerbs[3];
  return {
    infinitive: known.ru,
    infinitiveTranslit: known.translit,
    meaning: { en: known.en, es: known.es },
    aspect: 'imperfective',
    aspectExplain: { en: 'Imperfective verbs describe process or repeated action.', es: 'Los verbos imperfectivos describen proceso o accion repetida.' },
    presentTense: [
      { pronoun: 'я', pronounTranslit: 'ya', form: `${known.ru.replace(/ть$|ти$/, '')}ю`, translit: known.translit },
      { pronoun: 'ты', pronounTranslit: 'ty', form: `${known.ru.replace(/ть$|ти$/, '')}ешь`, translit: known.translit },
      { pronoun: 'он/она', pronounTranslit: 'on/ona', form: `${known.ru.replace(/ть$|ти$/, '')}ет`, translit: known.translit },
      { pronoun: 'мы', pronounTranslit: 'my', form: `${known.ru.replace(/ть$|ти$/, '')}ем`, translit: known.translit },
      { pronoun: 'вы', pronounTranslit: 'vy', form: `${known.ru.replace(/ть$|ти$/, '')}ете`, translit: known.translit },
      { pronoun: 'они', pronounTranslit: 'oni', form: `${known.ru.replace(/ть$|ти$/, '')}ют`, translit: known.translit }
    ],
    pastTense: { m: `${known.ru.replace(/ть$|ти$/, '')}л`, f: `${known.ru.replace(/ть$|ти$/, '')}ла`, n: `${known.ru.replace(/ть$|ти$/, '')}ло`, pl: `${known.ru.replace(/ть$|ти$/, '')}ли` },
    futureTense: ['я буду', 'ты будешь', 'он/она будет', 'мы будем', 'вы будете', 'они будут'].map((pronoun) => ({ pronoun, pronounTranslit: pronoun, form: `${pronoun} ${known.ru}`, translit: known.translit })),
    imperativeS: `${known.ru.replace(/ть$|ти$/, '')}й`,
    imperativeP: `${known.ru.replace(/ть$|ти$/, '')}йте`,
    exampleSentences: [{ ru: `Я хочу ${known.ru}.`, translit: `Ya khochu ${known.translit}.`, translation: `I want ${known.en}.` }],
    commonMistakes: { en: 'Do not use the infinitive after every pronoun.', es: 'No uses el infinitivo despues de cada pronombre.' }
  };
};

export const conjugateVerb = async (verb: string, lang: 'en' | 'es'): Promise<ConjugationResult> => {
  const apiKey = getStoredApiKey();
  if (!apiKey) return fallback(verb);
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'gpt-4o', temperature: 0.2, messages: [{ role: 'system', content: 'Return ONLY valid JSON ConjugationResult for a Russian verb. If invalid, return {"error":"..."}.' }, { role: 'user', content: `${verb}. Language ${lang}` }] })
    });
    if (!response.ok) return fallback(verb);
    const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const parsed = JSON.parse(data.choices?.[0]?.message?.content?.trim().replace(/^```json\s*/i, '').replace(/```$/i, '') ?? '{}') as ConjugationResult;
    return parsed.infinitive || parsed.error ? parsed : fallback(verb);
  } catch {
    return fallback(verb);
  }
};
