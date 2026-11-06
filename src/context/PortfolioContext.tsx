import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, Language, LocalizedString, ContactMessage } from '../types';
import {
  getPortfolioData,
  resetPortfolioData,
  exportPortfolioJSON,
  importPortfolioJSON,
  getInquiries,
  markInquiryRead,
  deleteInquiry,
  isAdminAuthenticated,
  setAdminAuthenticated,
} from '../services/storage';
import {
  fetchCloudPortfolioData,
  saveCloudPortfolioData,
  fetchCloudInquiries,
  sendCloudInquiry,
  markCloudInquiryAsRead,
  deleteCloudInquiry,
} from '../services/portfolioApi';
import { isSupabaseConfigured } from '../services/supabase';

interface PortfolioContextType {
  data: PortfolioData;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  t: (field?: LocalizedString) => string;
  updateData: (newData: PortfolioData) => void;
  resetToDefault: () => void;
  exportJSON: () => void;
  importJSON: (jsonStr: string) => void;
  inquiries: ContactMessage[];
  sendInquiry: (name: string, contact: string, message: string) => void;
  markAsRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  isAdmin: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  isCloudConnected: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(getPortfolioData);
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('javlon_portfolio_lang') as Language) || 'uz';
  });
  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('javlon_portfolio_theme') as 'dark' | 'light') || 'dark';
  });
  const [inquiries, setInquiries] = useState<ContactMessage[]>(getInquiries);
  const [isAdmin, setIsAdmin] = useState<boolean>(isAdminAuthenticated);
  const [isCloudConnected] = useState<boolean>(isSupabaseConfigured);

  // Initial Cloud Sync: fetch data & inquiries from Supabase
  useEffect(() => {
    let isMounted = true;

    const syncFromCloud = async () => {
      try {
        const cloudData = await fetchCloudPortfolioData();
        if (isMounted && cloudData) {
          setData(cloudData);
        }

        const cloudInquiries = await fetchCloudInquiries();
        if (isMounted && cloudInquiries && cloudInquiries.length > 0) {
          setInquiries(cloudInquiries);
        }
      } catch (err) {
        console.warn('Initial cloud sync error, staying on local data:', err);
      }
    };

    syncFromCloud();

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync theme with DOM and dynamic custom colors
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('javlon_portfolio_theme', theme);
  }, [theme]);

  // Sync language with localStorage
  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem('javlon_portfolio_lang', newLang);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const t = (field?: LocalizedString): string => {
    if (!field) return '';
    return field[language] || field.uz || '';
  };

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    // Saves to LocalStorage and syncs to Supabase Cloud
    saveCloudPortfolioData(newData);
  };

  const resetToDefault = () => {
    const fresh = resetPortfolioData();
    setData(fresh);
    saveCloudPortfolioData(fresh);
  };

  const exportJSON = () => {
    exportPortfolioJSON(data);
  };

  const importJSON = (jsonStr: string) => {
    const imported = importPortfolioJSON(jsonStr);
    setData(imported);
    saveCloudPortfolioData(imported);
  };

  const sendInquiry = async (name: string, contact: string, message: string) => {
    const saved = await sendCloudInquiry({ name, contact, message });
    setInquiries((prev) => [saved, ...prev]);
  };

  const markAsRead = (id: string) => {
    const updated = markInquiryRead(id);
    setInquiries(updated);
    markCloudInquiryAsRead(id);
  };

  const deleteMessage = (id: string) => {
    const updated = deleteInquiry(id);
    setInquiries(updated);
    deleteCloudInquiry(id);
  };

  const loginAdmin = (password: string): boolean => {
    if (password === data.adminPassword) {
      setIsAdmin(true);
      setAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminAuthenticated(false);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        language,
        setLanguage,
        theme,
        toggleTheme,
        t,
        updateData,
        resetToDefault,
        exportJSON,
        importJSON,
        inquiries,
        sendInquiry,
        markAsRead,
        deleteMessage,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        isCloudConnected,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

