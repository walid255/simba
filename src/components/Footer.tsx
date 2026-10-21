import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, ArrowUp, ShieldCheck, HelpCircle, Heart, Flame } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, subscribeNewsletter, saveCookiePreferences } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Spam bot detected
    if (subscribeNewsletter(newsletterEmail)) {
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <img 
                src="/logo-dark.svg" 
                alt="Simba Yamoto Media" 
                width="200" 
                height="40" 
                style={{ height: '38px', width: 'auto' }}
              />
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Simba Yamoto is the leading digital pulse for African and international entertainment, breaking celebrity scoops, chart-topping sounds, viral culture, and premier sporting spectacles.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fca5a5', fontSize: '0.82rem', fontWeight: 600 }}>
              <Flame size={16} />
              <span>Engineered for Cloudflare Pages Global Edge</span>
            </div>
          </div>

          {/* Column 2: Categories (Internal Links) */}
          <div>
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li>
                <a href="/category/entertainment" onClick={(e) => { e.preventDefault(); navigate('/category/entertainment'); }}>
                  Entertainment News
                </a>
              </li>
              <li>
                <a href="/category/music" onClick={(e) => { e.preventDefault(); navigate('/category/music'); }}>
                  Music &amp; Charts
                </a>
              </li>
              <li>
                <a href="/category/celebrity" onClick={(e) => { e.preventDefault(); navigate('/category/celebrity'); }}>
                  Celebrity Scoop
                </a>
              </li>
              <li>
                <a href="/category/sports" onClick={(e) => { e.preventDefault(); navigate('/category/sports'); }}>
                  Sports Highlights
                </a>
              </li>
              <li>
                <a href="/category/tech" onClick={(e) => { e.preventDefault(); navigate('/category/tech'); }}>
                  Tech &amp; Gaming
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links & Company */}
          <div>
            <h3 className="footer-title">Platform &amp; Legal</h3>
            <ul className="footer-links">
              <li>
                <a href="/faq" onClick={(e) => { e.preventDefault(); navigate('/faq'); }}>
                  Help &amp; FAQs
                </a>
              </li>
              <li>
                <a href="/admin" onClick={(e) => { e.preventDefault(); navigate('/admin'); }}>
                  Admin Control Panel
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
                  XML Sitemap
                </a>
              </li>
              <li>
                <a href="/robots.txt" target="_blank" rel="noopener noreferrer">
                  Robots Directives
                </a>
              </li>
              <li>
                <button 
                  onClick={() => saveCookiePreferences({ decided: false })}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, font: 'inherit', fontSize: '0.92rem' }}
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div>
            <h3 className="footer-title">Stay in the Loop</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1rem' }}>
              Subscribe to the Simba Yamoto Daily Digest for curated entertainment highlights delivered straight to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {/* Anti-spam honeypot */}
              <input 
                type="text" 
                name="website_url_check" 
                value={honeypot} 
                onChange={(e) => setHoneypot(e.target.value)} 
                style={{ display: 'none' }} 
                tabIndex={-1} 
                autoComplete="off" 
              />
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  aria-label="Email for newsletter"
                  className="form-input"
                  style={{ backgroundColor: '#161922', borderColor: '#334155', color: '#ffffff' }}
                />
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  aria-label="Subscribe to newsletter"
                  style={{ padding: '0.6rem 1rem' }}
                >
                  <Send size={16} />
                </button>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                Zero spam. Instant unsubscribe at any time.
              </span>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Simba Yamoto Media Group. All rights reserved. Built with React &amp; Cloudflare Pages.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Designed with <Heart size={14} color="#ef4444" fill="#ef4444" /> for Global Fans
            </span>
            <button 
              onClick={scrollToTop} 
              className="btn btn-outline" 
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem', borderColor: '#334155', color: '#cbd5e1' }}
              aria-label="Scroll back to top"
            >
              <ArrowUp size={14} /> Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
