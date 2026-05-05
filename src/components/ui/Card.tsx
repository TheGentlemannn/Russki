import type { HTMLAttributes } from 'react';

export const Card = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-lg border border-soviet-cream bg-white p-5 shadow-sm ${className}`} {...props} />
);
