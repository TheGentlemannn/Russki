import '@testing-library/jest-dom';
import { vi } from 'vitest';

Object.defineProperty(window, 'speechSynthesis', {
  value: { speak: vi.fn(), cancel: vi.fn(), getVoices: vi.fn(() => [{ lang: 'ru-RU', name: 'Russian' }]) },
  writable: true
});

Object.defineProperty(window, 'SpeechSynthesisUtterance', {
  value: class {
    text: string;
    lang = '';
    rate = 1;
    pitch = 1;
    volume = 1;
    voice = null;
    onend: (() => void) | null = null;
    onerror: (() => void) | null = null;
    constructor(text: string) {
      this.text = text;
    }
  },
  writable: true
});

globalThis.fetch = vi.fn(async () => ({ ok: true, json: async () => ({ choices: [{ message: { content: '{}' } }] }) })) as unknown as typeof fetch;
