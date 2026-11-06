import React, { useState, useEffect } from 'react';
import { usePortfolio } from './context/PortfolioContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CursorGlow } from './components/CursorGlow';
import { AdminGate } from './components/admin/AdminGate';
import { AdminDashboard } from './components/admin/AdminDashboard';

export const App: React.FC = () => {
  const { isAdmin } = usePortfolio();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Check URL hash or path for direct #admin or /admin access
  useEffect(() => {
    const checkAdminRoute = () => {
      if (
        window.location.hash === '#admin' ||
        window.location.pathname === '/admin' ||
        window.location.search.includes('admin=true')
      ) {
        setIsAdminOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);
    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    // Return URL path directly to root '/'
    window.history.pushState(null, '', '/');
  };

  return (
    <div className="min-h-screen bg-background text-on-surface relative selection:bg-primary-container selection:text-on-primary-container font-sans">
      {/* Background Matrix Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3b494b_1px,transparent_1px)] [background-size:40px_40px] opacity-15 dark:opacity-25" />
      </div>

      {/* Interactive Cursor Glow & Smoke Trail Effect */}
      <CursorGlow />

      {/* Top Header Navigation */}
      <Header />

      {/* Main Content Sections (Hero, About, Experience, Projects, Skills, Contact) */}
      <main className="relative z-10 flex flex-col w-full">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin Protected Layer (Only accessed via /admin or #admin) */}
      {isAdminOpen && (
        <>
          {isAdmin ? (
            <AdminDashboard onClose={handleCloseAdmin} />
          ) : (
            <AdminGate onClose={handleCloseAdmin} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
