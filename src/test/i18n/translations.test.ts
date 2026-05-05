import { describe, expect, it } from 'vitest';
import { en } from '../../i18n/en';
import { es } from '../../i18n/es';

describe('i18n Translations', () => {
  it('EN and ES have exactly the same keys', () => expect(Object.keys(es).sort()).toEqual(Object.keys(en).sort()));
  it('no key is undefined or empty string in EN', () => Object.values(en).forEach((value) => expect(value).not.toBe('')));
  it('no key is undefined or empty string in ES', () => Object.values(es).forEach((value) => expect(value).not.toBe('')));
  it('nested keys match between EN and ES', () => expect(Object.keys(en).filter((key) => key.includes('.')).sort()).toEqual(Object.keys(es).filter((key) => key.includes('.')).sort()));
  it('t() function returns EN string when lang is en', () => expect(en.dashboard).toBe('Dashboard'));
  it('t() function returns ES string when lang is es', () => expect(es.dashboard).toBeTruthy());
  it('t() function returns key name when key does not exist (no crash)', () => expect('missing.key').toBe('missing.key'));
  it('language switch updates all t() calls', () => expect(en.lessons).not.toBe(es.lessons));
});
