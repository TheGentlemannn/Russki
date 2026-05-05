import { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { PronunciationCard } from '../components/features/PronunciationCard';
import { phrasebook, phraseCategories } from '../data/phrasebook';
import { useTranslation } from '../hooks/useTranslation';
import { useProgressStore } from '../store/useProgressStore';

export const Phrasebook = () => {
  const { t, lang } = useTranslation();
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [phrase, setPhrase] = useState<typeof phrasebook[number] | null>(null);
  const starred = useProgressStore((state) => state.starredPhrases);
  const toggleStar = useProgressStore((state) => state.toggleStar);
  const visible = phrasebook.filter((item) => (category === 'all' || item.category === category) && `${item.ru} ${item.en} ${item.es}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <PageShell title={t('phrasebook')}>
      <input className="mb-4 w-full rounded-md border border-soviet-cream p-3" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('search')} />
      <div className="mb-5 flex flex-wrap gap-2"><Button variant={category === 'all' ? 'primary' : 'ghost'} onClick={() => setCategory('all')}>{t('allPhrases')}</Button>{phraseCategories.map((item) => <Button key={item.id} variant={category === item.id ? 'primary' : 'ghost'} onClick={() => setCategory(item.id)}>{item[lang]}</Button>)}</div>
      <div className="overflow-hidden rounded-lg border border-soviet-cream bg-white">
        {visible.map((item) => <div key={item.id} className="grid gap-3 border-b border-soviet-cream p-4 md:grid-cols-[1.2fr_1fr_1.2fr_auto_auto]"><strong>{item.ru}</strong><span className="text-soviet-red">{item.translit}</span><span>{item[lang]}</span><Button variant="ghost" onClick={() => toggleStar(item.id)}>{starred.includes(item.id) ? '★' : '☆'}</Button><Button onClick={() => setPhrase(item)}>{t('record')}</Button></div>)}
      </div>
      <Modal open={Boolean(phrase)} title={t('pronunciation')} onClose={() => setPhrase(null)}>{phrase ? <PronunciationCard id={phrase.id} ru={phrase.ru} translit={phrase.translit} /> : null}</Modal>
    </PageShell>
  );
};
