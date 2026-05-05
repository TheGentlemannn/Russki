import { useMemo, useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { allVocabulary, lessons } from '../data/lessons';
import { useTranslation } from '../hooks/useTranslation';
import { explainError } from '../services/openai';
import { useAdaptivePlan } from '../hooks/useAdaptivePlan';
import { DifficultyBadge } from '../components/features/DifficultyBadge';

const distance = (a: string, b: string) => {
  const m = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j += 1) m[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) for (let j = 1; j <= b.length; j += 1) m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return m[a.length][b.length];
};

export const Exercises = () => {
  const { t, lang } = useTranslation();
  const { plan } = useAdaptivePlan();
  const [type, setType] = useState<'translationChallenge' | 'wordMatch' | 'fillBlank' | 'sentenceBuilder'>('translationChallenge');
  const word = useMemo(() => allVocabulary[Math.floor(Math.random() * allVocabulary.length)], [type]);
  const sentence = lessons[0].sentences[0];
  const [answer, setAnswer] = useState('');
  const [modal, setModal] = useState('');
  const check = async () => {
    const expected = word[lang].toLowerCase();
    const ratio = 1 - distance(answer.toLowerCase().trim(), expected) / Math.max(expected.length, 1);
    if (ratio >= (plan?.exerciseDifficulty === 'hard' ? 0.9 : 0.8)) setModal(t('correct'));
    else {
      try { setModal(await explainError(word.ru, word[lang], answer, lang)); } catch { setModal(t('incorrect')); }
    }
  };
  return (
    <PageShell title={t('exercises')} action={plan ? <DifficultyBadge difficulty={plan.exerciseDifficulty} /> : undefined}>
      <div className="mb-5 flex flex-wrap gap-2">{(['translationChallenge', 'wordMatch', 'fillBlank', 'sentenceBuilder'] as const).map((item) => <Button key={item} variant={type === item ? 'primary' : 'ghost'} onClick={() => setType(item)}>{t(item)}</Button>)}</div>
      <Card>
        {type === 'translationChallenge' ? <><p className="font-display text-5xl">{word.ru}</p><input className="mt-5 w-full rounded-md border border-soviet-cream p-3" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={t('answer')} /><Button className="mt-4" onClick={check}>{t('checkAnswer')}</Button></> : null}
        {type === 'wordMatch' ? <div className="grid gap-3 sm:grid-cols-2">{allVocabulary.slice(0, 10).map((item) => <Button key={item.id} variant="ghost" onClick={() => setModal(item[lang])}>{item.ru} · {item[lang]}</Button>)}</div> : null}
        {type === 'fillBlank' ? <><p className="font-display text-3xl">{sentence.ru.replace('хорошо', '_____')}</p><div className="mt-4 grid gap-2 sm:grid-cols-4">{['хорошо', 'вода', 'город', 'семья', ...(plan?.exerciseDifficulty === 'hard' ? ['чай', 'парк'] : [])].map((item) => <Button key={item} onClick={() => setModal(item === 'хорошо' ? t('correct') : t('incorrect'))}>{item}</Button>)}</div></> : null}
        {type === 'sentenceBuilder' ? <><p className="mb-4 text-soviet-charcoal/70">{t('sentenceBuilder')}</p><div className="flex flex-wrap gap-2">{sentence.ru.replace('.', '').split(' ').reverse().map((part) => <Button key={part} variant="ghost">{part}</Button>)}</div><Button className="mt-4" onClick={() => setModal(t('correct'))}>{t('checkAnswer')}</Button></> : null}
      </Card>
      <Modal open={Boolean(modal)} title={t('exercises')} onClose={() => setModal('')}><p>{modal}</p></Modal>
    </PageShell>
  );
};
