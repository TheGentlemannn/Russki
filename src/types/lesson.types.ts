import type { VocabularyWord } from './vocabulary.types';

export interface QuizQuestion {
  id: string;
  ru: string;
  options: { en: string; es: string }[];
  correctIndex: number;
}

export interface Lesson {
  id: number;
  title: { en: string; es: string };
  description: { en: string; es: string };
  vocabulary: VocabularyWord[];
  grammar: { en: string; es: string };
  sentences: Array<{
    ru: string;
    translit: string;
    en: string;
    es: string;
  }>;
  quiz: QuizQuestion[];
}

export interface AlphabetLetter {
  letter: string;
  lower: string;
  ipa: string;
  soundEn: string;
  soundEs: string;
  example: { ru: string; en: string; es: string };
  type: 'vowel' | 'consonant' | 'sign';
}
