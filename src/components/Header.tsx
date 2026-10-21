import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Sun, Moon, Menu, Download, ShieldCheck, Newspaper, Music, Film, Trophy, Cpu, HelpCircle } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const Header: React.FC = () => {
  const { theme, toggleTheme, currentPath, navigate, setIsSearchOpen, setIsMobileNavOpen, addToast } = useApp();
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      addToast('To install Simba Yamoto, select "Add to Home Screen" or install from browser menu.', 'info');
      return;
    }
    installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      addToast('Simba Yamoto App installed successfully!', 'success');
    }
    setInstallPrompt(null);
  };

  const navItems = [
    { label: 'All Stories', path: '/', icon: <Newspaper size={16} /> },
    { label: 'Entertainment', path: '/category/entertainment', icon: <Film size={16} /> },
    { label: 'Music', path: '/category/music', icon: <Music size={16} /> },
    { label: 'Celebrity', path: '/category/celebrity', icon: <Film size={16} /> },
    { label: 'Sports', path: '/category/sports', icon: <Trophy size={16} /> },
    { label: 'Tech & Trends', path: '/category/tech', icon: <Cpu size={16} /> },
    { label: 'FAQs', path: '/faq', icon: <HelpCircle size={16} /> },
  ];

  return (
    <header className="site-header" role="banner">
      <div className="container">
        <div className="header-top">
          {/* Brand Logo (Image-based with alt text) */}
          <div className="header-brand">
            <button 
              className="btn-icon mobile-only" 
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open mobile navigation menu"
              style={{ display: 'none' }}
              id="mobile-menu-trigger"
            >
              <Menu size={22} />
            </button>
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
              title="Simba Yamoto Home"
            >
              <img 
                src={theme === 'dark' ? '/logo-dark.svg' : '/logo.svg'} 
                alt="Simba Yamoto - Hot Entertainment &amp; News Logo" 
                className="header-logo-img"
                width="220"
                height="44"
              />
            </a>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Search Trigger */}
            <button 
              className="btn btn-outline" 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search stories"
              title="Search stories across site (Ctrl+K)"
              style={{ padding: '0.5rem 0.9rem', fontSize: '0.88rem' }}
            >
              <Search size={17} />
              <span className="search-text-hide">Search</span>
            </button>

            {/* Install PWA Prompt */}
            <button 
              className="btn btn-primary" 
              onClick={handleInstallClick}
              title="Install Simba Yamoto Progressive Web App"
              style={{ padding: '0.5rem 0.9rem', fontSize: '0.88rem' }}
            >
              <Download size={17} />
              <span className="pwa-text-hide">Install App</span>
            </button>

            {/* Dark Mode Toggle */}
            <button 
              className="btn-icon" 
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to White/Red Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? <Sun size={19} color="#f59e0b" /> : <Moon size={19} color="#dc2626" />}
            </button>

            {/* Admin Panel Quick Access */}
            <button 
              className="btn-icon" 
              onClick={() => navigate('/admin')}
              aria-label="Open Admin Control Panel"
              title="Admin Control Panel"
              style={currentPath.startsWith('/admin') ? { borderColor: 'var(--primary)', color: 'var(--primary)' } : {}}
            >
              <ShieldCheck size={19} />
            </button>
          </div>
        </div>

        {/* Primary Desktop Navigation Bar */}
        <nav className="header-nav" aria-label="Main Navigation">
          {navItems.map(item => {
            const isActive = currentPath === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #mobile-menu-trigger {
            display: inline-flex !important;
          }
          .search-text-hide,
          .pwa-text-hide {
            display: none;
          }
          .header-nav {
            padding: 0.35rem 0;
          }
          .header-logo-img {
            height: 36px;
          }
        }
      `}</style>
    </header>
  );
};
