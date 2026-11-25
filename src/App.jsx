import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource/instrument-sans/latin-400.css';
import '@fontsource/instrument-sans/latin-500.css';
import '@fontsource/instrument-sans/latin-600.css';
import '@fontsource/instrument-sans/latin-700.css';
import './styles/tokens.css';
import './styles/global.css';

import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { LayoutShell } from './components/LayoutShell';
import { CommuSyncPage } from './pages/CommuSyncPage';
import { HomePage } from './pages/HomePage';
import { JarvisPage } from './pages/JarvisPage';
import { SshManagerPage } from './pages/SshManagerPage';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1);
      // Wait a tick for route crossfade mount before scrolling to target section
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'auto' });
        }
      }, 40);
      isFirstRender.current = false;
      return () => clearTimeout(timer);
    }

    if (!isFirstRender.current) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    isFirstRender.current = false;
  }, [pathname, hash]);

  return null;
}

export function AppRoutes() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <LayoutShell>
        <ScrollManager />
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => {
            if (typeof window !== 'undefined' && !window.location.hash) {
              window.scrollTo({ top: 0, behavior: 'auto' });
            }
          }}
        >
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/work/jarvis" element={<JarvisPage />} />
              <Route path="/work/commusync" element={<CommuSyncPage />} />
              <Route path="/work/ssh-manager" element={<SshManagerPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        <Footer />
      </LayoutShell>
    </MotionConfig>
  );
}
