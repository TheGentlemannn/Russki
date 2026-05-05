import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScoreRing } from '../../components/ui/ScoreRing';

describe('ScoreRing component', () => {
  it('renders without crashing', () => render(<ScoreRing score={80} />));
  it('shows correct score number', async () => { render(<ScoreRing score={0} />); expect(screen.getByText('0')).toBeInTheDocument(); });
  it('applies red color class for score < 50', () => { const { container } = render(<ScoreRing score={40} />); expect(container.querySelector('circle[stroke="#C0392B"]')).toBeTruthy(); });
  it('applies gold color class for score 50-79', () => { const { container } = render(<ScoreRing score={60} />); expect(container.querySelector('circle[stroke="#D4A017"]')).toBeTruthy(); });
  it('applies green color class for score >= 80', () => { const { container } = render(<ScoreRing score={90} />); expect(container.querySelector('circle[stroke="#15803d"]')).toBeTruthy(); });
  it('SVG circle has correct stroke-dashoffset for given score', () => { const { container } = render(<ScoreRing score={50} />); expect(container.querySelectorAll('circle')[1]).toHaveAttribute('stroke-dashoffset'); });
  it('animates on mount (has animation class)', () => { const { container } = render(<ScoreRing score={75} />); expect(container.querySelector('.transition-all')).toBeTruthy(); });
});
