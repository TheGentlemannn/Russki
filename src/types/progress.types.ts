export interface WordMastery {
  wordId: string;
  seen: number;
  correct: number;
  interval: number;
  easeFactor: number;
  nextReview: string;
}

export interface XpEvent {
  date: string;
  amount: number;
  total: number;
  reason: string;
}

export interface AppProgress {
  xp: number;
  streak: number;
  lastVisit: string;
  lessonsComplete: number[];
  wordMastery: Record<string, WordMastery>;
  pronunciationHistory: Record<string, number[]>;
  starredPhrases: string[];
  weakAreas: string[];
  xpHistory: XpEvent[];
}
