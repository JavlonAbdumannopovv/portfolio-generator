import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Send, Mail, Phone, MapPin, SendHorizonal, CheckCircle, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScrollReveal } from './common/ScrollReveal';

export const Contact: React.FC = () => {
  const { data, t, language, sendInquiry } = usePortfolio();
  const { contact } = data;

  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.message) return;

    setLoading(true);
    setTimeout(() => {
      sendInquiry(form.name, form.contact, form.message);
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
      });
      setForm({ name: '', contact: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 400);
  };

  return (
    <section id="aloqa" className="py-20 px-5 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto relative">
      <div className="flex flex-col gap-10 w-full">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col gap-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-secondary font-mono text-xs w-fit border border-secondary/20">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>
                {language === 'uz' ? 'Aloqa & Hamkorlik' : language === 'ru' ? 'Связь & Сотрудничество' : 'Get In Touch'}
              </span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
              {language === 'uz'
                ? "Loyiha bo'yicha bog'lanish yoki taklif yuborish"
                : language === 'ru'
                ? 'Связаться по проекту или отправить предложение'
                : 'Get in Touch for Projects & Collaboration'}
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              {t(contact.statusBadge)}
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Column */}
          <ScrollReveal direction="up" delay={120} className="lg:col-span-5 w-full">
            <div className="glass-panel p-6 sm:p-7 rounded-2xl flex flex-col gap-6">
              <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface">
                {language === 'uz' ? 'To\'g\'ridan-to\'g\'ri aloqa' : language === 'ru' ? 'Прямые контакты' : 'Direct Channels'}
              </h3>

              <div className="flex flex-col gap-4">
                <a
                  href={contact.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-surface-container/60 hover:bg-surface-container hover:border-primary-container/30 hover:-translate-y-0.5 hover:shadow-neon transition-all border border-white/5 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                    <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-on-surface-variant uppercase">Telegram</span>
                    <span className="font-headline text-sm font-semibold text-on-surface group-hover:text-primary-container transition-colors">
                      {contact.telegramUsername || '@javlon_dev'}
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-surface-container/60 hover:bg-surface-container hover:border-primary-container/30 hover:-translate-y-0.5 hover:shadow-neon transition-all border border-white/5 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center font-bold">
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-on-surface-variant uppercase">Email</span>
                    <span className="font-headline text-sm font-semibold text-on-surface group-hover:text-primary-container transition-colors">
                      {contact.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-surface-container/60 hover:bg-surface-container hover:border-primary-container/30 hover:-translate-y-0.5 hover:shadow-neon transition-all border border-white/5 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-on-surface-variant uppercase">Telefon</span>
                    <span className="font-headline text-sm font-semibold text-on-surface group-hover:text-primary-container transition-colors">
                      {contact.phone}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-surface-container/60 border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-on-surface-variant uppercase">Manzil</span>
                    <span className="font-headline text-sm font-semibold text-on-surface">
                      {contact.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social profile quick links */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="font-mono text-xs text-on-surface-variant">Profil havolalari:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-mono text-on-surface transition-colors border border-white/5"
                  >
                    GitHub
                  </a>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-mono text-on-surface transition-colors border border-white/5"
                  >
                    LinkedIn
                  </a>
                  {contact.youtube && (
                    <a
                      href={contact.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-mono text-rose-400 hover:text-rose-300 transition-colors border border-white/5"
                    >
                      YouTube
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Form Column */}
          <ScrollReveal direction="up" delay={200} className="lg:col-span-7 w-full">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl relative">
              <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface mb-2">
                {language === 'uz'
                  ? "Tezkor murojaat yuborish"
                  : language === 'ru'
                  ? 'Отправить сообщение'
                  : 'Send a Message'}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-6">
                {language === 'uz'
                  ? "Xabaringiz darhol admin tizimiga yuboriladi va tez orada siz bilan bog'lanaman."
                  : language === 'ru'
                  ? 'Ваше сообщение поступит в панель управления, и я свяжусь с вами в ближайшее время.'
                  : 'Your message will be sent directly to the administrative hub for prompt reply.'}
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-secondary/15 border border-secondary/30 flex flex-col items-center text-center gap-3 animate-fadeIn">
                  <CheckCircle className="w-12 h-12 text-secondary animate-bounce" />
                  <div className="flex flex-col gap-1">
                    <span className="font-headline text-base sm:text-lg font-bold text-on-surface">
                      {language === 'uz' ? 'Xabaringiz muvaffaqiyatli yetkazildi!' : 'Message Sent Successfully!'}
                    </span>
                    <p className="text-xs sm:text-sm text-on-surface-variant">
                      {language === 'uz'
                        ? 'Tez orada kiritilgan kontakt ma\'lumotlaringiz orqali aloqaga chiqaman.'
                        : 'I will reach out to you via your provided contact info very soon.'}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-on-surface-variant uppercase">
                        {language === 'uz' ? 'Ismingiz' : language === 'ru' ? 'Ваше имя' : 'Your Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={language === 'uz' ? 'Masalan: Alisher' : 'Your name'}
                        className="px-4 py-3 rounded-xl bg-surface-container text-sm text-on-surface border border-white/5 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-on-surface-variant uppercase">
                        {language === 'uz' ? 'Telefon yoki Telegram' : language === 'ru' ? 'Телефон или Telegram' : 'Contact'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        placeholder={language === 'uz' ? '+998 90 ... yoki @username' : '+998 90 ...'}
                        className="px-4 py-3 rounded-xl bg-surface-container text-sm text-on-surface border border-white/5 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-on-surface-variant uppercase">
                      {language === 'uz' ? 'Xabar yoki loyiha tafsilotlari' : language === 'ru' ? 'Сообщение или детали проекта' : 'Message'} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={language === 'uz' ? 'Loyihangiz yoki qiziqtirgan savolingiz haqida yozing...' : 'Write your inquiry here...'}
                      className="px-4 py-3 rounded-xl bg-surface-container text-sm text-on-surface border border-white/5 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none resize-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3.5 px-6 rounded-xl bg-primary-container text-on-primary font-headline text-sm font-bold flex items-center justify-center gap-2 hover:shadow-neon hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50"
                  >
                    <SendHorizonal className="w-4 h-4" />
                    <span>
                      {loading
                        ? (language === 'uz' ? 'Yuborilmoqda...' : 'Sending...')
                        : (language === 'uz' ? 'Xabarni yuborish' : language === 'ru' ? 'Отправить' : 'Send Message')}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
