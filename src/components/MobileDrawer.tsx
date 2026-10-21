import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Search, Sun, Moon, ShieldCheck, Newspaper, Music, Film, Trophy, Cpu, HelpCircle, Mail, ExternalLink } from 'lucide-react';

export const MobileDrawer: React.FC = () => {
  const { isMobileNavOpen, setIsMobileNavOpen, theme, toggleTheme, currentPath, navigate, setIsSearchOpen, setIsContactOpen } = useApp();

  if (!isMobileNavOpen) return null;

  const handleNav = (path: string) => {
    navigate(path);
    setIsMobileNavOpen(false);
  };

  const navLinks = [
    { label: 'All Headlines', path: '/', icon: <Newspaper size={18} /> },
    { label: 'Entertainment', path: '/category/entertainment', icon: <Film size={18} /> },
    { label: 'Music & Charts', path: '/category/music', icon: <Music size={18} /> },
    { label: 'Celebrity Scoop', path: '/category/celebrity', icon: <Film size={18} /> },
    { label: 'Sports Spotlight', path: '/category/sports', icon: <Trophy size={18} /> },
    { label: 'Tech & Gaming', path: '/category/tech', icon: <Cpu size={18} /> },
    { label: 'Help & FAQs', path: '/faq', icon: <HelpCircle size={18} /> },
  ];

  return (
    <>
      <div 
        className="mobile-drawer-backdrop" 
        onClick={() => setIsMobileNavOpen(false)}
        aria-hidden="true" 
      />
      <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation Drawer">
        {/* Drawer Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>
          <img 
            src={theme === 'dark' ? '/logo-dark.svg' : '/logo.svg'} 
            alt="Simba Yamoto" 
            style={{ height: '36px', width: 'auto' }}
          />
          <button 
            className="btn-icon" 
            onClick={() => setIsMobileNavOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Search inside Drawer */}
        <div style={{ padding: '1rem 1.25rem 0.5rem 1.25rem' }}>
          <button 
            className="btn btn-outline" 
            style={{ width: '100%', justifyContent: 'flex-start' }}
            onClick={() => {
              setIsMobileNavOpen(false);
              setIsSearchOpen(true);
            }}
          >
            <Search size={18} />
            <span>Search articles &amp; topics...</span>
          </button>
        </div>

        {/* Nav list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0.75rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-subtle)', padding: '0 0.75rem 0.5rem 0.75rem', letterSpacing: '1px' }}>
            Sections &amp; Categories
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navLinks.map(link => {
              const active = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`btn ${active ? 'btn-primary' : 'btn-outline'}`}
                  style={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    border: active ? 'none' : '1px solid transparent',
                    background: active ? 'var(--primary)' : 'transparent',
                    color: active ? '#ffffff' : 'var(--text-main)',
                    padding: '0.75rem 1rem'
                  }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div style={{ margin: '1.5rem 0.75rem 0.5rem 0.75rem', height: '1px', background: 'var(--border-color)' }} />

          <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-subtle)', padding: '0.5rem 0.75rem', letterSpacing: '1px' }}>
            Quick Actions
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <button
              onClick={() => {
                setIsMobileNavOpen(false);
                setIsContactOpen(true);
              }}
              className="btn btn-outline"
              style={{ width: '100%', justifyContent: 'flex-start', border: '1px solid transparent' }}
            >
              <Mail size={18} />
              <span>Contact Editorial Desk</span>
            </button>
            <button
              onClick={() => handleNav('/admin')}
              className="btn btn-outline"
              style={{ width: '100%', justifyContent: 'flex-start', border: '1px solid transparent' }}
            >
              <ShieldCheck size={18} />
              <span>Admin Control Panel</span>
            </button>
          </div>
        </div>

        {/* Drawer Footer with Theme Toggle */}
        <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Theme Mode</span>
            <button 
              className="btn btn-outline" 
              onClick={toggleTheme}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.82rem' }}
            >
              {theme === 'dark' ? <><Sun size={15} color="#f59e0b" /> Light Theme</> : <><Moon size={15} color="#dc2626" /> Dark Theme</>}
            </button>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', textAlign: 'center', margin: 0 }}>
            Simba Yamoto Media &copy; 2026. Fast, fearless &amp; verified.
          </p>
        </div>
      </div>
    </>
  );
};
