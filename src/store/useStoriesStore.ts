import { create } from 'zustand';
import type { GeneratedStory } from '../types/story.types';
import * as storiesAI from '../services/storiesAI';

interface StoriesState {
  generatedStories: GeneratedStory[];
  currentStory: GeneratedStory | null;
  readingProgress: Record<string, { completed: boolean; score: number }>;
  isLoading: boolean;
  generateStory: (userLevel: number, lessonsComplete: number[], preferredTopic: string, lang: 'en' | 'es') => Promise<void>;
  setCurrentStory: (story: GeneratedStory | null) => void;
  saveQuizResult: (storyId: string, score: number) => void;
}

const read = () => {
  try {
    return JSON.parse(localStorage.getItem('generated_stories') ?? '{}') as Pick<StoriesState, 'generatedStories' | 'readingProgress'>;
  } catch {
    return { generatedStories: [], readingProgress: {} };
  }
};

const write = (generatedStories: GeneratedStory[], readingProgress: StoriesState['readingProgress']) => localStorage.setItem('generated_stories', JSON.stringify({ generatedStories, readingProgress }));

export const useStoriesStore = create<StoriesState>((set, get) => ({
  generatedStories: read().generatedStories ?? [],
  currentStory: null,
  readingProgress: read().readingProgress ?? {},
  isLoading: false,
  generateStory: async (userLevel, lessonsComplete, preferredTopic, lang) => {
    set({ isLoading: true });
    const story = await storiesAI.generateStory(userLevel, lessonsComplete, preferredTopic, lang);
    const generatedStories = [story, ...get().generatedStories.filter((item) => item.id !== story.id)].slice(0, 10);
    write(generatedStories, get().readingProgress);
    set({ generatedStories, currentStory: story, isLoading: false });
  },
  setCurrentStory: (story) => set({ currentStory: story }),
  saveQuizResult: (storyId, score) => {
    const readingProgress = { ...get().readingProgress, [storyId]: { completed: true, score } };
    write(get().generatedStories, readingProgress);
    set({ readingProgress });
  }
}));
