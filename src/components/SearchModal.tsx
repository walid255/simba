import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, ArrowRight, Tag, Calendar } from 'lucide-react';
import { formatDate } from '../utils/seo';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, articles, navigate } = useApp();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedCategory('all');
    }
  }, [isSearchOpen]);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredArticles = articles.filter(article => {
    const matchesCat = selectedCategory === 'all' || article.category === selectedCategory;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCat;

    const inTitle = article.title.toLowerCase().includes(q);
    const inExcerpt = article.excerpt.toLowerCase().includes(q);
    const inTags = article.tags.some(t => t.toLowerCase().includes(q));
    const inContent = article.content.some(c => c.toLowerCase().includes(q));

    return matchesCat && (inTitle || inExcerpt || inTags || inContent);
  });

  const categories = ['all', 'entertainment', 'music', 'celebrity', 'sports', 'tech'];

  return (
    <div className="modal-backdrop" onClick={() => setIsSearchOpen(false)} role="dialog" aria-modal="true" aria-label="Search Simba Yamoto">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        {/* Search Input Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
          <Search size={22} color="var(--primary)" />
          <input 
            ref={inputRef}
            type="search" 
            placeholder="Search breaking stories, music, celebrities, sports..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-input"
            style={{ border: 'none', fontSize: '1.1rem', padding: '0.4rem 0', boxShadow: 'none' }}
            aria-label="Search input"
          />
          <button 
            className="btn-icon" 
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn"
              style={{
                padding: '0.3rem 0.75rem',
                fontSize: '0.8rem',
                textTransform: 'capitalize',
                background: selectedCategory === cat ? 'var(--primary)' : 'var(--bg-secondary)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-main)',
                border: 'none',
                borderRadius: '20px'
              }}
            >
              {cat === 'all' ? 'All Topics' : cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <span>Found {filteredArticles.length} stories</span>
            <span>Tip: Press ESC to close</span>
          </div>

          {filteredArticles.length === 0 ? (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.5rem' }}>No stories match "{query}"</p>
              <p style={{ fontSize: '0.88rem' }}>Try searching for keywords like "Awards", "Music", "Burna Boy", "Hollywood", or "Sports".</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredArticles.map(article => (
                <div 
                  key={article.id}
                  onClick={() => {
                    navigate(`/article/${article.slug}`);
                    setIsSearchOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-light)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
                >
                  <img 
                    src={article.imageUrl} 
                    alt={article.imageAlt} 
                    width="70" 
                    height="50" 
                    style={{ width: '70px', height: '50px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span className="ticker-badge" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                        {article.category}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.3 }}>
                      {article.title}
                    </h4>
                  </div>
                  <ArrowRight size={18} color="var(--primary)" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
