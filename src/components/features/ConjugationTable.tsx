import type { ConjugationResult } from '../../services/conjugatorAI';
import { useTranslation } from '../../hooks/useTranslation';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const ConjugationTable = ({ result }: { result: ConjugationResult }) => {
  const { t, lang } = useTranslation();
  return (
    <section className="space-y-5">
      <div className="rounded-lg border border-soviet-cream bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-display text-4xl">{result.infinitive}</h2><p className="text-soviet-red">{result.infinitiveTranslit}</p><p>{result.meaning[lang]}</p></div><Badge tone="gold">{t(result.aspect)}</Badge></div>
        <p className="mt-3 text-sm text-soviet-charcoal/70">{result.aspectExplain[lang]}</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Table title={t('presentTense')} rows={result.presentTense} />
        <Table title={t('futureTense')} rows={result.futureTense} />
      </div>
      <div className="rounded-lg border border-soviet-cream bg-white p-5"><h3 className="font-display text-2xl">{t('pastTense')}</h3><div className="mt-3 grid grid-cols-2 gap-2">{Object.entries(result.pastTense).map(([key, value]) => <div key={key} className="rounded-md bg-soviet-lightcream p-3"><strong>{key}</strong>: {value}</div>)}</div></div>
      <div className="rounded-lg border border-soviet-cream bg-white p-5"><h3 className="font-display text-2xl">{t('imperative')}</h3><p>{result.imperativeS} / {result.imperativeP}</p></div>
      <div className="grid gap-3 md:grid-cols-3">{result.exampleSentences.map((item) => <div key={item.ru} className="rounded-lg bg-white p-4"><p className="font-display text-2xl">{item.ru}</p><p className="text-soviet-red">{item.translit}</p><p>{item.translation}</p></div>)}</div>
      <div className="rounded-lg bg-yellow-50 p-4 text-yellow-900"><strong>{t('commonMistakes')}:</strong> {result.commonMistakes[lang]}</div>
      <Button onClick={() => location.assign('/exercises')}>{t('practiceThisVerb')}</Button>
    </section>
  );
};

const Table = ({ title, rows }: { title: string; rows: ConjugationResult['presentTense'] }) => (
  <div className="rounded-lg border border-soviet-cream bg-white p-5">
    <h3 className="font-display text-2xl">{title}</h3>
    <div className="mt-3 divide-y divide-soviet-cream">{rows.map((row) => <div key={row.pronoun} className={`grid grid-cols-3 gap-2 py-2 ${row.pronoun.includes('я') || row.pronoun.includes('ты') ? 'font-bold text-soviet-red' : ''}`}><span>{row.pronoun}</span><span>{row.form}</span><span className="text-sm">{row.translit}</span></div>)}</div>
  </div>
);
