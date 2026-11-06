import { supabase, isSupabaseConfigured } from './supabase';
import { PortfolioData, ContactMessage } from '../types';
import { INITIAL_PORTFOLIO_DATA } from '../data/initialData';
import {
  getPortfolioData as getLocalPortfolioData,
  savePortfolioData as saveLocalPortfolioData,
  getInquiries as getLocalInquiries,
  saveInquiry as saveLocalInquiry,
} from './storage';

/**
 * Fetch portfolio data from Supabase cloud database with local fallback
 */
export const fetchCloudPortfolioData = async (): Promise<PortfolioData> => {
  // Always start with local data to avoid any blocking/delays
  const localData = getLocalPortfolioData();

  if (!isSupabaseConfigured || !supabase) {
    return localData;
  }

  try {
    const { data: row, error } = await supabase
      .from('portfolio_content')
      .select('data')
      .eq('id', 'main')
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetch error, using local data:', error.message);
      return localData;
    }

    if (row && row.data) {
      const merged: PortfolioData = {
        ...INITIAL_PORTFOLIO_DATA,
        ...row.data,
        hero: { ...INITIAL_PORTFOLIO_DATA.hero, ...(row.data.hero || {}) },
        stats: { ...INITIAL_PORTFOLIO_DATA.stats, ...(row.data.stats || {}) },
        about: { ...INITIAL_PORTFOLIO_DATA.about, ...(row.data.about || {}) },
        contact: { ...INITIAL_PORTFOLIO_DATA.contact, ...(row.data.contact || {}) },
      };
      // Keep local storage synchronized
      saveLocalPortfolioData(merged);
      return merged;
    } else {
      // Row doesn't exist yet in Supabase, seed it with current data
      await supabase
        .from('portfolio_content')
        .upsert({ id: 'main', data: localData, updated_at: new Date().toISOString() });
      return localData;
    }
  } catch (err) {
    console.warn('Network error accessing Supabase:', err);
    return localData;
  }
};

/**
 * Save portfolio data to both Supabase cloud and LocalStorage
 */
export const saveCloudPortfolioData = async (data: PortfolioData): Promise<boolean> => {
  // 1. Always save to local storage immediately
  saveLocalPortfolioData(data);

  if (!isSupabaseConfigured || !supabase) {
    return true;
  }

  try {
    const { error } = await supabase
      .from('portfolio_content')
      .upsert({
        id: 'main',
        data: data,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Failed to sync to Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saving to Supabase:', err);
    return false;
  }
};

/**
 * Fetch inquiries from Supabase with local fallback
 */
export const fetchCloudInquiries = async (): Promise<ContactMessage[]> => {
  const localList = getLocalInquiries();

  if (!isSupabaseConfigured || !supabase) {
    return localList;
  }

  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching inquiries from Supabase:', error.message);
      return localList;
    }

    if (data && data.length > 0) {
      return data.map((item) => ({
        id: item.id?.toString() || 'inq-' + Date.now(),
        name: item.name,
        contact: item.contact,
        message: item.message,
        date: new Date(item.created_at).toLocaleString('uz-UZ'),
        read: Boolean(item.is_read),
      }));
    }
    return localList;
  } catch {
    return localList;
  }
};

/**
 * Send inquiry to Supabase and LocalStorage
 */
export const sendCloudInquiry = async (msg: {
  name: string;
  contact: string;
  message: string;
}): Promise<ContactMessage> => {
  // Save locally
  const savedLocal = saveLocalInquiry(msg);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('inquiries').insert([
        {
          name: msg.name,
          contact: msg.contact,
          message: msg.message,
          is_read: false,
        },
      ]);
    } catch (e) {
      console.error('Failed to push inquiry to Supabase cloud:', e);
    }
  }

  return savedLocal;
};

/**
 * Mark inquiry as read in Supabase
 */
export const markCloudInquiryAsRead = async (id: string): Promise<void> => {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('inquiries')
        .update({ is_read: true })
        .eq('id', id);
    } catch (e) {
      console.error('Failed to update inquiry status in Supabase:', e);
    }
  }
};

/**
 * Delete inquiry in Supabase
 */
export const deleteCloudInquiry = async (id: string): Promise<void> => {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);
    } catch (e) {
      console.error('Failed to delete inquiry in Supabase:', e);
    }
  }
};
