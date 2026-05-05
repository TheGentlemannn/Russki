import { useTranslation } from '../../hooks/useTranslation';
import { Button } from '../ui/Button';

export const LanguageToggle = () => {
  const { lang, setLang } = useTranslation();
  return (
    <div className="flex rounded-md border border-soviet-cream bg-white p-1">
      {(['en', 'es'] as const).map((item) => (
        <Button
          key={item}
          variant={lang === item ? 'primary' : 'ghost'}
          className="min-h-8 px-3 py-1"
          onClick={() => setLang(item)}
          aria-pressed={lang === item}
        >
          {item.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};
