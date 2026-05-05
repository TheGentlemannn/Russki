import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ScoreRing } from '../components/ui/ScoreRing';
import { useTranslation } from '../hooks/useTranslation';
import { useProgressStore } from '../store/useProgressStore';
import { lessons } from '../data/lessons';
import { getDailyChallenge } from '../services/openai';
import type { DailyChallenge } from '../types/ai.types';
import { AdaptivePlan } from '../components/features/AdaptivePlan';

export const Dashboard = () => {
  const { t, lang } = useTranslation();
  const { xp, streak, lessonsComplete, xpHistory } = useProgressStore();
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t('greetMorning') : hour < 18 ? t('greetAfternoon') : t('greetEvening');
  const completePercent = Math.round((lessonsComplete.length / lessons.length) * 100);
  useEffect(() => {
    getDailyChallenge(lang)
      .then(setChallenge)
      .catch(() => setChallenge({ ru: 'Повторите, пожалуйста.', translit: 'Povtorite, pozhaluysta.', translation: lang === 'en' ? 'Repeat, please.' : 'Repita, por favor.', tip: t('dailyChallenge') }));
  }, [lang, t]);
  return (
    <PageShell title={greeting} action={<Link to="/lessons"><Button>{t('continueLesson')}</Button></Link>}>
      <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
        <section className="grid gap-5 sm:grid-cols-3">
          <Card><p className="text-sm font-bold text-soviet-red">{t('streak')}</p><p className="font-display text-4xl">{streak}</p></Card>
          <Card><p className="text-sm font-bold text-soviet-red">{t('xp')}</p><p className="font-display text-4xl">{xp}</p><ProgressBar value={xp % 100} label={`${t('level')} ${Math.floor(xp / 100) + 1}`} /></Card>
          <Card><p className="text-sm font-bold text-soviet-red">{t('lessonsComplete')}</p><p className="font-display text-4xl">{lessonsComplete.length}/{lessons.length}</p><Badge tone="gold">{t('appName')}</Badge></Card>
        </section>
        <Card className="row-span-2 text-center"><p className="mb-3 font-bold text-soviet-red">{t('progress')}</p><ScoreRing score={completePercent} /></Card>
        <div className="sm:col-span-3">
          <AdaptivePlan />
        </div>
        <Card className="sm:col-span-3">
          <h2 className="font-display text-2xl">{t('dailyChallenge')}</h2>
          <p className="mt-4 font-display text-4xl text-soviet-charcoal">{challenge?.ru ?? `${t('loading')}...`}</p>
          <p className="text-soviet-red">{challenge?.translit}</p>
          <p className="mt-2">{challenge?.translation}</p>
          <p className="mt-2 text-sm text-soviet-charcoal/70">{challenge?.tip}</p>
        </Card>
        <Card className="sm:col-span-3">
          <h2 className="font-display text-2xl">{t('recentActivity')}</h2>
          <div className="mt-3 space-y-2">
            {xpHistory.slice(-5).reverse().map((item) => <p key={item.date} className="rounded-md bg-soviet-lightcream p-3">{item.reason}: +{item.amount} {t('xp')}</p>)}
            {xpHistory.length === 0 ? <p className="text-soviet-charcoal/70">{t('noActivity')}</p> : null}
          </div>
        </Card>
      </div>
    </PageShell>
  );
};
