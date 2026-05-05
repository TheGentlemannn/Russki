import type { ExamQuestion } from '../../types/exam.types';
import { useTranslation } from '../../hooks/useTranslation';
import { Button } from '../ui/Button';

export const ExamSection = ({ questions, answers, onAnswer }: { questions: ExamQuestion[]; answers: Record<string, string | number>; onAnswer: (id: string, value: string | number) => void }) => {
  const { lang, t } = useTranslation();
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div key={question.id} className="rounded-lg border border-soviet-cream bg-white p-5">
          <p className="text-sm font-bold text-soviet-red">{index + 1}. {question.type}</p>
          <p className="mt-2 font-display text-2xl">{question.prompt.ru ?? question.prompt[lang]}</p>
          {question.type === 'fill_blank' ? (
            <input className="mt-4 w-full rounded-md border border-soviet-cream p-3" value={answers[question.id] ?? ''} onChange={(event) => onAnswer(question.id, event.target.value)} />
          ) : question.type === 'true_false' ? (
            <div className="mt-4 flex gap-3"><Button variant={answers[question.id] === 'true' ? 'primary' : 'ghost'} onClick={() => onAnswer(question.id, 'true')}>{t('true')}</Button><Button variant={answers[question.id] === 'false' ? 'primary' : 'ghost'} onClick={() => onAnswer(question.id, 'false')}>{t('false')}</Button></div>
          ) : (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">{question.options?.map((option, optionIndex) => <Button key={option} variant={answers[question.id] === option ? 'secondary' : 'ghost'} onClick={() => onAnswer(question.id, option)}>{String.fromCharCode(65 + optionIndex)}. {option}</Button>)}</div>
          )}
        </div>
      ))}
    </div>
  );
};
