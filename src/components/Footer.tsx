import React from 'react';
import { Terminal, Lock, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-white/5 bg-surface-container-lowest/80 py-12 px-5 sm:px-8 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary-container border border-white/5">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline font-bold text-sm text-on-surface">
              Javlon Abdumannopov
            </span>
            <span className="font-mono text-[11px] text-on-surface-variant">
              Frontend Developer & IT Mentor (Geeks Andijan)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-on-surface-variant">
          <span>&copy; {new Date().getFullYear()} Javlon Dev. Barcha huquqlar himoyalangan.</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors border border-white/5"
            title="Yuqoriga qaytish"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
