import { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { alphabet } from '../data/alphabet';
import { useTranslation } from '../hooks/useTranslation';

export const Alphabet = () => {
  const { t, lang } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'vowel' | 'consonant' | 'sign'>('all');
  const letters = alphabet.filter((item) => filter === 'all' || item.type === filter);
  return (
    <PageShell title={t('alphabet')}>
      <div className="mb-5 flex flex-wrap gap-2">
        {(['all', 'vowel', 'consonant', 'sign'] as const).map((item) => <Button key={item} variant={filter === item ? 'primary' : 'ghost'} onClick={() => setFilter(item)}>{item === 'all' ? t('all') : item === 'vowel' ? t('vowels') : item === 'consonant' ? t('consonants') : t('signs')}</Button>)}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {letters.map((letter) => (
          <div key={letter.letter} className="group h-56 perspective-1000">
            <div className="relative h-full transition duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className={`absolute inset-0 grid place-items-center rounded-lg p-5 text-white shadow-sm [backface-visibility:hidden] ${letter.type === 'vowel' ? 'bg-soviet-red' : letter.type === 'consonant' ? 'bg-soviet-charcoal' : 'bg-soviet-gold text-soviet-charcoal'}`}>
                <div className="text-center"><p className="font-display text-7xl">{letter.letter}</p><p className="text-2xl">{letter.lower}</p></div>
              </div>
              <div className="absolute inset-0 rounded-lg border border-soviet-cream bg-white p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <p className="font-bold text-soviet-red">{t('ipa')}: {letter.ipa}</p>
                <p className="mt-2">{t('sound')}: {lang === 'en' ? letter.soundEn : letter.soundEs}</p>
                <p className="mt-2">{t('example')}: {letter.example.ru} · {letter.example[lang]}</p>
                <Button className="mt-4" onClick={() => location.assign(`/pronunciation?phrase=${encodeURIComponent(letter.example.ru)}`)}>{t('practice')}</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
};
