import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, X, ChevronRight, BookOpen, Mail, ShieldAlert, Sparkles } from 'lucide-react';

export const StickyHelp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { navigate, setIsContactOpen } = useApp();

  return (
    <>
      {/* Help Drawer Popover */}
      {isOpen && (
        <div className="help-drawer" role="dialog" aria-label="Help & Quick Guide">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <HelpCircle size={18} color="var(--primary)" />
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>Help &amp; Quick Guide</strong>
            </div>
            <button 
              className="btn-icon" 
              onClick={() => setIsOpen(false)}
              aria-label="Close help"
              style={{ width: '28px', height: '28px' }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <button 
              onClick={() => {
                navigate('/faq');
                setIsOpen(false);
              }}
              className="btn btn-outline" 
              style={{ justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.5rem 0.75rem', width: '100%' }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <BookOpen size={15} color="var(--primary)" />
                Browse 7 FAQs &amp; Policies
              </span>
              <ChevronRight size={14} />
            </button>

            <button 
              onClick={() => {
                setIsContactOpen(true);
                setIsOpen(false);
              }}
              className="btn btn-outline" 
              style={{ justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.5rem 0.75rem', width: '100%' }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={15} color="var(--primary)" />
                Submit News Tip or Story
              </span>
              <ChevronRight size={14} />
            </button>

            <div style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'var(--bg-secondary)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '0.2rem' }}>PWA Offline Mode:</strong>
              This app works even when you are disconnected. Visited articles are stored automatically in device cache.
            </div>
          </div>
        </div>
      )}

      {/* Floating Buttons: Help & Contact & Scroll Top */}
      <div className="floating-actions" role="region" aria-label="Quick Actions">
        <button 
          className="fab-btn" 
          onClick={() => setIsOpen(prev => !prev)}
          title="Need Help? Open Quick Guide"
          aria-label="Need Help? Open Quick Guide"
          style={{ backgroundColor: isOpen ? 'var(--text-main)' : 'var(--primary)' }}
        >
          {isOpen ? <X size={20} /> : <HelpCircle size={22} />}
        </button>
      </div>
    </>
  );
};
