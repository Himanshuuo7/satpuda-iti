import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import 'lenis/dist/lenis.css';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Opted in to the v7 behaviours now so the upgrade is a version bump. */}
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <App />
    </BrowserRouter>
  </StrictMode>
);
