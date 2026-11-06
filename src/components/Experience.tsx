import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './common/ScrollReveal';

export const Experience: React.FC = () => {
  const { data, t, language } = usePortfolio();
  const { experience } = data;

  return (
    <section id="tajriba" className="py-20 px-5 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto relative">
      <div className="flex flex-col gap-12">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col gap-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary-fixed-dim font-mono text-xs w-fit border border-primary-fixed-dim/20">
              <Briefcase className="w-3.5 h-3.5" />
              <span>
                {language === 'uz' ? 'Kasbiy Yo\'l' : language === 'ru' ? 'Карьерный Путь' : 'Career Milestones'}
              </span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
              {language === 'uz'
                ? "Amaliy tajriba va IT sohasidagi faoliyat"
                : language === 'ru'
                ? 'Практический опыт и деятельность в IT-индустрии'
                : 'Professional Experience & Leadership'}
            </h2>
          </div>
        </ScrollReveal>

        {/* Experience Cards */}
        <div className="flex flex-col gap-6">
          {experience.map((item, index) => (
            <ScrollReveal
              key={item.id}
              direction="up"
              delay={100 + index * 120}
            >
              <div
                className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden group hover:border-primary-container/30 hover:-translate-y-1 hover:shadow-neon transition-all duration-300"
              >
                {/* Corner highlight */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-bl-full pointer-events-none group-hover:bg-primary-container/10 transition-colors" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/5">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center flex-wrap gap-2.5">
                      <h3 className="font-headline text-xl sm:text-2xl font-bold text-on-surface">
                        {t(item.role)}
                      </h3>
                      {item.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-xs font-mono font-medium border border-secondary/30">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="font-headline text-base sm:text-lg text-primary-container font-semibold">
                      {item.company}
                    </span>
                  </div>

                  <div className="flex items-center flex-wrap gap-4 text-xs sm:text-sm font-mono text-on-surface-variant">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-secondary" />
                      {t(item.period)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary-container" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Description & Bullet points */}
                <div className="flex flex-col gap-4 pt-6">
                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    {t(item.description)}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    {(item.points[language] || item.points.uz || []).map((point, pIndex) => (
                      <div
                        key={pIndex}
                        className="p-3.5 rounded-xl bg-surface-container/60 border border-white/5 flex items-start gap-2.5 text-xs sm:text-sm text-on-surface"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary-container flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
