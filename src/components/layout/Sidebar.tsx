import { NavLink } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import type { TranslationKey } from '../../i18n';

const items: Array<{ to: string; key: TranslationKey; icon: string }> = [
  { to: '/', key: 'dashboard', icon: '⌂' },
  { to: '/alphabet', key: 'alphabet', icon: 'Я' },
  { to: '/lessons', key: 'lessons', icon: '▦' },
  { to: '/pronunciation', key: 'pronunciation', icon: '◉' },
  { to: '/flashcards', key: 'flashcards', icon: '◇' },
  { to: '/exercises', key: 'exercises', icon: '✎' },
  { to: '/phrasebook', key: 'phrasebook', icon: '☰' },
  { to: '/progress', key: 'progress', icon: '↗' },
  { to: '/story-mode', key: 'storyMode', icon: '🗺️' },
  { to: '/stories', key: 'stories', icon: '📖' },
  { to: '/verbs', key: 'verbConjugator', icon: '🔤' },
  { to: '/exam', key: 'examMode', icon: '📝' }
];

export const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-soviet-cream bg-white md:bottom-auto md:top-16 md:h-[calc(100vh-4rem)] md:w-64 md:border-r md:border-t-0">
      <div className="grid grid-cols-4 gap-1 p-2 md:flex md:flex-col md:p-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex min-h-12 items-center justify-center gap-3 rounded-md px-3 py-2 text-sm font-bold transition md:justify-start ${
                isActive ? 'bg-soviet-red text-white' : 'text-soviet-charcoal hover:bg-soviet-cream'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="hidden md:inline">{t(item.key)}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
