export const ProgressBar = ({ value, label }: { value: number; label?: string }) => (
  <div className="w-full">
    {label ? <div className="mb-1 text-sm font-semibold text-soviet-charcoal">{label}</div> : null}
    <div className="h-3 overflow-hidden rounded-full bg-soviet-cream">
      <div className="h-full rounded-full bg-soviet-red transition-all duration-500" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  </div>
);
