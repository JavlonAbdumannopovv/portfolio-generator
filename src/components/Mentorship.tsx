import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, BookOpen, CheckCircle, Clock, Quote, Sparkles, Trophy } from 'lucide-react';

export const Mentorship: React.FC = () => {
  const { data, t, language } = usePortfolio();
  const { mentorship } = data;

  return (
    <section id="mentorlik" className="py-20 px-5 lg:px-12 max-w-7xl mx-auto relative">
      <div className="flex flex-col gap-14">
        {/* Section Header */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-secondary font-mono text-xs w-fit border border-secondary/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Geeks Andijan IT Academy</span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
            {t(mentorship.title)}
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            {t(mentorship.description)}
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentorship.modules.map((mod, index) => (
            <div
              key={mod.id}
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between gap-6 group hover:border-secondary/40 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="font-mono text-xs font-bold text-primary-container">
                    MODUL 0{index + 1}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full border border-white/5">
                    <Clock className="w-3 h-3 text-secondary" />
                    {mod.duration}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-secondary transition-colors">
                    {t(mod.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {t(mod.description)}
                  </p>
                </div>
              </div>

              {/* Topics list */}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                {(mod.topics[language] || mod.topics.uz || []).map((topic, tIdx) => (
                  <div key={tIdx} className="flex items-start gap-2 text-xs text-on-surface/90">
                    <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Student Success & Results Showcase */}
        <div className="flex flex-col gap-6 pt-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary-container" />
            <h3 className="font-headline text-xl sm:text-2xl font-bold text-on-surface">
              {language === 'uz'
                ? "Shogirdlarimizning natijalari va fikrlari"
                : language === 'ru'
                ? 'Результаты и отзывы наших выпускников'
                : 'Student Testimonials & Success Stories'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentorship.results.map((student) => (
              <div
                key={student.id}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between gap-5 relative group hover:border-primary-container/30 transition-all"
              >
                <Quote className="w-8 h-8 text-primary-container/20 absolute top-5 right-5 pointer-events-none" />

                <p className="text-sm text-on-surface-variant italic leading-relaxed relative z-10">
                  "{t(student.result)}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-container/30 to-secondary/30 flex items-center justify-center font-bold text-sm text-primary-container">
                    {student.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline text-sm font-bold text-on-surface">
                      {student.name}
                    </span>
                    <span className="text-xs font-mono text-on-surface-variant">
                      {student.role} {student.company && `• ${student.company}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
