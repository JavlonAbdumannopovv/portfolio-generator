import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, Terminal, Award, Users, BookOpen, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './common/ScrollReveal';

export const About: React.FC = () => {
  const { data, t, language } = usePortfolio();
  const { about } = data;

  const highlights = [
    {
      icon: Terminal,
      title: {
        uz: 'Frontend React Dasturlash',
        ru: 'Frontend React Разработка',
        en: 'Frontend React Engineering',
      },
      desc: {
        uz: "React, TypeScript va Tailwind CSS asosida toza, modulli va qulay veb-ilovalar ishlab chiqish.",
        ru: 'Создание чистых, модульных и удобных веб-приложений на React, TypeScript и Tailwind CSS.',
        en: 'Building clean, maintainable, and user-friendly web applications with React, TypeScript, and Tailwind CSS.',
      },
    },
    {
      icon: Users,
      title: {
        uz: 'Geeks Andijan & 100+ O\'quvchilar',
        ru: 'Geeks Andijan & 100+ Студентов',
        en: 'Geeks Andijan & 100+ Students',
      },
      desc: {
        uz: "100 dan ortiq o'quvchilarga Computer Science va Frontend asoslarini o'rgatish, doimiy amaliy yordam va do'stona muhit.",
        ru: 'Обучение более 100 студентов основам Computer Science и Frontend, дружелюбная атмосфера и поддержка.',
        en: 'Mentored over 100 students in Computer Science and Frontend fundamentals with supportive guidance.',
      },
    },
    {
      icon: BookOpen,
      title: {
        uz: 'Tushuntira Olish Qobiliyati & Metodika',
        ru: 'Умение Просто Объяснять & Методика',
        en: 'Clear Communication & Teaching Methodology',
      },
      desc: {
        uz: "Murakkab dasturlash mavzularini sodda va tushunarli qilib yetkazish, har bir o'quvchiga individual yondashuv.",
        ru: 'Умение доносить сложные темы программирования простым и понятным языком, индивидуальный подход к каждому.',
        en: 'Breaking down complex programming topics into simple, intuitive concepts with a personalized approach for every learner.',
      },
    },
  ];

  return (
    <section id="haqimda" className="py-20 px-5 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto relative">
      <div className="flex flex-col gap-12">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col gap-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary-container font-mono text-xs w-fit border border-primary-container/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t(about.subheading)}</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
              {t(about.heading)}
            </h2>
          </div>
        </ScrollReveal>

        {/* Bio + Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story Card */}
          <ScrollReveal direction="up" delay={120} className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl flex flex-col gap-6">
              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                {t(about.fullBio)}
              </p>

              {/* Philosophy quote badge */}
              <div className="p-5 rounded-xl bg-surface-container/70 border-l-4 border-primary-container flex items-start gap-3.5">
                <Award className="w-6 h-6 text-primary-container flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-primary-fixed-dim uppercase tracking-wider font-semibold">
                    {language === 'uz' ? 'Yondashuv & Shior' : language === 'ru' ? 'Подход & Девиз' : 'Core Philosophy'}
                  </span>
                  <p className="text-sm sm:text-base text-on-surface font-medium italic">
                    "{t(about.highlightStory)}"
                  </p>
                </div>
              </div>

              {/* Core Values / Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {(about.checklist && about.checklist.length > 0
                  ? about.checklist
                  : [
                      { uz: "Computer Science va dasturlash mantig'i", ru: "Computer Science и логика кода", en: "Computer Science and programming logic" },
                      { uz: "Sodda va tushunarli tushuntirish", ru: "Понятное и доступное объяснение", en: "Clear and straightforward explanations" },
                      { uz: "Tildadan Reactga o'tkazish tajribasi", ru: "Опыт миграции с Tilda на React", en: "Tilda to React migration skills" },
                      { uz: "Amaliy loyihalar ustida ishlash", ru: "Работа над практическими проектами", en: "Hands-on project work" },
                    ]
                ).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-on-surface-variant">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span>{t(item as any) || item[language] || item.uz}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 3 Pillars Bento Stack */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {(about.pillars && about.pillars.length > 0
              ? about.pillars.map((p, idx) => ({
                  icon: highlights[idx % highlights.length]?.icon || Terminal,
                  title: p.title,
                  desc: p.desc,
                }))
              : highlights
            ).map((h, i) => {
              const Icon = h.icon;
              return (
                <ScrollReveal key={i} direction="up" delay={180 + i * 100}>
                  <div
                    className="glass-panel p-5 rounded-2xl flex items-start gap-4 hover:border-primary-container/30 hover:-translate-y-1 hover:shadow-neon transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-container/10 group-hover:scale-105 transition-all flex-shrink-0 border border-white/5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-headline text-base font-bold text-on-surface group-hover:text-primary-container transition-colors">
                        {t(h.title as any) || h.title[language]}
                      </h3>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {t(h.desc as any) || h.desc[language]}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
