import { FormEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useProgressStore } from '../../store/useProgressStore';
import { chatWithNatasha } from '../../services/openai';
import type { ChatMessage } from '../../types/ai.types';
import { Button } from '../ui/Button';

export const NatashaChat = () => {
  const { t, lang } = useTranslation();
  const weakAreas = useProgressStore((state) => state.weakAreas);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, loading]);

  const send = async (event: FormEvent) => {
    event.preventDefault();
    if (!text.trim()) return;
    const next = [...messages, { role: 'user' as const, content: text.trim(), timestamp: new Date().toLocaleTimeString() }];
    setMessages(next);
    setText('');
    setLoading(true);
    try {
      const reply = await chatWithNatasha(next, t('lessons'), weakAreas, lang);
      setMessages([...next, { role: 'assistant', content: reply, timestamp: new Date().toLocaleTimeString() }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: t('errors.apiKey'), timestamp: new Date().toLocaleTimeString() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 md:bottom-6">
      {open ? (
        <section className="flex h-[32rem] w-[min(24rem,calc(100vw-2rem))] flex-col rounded-lg border border-soviet-cream bg-white shadow-xl">
          <header className="flex items-center justify-between rounded-t-lg bg-soviet-red p-3 text-white">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-soviet-cream font-display text-xl text-soviet-red">Н</span>
              <strong>{t('aiTutor')}</strong>
            </div>
            <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => setOpen(false)}>×</Button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 ? <p className="text-sm text-soviet-charcoal/70">{t('natashaIntro')}</p> : null}
            {messages.map((message, index) => (
              <div key={`${message.timestamp}-${index}`} className={`rounded-lg p-3 ${message.role === 'user' ? 'ml-8 bg-soviet-charcoal text-white' : 'mr-8 bg-soviet-lightcream text-soviet-charcoal'}`}>
                <p>{message.content}</p>
                <p className="mt-1 text-xs opacity-70">{message.timestamp}</p>
              </div>
            ))}
            {loading ? <p className="text-soviet-red">•••</p> : null}
            <div ref={bottomRef} />
          </div>
          <form className="flex gap-2 border-t border-soviet-cream p-3" onSubmit={send}>
            <input className="min-w-0 flex-1 rounded-md border border-soviet-cream px-3 py-2" value={text} onChange={(event) => setText(event.target.value)} placeholder={t('typeMessage')} />
            <Button type="submit">{t('sendMessage')}</Button>
          </form>
        </section>
      ) : (
        <Button className="h-14 w-14 rounded-full p-0 font-display text-2xl shadow-xl" onClick={() => setOpen(true)} aria-label={t('aiTutor')}>Н</Button>
      )}
    </div>
  );
};
