export interface StoryScenario {
  id: string;
  title: { en: string; es: string };
  location: string;
  locationEmoji: string;
  description: { en: string; es: string };
  unlocksAfterLesson: number;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
}

export interface StoryMessage {
  role: 'npc' | 'player' | 'narrator';
  content: string;
  translit?: string;
  translation?: { en: string; es: string };
  isRevealed: boolean;
}

export interface StoryChoice {
  id: string;
  ru: string;
  translit: string;
  translation: { en: string; es: string };
  isCorrect: boolean;
  hint?: { en: string; es: string };
}

export interface StorySession {
  scenarioId: string;
  messages: StoryMessage[];
  currentChoices: StoryChoice[];
  score: number;
  mistakeCount: number;
  isComplete: boolean;
  xpEarned: number;
}

export interface GeneratedStory {
  id: string;
  title: { ru: string; translit: string; translation: string };
  topic: string;
  wordCount: number;
  words: StoryWord[];
  questions: ReadingQuestion[];
  vocabulary: Array<{ ru: string; translit: string; translation: string }>;
  readingTime: number;
}

export interface StoryWord {
  id: string;
  ru: string;
  translit: string;
  translation: { en: string; es: string };
  isNew: boolean;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'other';
}

export interface ReadingQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false';
  question: { en: string; es: string };
  options?: { en: string; es: string }[];
  correctAnswer: number | boolean;
  explanation: { en: string; es: string };
}
