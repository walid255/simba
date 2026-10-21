import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Article, INITIAL_ARTICLES } from '../data/initialArticles';
import { AdSlotConfig, INITIAL_ADS } from '../data/initialAds';
import { captureUTMParameters, UTMData } from '../utils/utm';

export interface ToastItem {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'error';
}

export interface CookiePreferences {
  decided: boolean;
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentPath: string;
  navigate: (path: string) => void;
  articles: Article[];
  addArticle: (article: Omit<Article, 'id' | 'views'>) => void;
  updateArticle: (id: string, updated: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  ads: AdSlotConfig[];
  toggleAdSlot: (id: string) => void;
  updateAdSlot: (id: string, updated: Partial<AdSlotConfig>) => void;
  trackAdImpression: (id: string) => void;
  trackAdClick: (id: string) => void;
  newsletterSubscribers: { email: string; date: string }[];
  subscribeNewsletter: (email: string) => boolean;
  cookiePrefs: CookiePreferences;
  saveCookiePreferences: (prefs: Partial<CookiePreferences>) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isContactOpen: boolean;
  setIsContactOpen: (open: boolean) => void;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  toasts: ToastItem[];
  addToast: (message: string, type?: 'info' | 'success' | 'error') => void;
  removeToast: (id: string) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  recentUTM: UTMData | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Theme State (Default White & Red, supports Dark)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('simba_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('simba_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 2. Client-side SPA Router
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 3. Articles State
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const stored = localStorage.getItem('simba_articles');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_ARTICLES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('simba_articles', JSON.stringify(articles));
    } catch {
      // ignore
    }
  }, [articles]);

  const addArticle = (newArt: Omit<Article, 'id' | 'views'>) => {
    const article: Article = {
      ...newArt,
      id: `art-${Date.now()}`,
      views: 1
    };
    setArticles(prev => [article, ...prev]);
    addToast('Article published successfully!', 'success');
  };

  const updateArticle = (id: string, updated: Partial<Article>) => {
    setArticles(prev => prev.map(a => (a.id === id ? { ...a, ...updated, updatedAt: new Date().toISOString() } : a)));
    addToast('Article updated successfully!', 'success');
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    addToast('Article removed from database.', 'info');
  };

  // 4. Ads Capabilities State
  const [ads, setAds] = useState<AdSlotConfig[]>(() => {
    try {
      const stored = localStorage.getItem('simba_ads');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_ADS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('simba_ads', JSON.stringify(ads));
    } catch {
      // ignore
    }
  }, [ads]);

  const toggleAdSlot = (id: string) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, enabled: !ad.enabled } : ad));
  };

  const updateAdSlot = (id: string, updated: Partial<AdSlotConfig>) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, ...updated } : ad));
    addToast('Ad slot updated!', 'success');
  };

  const trackAdImpression = (id: string) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, impressions: ad.impressions + 1 } : ad));
  };

  const trackAdClick = (id: string) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, clicks: ad.clicks + 1 } : ad));
  };

  // 5. Newsletter Subscribers
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<{ email: string; date: string }[]>(() => {
    try {
      const stored = localStorage.getItem('simba_subscribers');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [
      { email: "reader.vip@pulse.com", date: "2026-10-18T14:20:00Z" },
      { email: "entertainment.insider@media.net", date: "2026-10-19T09:12:00Z" }
    ];
  });

  const subscribeNewsletter = (email: string): boolean => {
    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      addToast('Please enter a valid email address.', 'error');
      return false;
    }
    if (newsletterSubscribers.some(sub => sub.email === trimmed)) {
      addToast('You are already subscribed to Simba Yamoto alerts!', 'info');
      return true;
    }
    const updated = [{ email: trimmed, date: new Date().toISOString() }, ...newsletterSubscribers];
    setNewsletterSubscribers(updated);
    try {
      localStorage.setItem('simba_subscribers', JSON.stringify(updated));
    } catch {
      // ignore
    }
    addToast('Welcome to Simba Yamoto! Check your inbox for breaking news.', 'success');
    return true;
  };

  // 6. Cookie Preferences
  const [cookiePrefs, setCookiePrefs] = useState<CookiePreferences>(() => {
    try {
      const stored = localStorage.getItem('simba_cookie_prefs');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return {
      decided: false,
      essential: true,
      analytics: true,
      marketing: true
    };
  });

  const saveCookiePreferences = (prefs: Partial<CookiePreferences>) => {
    const updated = { ...cookiePrefs, ...prefs, decided: true };
    setCookiePrefs(updated);
    try {
      localStorage.setItem('simba_cookie_prefs', JSON.stringify(updated));
    } catch {
      // ignore
    }
    addToast('Privacy preferences saved.', 'info');
  };

  // 7. Modals & Drawer State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // 8. Toast Notifications
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const addToast = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // 9. Admin Authentication
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('simba_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const loginAdmin = (password: string): boolean => {
    // Default admin passcode: 'simba2026' or 'admin'
    if (password === 'simba2026' || password === 'admin') {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem('simba_admin_auth', 'true');
      } catch {
        // ignore
      }
      addToast('Welcome back, Admin! Control Panel unlocked.', 'success');
      return true;
    }
    addToast('Incorrect password. Default is "simba2026"', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem('simba_admin_auth');
    } catch {
      // ignore
    }
    addToast('Logged out of Admin Control Panel.', 'info');
  };

  // 10. UTM Parameter Tracking
  const [recentUTM, setRecentUTM] = useState<UTMData | null>(null);
  useEffect(() => {
    const captured = captureUTMParameters();
    if (captured) {
      setRecentUTM(captured);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currentPath,
        navigate,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        ads,
        toggleAdSlot,
        updateAdSlot,
        trackAdImpression,
        trackAdClick,
        newsletterSubscribers,
        subscribeNewsletter,
        cookiePrefs,
        saveCookiePreferences,
        isSearchOpen,
        setIsSearchOpen,
        isContactOpen,
        setIsContactOpen,
        isMobileNavOpen,
        setIsMobileNavOpen,
        toasts,
        addToast,
        removeToast,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        recentUTM
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
