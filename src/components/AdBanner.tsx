import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExternalLink, X } from 'lucide-react';

interface AdBannerProps {
  placement: 'leaderboard' | 'sidebar' | 'inarticle' | 'sticky-footer';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement, className = '' }) => {
  const { ads, trackAdImpression, trackAdClick, cookiePrefs } = useApp();
  const [isDismissed, setIsDismissed] = useState(false);

  const ad = ads.find(a => a.placement === placement && a.enabled);

  useEffect(() => {
    if (ad && !isDismissed) {
      trackAdImpression(ad.id);
    }
  }, [ad?.id, isDismissed]);

  if (!ad || isDismissed) {
    return null;
  }

  // If user opted out of marketing cookies, show non-personalized generic creative
  const handleAdClick = () => {
    trackAdClick(ad.id);
  };

  if (placement === 'sticky-footer') {
    return (
      <div className="ad-sticky-footer" role="complementary" aria-label="Sponsored Notification">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img 
              src={ad.imageUrl} 
              alt={ad.sponsor} 
              width="36" 
              height="36" 
              style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }}
            />
            <div>
              <span className="ticker-badge" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', marginRight: '0.4rem' }}>
                {ad.badgeText || 'Sponsored'}
              </span>
              <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>{ad.title}</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem', display: 'inline-block' }}>
                by {ad.sponsor}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <a 
              href={ad.targetUrl} 
              target="_blank" 
              rel="noopener noreferrer sponsored"
              onClick={handleAdClick}
              className="btn btn-primary"
              style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
            >
              Learn More <ExternalLink size={14} />
            </a>
            <button 
              className="btn-icon" 
              onClick={() => setIsDismissed(true)}
              aria-label="Dismiss banner"
              style={{ width: '32px', height: '32px' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const slotClasses = {
    leaderboard: 'ad-slot-leaderboard',
    sidebar: 'ad-slot-sidebar',
    inarticle: 'ad-slot-inarticle'
  }[placement];

  return (
    <div className={`ad-slot ${slotClasses} ${className}`} role="complementary" aria-label="Advertisement">
      <span className="ad-label">ADVERTISEMENT &bull; {ad.badgeText || 'SPONSORED'}</span>
      <a 
        href={ad.targetUrl} 
        target="_blank" 
        rel="noopener noreferrer sponsored"
        onClick={handleAdClick}
        className="ad-content"
      >
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '8px' }}>
          <img 
            src={ad.imageUrl} 
            alt={`${ad.sponsor} - ${ad.title}`}
            loading="lazy"
            style={{ width: '100%', maxHeight: placement === 'leaderboard' ? '120px' : '260px', objectFit: 'cover' }}
          />
          <div style={{
            padding: '0.75rem',
            background: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-color)',
            textAlign: 'left'
          }}>
            <h4 style={{ fontSize: '0.92rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>
              {ad.title}
            </h4>
            {ad.description && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                {ad.description}
              </p>
            )}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.4rem', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
              <span>Sponsored by {ad.sponsor}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                Visit Sponsor <ExternalLink size={12} />
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
