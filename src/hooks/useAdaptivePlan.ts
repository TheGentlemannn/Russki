import { useCallback, useEffect, useState } from 'react';
import { clearAdaptivePlan, generateLearningPlan, type AdaptivePlan } from '../services/adaptiveAI';
import { useProgressStore } from '../store/useProgressStore';
import { useVocabStore } from '../store/useVocabStore';
import { useAppStore } from '../store/useAppStore';

export const useAdaptivePlan = () => {
  const weakAreas = useProgressStore((state) => state.weakAreas);
  const lessonsComplete = useProgressStore((state) => state.lessonsComplete);
  const pronunciationHistory = useProgressStore((state) => state.pronunciationHistory);
  const wordMastery = useVocabStore((state) => state.wordMastery);
  const lang = useAppStore((state) => state.lang);
  const [plan, setPlan] = useState<AdaptivePlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async (force = false) => {
    if (force) clearAdaptivePlan();
    setIsLoading(true);
    const recentScores = Object.values(pronunciationHistory).flat().slice(-10);
    const next = await generateLearningPlan(weakAreas, lessonsComplete, wordMastery, recentScores, lang);
    setPlan(next);
    setIsLoading(false);
  }, [lang, lessonsComplete, pronunciationHistory, weakAreas, wordMastery]);

  useEffect(() => {
    void refresh(false);
  }, [refresh]);

  return { plan, isLoading, refresh };
};
