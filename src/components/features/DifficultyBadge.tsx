import { Badge } from '../ui/Badge';
import { useTranslation } from '../../hooks/useTranslation';

export const DifficultyBadge = ({ difficulty }: { difficulty: 'easy' | 'medium' | 'hard' }) => {
  const { t } = useTranslation();
  return <Badge tone={difficulty === 'easy' ? 'green' : difficulty === 'medium' ? 'gold' : 'red'}>{t(`difficulty.${difficulty}` as never)}</Badge>;
};
