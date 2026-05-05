import { describe, expect, it } from 'vitest';
import { fuzzyMatch } from '../../services/fuzzy';

describe('Fuzzy Match', () => {
  it('accepts exact match', () => expect(fuzzyMatch('water', 'water')).toBe(true));
  it('accepts match above 80% threshold', () => expect(fuzzyMatch('watre', 'water')).toBe(true));
  it('rejects match below 80% threshold', () => expect(fuzzyMatch('coffee', 'water')).toBe(false));
  it('is case insensitive', () => expect(fuzzyMatch('WATER', 'water')).toBe(true));
  it('handles accents and special characters', () => expect(fuzzyMatch('cafe!', 'café')).toBe(true));
  it('handles empty strings', () => expect(fuzzyMatch('', '')).toBe(true));
  it('accepts common typos (1 char off)', () => expect(fuzzyMatch('familia', 'familiaa')).toBe(true));
  it('rejects completely different words', () => expect(fuzzyMatch('bread', 'airport')).toBe(false));
  it('handles Russian transliteration variations', () => expect(fuzzyMatch('privet', 'priwet')).toBe(true));
});
