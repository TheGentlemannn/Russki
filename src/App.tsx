import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { NatashaChat } from './components/features/NatashaChat';
import { OnboardingFlow } from './components/features/OnboardingFlow';
import { Dashboard } from './pages/Dashboard';
import { Alphabet } from './pages/Alphabet';
import { Lessons } from './pages/Lessons';
import { LessonDetail } from './pages/LessonDetail';
import { PronunciationStudio } from './pages/PronunciationStudio';
import { Flashcards } from './pages/Flashcards';
import { Exercises } from './pages/Exercises';
import { Phrasebook } from './pages/Phrasebook';
import { Progress } from './pages/Progress';
import { StoryMode } from './pages/StoryMode';
import { Stories } from './pages/Stories';
import { VerbConjugator } from './pages/VerbConjugator';
import { ExamMode } from './pages/ExamMode';
import { useAppStore } from './store/useAppStore';

export const App = () => {
  const location = useLocation();
  const setLang = useAppStore((state) => state.setLang);
  const lang = useAppStore((state) => state.lang);
  const setCurrentSection = useAppStore((state) => state.setCurrentSection);
  useEffect(() => setCurrentSection(location.pathname), [location.pathname, setCurrentSection]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'l' && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) setLang(lang === 'en' ? 'es' : 'en');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lang, setLang]);
  return (
    <div className="min-h-screen bg-soviet-lightcream font-body text-soviet-charcoal">
      <Navbar />
      <Sidebar />
      <div className="mx-auto max-w-7xl px-4 py-6 md:ml-64 md:px-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alphabet" element={<Alphabet />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:id" element={<LessonDetail />} />
          <Route path="/pronunciation" element={<PronunciationStudio />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/phrasebook" element={<Phrasebook />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/story-mode" element={<StoryMode />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/verbs" element={<VerbConjugator />} />
          <Route path="/exam" element={<ExamMode />} />
        </Routes>
      </div>
      <NatashaChat />
      <OnboardingFlow />
    </div>
  );
};
