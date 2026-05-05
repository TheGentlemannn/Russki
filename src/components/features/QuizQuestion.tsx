import { useState } from 'react';
import type { QuizQuestion as Question } from '../../types/lesson.types';
import { useTranslation } from '../../hooks/useTranslation';
import { explainError, getHint } from '../../services/openai';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

export const QuizQuestion = ({ question, onCorrect }: { question: Question; onCorrect: () => void }) => {
  const { t, lang } = useTranslation();
  const [chosen, setChosen] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [hintText, setHintText] = useState('');
  const [open, setOpen] = useState(false);
  const check = async () => {
    if (chosen === null) return;
    if (chosen === question.correctIndex) {
      setFeedback(t('correct'));
      onCorrect();
      return;
    }
    setFeedback(t('incorrect'));
    setOpen(true);
    try {
      const text = await explainError(question.ru, question.options[question.correctIndex][lang], question.options[chosen][lang], lang);
      setFeedback(text);
    } catch {
      setFeedback(t('errors.apiKey'));
    }
  };
  const askHint = async () => {
    try {
      setHintText(await getHint(question.ru, lang));
    } catch {
      setHintText(t('errors.apiKey'));
    }
  };
  return (
    <div className="rounded-lg border border-soviet-cream bg-white p-5">
      <p className="font-display text-4xl text-soviet-charcoal">{question.ru}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {question.options.map((option, index) => (
          <Button key={option.en} variant={chosen === index ? 'secondary' : 'ghost'} className="justify-start border border-soviet-cream" onClick={() => setChosen(index)}>
            {option[lang]}
          </Button>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={check}>{t('checkAnswer')}</Button>
        <Button variant="ghost" onClick={askHint}>{t('hint')}</Button>
      </div>
      {hintText ? <p className="mt-4 rounded-md bg-soviet-lightcream p-3 text-soviet-charcoal">{hintText}</p> : null}
      <Modal open={open} title={t('incorrect')} onClose={() => setOpen(false)}>
        <p className="text-soviet-charcoal">{feedback}</p>
      </Modal>
    </div>
  );
};
