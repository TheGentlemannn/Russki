import { beforeEach, describe, expect, it } from 'vitest';
import { addPronunciationScore, defaultProgress, getProgress, markLessonComplete, resetProgress, saveProgress, toggleStarPhrase, updateWordMastery, updateXP } from '../../services/storage';

describe('Storage Service', () => {
  beforeEach(() => localStorage.clear());
  it('saves and retrieves progress correctly', () => { const p = { ...defaultProgress(), xp: 10 }; saveProgress(p); expect(getProgress().xp).toBe(10); });
  it('updates XP without losing other fields', () => { saveProgress({ ...defaultProgress(), streak: 2 }); expect(updateXP(5).streak).toBe(2); });
  it('marks lesson as complete', () => expect(markLessonComplete(1).lessonsComplete).toContain(1));
  it('updates word mastery record', () => expect(updateWordMastery('w', { wordId: 'w', seen: 1, correct: 1, interval: 1, easeFactor: 2.5, nextReview: 'x' }).wordMastery.w.seen).toBe(1));
  it('adds pronunciation score to history (max 10 entries)', () => { for (let i = 0; i < 12; i += 1) addPronunciationScore('p', i); expect(getProgress().pronunciationHistory.p).toHaveLength(10); });
  it('toggles starred phrase on and off', () => { expect(toggleStarPhrase('p').starredPhrases).toContain('p'); expect(toggleStarPhrase('p').starredPhrases).not.toContain('p'); });
  it('returns default progress when localStorage is empty', () => expect(getProgress().xp).toBe(0));
  it('handles corrupted localStorage data gracefully', () => { localStorage.setItem('russki-a1-progress', '{bad'); expect(getProgress().xp).toBe(0); });
  it('resets all progress fields correctly', () => { updateXP(20); expect(resetProgress().xp).toBe(0); });
});
