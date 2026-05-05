export interface VocabularyWord {
  id: string;
  ru: string;
  translit: string;
  en: string;
  es: string;
  emoji: string;
  lessonId: number;
}

export interface Phrase {
  id: string;
  category: string;
  ru: string;
  translit: string;
  en: string;
  es: string;
}

export interface PhraseCategory {
  id: string;
  en: string;
  es: string;
}
