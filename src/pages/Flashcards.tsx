import { useEffect, useMemo, useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { FlashCard } from '../components/features/FlashCard';
import { allVocabulary } from '../data/lessons';
import { useTranslation } from '../hooks/useTranslation';
import { useVocabStore } from '../store/useVocabStore';
import { useProgressStore } from '../store/useProgressStore';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';

export const Flashcards = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'due' | 'mastered' | 'struggling'>('due');
  const [index, setIndex] = useState(0);
  const [reviewed, setReviewed] = useState(0);
  const [correct, setCorrect] = useState(0);
  const { getDueCards, reviewCard, getMasteryPercent } = useVocabStore();
  const addXP = useProgressStore((state) => state.addXP);
  const dueCount = getDueCards().length;
  const masteredCount = allVocabulary.filter((item) => getMasteryPercent(item.id) >= 80).length;
  const strugglingCount = allVocabulary.filter((item) => getMasteryPercent(item.id) > 0 && getMasteryPercent(item.id) < 60).length;
  const cards = useMemo(() => {
    if (filter === 'due') return getDueCards();
    if (filter === 'mastered') return allVocabulary.filter((word) => getMasteryPercent(word.id) >= 80);
    if (filter === 'struggling') return allVocabulary.filter((word) => getMasteryPercent(word.id) > 0 && getMasteryPercent(word.id) < 60);
    return allVocabulary;
  }, [filter, getDueCards, getMasteryPercent]);
  const word = cards[index % Math.max(cards.length, 1)];
  const currentNumber = cards.length ? (index % cards.length) + 1 : 0;
  const accuracy = reviewed ? Math.round((correct / reviewed) * 100) : 0;
  useEffect(() => setIndex(0), [filter]);
  const review = (quality: 1 | 3 | 5) => {
    if (!word) return;
    reviewCard(word.id, quality);
    setReviewed((value) => value + 1);
    if (quality >= 3) setCorrect((value) => value + 1);
    addXP(quality >= 3 ? 4 : 1, t('flashcards'));
    setIndex((value) => value + 1);
  };
  const filters = [
    { id: 'due' as const, label: t('dueToday'), count: dueCount },
    { id: 'all' as const, label: t('allCards'), count: allVocabulary.length },
    { id: 'mastered' as const, label: t('mastered'), count: masteredCount },
    { id: 'struggling' as const, label: t('struggling'), count: strugglingCount }
  ];

  return (
    <PageShell title={t('flashcards')}>
      <Card className="mb-5">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-display text-2xl text-soviet-charcoal">{t('flashcardSession')}</h2>
            <p className="mt-1 text-soviet-charcoal/70">{t('flashcardInstructions')}</p>
          </div>
          <Badge tone="gold">{t('cardsInSet')}: {cards.length}</Badge>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          {filters.map((item) => (
            <button
              key={item.id}
              className={`rounded-lg border p-3 text-left transition ${
                filter === item.id ? 'border-soviet-red bg-soviet-red text-white' : 'border-soviet-cream bg-soviet-lightcream text-soviet-charcoal hover:bg-soviet-cream'
              }`}
              onClick={() => setFilter(item.id)}
            >
              <span className="block text-sm font-bold">{item.label}</span>
              <span className="font-display text-2xl">{item.count}</span>
            </button>
          ))}
        </div>
      </Card>
      <div className="grid gap-5 lg:grid-cols-[1fr_20rem]">
        {word ? (
          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="font-bold text-soviet-charcoal">{t('cardProgress')}: {currentNumber}/{cards.length}</p>
              <p className="text-sm font-semibold text-soviet-charcoal/65">{t('tapToFlip')}</p>
            </div>
            <FlashCard word={word} />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Button variant="danger" onClick={() => review(1)} className="flex-col gap-0 py-3">
                <span>{t('again')}</span>
                <span className="text-xs font-semibold opacity-80">{t('againHelp')}</span>
              </Button>
              <Button variant="secondary" onClick={() => review(3)} className="flex-col gap-0 py-3">
                <span>{t('hard')}</span>
                <span className="text-xs font-semibold opacity-80">{t('hardHelp')}</span>
              </Button>
              <Button onClick={() => review(5)} className="flex-col gap-0 py-3">
                <span>{t('easy')}</span>
                <span className="text-xs font-semibold opacity-80">{t('easyHelp')}</span>
              </Button>
            </div>
          </div>
        ) : (
          <Card>
            <h2 className="font-display text-2xl">{t('noCardsTitle')}</h2>
            <p className="mt-2 text-soviet-charcoal/70">{t('noCardsBody')}</p>
          </Card>
        )}
        <div className="space-y-5">
          <Card>
            <h2 className="font-display text-2xl">{t('sessionSummary')}</h2>
            <div className="mt-4 space-y-3">
              <p>{t('reviewed')}: <strong>{reviewed}</strong></p>
              <div>
                <p className="mb-1">{t('accuracy')}: <strong>{accuracy}%</strong></p>
                <ProgressBar value={accuracy} />
              </div>
              <p>{t('xpEarned')}: <strong>{correct * 4}</strong></p>
            </div>
          </Card>
          <Card>
            <h2 className="font-display text-2xl">{t('howToStudy')}</h2>
            <ol className="mt-3 space-y-2 text-sm text-soviet-charcoal/75">
              <li>1. {t('studyStepListen')}</li>
              <li>2. {t('studyStepFlip')}</li>
              <li>3. {t('studyStepRate')}</li>
            </ol>
          </Card>
        </div>
      </div>
    </PageShell>
  );
};
