import { useEffect, useState } from 'react';

export const ScoreRing = ({ score, size = 116 }: { score: number; size?: number }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let frame = 0;
    const total = 24;
    const id = window.setInterval(() => {
      frame += 1;
      setDisplay(Math.round((score * frame) / total));
      if (frame >= total) window.clearInterval(id);
    }, 22);
    return () => window.clearInterval(id);
  }, [score]);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(score, 100) / 100) * circumference;
  const color = score >= 80 ? '#15803d' : score >= 50 ? '#D4A017' : '#C0392B';
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={radius} stroke="#eadfce" strokeWidth="8" fill="none" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <span className="absolute font-display text-2xl text-soviet-charcoal">{display}</span>
    </div>
  );
};
