import { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useTranslation } from '../hooks/useTranslation';
import { useProgressStore } from '../store/useProgressStore';
import { useStoriesStore } from '../store/useStoriesStore';
import { StoryReader } from '../components/features/StoryReader';

const topics = ['dailyLife', 'travel', 'food', 'family', 'work', 'school', 'nature', 'city'] as const;

export const Stories = () => {
  const { t, lang } = useTranslation();
  const lessonsComplete = useProgressStore((state) => state.lessonsComplete);
  const { generatedStories, currentStory, readingProgress, isLoading, generateStory, setCurrentStory } = useStoriesStore();
  const [topic, setTopic] = useState<(typeof topics)[number]>('dailyLife');
  if (currentStory) return <PageShell title={t('stories')}><StoryReader story={currentStory} onAnother={() => setCurrentStory(null)} /></PageShell>;
  return (
    <PageShell title={t('stories')}>
      <Card className="mb-5">
        <h2 className="font-display text-2xl">{t('chooseTopic')}</h2>
        <div className="mt-3 flex flex-wrap gap-2">{topics.map((item) => <Button key={item} variant={topic === item ? 'primary' : 'ghost'} onClick={() => setTopic(item)}>{t(`topics.${item}` as never)}</Button>)}</div>
        <Button className="mt-4" disabled={isLoading} onClick={() => void generateStory(lessonsComplete.length + 1, lessonsComplete, t(`topics.${topic}` as never), lang)}>{isLoading ? t('generating.story') : t('generateStory')}</Button>
      </Card>
      <h2 className="mb-3 font-display text-2xl">{t('storyLibrary')}</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {generatedStories.map((story) => <Card key={story.id}><h3 className="font-display text-2xl">{story.title.ru}</h3><p>{story.title.translation}</p><div className="mt-3 flex gap-2"><Badge tone="gold">{story.wordCount} {t('words')}</Badge>{readingProgress[story.id] ? <Badge tone="green">{readingProgress[story.id].score}/5</Badge> : null}</div><Button className="mt-4" onClick={() => setCurrentStory(story)}>{t('startReading')}</Button></Card>)}
        {generatedStories.length === 0 ? <Card><p>{t('clickWordTip')}</p></Card> : null}
      </div>
    </PageShell>
  );
};
