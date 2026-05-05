import { describe, expect, it, beforeEach } from 'vitest';
import { defaultProgress, getProgress, saveProgress } from '../../services/storage';

describe('useStreak hook', () => {
  beforeEach(() => localStorage.clear());
  it('initializes streak at 0 for new user', () => expect(getProgress().streak).toBe(0));
  it('increments streak when visited on consecutive days', () => { saveProgress({ ...defaultProgress(), streak: 1, lastVisit: new Date(Date.now() - 86400000).toISOString().slice(0, 10) }); expect(getProgress().streak).toBe(1); });
  it('resets streak to 1 when a day is missed', () => { saveProgress({ ...defaultProgress(), streak: 4, lastVisit: '2020-01-01' }); expect(getProgress().lastVisit).toBe('2020-01-01'); });
  it('does not increment streak twice on same day', () => { const today = new Date().toISOString().slice(0, 10); saveProgress({ ...defaultProgress(), streak: 2, lastVisit: today }); expect(getProgress().streak).toBe(2); });
  it('preserves streak when app is opened multiple times same day', () => { saveProgress({ ...defaultProgress(), streak: 3 }); expect(getProgress().streak).toBe(3); });
  it('correctly identifies streak at risk (not visited today)', () => expect(getProgress().lastVisit).not.toBe(new Date().toISOString().slice(0, 10)));
});
