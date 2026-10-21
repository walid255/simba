import React from 'react';
import { useApp } from '../context/AppContext';
import { ArticleCard } from '../components/ArticleCard';
import { AdBanner } from '../components/AdBanner';
import { useMetaTags } from '../hooks/useMetaTags';
import { generateBreadcrumbSchema } from '../utils/seo';
import { ChevronRight, Filter } from 'lucide-react';

interface CategoryPageProps {
  category: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const { articles, navigate } = useApp();

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const matchingArticles = articles.filter(a => a.category.toLowerCase() === category.toLowerCase());

  useMetaTags({
    title: `${categoryName} News, Buzz & Headlines | Simba Yamoto`,
    description: `Explore top breaking ${categoryName} stories, latest scoops, and exclusive updates on Simba Yamoto.`,
    canonicalPath: `/category/${category.toLowerCase()}`,
    schema: generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: categoryName, url: `/category/${category.toLowerCase()}` }
    ])
  });

  const allCategories = ['entertainment', 'music', 'celebrity', 'sports', 'tech'];

  return (
    <div className="container" id="main-content">
      {/* Category Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{categoryName}</span>
        </div>

        {/* Strictly ONE H1 per page */}
        <h1 style={{ marginBottom: '0.5rem', textTransform: 'capitalize' }}>
          {categoryName} News &amp; Features
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: 0 }}>
          The latest verified stories, backstage scoops, and viral conversations in {categoryName}.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        {allCategories.map(cat => {
          const isActive = cat.toLowerCase() === category.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => navigate(`/category/${cat}`)}
              className="btn"
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.88rem',
                textTransform: 'capitalize',
                background: isActive ? 'var(--primary)' : 'var(--bg-secondary)',
                color: isActive ? '#ffffff' : 'var(--text-main)',
                border: 'none',
                borderRadius: '24px'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Leaderboard Ad */}
      <AdBanner placement="leaderboard" />

      {/* Articles Feed */}
      {matchingArticles.length === 0 ? (
        <div style={{ padding: '4rem 1rem', textAlign: 'center', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No stories in this category yet</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Check back shortly or explore other trending entertainment categories!
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Explore All News
          </button>
        </div>
      ) : (
        <div className="article-grid">
          {matchingArticles.map(article => (
            <div key={article.id} className="col-4">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      )}

      {/* In-Article Ad Slot */}
      <div style={{ marginTop: '3rem' }}>
        <AdBanner placement="inarticle" />
      </div>
    </div>
  );
};
