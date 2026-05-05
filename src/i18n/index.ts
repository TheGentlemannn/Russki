import { useCallback } from 'react';
import { en, type TranslationKey } from './en';
import { es } from './es';
import { useAppStore } from '../store/useAppStore';

const dictionaries = { en, es };

export const useTranslation = () => {
  const lang = useAppStore((state) => state.lang);
  const setLang = useAppStore((state) => state.setLang);
  const t = useCallback((key: TranslationKey): string => dictionaries[lang][key] ?? en[key] ?? key, [lang]);
  return { t, lang, setLang };
};

export type { TranslationKey, Translations } from './en';
