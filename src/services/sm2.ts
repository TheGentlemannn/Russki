import type { WordMastery } from '../types/progress.types';

export const createWordMastery = (wordId: string): WordMastery => ({
  wordId,
  seen: 0,
  correct: 0,
  interval: 0,
  easeFactor: 2.5,
  nextReview: new Date().toISOString()
});

export const reviewSm2 = (current: WordMastery, quality: 0 | 1 | 2 | 3 | 4 | 5, now = new Date()): WordMastery => {
  const correct = quality >= 3;
  let easeFactor = Math.max(1.3, current.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  let interval = current.interval;
  if (!correct) {
    interval = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else if (current.seen === 0) {
    interval = 1;
  } else if (current.interval <= 1) {
    interval = 6;
  } else {
    interval = Math.max(1, Math.round(current.interval * easeFactor));
  }
  return {
    ...current,
    seen: current.seen + 1,
    correct: current.correct + (correct ? 1 : 0),
    interval: Math.max(1, interval),
    easeFactor,
    nextReview: new Date(now.getTime() + Math.max(1, interval) * 86400000).toISOString()
  };
};

export const isDue = (mastery: WordMastery | undefined, now = new Date()): boolean => !mastery || new Date(mastery.nextReview).getTime() <= now.getTime();
