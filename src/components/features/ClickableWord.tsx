import { useEffect, useRef, useState } from 'react';
import type { StoryWord } from '../../types/story.types';
import { useTranslation } from '../../hooks/useTranslation';
import { getWordDetails } from '../../services/storiesAI';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const ClickableWord = ({ word, context }: { word: StoryWord; context: string }) => {
  const { t, lang } = useTranslation();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<{ definition: string; examples: string[]; tip: string } | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);
  if (word.ru === '.') return <span>.</span>;
  return (
    <span className="relative inline-block" ref={ref}>
      <button className={`${word.isNew ? 'underline decoration-soviet-gold decoration-2 underline-offset-4' : ''} hover:text-soviet-red`} onClick={(event) => { event.stopPropagation(); setOpen((value) => !value); }}>{word.ru}</button>
      {open ? (
        <span className="absolute left-0 top-8 z-20 w-72 rounded-lg border border-soviet-cream bg-white p-4 text-left shadow-xl">
          <span className="block font-display text-3xl">{word.ru}</span>
          <span className="block text-soviet-red">{word.translit}</span>
          <span className="block">{word.translation[lang]}</span>
          <Badge tone="muted">{t(`partOfSpeech.${word.partOfSpeech}` as never)}</Badge>
          {details ? <span className="mt-2 block text-sm">{details.definition} {details.tip}</span> : null}
          <span className="mt-3 flex gap-2"><Button className="min-h-8 px-2 py-1 text-xs" onClick={() => void getWordDetails(word.ru, context, lang).then(setDetails)}>{t('loadMoreDetails')}</Button><Button variant="secondary" className="min-h-8 px-2 py-1 text-xs">{t('addToFlashcards')}</Button></span>
        </span>
      ) : null}
    </span>
  );
};
