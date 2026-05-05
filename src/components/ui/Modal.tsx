import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Button } from './Button';
import { useTranslation } from '../../hooks/useTranslation';

interface Props {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ open, title, children, onClose }: Props) => {
  const { t } = useTranslation();
  useEffect(() => {
    const handler = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4">
      <div className="w-full max-w-lg rounded-lg bg-soviet-lightcream p-5 shadow-xl animate-fade-in">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl text-soviet-charcoal">{title}</h2>
          <Button variant="ghost" onClick={onClose} aria-label={t('close')}>×</Button>
        </div>
        {children}
      </div>
    </div>
  );
};
