import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Cookie, Shield, Check, X, Settings2 } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const { cookiePrefs, saveCookiePreferences } = useApp();
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [tempAnalytics, setTempAnalytics] = useState(cookiePrefs.analytics);
  const [tempMarketing, setTempMarketing] = useState(cookiePrefs.marketing);

  if (cookiePrefs.decided && !showPreferencesModal) {
    return null;
  }

  const handleAcceptAll = () => {
    saveCookiePreferences({
      essential: true,
      analytics: true,
      marketing: true
    });
  };

  const handleDeclineOptional = () => {
    saveCookiePreferences({
      essential: true,
      analytics: false,
      marketing: false
    });
  };

  const handleSaveCustom = () => {
    saveCookiePreferences({
      essential: true,
      analytics: tempAnalytics,
      marketing: tempMarketing
    });
    setShowPreferencesModal(false);
  };

  return (
    <>
      {!cookiePrefs.decided && (
        <aside className="cookie-banner" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-desc">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <Cookie size={22} color="var(--primary)" />
            <h3 id="cookie-title" style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
              Cookie &amp; Privacy Notice
            </h3>
          </div>
          <p id="cookie-desc" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
            Simba Yamoto uses necessary cookies to operate our Single Page Application and PWA offline services. With your permission, we also use analytical and advertising cookies to measure readership and deliver relevant partner deals.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button 
              className="btn btn-primary" 
              onClick={handleAcceptAll}
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}
            >
              <Check size={14} /> Accept All
            </button>
            <button 
              className="btn btn-outline" 
              onClick={handleDeclineOptional}
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}
            >
              Essential Only
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => setShowPreferencesModal(true)}
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.75rem' }}
              title="Customize cookie preferences"
            >
              <Settings2 size={14} /> Preferences
            </button>
          </div>
        </aside>
      )}

      {/* Preferences Modal */}
      {showPreferencesModal && (
        <div className="modal-backdrop" onClick={() => setShowPreferencesModal(false)} role="dialog" aria-modal="true">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={22} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Privacy &amp; Cookie Preferences</h3>
              </div>
              <button className="btn-icon" onClick={() => setShowPreferencesModal(false)} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {/* Essential */}
              <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>Essential &amp; PWA Offline Storage</strong>
                  <span className="ticker-badge" style={{ background: '#10b981' }}>Always Active</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem', margin: 0 }}>
                  Required for client-side routing, service worker caching, and secure authentication state.
                </p>
              </div>

              {/* Analytics */}
              <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>Analytical &amp; Readership Metrics</strong>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={tempAnalytics} 
                      onChange={(e) => setTempAnalytics(e.target.checked)} 
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                  </label>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem', margin: 0 }}>
                  Helps us understand which entertainment categories and stories readers enjoy most.
                </p>
              </div>

              {/* Marketing / Ads */}
              <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>Commercial &amp; Ad Attribution (UTM)</strong>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={tempMarketing} 
                      onChange={(e) => setTempMarketing(e.target.checked)} 
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                  </label>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem', margin: 0 }}>
                  Allows sponsored partner ads, discount coupons, and campaign link attribution.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn btn-outline" onClick={() => setShowPreferencesModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveCustom}>
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
