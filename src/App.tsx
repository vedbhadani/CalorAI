import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { SwipeProvider } from './context/SwipeContext';
import { IntroPage }   from './pages/IntroPage';
import { SwipePage }   from './pages/SwipePage';
import { ResultsPage } from './pages/ResultsPage';
import { AnimatedBackground } from './components/ui/AnimatedBackground';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"        element={<IntroPage />} />
        <Route path="/swipe"   element={<SwipePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*"        element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <SwipeProvider>
        <AnimatedBackground />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </SwipeProvider>
    </ThemeProvider>
  );
}
