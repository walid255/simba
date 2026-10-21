import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Flame, ChevronRight } from 'lucide-react';

export const BreakingNewsTicker: React.FC = () => {
  const { articles, navigate } = useApp();
  const breakingArticles = articles.filter(a => a.isBreaking);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (breakingArticles.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % breakingArticles.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [breakingArticles.length]);

  if (breakingArticles.length === 0) return null;
  const current = breakingArticles[currentIndex] || breakingArticles[0];

  return (
    <div className="breaking-ticker" role="region" aria-label="Breaking News Alerts">
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span className="ticker-badge">
          <Flame size={14} />
          BREAKING
        </span>
        <div className="ticker-content">
          <a 
            href={`/article/${current.slug}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/article/${current.slug}`);
            }}
          >
            {current.title}
          </a>
        </div>
        <button 
          className="btn-icon" 
          style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', color: '#9ca3af' }}
          onClick={() => setCurrentIndex(prev => (prev + 1) % breakingArticles.length)}
          title="Next breaking update"
          aria-label="Next breaking update"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
