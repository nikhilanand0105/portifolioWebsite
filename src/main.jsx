import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './App';

const rootEl = document.getElementById('root');
const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
const ssrRoute = rootEl.dataset.ssrRoute;

if (rootEl.hasChildNodes() && rootEl.firstElementChild && ssrRoute === currentPath) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
