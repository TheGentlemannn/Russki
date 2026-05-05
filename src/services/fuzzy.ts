export const normalizeForMatch = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zа-яё0-9\s]/gi, '')
    .trim();

export const levenshtein = (a: string, b: string): number => {
  const left = normalizeForMatch(a);
  const right = normalizeForMatch(b);
  if (!left && !right) return 0;
  if (!left) return right.length;
  if (!right) return left.length;
  const matrix = Array.from({ length: left.length + 1 }, (_, row) => Array.from({ length: right.length + 1 }, (_, col) => (row === 0 ? col : col === 0 ? row : 0)));
  for (let i = 1; i <= left.length; i += 1) {
    for (let j = 1; j <= right.length; j += 1) {
      matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + (left[i - 1] === right[j - 1] ? 0 : 1));
    }
  }
  return matrix[left.length][right.length];
};

const hasSingleAdjacentTransposition = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  const diffs = [...a].map((char, index) => (char === b[index] ? -1 : index)).filter((index) => index >= 0);
  return diffs.length === 2 && diffs[1] === diffs[0] + 1 && a[diffs[0]] === b[diffs[1]] && a[diffs[1]] === b[diffs[0]];
};

export const fuzzyMatch = (actual: string, expected: string, threshold = 0.8): boolean => {
  const a = normalizeForMatch(actual);
  const b = normalizeForMatch(expected);
  if (!a || !b) return a === b;
  if (hasSingleAdjacentTransposition(a, b)) return true;
  const ratio = 1 - levenshtein(a, b) / Math.max(a.length, b.length);
  return ratio >= threshold;
};
