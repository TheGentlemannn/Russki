import { describe, expect, it } from 'vitest';
import { createWordMastery, isDue, reviewSm2 } from '../../services/sm2';

describe('SM-2 Algorithm', () => {
  it('initializes new card with correct defaults', () => {
    const card = createWordMastery('w1');
    expect(card.easeFactor).toBe(2.5);
    expect(card.interval).toBe(0);
  });
  it('increases interval on Easy response', () => expect(reviewSm2(createWordMastery('w1'), 5).interval).toBe(1));
  it('resets interval to 1 on Again response', () => expect(reviewSm2({ ...createWordMastery('w1'), interval: 10, seen: 3 }, 1).interval).toBe(1));
  it('adjusts ease factor correctly for Hard response', () => expect(reviewSm2(createWordMastery('w1'), 3).easeFactor).toBeLessThan(2.5));
  it('never sets interval below 1', () => expect(reviewSm2(createWordMastery('w1'), 0).interval).toBeGreaterThanOrEqual(1));
  it('correctly identifies cards due today', () => expect(isDue(createWordMastery('w1'))).toBe(true));
  it('schedules card in future after successful review', () => expect(new Date(reviewSm2(createWordMastery('w1'), 5).nextReview).getTime()).toBeGreaterThan(Date.now()));
  it('handles quality 0-5 range correctly', () => [0, 1, 2, 3, 4, 5].forEach((q) => expect(reviewSm2(createWordMastery('w1'), q as 0 | 1 | 2 | 3 | 4 | 5).seen).toBe(1)));
  it('increases ease factor over multiple Easy responses', () => {
    const one = reviewSm2(createWordMastery('w1'), 5);
    expect(reviewSm2(one, 5).easeFactor).toBeGreaterThan(one.easeFactor);
  });
  it('decreases ease factor over multiple Hard responses', () => {
    const one = reviewSm2(createWordMastery('w1'), 3);
    expect(reviewSm2(one, 3).easeFactor).toBeLessThan(one.easeFactor);
  });
});
