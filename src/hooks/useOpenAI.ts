import { useCallback, useState } from 'react';

export const useOpenAI = <Args extends unknown[], Result>(fn: (...args: Args) => Promise<Result>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callAI = useCallback(
    async (...args: Args): Promise<Result | null> => {
      setLoading(true);
      setError(null);
      try {
        return await fn(...args);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'AI request failed');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  return { loading, error, callAI };
};
