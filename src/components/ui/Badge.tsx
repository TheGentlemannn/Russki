export const Badge = ({ children, tone = 'red' }: { children: React.ReactNode; tone?: 'red' | 'gold' | 'dark' | 'green' | 'muted' }) => {
  const tones = {
    red: 'bg-soviet-red text-white',
    gold: 'bg-soviet-gold text-soviet-charcoal',
    dark: 'bg-soviet-charcoal text-white',
    green: 'bg-green-700 text-white',
    muted: 'bg-soviet-cream text-soviet-charcoal'
  };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${tones[tone]}`}>{children}</span>;
};
