import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  LayoutDashboard,
  FolderKanban,
  Cpu,
  User,
  MessageSquare,
  Mail,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  ExternalLink,
  Download,
  Upload,
  RotateCcw,
  LogOut,
  ArrowLeft,
  Star,
  Save,
  KeyRound,
  ShieldCheck,
  AlertTriangle,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Database,
} from 'lucide-react';
import { GithubIcon } from '../icons/GithubIcon';
import { ProjectItem, SkillItem } from '../../types';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const {
    data,
    updateData,
    resetToDefault,
    exportJSON,
    importJSON,
    inquiries,
    markAsRead,
    deleteMessage,
    logoutAdmin,
    language,
    theme,
    toggleTheme,
    isCloudConnected,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'projects' | 'skills' | 'content' | 'contact' | 'inquiries' | 'settings'
  >('overview');

  const [saveSuccess, setSaveSuccess] = useState(false);

  const triggerSaveNotification = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // State for Project Modal (Add/Edit)
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // State for Skill Modal (Add/Edit)
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  // State for Hero & About form
  const [contentForm, setContentForm] = useState(data);

  // Sync content form when cloud data arrives
  useEffect(() => {
    setContentForm(data);
  }, [data]);

  // Search filter inside projects
  const [projectSearch, setProjectSearch] = useState('');

  // Project CRUD operations
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updatedProjects: ProjectItem[];
    const exists = data.projects.some((p) => p.id === editingProject.id);

    if (exists) {
      updatedProjects = data.projects.map((p) => (p.id === editingProject.id ? editingProject : p));
    } else {
      updatedProjects = [editingProject, ...data.projects];
    }

    updateData({ ...data, projects: updatedProjects });
    setIsProjectModalOpen(false);
    setEditingProject(null);
    triggerSaveNotification();
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm("Haqiqatan ham bu loyihani o'chirmoqchimisiz?")) {
      const updated = data.projects.filter((p) => p.id !== id);
      updateData({ ...data, projects: updated });
      triggerSaveNotification();
    }
  };

  // Skill CRUD operations
  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;

    let updatedSkills: SkillItem[];
    const exists = data.skills.some((s) => s.id === editingSkill.id);

    if (exists) {
      updatedSkills = data.skills.map((s) => (s.id === editingSkill.id ? editingSkill : s));
    } else {
      updatedSkills = [...data.skills, editingSkill];
    }

    updateData({ ...data, skills: updatedSkills });
    setIsSkillModalOpen(false);
    setEditingSkill(null);
    triggerSaveNotification();
  };

  const handleDeleteSkill = (id: string) => {
    if (window.confirm("Ushbu ko'nikmani ro'yxatdan o'chirmoqchimisiz?")) {
      const updated = data.skills.filter((s) => s.id !== id);
      updateData({ ...data, skills: updated });
      triggerSaveNotification();
    }
  };

  // Save full content form
  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateData(contentForm);
    triggerSaveNotification();
  };

  // Two-step password change state
  const [oldPassword, setOldPassword] = useState('');
  const [isOldPasswordVerified, setIsOldPasswordVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleVerifyOldPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    if (!oldPassword) {
      setPasswordError("Iltimos, amaldagi (eski) parolni kiriting!");
      return;
    }
    if (oldPassword === data.adminPassword) {
      setIsOldPasswordVerified(true);
      setPasswordError('');
    } else {
      setPasswordError("Eski parol noto'g'ri kiritildi! Iltimos, qayta urinib ko'ring.");
    }
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (!newPassword || newPassword.trim().length < 3) {
      setPasswordError("Yangi parol kamida 3 ta belgidan iborat bo'lishi kerak!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Kiritilgan 2 ta yangi parol bir-biriga mos kelmadi! Iltimos, ikkalasini bir xil kiriting.");
      return;
    }
    updateData({ ...data, adminPassword: newPassword.trim() });
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsOldPasswordVerified(false);
    setPasswordSuccess("✓ Yangi parol muvaffaqiyatli o'zgartirildi!");
    setTimeout(() => setPasswordSuccess(''), 5000);
  };

  const handleCancelPasswordChange = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsOldPasswordVerified(false);
    setPasswordError('');
  };

  // Import JSON handler
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        importJSON(content);
        setContentForm(data);
        alert("Ma'lumotlar muvaffaqiyatli tiklandi va yangilandi!");
      } catch {
        alert("Fayl formati noto'g'ri!");
      }
    };
    reader.readAsText(file);
  };

  const unreadInquiriesCount = inquiries.filter((i) => !i.read).length;

  return (
    <div className="fixed inset-0 z-50 flex bg-background text-on-surface overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-surface-container-lowest border-r border-white/5 flex flex-col justify-between p-4 hidden md:flex flex-shrink-0 z-10">
        <div className="flex flex-col gap-6">
          {/* Admin Header */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary-container flex items-center justify-center font-bold border border-primary-container/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-sm text-on-surface">
                Admin Console
              </span>
              <span className="font-mono text-[10px] text-primary-container uppercase font-semibold">
                Javlon Hub CMS
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {[
              { id: 'overview', label: 'Boshqaruv Paneli', icon: LayoutDashboard },
              { id: 'projects', label: 'Loyihalar (Projects)', icon: FolderKanban, badge: data.projects.length },
              { id: 'skills', label: "Ko'nikmalar (Skills)", icon: Cpu, badge: data.skills.length },
              { id: 'content', label: 'Haqimda & Hero', icon: User },
              { id: 'contact', label: 'Aloqa & Tarmoqlar', icon: MessageSquare },
              { id: 'inquiries', label: 'Murojaatlar', icon: Mail, badge: unreadInquiriesCount, badgeColor: 'bg-rose-500' },
              { id: 'settings', label: 'Zaxira & Sozlamalar', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-headline font-medium transition-all ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isActive
                          ? 'bg-on-primary text-primary-container'
                          : tab.badgeColor || 'bg-surface-container-high text-primary-container'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User info & Back to Site */}
        <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-headline font-medium text-on-surface transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-primary-container" />
            <span>Saytga Qaytish</span>
          </button>

          <button
            onClick={() => {
              logoutAdmin();
              onClose();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-headline text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Tizimdan Chiqish</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 px-6 flex items-center justify-between bg-surface-container-lowest/80 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-secondary text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Tizim Faol & Dinamik
            </span>
            {saveSuccess && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono animate-fadeIn">
                <Check className="w-3.5 h-3.5" /> O'zgarishlar saqlandi!
              </span>
            )}
          </div>

          {/* Quick controls */}
          <div className="flex items-center gap-3">
            {/* Mobile Tab Select */}
            <div className="md:hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-lg bg-surface-container text-xs font-mono text-on-surface border border-white/10"
              >
                <option value="overview">Boshqaruv</option>
                <option value="projects">Loyihalar</option>
                <option value="skills">Ko'nikmalar</option>
                <option value="content">Haqimda & Hero</option>
                <option value="contact">Aloqa</option>
                <option value="inquiries">Murojaatlar ({unreadInquiriesCount})</option>
                <option value="settings">Sozlamalar</option>
              </select>
            </div>

            <button
              onClick={exportJSON}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-mono text-on-surface border border-white/5 transition-all"
              title="Zaxira nusxasini yuklab olish"
            >
              <Download className="w-3.5 h-3.5 text-primary-container" />
              <span>Eksport JSON</span>
            </button>

            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary text-xs font-headline font-bold hover:shadow-neon transition-all"
            >
              Saytni Ko'rish
            </button>
          </div>
        </header>

        {/* Scrollable Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-8 max-w-6xl mx-auto">
              <div className="flex flex-col gap-1">
                <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface">
                  Salom, Javlon Abdumannopov! 👋
                </h1>
                <p className="text-sm text-on-surface-variant">
                  Portfolio va mentorlik platformangizni to'liq real vaqt rejimida boshqaring.
                </p>
              </div>

              {/* Quick Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  onClick={() => setActiveTab('projects')}
                  className="glass-panel p-5 rounded-2xl flex flex-col justify-between gap-3 cursor-pointer hover:border-primary-container/40 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-on-surface-variant uppercase">Loyihalar</span>
                    <FolderKanban className="w-5 h-5 text-primary-container group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline text-3xl font-bold text-on-surface">
                      {data.projects.length}
                    </span>
                    <span className="text-xs font-mono text-secondary">Faol ko'rgazmada</span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('skills')}
                  className="glass-panel p-5 rounded-2xl flex flex-col justify-between gap-3 cursor-pointer hover:border-primary-container/40 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-on-surface-variant uppercase">Ko'nikmalar</span>
                    <Cpu className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline text-3xl font-bold text-on-surface">
                      {data.skills.length}
                    </span>
                    <span className="text-xs font-mono text-primary-container">Texnologiyalar</span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('inquiries')}
                  className="glass-panel p-5 rounded-2xl flex flex-col justify-between gap-3 cursor-pointer hover:border-primary-container/40 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-on-surface-variant uppercase">Murojaatlar</span>
                    <Mail className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline text-3xl font-bold text-on-surface">
                      {inquiries.length}
                    </span>
                    <span className="text-xs font-mono text-rose-400 font-semibold">
                      {unreadInquiriesCount} yangi
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
                <h3 className="font-headline text-base font-bold text-on-surface">
                  Tezkor Harakatlar
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setEditingProject({
                        id: 'proj-' + Date.now(),
                        title: '',
                        description: { uz: '', ru: '', en: '' },
                        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
                        tags: ['React', 'TypeScript', 'Tailwind CSS'],
                        demoUrl: '',
                        githubUrl: '',
                        featured: true,
                      });
                      setIsProjectModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary text-xs font-headline font-bold hover:shadow-neon transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yangi Loyiha Qo'shish</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingSkill({
                        id: 'sk-' + Date.now(),
                        name: '',
                        category: 'core',
                        level: 90,
                        highlight: false,
                      });
                      setIsSkillModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-headline font-semibold text-on-surface border border-white/5 transition-all"
                  >
                    <Plus className="w-4 h-4 text-secondary" />
                    <span>Yangi Ko'nikma Qo'shish</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('content')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-headline font-semibold text-on-surface border border-white/5 transition-all"
                  >
                    <Edit2 className="w-4 h-4 text-primary-container" />
                    <span>Haqimda & Bio Tahrirlash</span>
                  </button>
                </div>
              </div>

              {/* Recent Inquiries Preview */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline text-base font-bold text-on-surface">
                    Oxirgi Kelgan Murojaatlar
                  </h3>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs font-mono text-primary-container hover:underline"
                  >
                    Barchasini ko'rish &rarr;
                  </button>
                </div>

                {inquiries.length === 0 ? (
                  <p className="text-xs text-on-surface-variant font-mono">Hozircha xabarlar yo'q.</p>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    {inquiries.slice(0, 3).map((inq) => (
                      <div
                        key={inq.id}
                        className={`p-3.5 rounded-xl flex items-center justify-between gap-4 border transition-colors ${
                          inq.read
                            ? 'bg-surface-container/40 border-white/5 text-on-surface-variant'
                            : 'bg-primary-container/10 border-primary-container/20 text-on-surface'
                        }`}
                      >
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-headline text-sm font-bold text-on-surface">
                              {inq.name}
                            </span>
                            <span className="text-xs font-mono text-primary-container">
                              {inq.contact}
                            </span>
                          </div>
                          <p className="text-xs text-on-surface-variant line-clamp-1">
                            {inq.message}
                          </p>
                        </div>
                        <span className="text-[11px] font-mono text-on-surface-variant whitespace-nowrap">
                          {inq.date}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. PROJECTS CRUD TAB */}
          {activeTab === 'projects' && (
            <div className="flex flex-col gap-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-headline text-2xl font-bold text-on-surface">
                    Loyihalar Boshqaruvi
                  </h2>
                  <p className="text-xs sm:text-sm text-on-surface-variant">
                    Saytdagi loyihalarni qo'shing, tahrirlang yoki o'chiring.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingProject({
                      id: 'proj-' + Date.now(),
                      title: '',
                      description: { uz: '', ru: '', en: '' },
                      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
                      tags: ['React', 'TypeScript', 'Tailwind CSS'],
                      demoUrl: '',
                      githubUrl: '',
                      featured: true,
                    });
                    setIsProjectModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary text-xs font-headline font-bold hover:shadow-neon transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yangi Loyiha Qo'shish</span>
                </button>
              </div>

              {/* Projects List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="glass-panel p-5 rounded-2xl flex flex-col justify-between gap-4 border border-white/5 hover:border-primary-container/30 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-20 h-20 rounded-xl object-cover bg-surface-container flex-shrink-0"
                      />
                      <div className="flex flex-col gap-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-headline text-base font-bold text-on-surface">
                            {proj.title}
                          </h3>
                          {proj.featured && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/30">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-on-surface-variant line-clamp-2">
                          {proj.description.uz}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {proj.tags.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        {proj.demoUrl && (
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary-container transition-colors"
                            title="Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                            title="GitHub"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProject({ ...proj });
                            setIsProjectModalOpen(true);
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-mono text-on-surface transition-colors"
                        >
                          <Edit2 className="w-3 h-3 text-primary-container" />
                          <span>Tahrirlash</span>
                        </button>

                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 rounded-lg bg-surface-container hover:bg-rose-500/20 text-rose-400 transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. SKILLS CRUD TAB */}
          {activeTab === 'skills' && (
            <div className="flex flex-col gap-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-headline text-2xl font-bold text-on-surface">
                    Ko'nikmalar Boshqaruvi
                  </h2>
                  <p className="text-xs sm:text-sm text-on-surface-variant">
                    Texnologik ko'nikmalar ro'yxati va darajalarini sozlang.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingSkill({
                      id: 'sk-' + Date.now(),
                      name: '',
                      category: 'core',
                      level: 90,
                      highlight: false,
                    });
                    setIsSkillModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary text-xs font-headline font-bold hover:shadow-neon transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yangi Ko'nikma Qo'shish</span>
                </button>
              </div>

              {/* Skills Table / List */}
              <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-surface-container-high/60 text-on-surface-variant uppercase text-[10px] tracking-wider border-b border-white/5">
                      <tr>
                        <th className="p-4">Nomi</th>
                        <th className="p-4">Kategoriya</th>
                        <th className="p-4">Asosiy (Star)</th>
                        <th className="p-4 text-right">Amallar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {data.skills.map((skill) => (
                        <tr key={skill.id} className="hover:bg-surface-container/50 transition-colors">
                          <td className="p-4 font-headline text-sm font-bold text-on-surface">
                            {skill.name}
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant uppercase text-[10px]">
                              {skill.category}
                            </span>
                          </td>
                          <td className="p-4">
                            {skill.highlight ? (
                              <span className="text-secondary flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-secondary" /> Ha
                              </span>
                            ) : (
                              <span className="text-on-surface-variant">Yo'q</span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setEditingSkill({ ...skill });
                                  setIsSkillModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary-container transition-colors"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteSkill(skill.id)}
                                className="p-1.5 rounded-lg bg-surface-container hover:bg-rose-500/20 text-rose-400 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 4. CONTENT & BIO & STATS TAB */}
          {activeTab === 'content' && (
            <form onSubmit={handleSaveContent} className="flex flex-col gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline text-2xl font-bold text-on-surface">
                    Haqimda, Hero va Statistika Matnlari
                  </h2>
                  <p className="text-xs sm:text-sm text-on-surface-variant">
                    3 tildagi barcha asosiy matnlarni ushbu bo'limda to'g'ridan-to'g'ri o'zgartiring.
                  </p>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary text-xs font-headline font-bold hover:shadow-neon transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Barchasini Saqlash</span>
                </button>
              </div>

              {/* Hero Sarlavhalari */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
                <h3 className="font-headline text-base font-bold text-primary-container border-b border-white/5 pb-2">
                  Hero Seksiyasi (Asosiy Ekran)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">Sarlavha (UZ)</label>
                    <input
                      type="text"
                      value={contentForm.hero.title.uz}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          hero: {
                            ...contentForm.hero,
                            title: { ...contentForm.hero.title, uz: e.target.value },
                          },
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 focus:ring-1 focus:ring-primary-container"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">Sarlavha (RU)</label>
                    <input
                      type="text"
                      value={contentForm.hero.title.ru}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          hero: {
                            ...contentForm.hero,
                            title: { ...contentForm.hero.title, ru: e.target.value },
                          },
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 focus:ring-1 focus:ring-primary-container"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">Sarlavha (EN)</label>
                    <input
                      type="text"
                      value={contentForm.hero.title.en}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          hero: {
                            ...contentForm.hero,
                            title: { ...contentForm.hero.title, en: e.target.value },
                          },
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 focus:ring-1 focus:ring-primary-container"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">Quyi Sarlavha (UZ)</label>
                    <input
                      type="text"
                      value={contentForm.hero.subtitle.uz}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          hero: {
                            ...contentForm.hero,
                            subtitle: { ...contentForm.hero.subtitle, uz: e.target.value },
                          },
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 focus:ring-1 focus:ring-primary-container"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">Quyi Sarlavha (RU)</label>
                    <input
                      type="text"
                      value={contentForm.hero.subtitle.ru}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          hero: {
                            ...contentForm.hero,
                            subtitle: { ...contentForm.hero.subtitle, ru: e.target.value },
                          },
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 focus:ring-1 focus:ring-primary-container"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">Quyi Sarlavha (EN)</label>
                    <input
                      type="text"
                      value={contentForm.hero.subtitle.en}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          hero: {
                            ...contentForm.hero,
                            subtitle: { ...contentForm.hero.subtitle, en: e.target.value },
                          },
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 focus:ring-1 focus:ring-primary-container"
                    />
                  </div>
                </div>

                {/* Hero Bio */}
                <div className="flex flex-col gap-2 pt-2">
                  <label className="text-[11px] font-mono text-on-surface-variant">Hero Bio Matni (UZ)</label>
                  <textarea
                    rows={2}
                    value={contentForm.hero.bio.uz}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        hero: {
                          ...contentForm.hero,
                          bio: { ...contentForm.hero.bio, uz: e.target.value },
                        },
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                {/* Avatar URL & CV Link */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">Profil Rasmi URL (Avatar URL)</label>
                    <input
                      type="text"
                      value={contentForm.hero.avatarUrl}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          hero: { ...contentForm.hero, avatarUrl: e.target.value },
                        })
                      }
                      placeholder="/javlon.png yoki https://..."
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">CV / Rezyume Havolasi (URL)</label>
                    <input
                      type="text"
                      value={contentForm.hero.resumeUrl || ''}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          hero: { ...contentForm.hero, resumeUrl: e.target.value },
                        })
                      }
                      placeholder="Google Drive yoki PDF havola..."
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 font-mono"
                    />
                  </div>
                </div>

                {/* Status & Location Badge */}
                <div className="flex flex-col gap-1 pt-2">
                  <label className="text-[11px] font-mono text-on-surface-variant">
                    Lokatsiya & Status (Masalan: "Andijon | Geeks IT Mentor")
                  </label>
                  <input
                    type="text"
                    value={contentForm.hero.locationBadge || ''}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        hero: { ...contentForm.hero, locationBadge: e.target.value },
                      })
                    }
                    placeholder="Andijon | Geeks IT Mentor"
                    className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5"
                  />
                </div>

                {/* Developer Terminal Box Snippet */}
                <div className="pt-2 flex flex-col gap-3 border-t border-white/5">
                  <span className="text-xs font-mono font-semibold text-primary-container">
                    Rasm tagidagi Kod Terminal Qutisi (developer.tsx)
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-mono text-on-surface-variant">Fayl Nomi</label>
                      <input
                        type="text"
                        value={contentForm.hero.developerSnippet?.fileName || 'developer.tsx'}
                        onChange={(e) =>
                          setContentForm({
                            ...contentForm,
                            hero: {
                              ...contentForm.hero,
                              developerSnippet: {
                                ...(contentForm.hero.developerSnippet || { studentBadge: "100+ o'quvchilar", codeLine: "const developer = { name: 'Javlon', role: 'React & Mentor' };" }),
                                fileName: e.target.value,
                              },
                            },
                          })
                        }
                        className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-mono text-on-surface-variant">O'quvchilar Nishoni Matni</label>
                      <input
                        type="text"
                        value={contentForm.hero.developerSnippet?.studentBadge || "100+ o'quvchilar"}
                        onChange={(e) =>
                          setContentForm({
                            ...contentForm,
                            hero: {
                              ...contentForm.hero,
                              developerSnippet: {
                                ...(contentForm.hero.developerSnippet || { fileName: 'developer.tsx', codeLine: "const developer = { name: 'Javlon', role: 'React & Mentor' };" }),
                                studentBadge: e.target.value,
                              },
                            },
                          })
                        }
                        className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">Kod Qatori (Code Snippet)</label>
                    <input
                      type="text"
                      value={contentForm.hero.developerSnippet?.codeLine || "const developer = { name: 'Javlon', role: 'React & Mentor' };"}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          hero: {
                            ...contentForm.hero,
                            developerSnippet: {
                              ...(contentForm.hero.developerSnippet || { fileName: 'developer.tsx', studentBadge: "100+ o'quvchilar" }),
                              codeLine: e.target.value,
                            },
                          },
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Haqimda To'liq Bio */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
                <h3 className="font-headline text-base font-bold text-primary-fixed-dim border-b border-white/5 pb-2">
                  Haqimda Bo'limi (About Section)
                </h3>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-mono text-on-surface-variant">To'liq Bio (UZ)</label>
                  <textarea
                    rows={4}
                    value={contentForm.about.fullBio.uz}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        about: {
                          ...contentForm.about,
                          fullBio: { ...contentForm.about.fullBio, uz: e.target.value },
                        },
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-mono text-on-surface-variant">Falsafa / Shior (Quote)</label>
                  <input
                    type="text"
                    value={contentForm.about.highlightStory.uz}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        about: {
                          ...contentForm.about,
                          highlightStory: { ...contentForm.about.highlightStory, uz: e.target.value },
                        },
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-primary-container text-on-primary font-headline text-sm font-bold flex items-center justify-center gap-2 hover:shadow-neon transition-all"
              >
                <Save className="w-4 h-4" />
                <span>O'zgarishlarni Saqlash</span>
              </button>
            </form>
          )}



          {/* 5. CONTACT TAB */}
          {activeTab === 'contact' && (
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
              <div>
                <h2 className="font-headline text-2xl font-bold text-on-surface">
                  Aloqa va Ijtimoiy Tarmoq Havolalari
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  Telegram, GitHub, LinkedIn, email va telefon ma'lumotlarini yangilang.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">Telegram Havola</label>
                    <input
                      type="text"
                      value={contentForm.contact.telegram}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          contact: { ...contentForm.contact, telegram: e.target.value },
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">Telegram Username</label>
                    <input
                      type="text"
                      value={contentForm.contact.telegramUsername}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          contact: { ...contentForm.contact, telegramUsername: e.target.value },
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">GitHub Havola</label>
                    <input
                      type="text"
                      value={contentForm.contact.github}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          contact: { ...contentForm.contact, github: e.target.value },
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">LinkedIn Havola</label>
                    <input
                      type="text"
                      value={contentForm.contact.linkedin}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          contact: { ...contentForm.contact, linkedin: e.target.value },
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">YouTube Havola</label>
                    <input
                      type="text"
                      value={contentForm.contact.youtube || ''}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          contact: { ...contentForm.contact, youtube: e.target.value },
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">Email</label>
                    <input
                      type="email"
                      value={contentForm.contact.email}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          contact: { ...contentForm.contact, email: e.target.value },
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono text-on-surface-variant">Telefon</label>
                    <input
                      type="text"
                      value={contentForm.contact.phone}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          contact: { ...contentForm.contact, phone: e.target.value },
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 pt-2">
                  <label className="text-[11px] font-mono text-on-surface-variant">Manzil (Location)</label>
                  <input
                    type="text"
                    value={contentForm.contact.location}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        contact: { ...contentForm.contact, location: e.target.value },
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveContent}
                  className="mt-3 py-3 px-6 rounded-xl bg-primary-container text-on-primary font-headline text-xs font-bold hover:shadow-neon transition-all"
                >
                  Aloqa Ma'lumotlarini Saqlash
                </button>
              </div>
            </div>
          )}

          {/* 7. INQUIRIES TAB */}
          {activeTab === 'inquiries' && (
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline text-2xl font-bold text-on-surface">
                    Kelgan Murojaatlar
                  </h2>
                  <p className="text-xs sm:text-sm text-on-surface-variant">
                    Foydalanuvchilar va bo'lg'usi o'quvchilar tomonidan sayt orqali yuborilgan xabarlar.
                  </p>
                </div>
                <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-surface-container text-secondary font-semibold">
                  Jami: {inquiries.length} ta
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="glass-panel p-12 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
                  <Mail className="w-10 h-10 text-on-surface-variant/40" />
                  <p className="text-sm font-mono text-on-surface-variant">
                    Hozircha hech qanday yangi xabar kelmagan.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className={`glass-panel p-5 rounded-2xl flex flex-col gap-3 border transition-colors ${
                        inq.read
                          ? 'border-white/5 opacity-80'
                          : 'border-primary-container/30 bg-primary-container/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-headline text-base font-bold text-on-surface">
                            {inq.name}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary-container font-mono text-xs font-semibold">
                            {inq.contact}
                          </span>
                          {!inq.read && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                          )}
                        </div>
                        <span className="font-mono text-xs text-on-surface-variant">{inq.date}</span>
                      </div>

                      <p className="text-sm text-on-surface leading-relaxed p-3 rounded-xl bg-surface-container/60 border border-white/5">
                        {inq.message}
                      </p>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        {!inq.read && (
                          <button
                            onClick={() => markAsRead(inq.id)}
                            className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-mono text-secondary transition-colors"
                          >
                            O'qildi deb belgilash
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(inq.id)}
                          className="p-1.5 rounded-lg bg-surface-container hover:bg-rose-500/20 text-rose-400 transition-colors"
                          title="Xabarni o'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 8. SETTINGS & BACKUP TAB */}
          {activeTab === 'settings' && (
            <div className="flex flex-col gap-8 max-w-3xl mx-auto">
              <div>
                <h2 className="font-headline text-2xl font-bold text-on-surface">
                  Tizim Sozlamalari & Zaxiralash
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  Xavfsizlik paroli, ma'lumotlarni eksport/import qilish va tiklash.
                </p>
              </div>

              {/* Password update card */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col gap-5 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-primary-container/10 border border-primary-container/20">
                      <KeyRound className="w-5 h-5 text-primary-container" />
                    </div>
                    <div>
                      <h3 className="font-headline text-base font-bold text-on-surface">
                        Admin Parolini O'zgartirish
                      </h3>
                      <p className="text-xs text-on-surface-variant">
                        Avval amaldagi eski parolni tasdiqlang, so'ng yangi parolni ikki marta kiriting.
                      </p>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-secondary opacity-70 hidden sm:block" />
                </div>

                {/* Error Banner */}
                {passwordError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-400 font-mono animate-fadeIn">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{passwordError}</span>
                  </div>
                )}

                {/* Success Banner */}
                {passwordSuccess && (
                  <div className="p-3.5 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center gap-2.5 text-xs text-secondary font-mono animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-secondary" />
                    <span>{passwordSuccess}</span>
                  </div>
                )}

                {!isOldPasswordVerified ? (
                  /* 1-BOSQICH: Eski parolni tekshirish */
                  <form onSubmit={handleVerifyOldPassword} className="flex flex-col gap-3">
                    <label className="text-xs font-mono text-on-surface-variant uppercase font-semibold">
                      1-Qadam: Amaldagi (eski) parolni kiriting
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <input
                          type={showOldPass ? 'text' : 'password'}
                          required
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          placeholder="Amaldagi parolni kiriting..."
                          className="w-full px-4 py-2.5 pr-10 rounded-xl bg-surface-container text-xs font-mono text-on-surface border border-white/5 focus:ring-1 focus:ring-primary-container"
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPass(!showOldPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                        >
                          {showOldPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-primary-container text-on-primary text-xs font-headline font-bold hover:shadow-neon transition-all shrink-0"
                      >
                        Eski Parolni Tekshirish
                      </button>
                    </div>
                  </form>
                ) : (
                  /* 2-BOSQICH: Yangi parolni 2 marta kiritish */
                  <form onSubmit={handleSaveNewPassword} className="flex flex-col gap-4 animate-fadeIn">
                    <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                      <span className="text-xs font-mono text-secondary">
                        Eski parol to'g'ri tasdiqlandi! Endi yangi parolni 2 marta kiriting:
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Yangi parol */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono text-on-surface-variant uppercase font-semibold">
                          Yangi Parol
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPass ? 'text' : 'password'}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Yangi parol (kamida 3 ta belgi)..."
                            className="w-full px-4 py-2.5 pr-10 rounded-xl bg-surface-container text-xs font-mono text-on-surface border border-white/5 focus:ring-1 focus:ring-primary-container"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPass(!showNewPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                          >
                            {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Yangi parolni takrorlang */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono text-on-surface-variant uppercase font-semibold">
                          Yangi Parolni Qayta Kiriting
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPass ? 'text' : 'password'}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Yangi parolni takrorlang..."
                            className="w-full px-4 py-2.5 pr-10 rounded-xl bg-surface-container text-xs font-mono text-on-surface border border-white/5 focus:ring-1 focus:ring-primary-container"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                          >
                            {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="submit"
                        className="py-2.5 px-6 rounded-xl bg-primary-container text-on-primary font-headline text-xs font-bold hover:shadow-neon transition-all flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Yangi Parolni Saqlash</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelPasswordChange}
                        className="py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-mono transition-all border border-white/5"
                      >
                        Bekor Qilish
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Supabase Cloud Database Status Card */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <Database className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-headline text-base font-bold text-on-surface">
                        Markaziy Bulutli Baza (Supabase Cloud Database)
                      </h3>
                      <p className="text-xs text-on-surface-variant">
                        Admin paneldagi o'zgarishlar barcha tashrif buyuruvchilarga darhol ko'rinishi uchun.
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 w-fit ${
                      isCloudConnected
                        ? 'bg-secondary/15 text-secondary border border-secondary/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isCloudConnected ? 'bg-secondary animate-pulse' : 'bg-amber-400'}`} />
                    {isCloudConnected ? 'Bulutli Baza Ulangan (Faol)' : 'Lokal Rejim (LocalStorage)'}
                  </span>
                </div>

                {!isCloudConnected ? (
                  <div className="p-4 rounded-xl bg-surface-container/80 border border-white/5 flex flex-col gap-2.5 text-xs">
                    <span className="font-headline font-bold text-on-surface">
                      Supabase bazasini ulash 3 oddiy qadamda:
                    </span>
                    <ol className="list-decimal list-inside text-on-surface-variant flex flex-col gap-1.5 font-mono">
                      <li>
                        <strong className="text-on-surface">supabase.com</strong> saytida bepul ro'yxatdan o'ting va yangi loyiha oching.
                      </li>
                      <li>
                        Loyihangizdagi <code className="text-primary-container font-bold">supabase_setup.sql</code> fayli kodini Supabase SQL Editor bo'limiga qo'yib, <strong>RUN</strong> tugmasini bosing.
                      </li>
                      <li>
                        <code className="text-primary-container font-bold">.env</code> fayliga Supabase Project Settings -&gt; API bo'limidagi URL va anon kalitini qo'ying.
                      </li>
                    </ol>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center gap-2 text-xs font-mono text-secondary">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-secondary" />
                    <span>✓ Bulutli baza muvaffaqiyatli ulangan! Admin paneldagi barcha yangilanishlar markaziy bazaga saqlanadi.</span>
                  </div>
                )}
              </div>

              {/* Backup & Restore */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
                <h3 className="font-headline text-base font-bold text-on-surface">
                  JSON Zaxira Nusxasi (Backup & Restore)
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Saytdagi barcha o'zgarishlar va loyihalarni kompyuteringizga bitta JSON fayl sifatida yuklab oling yoki avvalgi nusxani qayta yuklang.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={exportJSON}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-headline font-bold text-on-surface border border-white/5 transition-all"
                  >
                    <Download className="w-4 h-4 text-primary-container" />
                    <span>Zaxirani Yuklab Olish (Export JSON)</span>
                  </button>

                  <label className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-headline font-bold text-on-surface border border-white/5 transition-all cursor-pointer">
                    <Upload className="w-4 h-4 text-secondary" />
                    <span>Fayldan Qayta Yuklash (Import)</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Factory Reset */}
              <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-rose-400">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="font-headline text-base font-bold">
                    Standart Holatga Qaytarish (Reset to Default)
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Agar biror narsa noto'g'ri sozlangan bo'lsa, ushbu tugma orqali butun sayt ma'lumotlarini dastlabki mukammal holatiga qaytarishingiz mumkin.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Rostdan ham barcha ma'lumotlarni dastlabki holatga qaytarmoqchimisiz?")) {
                      resetToDefault();
                      setContentForm(data);
                      alert("Sayt ma'lumotlari dastlabki holatga qaytarildi!");
                    }
                  }}
                  className="w-fit flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500 text-white text-xs font-headline font-bold hover:bg-rose-600 transition-colors mt-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Dastlabki Holatga Qaytarish</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PROJECT ADD/EDIT MODAL */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-surface-container-high rounded-2xl p-6 sm:p-7 border border-white/10 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            <h3 className="font-headline text-lg font-bold text-on-surface">
              {editingProject.title ? "Loyihani Tahrirlash" : "Yangi Loyiha Qo'shish"}
            </h3>

            <form onSubmit={handleSaveProject} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-on-surface-variant">Loyiha Nomi *</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="Masalan: LinkHub"
                  className="px-3.5 py-2.5 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 focus:ring-1 focus:ring-primary-container"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-on-surface-variant">Tavsif (O'zbekcha) *</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.description.uz}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: { ...editingProject.description, uz: e.target.value },
                    })
                  }
                  className="px-3.5 py-2.5 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-on-surface-variant">Tavsif (Ruscha)</label>
                <textarea
                  rows={2}
                  value={editingProject.description.ru}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: { ...editingProject.description, ru: e.target.value },
                    })
                  }
                  className="px-3.5 py-2.5 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-on-surface-variant">Tavsif (Inglizcha)</label>
                <textarea
                  rows={2}
                  value={editingProject.description.en}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: { ...editingProject.description, en: e.target.value },
                    })
                  }
                  className="px-3.5 py-2.5 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-on-surface-variant">Rasm URL (Screenshot URL)</label>
                <input
                  type="text"
                  required
                  value={editingProject.image}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                  placeholder="https://..."
                  className="px-3.5 py-2.5 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 font-mono"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-on-surface-variant">
                  Texnologiyalar Teglari (Vergul bilan ajrating)
                </label>
                <input
                  type="text"
                  value={editingProject.tags.join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="React, TypeScript, Tailwind CSS"
                  className="px-3.5 py-2.5 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-mono text-on-surface-variant">Live Demo URL</label>
                  <input
                    type="text"
                    value={editingProject.demoUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="px-3.5 py-2.5 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-mono text-on-surface-variant">GitHub Repo URL</label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="px-3.5 py-2.5 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheckbox"
                  checked={editingProject.featured}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-primary-container bg-surface-container border-white/10"
                />
                <label htmlFor="featuredCheckbox" className="text-xs font-mono text-on-surface cursor-pointer">
                  Asosiy Loyiha sifatida belgilash (Featured)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-mono text-on-surface transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary-container text-on-primary text-xs font-headline font-bold hover:shadow-neon transition-all"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SKILL ADD/EDIT MODAL */}
      {isSkillModalOpen && editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-surface-container-high rounded-2xl p-6 border border-white/10 shadow-2xl flex flex-col gap-4">
            <h3 className="font-headline text-lg font-bold text-on-surface">
              {editingSkill.name ? "Ko'nikmani Tahrirlash" : "Yangi Ko'nikma Qo'shish"}
            </h3>

            <form onSubmit={handleSaveSkill} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-on-surface-variant">Ko'nikma Nomi *</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  placeholder="Masalan: Next.js"
                  className="px-3.5 py-2.5 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-on-surface-variant">Kategoriya</label>
                <select
                  value={editingSkill.category}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                  className="px-3.5 py-2.5 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5"
                >
                  <option value="core">Asosiy (Core Frontend)</option>
                  <option value="additional">Qo'shimcha (Backend / OS)</option>
                  <option value="tools">Asboblar (Tools & Workflows)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="skillHighlight"
                  checked={editingSkill.highlight}
                  onChange={(e) => setEditingSkill({ ...editingSkill, highlight: e.target.checked })}
                  className="w-4 h-4 rounded text-secondary bg-surface-container"
                />
                <label htmlFor="skillHighlight" className="text-xs font-mono text-on-surface cursor-pointer">
                  Asosiy ko'nikma (Star bilan ajratish)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-xs font-mono text-on-surface"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary-container text-on-primary text-xs font-headline font-bold hover:shadow-neon transition-all"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
