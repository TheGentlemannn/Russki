import { useMemo, useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { commonVerbs } from '../data/commonVerbs';
import { useTranslation } from '../hooks/useTranslation';
import { conjugateVerb, type ConjugationResult } from '../services/conjugatorAI';
import { ConjugationTable } from '../components/features/ConjugationTable';
import { CaseExplainer } from '../components/features/CaseExplainer';

export const VerbConjugator = () => {
  const { t, lang } = useTranslation();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ConjugationResult | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const suggestions = useMemo(() => commonVerbs.filter((verb) => `${verb.ru} ${verb.translit} ${verb.en} ${verb.es}`.toLowerCase().includes(query.toLowerCase())).slice(0, 8), [query]);
  const run = async (verb = query) => {
    if (!verb.trim()) return;
    setLoading(true);
    const next = await conjugateVerb(verb.trim(), lang);
    setResult(next);
    setHistory((items) => [next.infinitive, ...items.filter((item) => item !== next.infinitive)].slice(0, 5));
    setLoading(false);
  };
  return (
    <PageShell title={t('verbConjugator')}>
      <Card className="mb-5">
        <label className="font-bold">{t('searchVerb')}</label>
        <div className="mt-2 flex gap-2"><input className="min-w-0 flex-1 rounded-md border border-soviet-cream p-3" value={query} onChange={(event) => setQuery(event.target.value)} /><Button onClick={() => void run()} disabled={loading}>{loading ? t('conjugating') : t('conjugate')}</Button></div>
        <div className="mt-3 flex flex-wrap gap-2">{suggestions.map((verb) => <button key={verb.ru} className="rounded-full bg-soviet-lightcream px-3 py-1 font-bold" onClick={() => { setQuery(verb.ru); void run(verb.ru); }}>{verb.ru} · {verb[lang]}</button>)}</div>
        <div className="mt-3 flex flex-wrap gap-2">{history.map((verb) => <Button key={verb} variant="ghost" onClick={() => void run(verb)}>{verb}</Button>)}</div>
      </Card>
      {result?.error ? <Card>{t('verbNotFound')}</Card> : result ? <ConjugationTable result={result} /> : null}
      <div className="mt-5"><CaseExplainer /></div>
    </PageShell>
  );
};
