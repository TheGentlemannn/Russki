import { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { storyScenarios } from '../data/storyScenarios';
import { useTranslation } from '../hooks/useTranslation';
import { useProgressStore } from '../store/useProgressStore';
import { useStoryStore } from '../store/useStoryStore';
import { StoryScene } from '../components/features/StoryScene';

export const StoryMode = () => {
  const { t, lang } = useTranslation();
  const lessonsComplete = useProgressStore((state) => state.lessonsComplete);
  const weakAreas = useProgressStore((state) => state.weakAreas);
  const { completedScenarios, scenarioScores, currentSession, startSession, isLoading } = useStoryStore();
  const [selected, setSelected] = useState(storyScenarios[0]);
  return (
    <PageShell title={t('storyMode')}>
      <div className="grid gap-5 lg:grid-cols-[24rem_1fr]">
        <div className={`${currentSession ? 'hidden lg:block' : ''} space-y-3`}>
          <h2 className="font-display text-2xl">{t('chooseScenario')}</h2>
          {storyScenarios.map((scenario) => {
            const unlocked = lessonsComplete.includes(scenario.unlocksAfterLesson);
            const complete = completedScenarios.includes(scenario.id);
            return (
              <Card key={scenario.id} className={!unlocked ? 'opacity-55' : ''}>
                <div className="flex items-start gap-3"><span className="text-3xl">{scenario.locationEmoji}</span><div className="min-w-0 flex-1"><h3 className="font-display text-xl">{scenario.title[lang]}</h3><p className="font-bold text-soviet-red">{scenario.location}</p><p className="text-sm text-soviet-charcoal/70">{scenario.description[lang]}</p></div></div>
                <div className="mt-3 flex flex-wrap gap-2">{complete ? <Badge tone="green">✓ {scenarioScores[scenario.id] ?? 0}</Badge> : <Badge tone={unlocked ? 'gold' : 'muted'}>{unlocked ? `${scenario.xpReward} ${t('xp')}` : `${t('unlocksAtLesson')} ${scenario.unlocksAfterLesson}`}</Badge>}</div>
                <Button className="mt-3 w-full" disabled={!unlocked || isLoading} onClick={() => { setSelected(scenario); void startSession(scenario, lessonsComplete.length + 1, weakAreas, lang); }}>{t('startScenario')}</Button>
              </Card>
            );
          })}
        </div>
        <StoryScene scenario={selected} />
      </div>
    </PageShell>
  );
};
