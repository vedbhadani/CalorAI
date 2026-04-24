import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { SwipeProvider } from './context/SwipeContext';
import { IntroPage }   from './pages/IntroPage';
import { SwipePage }   from './pages/SwipePage';
import { ResultsPage } from './pages/ResultsPage';
import { AnimatedBackground } from './components/ui/AnimatedBackground';

export default function App() {
  return (
    <ThemeProvider>
      <SwipeProvider>
        <AnimatedBackground />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/"        element={<IntroPage />} />
              <Route path="/swipe"   element={<SwipePage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="*"        element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </SwipeProvider>
    </ThemeProvider>
  );
}
