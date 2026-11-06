import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Language } from '../types';
import { Sun, Moon, Menu, X, Terminal, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, theme, toggleTheme } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'haqimda', 'konikmalar', 'tajriba', 'loyihalar', 'aloqa'];
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: { uz: 'Asosiy', ru: 'Главная', en: 'Home' } },
    { id: 'haqimda', label: { uz: 'Haqimda', ru: 'Обо мне', en: 'About' } },
    { id: 'konikmalar', label: { uz: "Ko'nikmalar", ru: 'Навыки', en: 'Skills' } },
    { id: 'tajriba', label: { uz: 'Tajriba', ru: 'Опыт', en: 'Experience' } },
    { id: 'loyihalar', label: { uz: 'Loyihalar', ru: 'Проекты', en: 'Projects' } },
    { id: 'aloqa', label: { uz: 'Aloqa', ru: 'Контакты', en: 'Contact' } },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${scrolled
          ? 'glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.15)] py-3'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-container/20 to-secondary/20 border border-primary-container/30 flex items-center justify-center text-primary-container transition-transform group-hover:scale-105 shadow-neon">
            <Terminal className="w-5 h-5 text-primary-container" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline font-bold text-lg text-on-surface tracking-tight group-hover:text-primary-container transition-colors">
                Javlon
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-primary-container/10 text-primary-container font-mono font-medium border border-primary-container/20">
                DEV
              </span>
            </div>
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest leading-none">
              Frontend & IT Mentor
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-surface-container-high/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${isActive
                    ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                  }`}
              >
                {link.label[language]}
              </a>
            );
          })}
        </nav>

        {/* Controls: Language, Theme, Admin */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-surface-container-high/80 p-0.5 rounded-full border border-white/5">
            {(['uz', 'ru', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 text-[11px] font-mono font-semibold rounded-full uppercase transition-all ${language === lang
                    ? 'bg-primary-container text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                  }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface border border-white/5"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden glass-panel border-b border-white/10 px-6 py-6 mt-3 animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeSection === link.id
                    ? 'bg-primary-container text-on-primary font-bold'
                    : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface'
                  }`}
              >
                {link.label[language]}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-on-surface-variant flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary-container" />
                Geeks Andijan IT Academy
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
