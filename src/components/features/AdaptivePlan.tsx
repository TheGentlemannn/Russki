import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useAdaptivePlan } from '../../hooks/useAdaptivePlan';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { DifficultyBadge } from './DifficultyBadge';

export const AdaptivePlan = () => {
  const { t, lang } = useTranslation();
  const { plan, isLoading, refresh } = useAdaptivePlan();
  if (!plan) return <Card><p>{t('loading')}...</p></Card>;
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl">{t('yourPlanToday')}</h2>
          <p className="mt-1 text-soviet-charcoal/70">{plan.motivationalMessage[lang]}</p>
        </div>
        <Button variant="ghost" onClick={() => refresh(true)} disabled={isLoading}>{t('refreshPlan')}</Button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="gold">{t('focusArea')}: {plan.todaysFocus[lang]}</Badge>
        <DifficultyBadge difficulty={plan.exerciseDifficulty} />
        <Badge tone="muted">{plan.estimatedMinutes} {t('minutes')}</Badge>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link to={`/lessons/${plan.recommendedLesson}`}><Button className="w-full">{t('recommendedLesson')} {plan.recommendedLesson}</Button></Link>
        <Link to="/flashcards"><Button variant="secondary" className="w-full">{t('wordsToReview')}: {plan.wordsToReview.length}</Button></Link>
      </div>
    </Card>
  );
};
