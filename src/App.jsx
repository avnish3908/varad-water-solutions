import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CursorAura from './components/CursorAura';
import ParticleBackground from './components/ParticleBackground';
import Home from './pages/Home';
import Products from './pages/Products';
import Services from './pages/Services';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Fallback to Home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Unhandled Application Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-ivory text-brand-ink flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-surface-lg bg-brand-white border border-brand-border shadow-card-soft">
            <h2 className="text-xl font-bold text-brand-deepOcean mb-2">Notice</h2>
            <p className="text-sm text-brand-bodyText mb-6">
              A temporary display error occurred. Please refresh the page to reload the application.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full bg-brand-primaryBlue text-white text-sm font-semibold hover:bg-brand-deepOcean transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <GlobalErrorBoundary>
        <ScrollToTop />
        <div className="min-h-screen bg-brand-ivory text-brand-ink flex flex-col relative selection:bg-brand-softBlue selection:text-brand-deepOcean">
          {/* Continuous Unified Water Particle Canvas (Behind UI, across entire site) */}
          <ParticleBackground />

          {/* Sticky Glassmorphic Navbar */}
          <Navbar />

          {/* Dynamic Route Content with Consistent Page Transitions */}
          <main className="flex-1 relative z-10">
            <AnimatedRoutes />
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Floating WhatsApp Quick Action CTA */}
          <WhatsAppButton />

          {/* Subtle Desktop Cursor Aura */}
          <CursorAura />
        </div>
      </GlobalErrorBoundary>
    </BrowserRouter>
  );
}
