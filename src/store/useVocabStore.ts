import { create } from 'zustand';
import { allVocabulary } from '../data/lessons';
import { getProgress, saveProgress } from '../services/storage';
import type { VocabularyWord } from '../types/vocabulary.types';
import type { WordMastery } from '../types/progress.types';

interface VocabState {
  wordMastery: Record<string, WordMastery>;
  getDueCards: () => VocabularyWord[];
  reviewCard: (wordId: string, quality: 0 | 1 | 2 | 3 | 4 | 5) => void;
  getMasteryPercent: (wordId: string) => number;
}

const blank = (wordId: string): WordMastery => ({ wordId, seen: 0, correct: 0, interval: 0, easeFactor: 2.5, nextReview: new Date().toISOString() });

export const useVocabStore = create<VocabState>((set, get) => ({
  wordMastery: getProgress().wordMastery,
  getDueCards: () => {
    const today = Date.now();
    const mastery = get().wordMastery;
    return allVocabulary.filter((word) => !mastery[word.id] || new Date(mastery[word.id].nextReview).getTime() <= today);
  },
  reviewCard: (wordId, quality) => {
    const current = get().wordMastery[wordId] ?? blank(wordId);
    const correct = quality >= 3;
    let interval = current.interval;
    let easeFactor = Math.max(1.3, current.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    if (!correct) {
      interval = 1;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
    } else if (current.seen === 0) {
      interval = 1;
    } else if (current.interval <= 1) {
      interval = 6;
    } else {
      interval = Math.round(current.interval * easeFactor);
    }
    const nextReview = new Date(Date.now() + interval * 86400000).toISOString();
    const nextMastery = { ...current, seen: current.seen + 1, correct: current.correct + (correct ? 1 : 0), interval, easeFactor, nextReview };
    const wordMastery = { ...get().wordMastery, [wordId]: nextMastery };
    const progress = getProgress();
    saveProgress({ ...progress, wordMastery });
    set({ wordMastery });
  },
  getMasteryPercent: (wordId) => {
    const mastery = get().wordMastery[wordId];
    if (!mastery?.seen) return 0;
    return Math.round((mastery.correct / mastery.seen) * 100);
  }
}));
