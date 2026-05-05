import { useMemo, useState } from 'react';
import type { StoryMessage } from '../../types/story.types';
import { useTranslation } from '../../hooks/useTranslation';
import { Modal } from '../ui/Modal';
import { PronunciationCard } from './PronunciationCard';

export const StoryInventory = ({ messages }: { messages: StoryMessage[] }) => {
  const { t } = useTranslation();
  const [word, setWord] = useState('');
  const words = useMemo(() => Array.from(new Set(messages.flatMap((message) => message.content.replace(/[!?.,]/g, '').split(/\s+/)).filter((item) => item.length > 2))).slice(0, 18), [messages]);
  return (
    <aside className="rounded-lg border border-soviet-cream bg-white p-4">
      <h3 className="font-display text-xl">{t('wordsEncountered')}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {words.map((item) => <button key={item} className="rounded-full bg-soviet-lightcream px-3 py-1 text-sm font-bold text-soviet-charcoal" onClick={() => setWord(item)}>{item}</button>)}
      </div>
      <Modal open={Boolean(word)} title={t('pronunciation')} onClose={() => setWord('')}>{word ? <PronunciationCard id={`story-${word}`} ru={word} translit={word} /> : null}</Modal>
    </aside>
  );
};
