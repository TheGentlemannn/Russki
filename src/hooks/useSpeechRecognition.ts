import { useCallback, useState } from 'react';
import * as speech from '../services/speech';

export const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(() => {
    setError(null);
    setIsRecording(true);
    speech.startRecording(
      (text) => {
        setTranscript(text);
        setIsRecording(false);
      },
      (message) => {
        setError(message);
        setIsRecording(false);
      }
    );
  }, []);

  const stop = useCallback(() => {
    speech.stopRecording();
    setIsRecording(false);
  }, []);

  return { isSupported: speech.isSupported(), isRecording, transcript, error, start, stop, setTranscript };
};
