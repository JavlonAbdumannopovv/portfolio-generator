import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Layers, ExternalLink, Star } from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';
import { ProjectItem } from '../types';
import { ScrollReveal } from './common/ScrollReveal';

export const Projects: React.FC = () => {
  const { data, t, language } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filteredProjects = data.projects.filter((p: ProjectItem) => {
    if (filter === 'featured') return p.featured;
    return true;
  });

  return (
    <section id="loyihalar" className="py-20 px-5 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto relative">
      <div className="flex flex-col gap-10 w-full">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
            <div className="flex flex-col gap-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary-container font-mono text-xs w-fit border border-primary-container/20">
                <Layers className="w-3.5 h-3.5" />
                <span>
                  {language === 'uz' ? 'Portfolio & Mahsulotlar' : language === 'ru' ? 'Портфолио & Продукты' : 'Selected Works'}
                </span>
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
                {language === 'uz'
                  ? "Amalga oshirilgan loyihalar va veb-yechimlar"
                  : language === 'ru'
                  ? 'Реализованные проекты и веб-решения'
                  : 'Featured Engineering Projects & Solutions'}
              </h2>
            </div>

            {/* Filter toggle */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-high/80 border border-white/5 backdrop-blur-md">
              <button
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {language === 'uz' ? 'Barcha loyihalar' : language === 'ru' ? 'Все проекты' : 'All Projects'} ({data.projects.length})
              </button>
              <button
                onClick={() => setFilter('featured')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  filter === 'featured'
                    ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                ⭐ {language === 'uz' ? 'Asosiy (Featured)' : language === 'ru' ? 'Избранные' : 'Featured'}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Projects Grid: 3-column on large screens so 3 projects fill the row with exact alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredProjects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              direction="up"
              delay={(index % 3) * 100}
            >
              <div
                className="glass-panel rounded-2xl overflow-hidden group hover:border-primary-container/40 hover:-translate-y-1.5 hover:shadow-neon transition-all duration-300 flex flex-col justify-between h-full"
              >
                {/* Project Image Banner */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-xs font-mono text-primary-container font-semibold shadow-sm">
                      <Star className="w-3 h-3 fill-primary-container" />
                      <span>Top Loyiha</span>
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-5">
                  <div className="flex flex-col gap-2.5">
                    <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface group-hover:text-primary-container transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                      {t(project.description)}
                    </p>
                  </div>

                  {/* Tags & Action Links */}
                  <div className="flex flex-col gap-4 pt-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-surface-container text-[11px] font-mono text-on-surface-variant border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2.5 pt-2 border-t border-white/5">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-container text-on-primary font-headline text-xs font-bold transition-all hover:shadow-neon hover:-translate-y-0.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-mono text-xs transition-all border border-white/5"
                        >
                          <GithubIcon className="w-3.5 h-3.5 text-on-surface-variant" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
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
