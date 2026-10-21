import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArticleCard } from '../components/ArticleCard';
import { useMetaTags } from '../hooks/useMetaTags';
import { AlertCircle, Search, Home, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate, articles, setIsSearchOpen } = useApp();
  const [localSearch, setLocalSearch] = useState('');

  useMetaTags({
    title: '404 - Page Not Found | Simba Yamoto',
    description: 'The requested entertainment news page does not exist or may have been archived.',
    canonicalPath: '/404'
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setIsSearchOpen(true);
    }
  };

  const trendingStories = articles.slice(0, 3);

  return (
    <div className="container" id="main-content" style={{ maxWidth: '900px', padding: '3rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)',
          marginBottom: '1.25rem'
        }}>
          <AlertCircle size={36} />
        </div>

        {/* Strictly ONE H1 on the 404 page */}
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.75rem' }}>
          404 - Page Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '540px', margin: '0 auto 1.75rem auto' }}>
          We could not locate the headline or file you requested. The article slug may have changed, or the content has moved.
        </p>

        {/* Search & Home Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            <Home size={16} /> Return to Home
          </button>
          <button className="btn btn-outline" onClick={() => setIsSearchOpen(true)}>
            <Search size={16} /> Search Simba Yamoto
          </button>
        </div>
      </div>

      {/* Recommended Headlines */}
      <div style={{ marginTop: '3.5rem', borderTop: '2px solid var(--border-color)', paddingTop: '2rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem' }}>
          Explore Popular Trending Stories Instead:
        </h2>
        <div className="article-grid">
          {trendingStories.map(story => (
            <div key={story.id} className="col-4">
              <ArticleCard article={story} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
