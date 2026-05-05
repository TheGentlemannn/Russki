import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
}

const styles: Record<Variant, string> = {
  primary: 'bg-soviet-red text-white hover:bg-soviet-darkred shadow-sm',
  secondary: 'bg-soviet-charcoal text-white hover:bg-black shadow-sm',
  ghost: 'bg-transparent text-soviet-charcoal hover:bg-soviet-cream',
  danger: 'bg-red-700 text-white hover:bg-red-800 shadow-sm'
};

export const Button = ({ variant = 'primary', icon, className = '', children, ...props }: Props) => (
  <button
    className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
    {...props}
  >
    {icon}
    {children}
  </button>
);
