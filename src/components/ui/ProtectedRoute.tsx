import { Navigate } from 'react-router-dom';
import { useSwipeContext } from '../../context/SwipeContext';

interface Props {
  children: React.ReactNode;
  requiresSwipeData?: boolean;
  redirectIfComplete?: boolean;
}

export const ProtectedRoute = ({ children, requiresSwipeData, redirectIfComplete }: Props) => {
  const { swipeHistory, isComplete } = useSwipeContext();

  if (redirectIfComplete && isComplete) {
    return <Navigate to="/results" replace />;
  }
  if (requiresSwipeData && swipeHistory.length === 0) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
