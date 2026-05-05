export interface PronunciationResult {
  score: number;
  errors: string[];
  tip: string;
  encouragement: string;
  passed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface DailyChallenge {
  ru: string;
  translit: string;
  translation: string;
  tip: string;
}

export interface GeneratedPhrase {
  ru: string;
  translit: string;
  translation: string;
}

export interface WritingResult {
  correct: boolean;
  feedback: string;
  corrected?: string;
}
