import { create } from 'zustand';
import { getProgress, saveProgress } from '../services/storage';
import type { AppProgress } from '../types/progress.types';

interface ProgressState extends AppProgress {
  addXP: (amount: number, reason?: string) => void;
  completLesson: (id: number) => void;
  completeLesson: (id: number) => void;
  addWeakArea: (topic: string) => void;
  addPronunciation: (id: string, score: number) => void;
  toggleStar: (id: string) => void;
  reset: () => void;
}

const persist = (partial: Partial<AppProgress>, set: (state: Partial<ProgressState>) => void) => {
  const next = { ...getProgress(), ...partial };
  saveProgress(next);
  set(next);
};

export const useProgressStore = create<ProgressState>((set, get) => ({
  ...getProgress(),
  addXP: (amount, reason = 'Practice') => {
    const total = Math.max(0, get().xp + amount);
    persist({ xp: total, xpHistory: [...get().xpHistory, { date: new Date().toISOString(), amount, total, reason }].slice(-120) }, set);
  },
  completLesson: (id) => get().completeLesson(id),
  completeLesson: (id) => {
    const lessonsComplete = get().lessonsComplete.includes(id) ? get().lessonsComplete : [...get().lessonsComplete, id].sort((a, b) => a - b);
    persist({ lessonsComplete }, set);
  },
  addWeakArea: (topic) => {
    const weakAreas = get().weakAreas.includes(topic) ? get().weakAreas : [...get().weakAreas, topic];
    persist({ weakAreas }, set);
  },
  addPronunciation: (id, score) => {
    const pronunciationHistory = { ...get().pronunciationHistory, [id]: [...(get().pronunciationHistory[id] ?? []), score].slice(-10) };
    persist({ pronunciationHistory }, set);
  },
  toggleStar: (id) => {
    const starredPhrases = get().starredPhrases.includes(id) ? get().starredPhrases.filter((x) => x !== id) : [...get().starredPhrases, id];
    persist({ starredPhrases }, set);
  },
  reset: () => persist({ xp: 0, streak: 0, lastVisit: '', lessonsComplete: [], wordMastery: {}, pronunciationHistory: {}, starredPhrases: [], weakAreas: [], xpHistory: [] }, set)
}));
