interface SpeechRecognitionResultLike {
  transcript: string;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<ArrayLike<SpeechRecognitionResultLike>>;
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechCtor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechCtor;
    webkitSpeechRecognition?: SpeechCtor;
  }
}

let recognition: SpeechRecognitionLike | null = null;
let utterance: SpeechSynthesisUtterance | null = null;

export const isSupported = (): boolean => Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

export const startRecording = (onResult: (text: string) => void, onError: (message: string) => void): void => {
  if (!isSupported()) {
    onError('speech_not_supported');
    return;
  }
  const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new Ctor!();
  recognition.lang = 'ru-RU';
  recognition.interimResults = false;
  recognition.continuous = false;
  recognition.onresult = (event) => onResult(event.results[0]?.[0]?.transcript ?? '');
  recognition.onerror = (event) => onError(event.error);
  recognition.start();
};

export const stopRecording = (): void => {
  recognition?.stop();
  recognition = null;
};

export const isSynthesisSupported = (): boolean => 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

const pickRussianVoice = (): SpeechSynthesisVoice | null => {
  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => voice.lang.toLowerCase().startsWith('ru')) ?? voices.find((voice) => voice.lang.toLowerCase().includes('ru')) ?? null;
};

export const speakRussian = (text: string, onEnd?: () => void, onError?: (message: string) => void): void => {
  if (!isSynthesisSupported()) {
    onError?.('speech_synthesis_not_supported');
    return;
  }

  window.speechSynthesis.cancel();
  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ru-RU';
  utterance.rate = 0.78;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.voice = pickRussianVoice();
  utterance.onend = () => {
    utterance = null;
    onEnd?.();
  };
  utterance.onerror = (event) => {
    utterance = null;
    onError?.(event.error);
  };
  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = (): void => {
  window.speechSynthesis?.cancel();
  utterance = null;
};
