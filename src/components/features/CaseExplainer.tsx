import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

const cases = [
  { key: 'case.nominative', ru: 'Именительный', q: 'кто? что?', ex: 'Это дом.', color: 'bg-green-50' },
  { key: 'case.accusative', ru: 'Винительный', q: 'кого? что?', ex: 'Я вижу дом.', color: 'bg-red-50' },
  { key: 'case.genitive', ru: 'Родительный', q: 'кого? чего?', ex: 'Нет дома.', color: 'bg-yellow-50' },
  { key: 'case.dative', ru: 'Дательный', q: 'кому? чему?', ex: 'Я даю маме чай.', color: 'bg-blue-50' },
  { key: 'case.instrumental', ru: 'Творительный', q: 'кем? чем?', ex: 'Я пишу ручкой.', color: 'bg-purple-50' },
  { key: 'case.prepositional', ru: 'Предложный', q: 'о ком? о чём?', ex: 'Я в доме.', color: 'bg-soviet-cream' }
];

export const CaseExplainer = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(cases[0]);
  return (
    <section className="rounded-lg border border-soviet-cream bg-white p-5">
      <h2 className="font-display text-2xl">{t('cases')}</h2>
      <div className="mt-4 flex flex-wrap gap-2">{cases.map((item) => <button key={item.key} className={`rounded-md px-3 py-2 font-bold ${active.key === item.key ? 'bg-soviet-red text-white' : 'bg-soviet-lightcream'}`} onClick={() => setActive(item)}>{t(item.key as never)}</button>)}</div>
      <div className={`mt-4 rounded-lg p-4 ${active.color}`}><p className="font-display text-3xl">{active.ru}</p><p className="font-bold">{active.q}</p><p>{active.ex}</p></div>
    </section>
  );
};
