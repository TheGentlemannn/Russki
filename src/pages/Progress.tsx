import { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Modal } from '../components/ui/Modal';
import { lessons, allVocabulary } from '../data/lessons';
import { useTranslation } from '../hooks/useTranslation';
import { useProgressStore } from '../store/useProgressStore';
import { useVocabStore } from '../store/useVocabStore';

export const Progress = () => {
  const { t, lang } = useTranslation();
  const progress = useProgressStore();
  const getMasteryPercent = useVocabStore((state) => state.getMasteryPercent);
  const [confirm, setConfirm] = useState(false);
  const masteredPhrases = Object.values(progress.pronunciationHistory).filter((scores) => scores.filter((score) => score >= 80).length >= 2).length;
  const achievements = [
    { key: 'firstStep', unlocked: progress.lessonsComplete.includes(1) },
    { key: 'wordCollector', unlocked: allVocabulary.filter((word) => getMasteryPercent(word.id) > 0).length >= 50 },
    { key: 'century', unlocked: progress.xp >= 100 },
    { key: 'streakWeek', unlocked: progress.streak >= 7 },
    { key: 'pronunciationPro', unlocked: masteredPhrases >= 10 },
    { key: 'completionist', unlocked: progress.lessonsComplete.length === lessons.length }
  ] as const;
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'russki-a1-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <PageShell title={t('progress')} action={<div className="flex gap-2"><Button variant="ghost" onClick={exportJson}>{t('exportProgress')}</Button><Button variant="danger" onClick={() => setConfirm(true)}>{t('resetProgress')}</Button></div>}>
      <div className="grid gap-5 xl:grid-cols-2">
        <Card><h2 className="font-display text-2xl">{t('lessonStatus')}</h2><div className="mt-4 grid gap-2 sm:grid-cols-2">{lessons.map((lesson) => <div key={lesson.id} className="flex items-center justify-between rounded-md bg-soviet-lightcream p-3"><span>{lesson.title[lang]}</span><Badge tone={progress.lessonsComplete.includes(lesson.id) ? 'green' : 'muted'}>{progress.lessonsComplete.includes(lesson.id) ? t('completed') : t('notYet')}</Badge></div>)}</div></Card>
        <Card><h2 className="font-display text-2xl">{t('xp')}</h2><svg viewBox="0 0 320 150" className="mt-4 h-44 w-full"><polyline fill="none" stroke="#C0392B" strokeWidth="4" points={progress.xpHistory.map((item, index) => `${(index / Math.max(progress.xpHistory.length - 1, 1)) * 300 + 10},${140 - Math.min(130, item.total)}`).join(' ')} /></svg></Card>
        <Card><h2 className="font-display text-2xl">{t('wordMastery')}</h2><div className="mt-4 max-h-96 space-y-3 overflow-auto">{allVocabulary.map((word) => <div key={word.id}><div className="mb-1 flex justify-between text-sm"><span>{word.ru} · {word[lang]}</span><span>{getMasteryPercent(word.id)}%</span></div><ProgressBar value={getMasteryPercent(word.id)} /></div>)}</div></Card>
        <Card><h2 className="font-display text-2xl">{t('pronunciationScores')}</h2><div className="mt-4 grid grid-cols-8 gap-2">{Object.entries(progress.pronunciationHistory).flatMap(([id, scores]) => scores.slice(-5).map((score, index) => <span title={id} key={`${id}-${index}`} className={`h-7 rounded ${score >= 80 ? 'bg-green-700' : score >= 50 ? 'bg-soviet-gold' : 'bg-soviet-red'}`} />))}</div></Card>
        <Card className="xl:col-span-2"><h2 className="font-display text-2xl">{t('achievements')}</h2><div className="mt-4 grid gap-3 sm:grid-cols-3">{achievements.map((item) => <div key={item.key} className={`rounded-lg p-4 ${item.unlocked ? 'bg-soviet-gold text-soviet-charcoal' : 'bg-soviet-cream text-soviet-charcoal/55'}`}><p className="font-display text-xl">{t(item.key)}</p><p className="font-bold">{item.unlocked ? t('completed') : t('locked')}</p></div>)}</div></Card>
      </div>
      <Modal open={confirm} title={t('resetProgress')} onClose={() => setConfirm(false)}><p>{t('confirmReset')}</p><div className="mt-5 flex justify-end gap-2"><Button variant="ghost" onClick={() => setConfirm(false)}>{t('cancel')}</Button><Button variant="danger" onClick={() => { progress.reset(); setConfirm(false); }}>{t('reset')}</Button></div></Modal>
    </PageShell>
  );
};
