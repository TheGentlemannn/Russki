import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { PronunciationCard } from '../components/features/PronunciationCard';
import { QuizQuestion } from '../components/features/QuizQuestion';
import { lessons } from '../data/lessons';
import { useTranslation } from '../hooks/useTranslation';
import { useProgressStore } from '../store/useProgressStore';

export const LessonDetail = () => {
  const { id } = useParams();
  const { t, lang } = useTranslation();
  const lesson = lessons.find((item) => item.id === Number(id)) ?? lessons[0];
  const [tab, setTab] = useState<'vocabulary' | 'grammar' | 'sentences' | 'quiz'>('vocabulary');
  const [phrase, setPhrase] = useState<{ id: string; ru: string; translit: string } | null>(null);
  const [correct, setCorrect] = useState<string[]>([]);
  const completeLesson = useProgressStore((state) => state.completeLesson);
  const addXP = useProgressStore((state) => state.addXP);
  const passed = useMemo(() => Math.round((correct.length / lesson.quiz.length) * 100) >= 80, [correct, lesson.quiz.length]);
  const finish = () => {
    if (passed) {
      completeLesson(lesson.id);
      addXP(50, lesson.title[lang]);
    }
  };
  return (
    <PageShell title={lesson.title[lang]}>
      <div className="mb-5 flex flex-wrap gap-2">{(['vocabulary', 'grammar', 'sentences', 'quiz'] as const).map((item) => <Button key={item} variant={tab === item ? 'primary' : 'ghost'} onClick={() => setTab(item)}>{t(item)}</Button>)}</div>
      {tab === 'vocabulary' ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{lesson.vocabulary.map((word) => <Card key={word.id} className="cursor-pointer" onClick={() => setPhrase(word)}><p className="text-3xl">{word.emoji}</p><p className="font-display text-3xl">{word.ru}</p><p className="font-semibold text-soviet-red">{word.translit}</p><p>{word[lang]}</p></Card>)}</div> : null}
      {tab === 'grammar' ? <Card><p className="text-lg leading-8">{lesson.grammar[lang]}</p></Card> : null}
      {tab === 'sentences' ? <div className="space-y-4">{lesson.sentences.map((sentence) => <Card key={sentence.ru}><p className="font-display text-3xl">{sentence.ru}</p><p className="text-soviet-red">{sentence.translit}</p><p>{sentence[lang]}</p><Button className="mt-3" onClick={() => setPhrase({ id: sentence.ru, ru: sentence.ru, translit: sentence.translit })}>{t('record')}</Button></Card>)}</div> : null}
      {tab === 'quiz' ? <div className="space-y-4">{lesson.quiz.map((question) => <QuizQuestion key={question.id} question={question} onCorrect={() => setCorrect((items) => items.includes(question.id) ? items : [...items, question.id])} />)}<Card><p className="font-bold">{t('score')}: {Math.round((correct.length / lesson.quiz.length) * 100)}%</p><Button className="mt-3" onClick={finish}>{t('markComplete')}</Button></Card></div> : null}
      <Modal open={Boolean(phrase)} title={t('pronunciation')} onClose={() => setPhrase(null)}>{phrase ? <PronunciationCard id={phrase.id} ru={phrase.ru} translit={phrase.translit} /> : null}</Modal>
    </PageShell>
  );
};
