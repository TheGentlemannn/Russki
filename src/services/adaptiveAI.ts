import type { WordMastery } from '../types/progress.types';
import { getStoredApiKey } from './storage';

export interface AdaptivePlan {
  recommendedLesson: number;
  wordsToReview: string[];
  todaysFocus: { en: string; es: string };
  exerciseDifficulty: 'easy' | 'medium' | 'hard';
  motivationalMessage: { en: string; es: string };
  estimatedMinutes: number;
}

const cacheKey = 'adaptive_plan';

export const readAdaptiveCache = (weakAreas: string[]): AdaptivePlan | null => {
  try {
    const raw = localStorage.getItem(cacheKey);
    if (!raw) return null;
    const cached = JSON.parse(raw) as { timestamp: number; weakAreas: string[]; plan: AdaptivePlan };
    if (Date.now() - cached.timestamp > 86400000) return null;
    if (cached.weakAreas.join('|') !== weakAreas.join('|')) return null;
    return cached.plan;
  } catch {
    return null;
  }
};

const fallbackPlan = (weakAreas: string[], lessonsComplete: number[], wordMastery: Record<string, WordMastery>): AdaptivePlan => ({
  recommendedLesson: Math.min(10, Math.max(1, lessonsComplete.length + 1)),
  wordsToReview: Object.values(wordMastery).sort((a, b) => a.correct / Math.max(a.seen, 1) - b.correct / Math.max(b.seen, 1)).slice(0, 10).map((item) => item.wordId),
  todaysFocus: { en: weakAreas[0] || 'Core A1 vocabulary', es: weakAreas[0] || 'Vocabulario A1 esencial' },
  exerciseDifficulty: lessonsComplete.length > 6 ? 'hard' : lessonsComplete.length > 3 ? 'medium' : 'easy',
  motivationalMessage: { en: 'Small daily practice compounds quickly.', es: 'La practica diaria pequena crece rapido.' },
  estimatedMinutes: 15
});

export const generateLearningPlan = async (weakAreas: string[], lessonsComplete: number[], wordMastery: Record<string, WordMastery>, recentScores: number[], lang: 'en' | 'es'): Promise<AdaptivePlan> => {
  const cached = readAdaptiveCache(weakAreas);
  if (cached) return cached;
  const fallback = fallbackPlan(weakAreas, lessonsComplete, wordMastery);
  const apiKey = getStoredApiKey();
  if (!apiKey) return fallback;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o',
        temperature: 0.25,
        messages: [
          { role: 'system', content: 'Analyze the learner data and return ONLY valid JSON AdaptivePlan with recommendedLesson, wordsToReview max 10, todaysFocus {en,es}, exerciseDifficulty easy|medium|hard, motivationalMessage {en,es}, estimatedMinutes.' },
          { role: 'user', content: JSON.stringify({ weakAreas, lessonsComplete, wordMastery, recentScores, lang }) }
        ]
      })
    });
    if (!response.ok) return fallback;
    const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const parsed = JSON.parse(data.choices?.[0]?.message?.content?.trim().replace(/^```json\s*/i, '').replace(/```$/i, '') ?? '{}') as AdaptivePlan;
    if (!parsed.recommendedLesson || !Array.isArray(parsed.wordsToReview)) return fallback;
    localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), weakAreas, plan: parsed }));
    return parsed;
  } catch {
    return fallback;
  }
};

export const clearAdaptivePlan = () => localStorage.removeItem(cacheKey);
