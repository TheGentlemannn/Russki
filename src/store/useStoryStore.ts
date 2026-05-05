import { create } from 'zustand';
import type { StoryChoice, StoryScenario, StorySession } from '../types/story.types';
import { continueScenario, startScenario } from '../services/storyAI';
import { storyScenarios } from '../data/storyScenarios';

interface StoryState {
  completedScenarios: string[];
  scenarioScores: Record<string, number>;
  currentSession: StorySession | null;
  isLoading: boolean;
  feedback: string;
  startSession: (scenario: StoryScenario, userLevel: number, weakAreas: string[], lang: 'en' | 'es') => Promise<void>;
  sendChoice: (scenario: StoryScenario, choice: StoryChoice, lang: 'en' | 'es') => Promise<void>;
  endSession: () => void;
  getUnlockedScenarios: (lessonsComplete: number[]) => StoryScenario[];
}

const stored = () => {
  try {
    return JSON.parse(localStorage.getItem('story_progress') ?? '{}') as Pick<StoryState, 'completedScenarios' | 'scenarioScores'>;
  } catch {
    return { completedScenarios: [], scenarioScores: {} };
  }
};

const persist = (completedScenarios: string[], scenarioScores: Record<string, number>) => localStorage.setItem('story_progress', JSON.stringify({ completedScenarios, scenarioScores }));

export const useStoryStore = create<StoryState>((set, get) => ({
  completedScenarios: stored().completedScenarios ?? [],
  scenarioScores: stored().scenarioScores ?? {},
  currentSession: null,
  isLoading: false,
  feedback: '',
  startSession: async (scenario, userLevel, weakAreas, lang) => {
    set({ isLoading: true, feedback: '' });
    const result = await startScenario(scenario, userLevel, weakAreas, lang);
    set({ currentSession: { scenarioId: scenario.id, messages: [result.opening], currentChoices: result.choices, score: 0, mistakeCount: 0, isComplete: false, xpEarned: 0 }, isLoading: false });
  },
  sendChoice: async (scenario, choice, lang) => {
    const session = get().currentSession;
    if (!session) return;
    const player = { role: 'player' as const, content: choice.ru, translit: choice.translit, translation: choice.translation, isRevealed: false };
    const interim = { ...session, messages: [...session.messages, player], score: session.score + (choice.isCorrect ? 25 : 0), mistakeCount: session.mistakeCount + (choice.isCorrect ? 0 : 1) };
    set({ currentSession: interim, isLoading: true, feedback: choice.isCorrect ? 'correct' : choice.hint?.[lang] ?? 'wrong' });
    const next = await continueScenario(scenario, interim.messages, choice, interim.mistakeCount, lang);
    const done = next.isComplete;
    const completedScenarios = done && !get().completedScenarios.includes(scenario.id) ? [...get().completedScenarios, scenario.id] : get().completedScenarios;
    const score = Math.min(100, interim.score + (choice.isCorrect ? 10 : 0));
    const scenarioScores = done ? { ...get().scenarioScores, [scenario.id]: score } : get().scenarioScores;
    persist(completedScenarios, scenarioScores);
    set({ completedScenarios, scenarioScores, isLoading: false, feedback: next.feedback ?? '', currentSession: { ...interim, messages: [...interim.messages, next.npcReply], currentChoices: next.choices, isComplete: done, xpEarned: done ? scenario.xpReward : interim.xpEarned, score } });
  },
  endSession: () => set({ currentSession: null, feedback: '' }),
  getUnlockedScenarios: (lessonsComplete) => storyScenarios.filter((scenario) => lessonsComplete.includes(scenario.unlocksAfterLesson))
}));
