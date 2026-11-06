export type Language = 'uz' | 'ru' | 'en';

export interface LocalizedString {
  uz: string;
  ru: string;
  en: string;
}

export interface LocalizedStringList {
  uz: string[];
  ru: string[];
  en: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'core' | 'additional' | 'tools';
  level: number;
  highlight?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: LocalizedString;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  role: LocalizedString;
  company: string;
  period: LocalizedString;
  location: string;
  description: LocalizedString;
  points: LocalizedStringList;
  badge?: string;
}

export interface MentorshipModule {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  duration: string;
  topics: LocalizedStringList;
}

export interface StudentResultItem {
  id: string;
  name: string;
  role: string;
  result: LocalizedString;
  company?: string;
}

export interface ContactInfo {
  telegram: string;
  telegramUsername: string;
  github: string;
  linkedin: string;
  youtube?: string;
  email: string;
  phone: string;
  location: string;
  statusBadge: LocalizedString;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  darkBgColor: string;
}

export interface HeroContent {
  badge: LocalizedString;
  title: LocalizedString;
  subtitle: LocalizedString;
  bio: LocalizedString;
  ctaConsult: LocalizedString;
  ctaProjects: LocalizedString;
  resumeUrl: string;
  avatarUrl: string;
  statusRole?: string;
  locationBadge?: string;
  tags?: string[];
  developerSnippet?: {
    fileName: string;
    studentBadge: string;
    codeLine: string;
  };
}

export interface AboutHighlight {
  title: LocalizedString;
  desc: LocalizedString;
}

export interface AboutContent {
  heading: LocalizedString;
  subheading: LocalizedString;
  fullBio: LocalizedString;
  highlightStory: LocalizedString;
  checklist?: LocalizedString[];
  pillars?: AboutHighlight[];
}

export interface StatsContent {
  studentsCount: string;
  studentsLabel: LocalizedString;
  experienceYears: string;
  experienceLabel: LocalizedString;
  projectsCount: string;
  projectsLabel: LocalizedString;
  satisfactionRate: string;
  satisfactionLabel: LocalizedString;
}

export interface PortfolioData {
  hero: HeroContent;
  stats: StatsContent;
  about: AboutContent;
  skills: SkillItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  mentorship: {
    title: LocalizedString;
    description: LocalizedString;
    modules: MentorshipModule[];
    results: StudentResultItem[];
  };
  contact: ContactInfo;
  adminPassword: string; // Secret key for admin panel access
  themeConfig?: ThemeConfig;
}

export interface ContactMessage {
  id: string;
  name: string;
  contact: string; // telegram, phone, or email
  message: string;
  date: string;
  read: boolean;
}
