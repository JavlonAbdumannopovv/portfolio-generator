import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, Layers, Download, Code2, MapPin } from 'lucide-react';
import { ScrollReveal } from './common/ScrollReveal';

export const Hero: React.FC = () => {
  const { data, t, language } = usePortfolio();
  const { hero } = data;

  const handleDownloadCV = () => {
    if (hero.resumeUrl && hero.resumeUrl !== '#') {
      window.open(hero.resumeUrl, '_blank');
    } else {
      window.print();
    }
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pb-24 px-5 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto flex flex-col gap-10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70rem] h-[35rem] bg-gradient-to-b from-primary-container/10 via-secondary/5 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md border border-white/5 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
          </span>
          <span className="font-mono text-xs text-secondary tracking-wide uppercase font-semibold">
            {t(hero.badge)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary-container" />
            {hero.locationBadge ? hero.locationBadge.split('|')[0].trim() : 'Andijon'}
          </span>
          <span className="text-on-surface-variant/40">|</span>
          <span className="font-mono text-xs text-primary-container font-semibold">
            {hero.locationBadge && hero.locationBadge.includes('|')
              ? hero.locationBadge.split('|')[1].trim()
              : 'Geeks IT Mentor'}
          </span>
        </div>
      </div>

      {/* Main Grid: Typography & Visual Showcase (Vertically Centered Harmony) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Heading, Bio, CTAs */}
        <ScrollReveal direction="up" delay={50} className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <h1 className="font-headline text-3xl sm:text-4xl lg:text-[46px] lg:leading-[54px] font-extrabold text-on-surface tracking-tight">
              {t(hero.title)}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-container via-teal-300 to-secondary mt-1">
                {t(hero.subtitle)}
              </span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            {t(hero.bio)}
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#aloqa"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary-container text-on-primary font-headline text-sm font-bold transition-all duration-300 hover:shadow-neon hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
            >
              <span>{t(hero.ctaConsult)}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#loyihalar"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface font-headline text-sm font-semibold transition-all border border-white/5 hover:border-primary-container/30"
            >
              <Layers className="w-4 h-4 text-primary-container" />
              <span>{t(hero.ctaProjects)}</span>
            </a>
          </div>

          {/* Key tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {(hero.tags || ['React', 'TypeScript', 'Tailwind CSS', 'Computer Science', 'Tilda', 'Git']).map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 rounded-md bg-surface-container text-[11px] font-mono text-on-surface-variant border border-white/5"
              >
                #{item}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Right Column: Visual Photo Spotlight + Code Box Underneath */}
        <ScrollReveal direction="up" delay={200} className="lg:col-span-5 relative flex flex-col gap-3.5 w-full">
          {/* Photo Showcase */}
          <div className="relative rounded-2xl bg-surface-container-low p-2.5 shadow-2xl overflow-hidden group border border-white/10">
            {/* Glow blob */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-container/20 rounded-full blur-3xl pointer-events-none group-hover:bg-primary-container/30 transition-all duration-500"></div>

            <div className="relative rounded-xl overflow-hidden bg-surface-container aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={hero.avatarUrl || '/javlon.png'}
                alt={t(hero.subtitle) || 'Javlon Abdumannopov'}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Status floating badge */}
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-surface-container-high/90 backdrop-blur-md border border-white/10 flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px] text-on-surface font-semibold">
                  {hero.locationBadge ? hero.locationBadge.split('|').pop()?.trim() : 'Geeks IT Mentor'}
                </span>
              </div>
            </div>
          </div>

          {/* Code Terminal Box (Rasm tagiga joylashtirilgan) */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-surface-container-high/90 backdrop-blur-md flex flex-col gap-2.5 border border-white/10 shadow-lg group hover:border-primary-container/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-primary-container flex items-center gap-2 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                {hero.developerSnippet?.fileName || 'developer.tsx'}
              </span>
              <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-semibold border border-secondary/20">
                {hero.developerSnippet?.studentBadge || "100+ o'quvchilar"}
              </span>
            </div>
            <div className="font-mono text-xs text-on-surface/90 bg-surface-container-lowest/80 px-3 py-2 rounded-xl border border-white/5 overflow-x-auto">
              {hero.developerSnippet?.codeLine ? (
                <span>{hero.developerSnippet.codeLine}</span>
              ) : (
                <>
                  <span className="text-secondary">const</span> developer = &#123; name: <span className="text-primary-container">'Javlon'</span>, role: <span className="text-secondary">'React & Mentor'</span> &#125;;
                </>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
