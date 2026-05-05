import { useTranslation } from '../../hooks/useTranslation';
import type { ExamResult } from '../../types/exam.types';
import { ScoreRing } from '../ui/ScoreRing';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const ExamResults = ({ result, onRetake }: { result: ExamResult; onRetake: () => void }) => {
  const { t, lang } = useTranslation();
  const share = () => void navigator.clipboard?.writeText(`Russki A1: ${result.totalScore}/100`);
  return (
    <div className="rounded-lg border border-soviet-cream bg-white p-6 text-center">
      <ScoreRing score={result.totalScore} />
      <h2 className={`mt-3 font-display text-3xl ${result.passed ? 'text-green-700' : 'text-soviet-red'}`}>{result.passed ? t('examPassed') : t('examFailed')}</h2>
      {result.certificate ? <div className="mx-auto mt-3 inline-flex rounded-lg border-2 border-soviet-gold px-4 py-2 font-display text-xl">Сертификат А1</div> : null}
      <p className="mx-auto mt-4 max-w-2xl">{result.feedback[lang]}</p>
      <div className="mt-5 grid gap-3 text-left md:grid-cols-3">
        {Object.entries(result.sectionScores).map(([key, value]) => <div key={key}><p className="font-bold">{t(`sections.${key}` as never)}</p><ProgressBar value={value} /></div>)}
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-2">{result.weakPoints.map((point) => <Badge key={point} tone="muted">{point}</Badge>)}</div>
      <div className="mt-5 flex justify-center gap-3"><Button onClick={onRetake}>{t('retakeExam')}</Button><Button variant="secondary" onClick={share}>{t('shareResult')}</Button></div>
    </div>
  );
};
