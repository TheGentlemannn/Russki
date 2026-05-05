import { useState } from 'react';
import type { GeneratedStory } from '../../types/story.types';
import { useTranslation } from '../../hooks/useTranslation';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ClickableWord } from './ClickableWord';
import { ReadingQuiz } from './ReadingQuiz';

export const StoryReader = ({ story, onAnother }: { story: GeneratedStory; onAnother: () => void }) => {
  const { t } = useTranslation();
  const [quiz, setQuiz] = useState(false);
  const [font, setFont] = useState(22);
  const context = story.words.map((word) => word.ru).join(' ');
  if (quiz) return <ReadingQuiz story={story} onDone={onAnother} />;
  return (
    <article className="rounded-lg border border-soviet-cream bg-white p-6">
      <h2 className="font-display text-4xl">{story.title.ru}</h2>
      <p className="text-soviet-red">{story.title.translit}</p>
      <p>{story.title.translation}</p>
      <div className="mt-3 flex flex-wrap gap-2"><Badge tone="gold">{t('readingTime')}: {story.readingTime}s</Badge><Badge tone="muted">{t('wordCount')}: {story.wordCount}</Badge></div>
      <p className="mt-6 leading-10" style={{ fontSize: font }}>{story.words.map((word) => <span key={word.id}><ClickableWord word={word} context={context} /> </span>)}</p>
      <div className="mt-6 flex flex-wrap gap-2"><Button variant="ghost" onClick={() => setFont((value) => Math.max(18, value - 2))}>A-</Button><Button variant="ghost" onClick={() => setFont((value) => Math.min(30, value + 2))}>A+</Button><Button onClick={() => setQuiz(true)}>{t('takeQuiz')}</Button></div>
    </article>
  );
};
