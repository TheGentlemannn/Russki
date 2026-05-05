import { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useTranslation } from '../hooks/useTranslation';
import { useProgressStore } from '../store/useProgressStore';
import { useExamStore } from '../store/useExamStore';
import { ExamTimer } from '../components/features/ExamTimer';
import { ExamSection } from '../components/features/ExamSection';
import { ExamResults } from '../components/features/ExamResults';

export const ExamMode = () => {
  const { t, lang } = useTranslation();
  const weakAreas = useProgressStore((state) => state.weakAreas);
  const lessonsComplete = useProgressStore((state) => state.lessonsComplete);
  const { currentExam, pastResults, isGenerating, startExam, submitAnswer, finishExam, resetExam } = useExamStore();
  const [section, setSection] = useState<'vocabulary' | 'reading' | 'comprehension'>('vocabulary');
  if (!currentExam) {
    return (
      <PageShell title={t('examMode')}>
        <Card>
          <h2 className="font-display text-4xl">Экзамен А1 / {t('examTitle')}</h2>
          <p className="mt-3 text-soviet-charcoal/70">{t('examDescription')}</p>
          <p className="mt-3 rounded-md bg-yellow-50 p-3 text-yellow-900">{t('examWarning')}</p>
          <div className="mt-4 flex flex-wrap gap-2">{pastResults.slice(0, 3).map((result, index) => <Badge key={index} tone={result.passed ? 'green' : 'red'}>{result.totalScore}</Badge>)}</div>
          <Button className="mt-5" disabled={isGenerating} onClick={() => void startExam(lessonsComplete.length + 1, weakAreas, lang)}>{isGenerating ? t('generating.exam') : t('startExam')}</Button>
        </Card>
      </PageShell>
    );
  }
  if (currentExam.result) return <PageShell title={t('examMode')}><ExamResults result={currentExam.result} onRetake={resetExam} /></PageShell>;
  const allQuestions = [...currentExam.sections.vocabulary, ...currentExam.sections.reading, ...currentExam.sections.comprehension];
  const answered = Object.keys(currentExam.answers).length;
  return (
    <PageShell title={t('examMode')} action={<ExamTimer totalSeconds={currentExam.timeLimit} onTimeUp={() => void finishExam(lang)} />}>
      <div className="mb-4 flex flex-wrap gap-2">{(['vocabulary', 'reading', 'comprehension'] as const).map((item) => <Button key={item} variant={section === item ? 'primary' : 'ghost'} onClick={() => setSection(item)}>{t(`sections.${item}` as never)} {currentExam.sections[item].every((q) => currentExam.answers[q.id] !== undefined) ? '✓' : ''}</Button>)}</div>
      <ExamSection questions={currentExam.sections[section]} answers={currentExam.answers} onAnswer={submitAnswer} />
      <div className="sticky bottom-20 mt-5 flex items-center justify-between rounded-lg border border-soviet-cream bg-white p-4 md:bottom-4"><strong>{answered}/{allQuestions.length} {t('questionsAnswered')}</strong><Button disabled={answered < allQuestions.length} onClick={() => void finishExam(lang)}>{t('submitExam')}</Button></div>
    </PageShell>
  );
};
