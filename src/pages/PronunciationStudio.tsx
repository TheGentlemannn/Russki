import { useMemo, useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PronunciationCard } from '../components/features/PronunciationCard';
import { phrasebook } from '../data/phrasebook';
import { lessons } from '../data/lessons';
import { useTranslation } from '../hooks/useTranslation';
import { useProgressStore } from '../store/useProgressStore';

export const PronunciationStudio = () => {
  const { t, lang } = useTranslation();
  const [mode, setMode] = useState<'repeatAfterMe' | 'shadowing' | 'freePractice'>('repeatAfterMe');
  const query = new URLSearchParams(location.search).get('phrase');
  const [selected, setSelected] = useState(query || phrasebook[0].ru);
  const history = useProgressStore((state) => state.pronunciationHistory);
  const phrase = phrasebook.find((item) => item.ru === selected) ?? { id: 'custom', ru: selected, translit: selected, en: selected, es: selected };
  const mastered = useMemo(() => Object.entries(history).filter(([, scores]) => scores.filter((score) => score >= 80).length >= 2), [history]);
  return (
    <PageShell title={t('pronunciation')}>
      <div className="mb-5 flex flex-wrap gap-2">{(['repeatAfterMe', 'shadowing', 'freePractice'] as const).map((item) => <Button key={item} variant={mode === item ? 'primary' : 'ghost'} onClick={() => setMode(item)}>{t(item)}</Button>)}</div>
      {mode === 'freePractice' ? <select className="mb-5 w-full rounded-md border border-soviet-cream p-3" value={selected} onChange={(event) => setSelected(event.target.value)}>{phrasebook.map((item) => <option key={item.id} value={item.ru}>{item.ru} · {item[lang]}</option>)}</select> : null}
      {mode === 'shadowing' ? <div className="mb-5 grid gap-3 md:grid-cols-3">{lessons.flatMap((lesson) => lesson.sentences).slice(0, 6).map((item) => <Button key={item.ru} variant={selected === item.ru ? 'secondary' : 'ghost'} onClick={() => setSelected(item.ru)}>{item.ru}</Button>)}</div> : null}
      <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
        <PronunciationCard id={phrase.id} ru={phrase.ru} translit={phrase.translit} />
        <Card>
          <h2 className="font-display text-2xl">{t('scoreHistory')}</h2>
          <svg viewBox="0 0 220 120" className="mt-4 h-36 w-full">
            {(history[phrase.id] ?? []).slice(-5).map((score, index) => <rect key={`${score}-${index}`} x={index * 42 + 8} y={110 - score} width="28" height={score} rx="4" fill={score >= 80 ? '#15803d' : score >= 50 ? '#D4A017' : '#C0392B'} />)}
          </svg>
          <h2 className="mt-5 font-display text-2xl">{t('trophyShelf')}</h2>
          <div className="mt-3 flex flex-wrap gap-2">{mastered.map(([id]) => <span key={id} className="rounded-full bg-soviet-gold px-3 py-1 text-sm font-bold text-soviet-charcoal">🏆 {id}</span>)}</div>
        </Card>
      </div>
    </PageShell>
  );
};
