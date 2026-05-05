export interface ExamQuestion {
  id: string;
  section: 'vocabulary' | 'reading' | 'comprehension';
  type: 'multiple_choice' | 'fill_blank' | 'true_false' | 'match';
  prompt: { ru?: string; en?: string; es?: string };
  options?: string[];
  correctAnswer: string | number;
  points: number;
}

export interface ExamSession {
  startedAt: string;
  timeLimit: 1800;
  sections: {
    vocabulary: ExamQuestion[];
    reading: ExamQuestion[];
    comprehension: ExamQuestion[];
  };
  answers: Record<string, string | number>;
  isComplete: boolean;
  result?: ExamResult;
}

export interface ExamResult {
  totalScore: number;
  passed: boolean;
  sectionScores: { vocabulary: number; reading: number; comprehension: number };
  feedback: { en: string; es: string };
  weakPoints: string[];
  certificate?: boolean;
}
