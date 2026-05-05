export const Waveform = () => (
  <span className="flex h-6 items-center gap-1" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((bar) => (
      <span key={bar} className="h-5 w-1 rounded-full bg-white animate-waveform" style={{ animationDelay: `${bar * 80}ms` }} />
    ))}
  </span>
);
