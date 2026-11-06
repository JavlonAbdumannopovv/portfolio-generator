import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Cpu, Star } from 'lucide-react';
import { SkillItem } from '../types';
import { ScrollReveal } from './common/ScrollReveal';
import { TechIcon } from './icons/TechIcon';

export const Skills: React.FC = () => {
  const { data, language } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'core' | 'additional' | 'tools'>('core');

  const filteredSkills = data.skills.filter((sk: SkillItem) => {
    if (filter === 'all') return true;
    return sk.category === filter;
  });

  const filterTabs = [
    { key: 'all', label: { uz: 'Barchasi', ru: 'Все', en: 'All' } },
    { key: 'core', label: { uz: 'Asosiy (Core)', ru: 'Основные', en: 'Core' } },
    { key: 'additional', label: { uz: "Qo'shimcha & Tizimlar", ru: 'Дополнительные', en: 'Additional' } },
    { key: 'tools', label: { uz: 'Asboblar & Muhit', ru: 'Инструменты', en: 'Tools' } },
  ];

  return (
    <section id="konikmalar" className="py-20 px-5 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto relative">
      <div className="flex flex-col gap-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-secondary font-mono text-xs w-fit border border-secondary/20">
                <Cpu className="w-3.5 h-3.5" />
                <span>
                  {language === 'uz' ? "Texnologik Ko'nikmalar" : language === 'ru' ? 'Технологический Стек' : 'Tech Stack'}
                </span>
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
                {language === 'uz'
                  ? "Amaliyotda qo'llaniladigan texnologiyalar"
                  : language === 'ru'
                  ? 'Технологии, применяемые на практике'
                  : 'Technologies Applied in Practice'}
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center flex-wrap gap-1.5 p-1 rounded-xl bg-surface-container-high/80 border border-white/5 backdrop-blur-md">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    filter === tab.key
                      ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {tab.label[language]}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Clean Modern Skills Grid - NO percentages, NO progress bars, NO expert labels */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => (
            <ScrollReveal
              key={skill.id}
              direction="up"
              delay={(index % 4) * 60}
            >
              <div
                className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col justify-between gap-3 group hover:border-primary-container/40 hover:-translate-y-1 hover:shadow-neon transition-all duration-300 relative overflow-hidden cursor-default h-full"
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="flex items-start justify-between gap-2">
                  <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center group-hover:scale-105 transition-all border border-white/5 p-1.5">
                    <TechIcon name={skill.name} className="w-full h-full object-contain" />
                  </div>
                  {skill.highlight && (
                    <span title="Asosiy yo'nalish" className="text-secondary p-1">
                      <Star className="w-3.5 h-3.5 fill-secondary" />
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-headline text-sm sm:text-base font-bold text-on-surface group-hover:text-primary-container transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider">
                    {skill.category === 'core'
                      ? (language === 'uz' ? 'Asosiy' : language === 'ru' ? 'Основной' : 'Core')
                      : skill.category === 'additional'
                      ? (language === 'uz' ? 'Qo\'shimcha' : language === 'ru' ? 'Дополнительно' : 'Additional')
                      : (language === 'uz' ? 'Asbob' : language === 'ru' ? 'Инструмент' : 'Tool')}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
