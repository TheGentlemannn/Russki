import { useState } from 'react';
import type { StoryMessage } from '../../types/story.types';
import { useTranslation } from '../../hooks/useTranslation';
import { Button } from '../ui/Button';

export const DialogueBubble = ({ message }: { message: StoryMessage }) => {
  const { lang, t } = useTranslation();
  const [revealed, setRevealed] = useState(message.isRevealed);
  const align = message.role === 'player' ? 'ml-auto bg-soviet-charcoal text-white' : message.role === 'narrator' ? 'mx-auto bg-soviet-cream text-soviet-charcoal italic' : 'mr-auto border-l-4 border-soviet-red bg-white text-soviet-charcoal';
  return (
    <div className={`max-w-[85%] rounded-lg p-4 shadow-sm ${align}`}>
      <p className="font-display text-2xl">{message.content}</p>
      {message.translit ? <p className="text-sm opacity-75">{message.translit}</p> : null}
      <Button variant="ghost" className="mt-2 min-h-8 px-2 py-1 text-xs" onClick={() => setRevealed((value) => !value)}>◉ {t('tapToReveal')}</Button>
      {revealed && message.translation ? <p className="mt-2 text-sm">{message.translation[lang]}</p> : null}
    </div>
  );
};
