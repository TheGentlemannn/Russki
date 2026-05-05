import { Link } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { lessons } from '../data/lessons';
import { useTranslation } from '../hooks/useTranslation';
import { useProgressStore } from '../store/useProgressStore';

export const Lessons = () => {
  const { t, lang } = useTranslation();
  const completed = useProgressStore((state) => state.lessonsComplete);
  return (
    <PageShell title={t('lessons')}>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {lessons.map((lesson) => {
          const locked = lesson.id > 1 && !completed.includes(lesson.id - 1);
          const done = completed.includes(lesson.id);
          const pct = done ? 100 : locked ? 0 : 35;
          return (
            <Card key={lesson.id} className={locked ? 'opacity-55' : ''}>
              <div className="flex items-start justify-between gap-3"><h2 className="font-display text-2xl">{lesson.title[lang]}</h2><Badge tone={done ? 'green' : locked ? 'muted' : 'gold'}>{done ? t('completed') : locked ? t('locked') : t('continueLesson')}</Badge></div>
              <p className="mt-2 text-soviet-charcoal/70">{lesson.description[lang]}</p>
              <p className="mt-4 font-bold">{lesson.vocabulary.length} {t('words')}</p>
              <ProgressBar value={pct} />
              <Link to={locked ? '#' : `/lessons/${lesson.id}`}><Button className="mt-4 w-full" disabled={locked}>{done ? t('continueLesson') : t('startLesson')}</Button></Link>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
};
