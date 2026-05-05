import { create } from 'zustand';
import type { ExamResult, ExamSession } from '../types/exam.types';
import { generateExam, gradeExam } from '../services/examAI';

interface ExamState {
  currentExam: ExamSession | null;
  pastResults: ExamResult[];
  isGenerating: boolean;
  startExam: (userLevel: number, weakAreas: string[], lang: 'en' | 'es') => Promise<void>;
  submitAnswer: (questionId: string, answer: string | number) => void;
  finishExam: (lang: 'en' | 'es') => Promise<void>;
  resetExam: () => void;
}

const readPast = (): ExamResult[] => {
  try {
    return JSON.parse(localStorage.getItem('exam_results') ?? '[]') as ExamResult[];
  } catch {
    return [];
  }
};

export const useExamStore = create<ExamState>((set, get) => ({
  currentExam: null,
  pastResults: readPast(),
  isGenerating: false,
  startExam: async (userLevel, weakAreas, lang) => {
    set({ isGenerating: true });
    const sections = await generateExam(userLevel, weakAreas, lang);
    set({ isGenerating: false, currentExam: { startedAt: new Date().toISOString(), timeLimit: 1800, sections, answers: {}, isComplete: false } });
  },
  submitAnswer: (questionId, answer) => {
    const currentExam = get().currentExam;
    if (!currentExam) return;
    set({ currentExam: { ...currentExam, answers: { ...currentExam.answers, [questionId]: answer } } });
  },
  finishExam: async (lang) => {
    const currentExam = get().currentExam;
    if (!currentExam) return;
    const result = await gradeExam(currentExam, lang);
    const pastResults = [result, ...get().pastResults].slice(0, 5);
    localStorage.setItem('exam_results', JSON.stringify(pastResults));
    set({ pastResults, currentExam: { ...currentExam, isComplete: true, result } });
  },
  resetExam: () => set({ currentExam: null })
}));
