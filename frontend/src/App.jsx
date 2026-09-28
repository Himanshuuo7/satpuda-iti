import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import { NotFoundPage } from './pages/PlaceholderPage';
import {
  About,
  Home,
  PlaceholderPage,
  TradePage,
  placeholderRoutes,
  tradeRedirects,
} from './routes/routes';

/**
 * App shell: persistent header and footer around the routed view.
 */

/** Shown while a code-split route resolves. Matches the navy surface so the
 *  transition never flashes white. */
function RouteFallback() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-navy-800"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading</span>
      <span aria-hidden="true" className="h-px w-24 origin-left animate-rule-draw bg-tech" />
    </div>
  );
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <main id="main">
                <Home />
              </main>
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/trades/:tradeId" element={<TradePage />} />

          {tradeRedirects.map(({ from, to }) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}

          {placeholderRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PlaceholderPage
                  title={route.title}
                  eyebrow={route.eyebrow}
                  description={route.description}
                />
              }
            />
          ))}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
