import { PortfolioData, ContactMessage } from '../types';
import { INITIAL_PORTFOLIO_DATA } from '../data/initialData';

const DATA_STORAGE_KEY = 'javlon_portfolio_data_v5';
const INQUIRIES_STORAGE_KEY = 'javlon_portfolio_inquiries_v5';
const AUTH_STORAGE_KEY = 'javlon_admin_auth_session';

export const getPortfolioData = (): PortfolioData => {
  try {
    const raw = localStorage.getItem(DATA_STORAGE_KEY);
    if (!raw) return INITIAL_PORTFOLIO_DATA;
    const parsed = JSON.parse(raw);
    // Merge with initial data in case new fields were added
    return {
      ...INITIAL_PORTFOLIO_DATA,
      ...parsed,
      hero: { ...INITIAL_PORTFOLIO_DATA.hero, ...(parsed.hero || {}) },
      stats: { ...INITIAL_PORTFOLIO_DATA.stats, ...(parsed.stats || {}) },
      about: { ...INITIAL_PORTFOLIO_DATA.about, ...(parsed.about || {}) },
      contact: { ...INITIAL_PORTFOLIO_DATA.contact, ...(parsed.contact || {}) },
      mentorship: { ...INITIAL_PORTFOLIO_DATA.mentorship, ...(parsed.mentorship || {}) },
    };
  } catch (e) {
    console.error('Error reading portfolio data from localStorage', e);
    return INITIAL_PORTFOLIO_DATA;
  }
};

export const savePortfolioData = (data: PortfolioData): void => {
  try {
    localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving portfolio data to localStorage', e);
  }
};

export const resetPortfolioData = (): PortfolioData => {
  try {
    localStorage.removeItem(DATA_STORAGE_KEY);
  } catch (e) {
    console.error('Error resetting portfolio data', e);
  }
  return INITIAL_PORTFOLIO_DATA;
};

export const exportPortfolioJSON = (data: PortfolioData): void => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `javlon_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const importPortfolioJSON = (jsonString: string): PortfolioData => {
  const parsed = JSON.parse(jsonString);
  const validatedData: PortfolioData = {
    ...INITIAL_PORTFOLIO_DATA,
    ...parsed,
  };
  savePortfolioData(validatedData);
  return validatedData;
};

// Inquiries / Contact Messages
export const getInquiries = (): ContactMessage[] => {
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) {
      // Seed an initial demo message
      const initial: ContactMessage[] = [
        {
          id: 'inq-demo-1',
          name: 'Sardorbek Aliyev',
          contact: '@sardor_dev (Telegram)',
          message: "Assalomu alaykum Javlon aka! Frontend va React bo'yicha yangi ochilayotgan guruhga yozilmoqchi edim. Dars vaqtlari qachon bo'ladi?",
          date: new Date(Date.now() - 3600000 * 5).toLocaleString('uz-UZ'),
          read: false,
        },
      ];
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveInquiry = (msg: { name: string; contact: string; message: string }): ContactMessage => {
  const inquiries = getInquiries();
  const newInquiry: ContactMessage = {
    id: 'inq-' + Date.now(),
    name: msg.name,
    contact: msg.contact,
    message: msg.message,
    date: new Date().toLocaleString('uz-UZ'),
    read: false,
  };
  const updated = [newInquiry, ...inquiries];
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving inquiry', e);
  }
  return newInquiry;
};

export const markInquiryRead = (id: string): ContactMessage[] => {
  const inquiries = getInquiries();
  const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, read: true } : inq));
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteInquiry = (id: string): ContactMessage[] => {
  const inquiries = getInquiries();
  const updated = inquiries.filter((inq) => inq.id !== id);
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

// Admin authentication helpers
export const verifyAdminPassword = (password: string, currentData: PortfolioData): boolean => {
  return password === currentData.adminPassword;
};

export const isAdminAuthenticated = (): boolean => {
  try {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

export const setAdminAuthenticated = (status: boolean): void => {
  try {
    if (status) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
    } else {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (e) {
    console.error('Session storage error', e);
  }
};
