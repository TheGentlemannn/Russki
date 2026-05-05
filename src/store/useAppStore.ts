import { create } from 'zustand';
import { getStoredApiKey, getStoredLang, setStoredApiKey, setStoredLang } from '../services/storage';

interface AppState {
  lang: 'en' | 'es';
  setLang: (lang: 'en' | 'es') => void;
  apiKey: string | null;
  setApiKey: (key: string) => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
  isOnboardingComplete: boolean;
  completeOnboarding: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  lang: getStoredLang(),
  setLang: (lang) => {
    if (getStoredLang() === lang) return;
    setStoredLang(lang);
    set({ lang });
  },
  apiKey: getStoredApiKey(),
  setApiKey: (key) => {
    setStoredApiKey(key);
    set({ apiKey: key, isOnboardingComplete: true });
  },
  currentSection: '/',
  setCurrentSection: (currentSection) => set({ currentSection }),
  isOnboardingComplete: localStorage.getItem('russki-a1-onboarded') === 'true',
  completeOnboarding: () => {
    localStorage.setItem('russki-a1-onboarded', 'true');
    set({ isOnboardingComplete: true });
  }
}));
