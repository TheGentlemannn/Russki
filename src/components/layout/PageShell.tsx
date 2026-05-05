import type { ReactNode } from 'react';

export const PageShell = ({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) => (
  <main className="animate-fade-in pb-24 md:pb-8">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h1 className="font-display text-4xl text-soviet-charcoal">{title}</h1>
      {action}
    </div>
    {children}
  </main>
);
