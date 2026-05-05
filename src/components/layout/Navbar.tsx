import { LanguageToggle } from '../features/LanguageToggle';
import { useTranslation } from '../../hooks/useTranslation';

export const Navbar = () => {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-soviet-cream bg-soviet-lightcream/95 px-4 backdrop-blur md:px-8">
      <div>
        <p className="font-display text-2xl text-soviet-red">{t('appName')}</p>
      </div>
      <LanguageToggle />
    </header>
  );
};
