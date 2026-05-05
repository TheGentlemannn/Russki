import { useEffect, useState } from 'react';

export const ExamTimer = ({ totalSeconds, onTimeUp }: { totalSeconds: number; onTimeUp: () => void }) => {
  const [left, setLeft] = useState(totalSeconds);
  useEffect(() => {
    const id = window.setInterval(() => setLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(id);
  }, []);
  useEffect(() => {
    if (left === 0) onTimeUp();
  }, [left, onTimeUp]);
  const pct = left / totalSeconds;
  const color = left < 300 ? '#C0392B' : '#D4A017';
  return (
    <div className="relative grid h-24 w-24 place-items-center">
      <svg viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r="42" stroke="#eadfce" strokeWidth="8" fill="none" />
        <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="8" fill="none" strokeDasharray={264} strokeDashoffset={264 - 264 * pct} strokeLinecap="round" />
      </svg>
      <span className="absolute font-bold">{Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}</span>
    </div>
  );
};
