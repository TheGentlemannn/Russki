import { useState } from 'react';
import type { GeneratedStory } from '../../types/story.types';
import { useTranslation } from '../../hooks/useTranslation';
import { useStoriesStore } from '../../store/useStoriesStore';
import { useProgressStore } from '../../store/useProgressStore';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';

export const ReadingQuiz = ({ story, onDone }: { story: GeneratedStory; onDone: () => void }) => {
  const { t, lang } = useTranslation();
  const saveQuizResult = useStoriesStore((state) => state.saveQuizResult);
  const addWeakArea = useProgressStore((state) => state.addWeakArea);
  const addXP = useProgressStore((state) => state.addXP);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const question = story.questions[index];
  const answer = (value: number | boolean) => {
    const correct = value === question.correctAnswer;
    if (correct) setScore((current) => current + 1);
    else addWeakArea(story.topic);
    setFeedback(`${correct ? t('correct') : t('incorrect')}. ${question.explanation[lang]}`);
  };
  const next = () => {
    if (index + 1 >= story.questions.length) {
      const finalScore = score + (feedback.startsWith(t('correct')) ? 0 : 0);
      saveQuizResult(story.id, finalScore);
      addXP(finalScore * 5, t('stories'));
      onDone();
      return;
    }
    setIndex((value) => value + 1);
    setFeedback('');
  };
  return (
    <div className="rounded-lg border border-soviet-cream bg-white p-5">
      <p className="font-bold">{index + 1}/{story.questions.length}</p>
      <ProgressBar value={(index / story.questions.length) * 100} />
      <h3 className="mt-4 font-display text-2xl">{question.question[lang]}</h3>
      <div className="mt-4 grid gap-2">
        {question.type === 'true_false' ? [true, false].map((item) => <Button key={String(item)} onClick={() => answer(item)}>{item ? t('true') : t('false')}</Button>) : question.options?.map((option, optionIndex) => <Button key={option.en} variant="ghost" onClick={() => answer(optionIndex)}>{option[lang]}</Button>)}
      </div>
      {feedback ? <div className="mt-4 rounded-md bg-soviet-lightcream p-3"><p>{feedback}</p><Button className="mt-3" onClick={next}>{index + 1 >= story.questions.length ? t('quizComplete') : t('nextQuestion')}</Button></div> : null}
    </div>
  );
};
