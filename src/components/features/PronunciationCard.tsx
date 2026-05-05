import { useEffect, useState } from 'react';
import { evaluatePronunciation } from '../../services/openai';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useTranslation } from '../../hooks/useTranslation';
import { useProgressStore } from '../../store/useProgressStore';
import { isSynthesisSupported, speakRussian, stopSpeaking } from '../../services/speech';
import type { PronunciationResult } from '../../types/ai.types';
import { Button } from '../ui/Button';
import { ScoreRing } from '../ui/ScoreRing';
import { Waveform } from '../ui/Waveform';

export const PronunciationCard = ({ id, ru, translit }: { id: string; ru: string; translit: string }) => {
  const { t, lang } = useTranslation();
  const speech = useSpeechRecognition();
  const addPronunciation = useProgressStore((state) => state.addPronunciation);
  const history = useProgressStore((state) => state.pronunciationHistory[id] ?? []);
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!speech.transcript) return;
    setLoading(true);
    evaluatePronunciation(ru, speech.transcript, lang)
      .then((next) => {
        setResult(next);
        addPronunciation(id, next.score);
      })
      .catch((err) => setError(err instanceof Error ? err.message : t('errors.network')))
      .finally(() => setLoading(false));
  }, [speech.transcript, ru, lang, id, addPronunciation, t]);

  const listen = () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    setError(null);
    setSpeaking(true);
    speakRussian(
      ru,
      () => setSpeaking(false),
      () => {
        setSpeaking(false);
        setError(t('errors.speechSynthesisNotSupported'));
      }
    );
  };

  return (
    <div className="rounded-lg border border-soviet-cream bg-white p-5 shadow-sm">
      <div className="text-center">
        <p className="font-display text-4xl text-soviet-charcoal">{ru}</p>
        <p className="mt-1 text-lg font-semibold text-soviet-red">{translit}</p>
      </div>
      {speech.error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{t('errors.speechNotSupported')}</p> : null}
      {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <Button variant="secondary" onClick={listen} disabled={!isSynthesisSupported() || loading}>
          {speaking ? t('stopListening') : t('listen')}
        </Button>
        <Button onClick={speech.isRecording ? speech.stop : speech.start} disabled={!speech.isSupported || loading} icon={speech.isRecording ? <Waveform /> : null}>
          {speech.isRecording ? t('stopRecording') : t('record')}
        </Button>
      </div>
      {loading ? <p className="mt-4 text-center font-semibold text-soviet-charcoal">{t('loading')}...</p> : null}
      {result ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-[auto_1fr]">
          <ScoreRing score={result.score} />
          <div className="rounded-md bg-soviet-lightcream p-4">
            <p className="font-bold text-soviet-charcoal">{result.tip}</p>
            <p className="mt-2 text-soviet-charcoal/80">{result.encouragement}</p>
          </div>
        </div>
      ) : null}
      <div className="mt-5 flex justify-center gap-2">
        {history.slice(-5).map((score, index) => (
          <span key={`${score}-${index}`} className={`h-3 w-3 rounded-full ${score >= 80 ? 'bg-green-700' : score >= 50 ? 'bg-soviet-gold' : 'bg-soviet-red'}`} />
        ))}
      </div>
    </div>
  );
};
