import { useState } from 'react';
import type { MouseEvent } from 'react';
import type { VocabularyWord } from '../../types/vocabulary.types';
import { useTranslation } from '../../hooks/useTranslation';
import { useVocabStore } from '../../store/useVocabStore';
import { lessons } from '../../data/lessons';
import { isSynthesisSupported, speakRussian, stopSpeaking } from '../../services/speech';

export const FlashCard = ({ word }: { word: VocabularyWord }) => {
  const [flipped, setFlipped] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const { lang, t } = useTranslation();
  const mastery = useVocabStore((state) => state.getMasteryPercent(word.id));
  const lesson = lessons.find((item) => item.id === word.lessonId);
  const sentence = lesson?.sentences[0];
  const listen = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    speakRussian(word.ru, () => setSpeaking(false), () => setSpeaking(false));
  };

  return (
    <div
      className="h-80 w-full cursor-pointer perspective-1000"
      onClick={() => setFlipped((value) => !value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') setFlipped((value) => !value);
      }}
      role="button"
      tabIndex={0}
      aria-label={`${word.ru} ${t('showAnswer')}`}
    >
      <span className={`relative block h-full transition duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
        <span className="absolute inset-0 rounded-lg border border-soviet-cream bg-white p-6 shadow-sm [backface-visibility:hidden]">
          <span className="flex h-full flex-col items-center justify-between text-center">
            <span className="flex w-full items-center justify-between gap-3">
              <span className="rounded-full bg-soviet-lightcream px-3 py-1 text-sm font-bold text-soviet-red">{t('lessons')} {word.lessonId}</span>
              <button
                type="button"
                className="rounded-md bg-soviet-charcoal px-3 py-2 text-sm font-bold text-white transition hover:bg-black disabled:opacity-50"
                onClick={listen}
                disabled={!isSynthesisSupported()}
              >
                {speaking ? t('stopListening') : t('listen')}
              </button>
            </span>
            <span>
              <span className="block text-4xl">{word.emoji}</span>
              <span className="mt-2 block font-display text-6xl text-soviet-charcoal">{word.ru}</span>
              <span className="mt-2 block rounded-full bg-soviet-cream px-4 py-2 text-lg font-bold text-soviet-charcoal">{word.translit}</span>
              <span className="mt-2 block text-sm font-semibold text-soviet-charcoal/65">{t('pronunciationGuide')}</span>
            </span>
            <span className="text-sm font-bold text-soviet-red">{t('tapToFlip')}</span>
          </span>
        </span>
        <span className="absolute inset-0 rounded-lg border border-soviet-gold bg-soviet-charcoal p-6 text-left text-white shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="flex h-full flex-col justify-between">
            <span>
              <span className="block text-sm font-bold text-soviet-gold">{t('translation')}</span>
              <span className="mt-2 block font-display text-4xl">{word[lang]}</span>
              <span className="mt-4 block text-sm font-bold text-soviet-gold">{t('pronunciationGuide')}</span>
              <span className="block text-2xl font-bold">{word.translit}</span>
              <span className="mt-4 block text-sm text-soviet-cream">{sentence?.ru}</span>
              <span className="block text-sm text-soviet-cream/80">{sentence?.[lang]}</span>
            </span>
            <span>
              <span className="block text-sm font-bold">{t('mastered')}: {mastery}%</span>
              <span className="mt-2 block text-xs text-soviet-cream/70">{t('reviewPrompt')}</span>
            </span>
          </span>
        </span>
      </span>
    </div>
  );
};
