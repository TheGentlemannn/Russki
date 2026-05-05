import { useState } from 'react';
import type { StoryChoice } from '../../types/story.types';
import { useTranslation } from '../../hooks/useTranslation';

export const StoryChoices = ({ choices, disabled, feedback, onChoose }: { choices: StoryChoice[]; disabled: boolean; feedback: string; onChoose: (choice: StoryChoice) => void }) => {
  const { lang, t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      <div className="grid gap-3">
        {choices.map((choice) => {
          const active = selected === choice.id;
          return (
            <button
              key={choice.id}
              disabled={disabled}
              className={`rounded-lg border p-4 text-left transition ${active ? (choice.isCorrect ? 'border-green-700 bg-green-50' : 'border-red-700 bg-red-50') : 'border-soviet-cream bg-white hover:bg-soviet-lightcream'}`}
              onClick={() => {
                setSelected(choice.id);
                onChoose(choice);
              }}
            >
              <span className="block font-display text-2xl">{choice.ru}</span>
              <span className="block text-sm font-semibold text-soviet-red">{choice.translit}</span>
              <span className="block text-sm text-soviet-charcoal/70">{choice.translation[lang]}</span>
              {active && !choice.isCorrect && choice.hint ? <span className="mt-2 block text-sm text-red-700">{choice.hint[lang]}</span> : null}
            </button>
          );
        })}
      </div>
      {feedback ? <p className="rounded-md bg-soviet-cream p-3 text-sm font-semibold">{feedback === 'correct' ? t('correctChoice') : feedback}</p> : null}
    </div>
  );
};
