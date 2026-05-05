import { useEffect } from 'react';
import { useProgressStore } from '../store/useProgressStore';
import { getProgress, saveProgress } from '../services/storage';

const dayKey = (date: Date) => date.toISOString().slice(0, 10);

export const useStreak = () => {
  const streak = useProgressStore((state) => state.streak);
  useEffect(() => {
    const progress = getProgress();
    const today = dayKey(new Date());
    if (progress.lastVisit === today) return;
    const yesterday = dayKey(new Date(Date.now() - 86400000));
    const next = { ...progress, streak: progress.lastVisit === yesterday ? progress.streak + 1 : 1, lastVisit: today };
    saveProgress(next);
  }, []);
  return streak;
};
