import type { AppProgress, WordMastery } from '../types/progress.types';

const KEY = 'russki-a1-progress';
const API_KEY = 'russki-a1-openai-key';
const LANG_KEY = 'russki-a1-lang';

export const defaultProgress = (): AppProgress => ({
  xp: 0,
  streak: 0,
  lastVisit: '',
  lessonsComplete: [],
  wordMastery: {},
  pronunciationHistory: {},
  starredPhrases: [],
  weakAreas: [],
  xpHistory: []
});

const read = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? ({ ...fallback, ...JSON.parse(raw) } as T) : fallback;
  } catch {
    return fallback;
  }
};

export const getProgress = (): AppProgress => read(KEY, defaultProgress());

export const saveProgress = (progress: AppProgress): void => {
  localStorage.setItem(KEY, JSON.stringify(progress));
};

export const resetProgress = (): AppProgress => {
  const fresh = defaultProgress();
  saveProgress(fresh);
  return fresh;
};

export const updateXP = (amount: number, reason = 'Practice'): AppProgress => {
  const progress = getProgress();
  const next = {
    ...progress,
    xp: Math.max(0, progress.xp + amount),
    xpHistory: [
      ...progress.xpHistory,
      { date: new Date().toISOString(), amount, total: Math.max(0, progress.xp + amount), reason }
    ].slice(-120)
  };
  saveProgress(next);
  return next;
};

export const markLessonComplete = (lessonId: number): AppProgress => {
  const progress = getProgress();
  const next = progress.lessonsComplete.includes(lessonId)
    ? progress
    : { ...progress, lessonsComplete: [...progress.lessonsComplete, lessonId].sort((a, b) => a - b) };
  saveProgress(next);
  return next;
};

export const updateWordMastery = (wordId: string, mastery: WordMastery): AppProgress => {
  const progress = getProgress();
  const next = { ...progress, wordMastery: { ...progress.wordMastery, [wordId]: mastery } };
  saveProgress(next);
  return next;
};

export const addPronunciationScore = (phraseId: string, score: number): AppProgress => {
  const progress = getProgress();
  const scores = [...(progress.pronunciationHistory[phraseId] ?? []), score].slice(-10);
  const next = { ...progress, pronunciationHistory: { ...progress.pronunciationHistory, [phraseId]: scores } };
  saveProgress(next);
  return next;
};

export const toggleStarPhrase = (phraseId: string): AppProgress => {
  const progress = getProgress();
  const starredPhrases = progress.starredPhrases.includes(phraseId)
    ? progress.starredPhrases.filter((id) => id !== phraseId)
    : [...progress.starredPhrases, phraseId];
  const next = { ...progress, starredPhrases };
  saveProgress(next);
  return next;
};

export const getStoredApiKey = (): string | null => localStorage.getItem(API_KEY) || import.meta.env.VITE_OPENAI_KEY || null;
export const setStoredApiKey = (key: string): void => localStorage.setItem(API_KEY, key.trim());
export const getStoredLang = (): 'en' | 'es' => (localStorage.getItem(LANG_KEY) === 'es' ? 'es' : 'en');
export const setStoredLang = (lang: 'en' | 'es'): void => localStorage.setItem(LANG_KEY, lang);
