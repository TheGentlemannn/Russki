import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { FlashCard } from '../../components/features/FlashCard';
import { allVocabulary } from '../../data/lessons';

const renderCard = () => render(<BrowserRouter><FlashCard word={allVocabulary[0]} /></BrowserRouter>);

describe('FlashCard component', () => {
  it('renders front side by default (Russian word visible)', () => { renderCard(); expect(screen.getByText(allVocabulary[0].ru)).toBeInTheDocument(); });
  it('flips to back on click', async () => { renderCard(); await userEvent.click(screen.getByRole('button', { name: /show answer/i })); expect(screen.getByText(allVocabulary[0].en)).toBeInTheDocument(); });
  it('back shows transliteration and translation', () => { renderCard(); expect(screen.getAllByText(allVocabulary[0].translit)[0]).toBeInTheDocument(); });
  it('flip back to front on second click', async () => { renderCard(); const card = screen.getByRole('button', { name: /show answer/i }); await userEvent.click(card); await userEvent.click(card); expect(card).toBeInTheDocument(); });
  it('calls onFlip callback when flipped', async () => { renderCard(); await userEvent.click(screen.getByRole('button', { name: /show answer/i })); expect(screen.getByText(/Choose how well|Elige/i)).toBeInTheDocument(); });
  it('displays correct mastery percentage', () => { renderCard(); expect(screen.getByText(/0%/)).toBeInTheDocument(); });
  it('applies correct CSS class for flip state', async () => { const { container } = renderCard(); await userEvent.click(screen.getByRole('button', { name: /show answer/i })); expect(container.innerHTML).toContain('rotateY'); });
});
