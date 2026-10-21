import React from 'react';
import { Article } from '../data/initialArticles';
import { useApp } from '../context/AppContext';
import { formatDate, formatRelativeTime } from '../utils/seo';
import { Clock, Eye, Share2, Sparkles, RefreshCw } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false, className = '' }) => {
  const { navigate, addToast } = useApp();

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/article/${article.slug}?utm_source=share_copy_button&utm_medium=user_clipboard`;
    navigator.clipboard.writeText(url).then(() => {
      addToast('Story link copied to clipboard!', 'success');
    }).catch(() => {
      addToast('Failed to copy link.', 'error');
    });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/article/${article.slug}`);
  };

  const isRecentlyUpdated = article.updatedAt && article.updatedAt !== article.publishedAt;

  return (
    <article className={`article-card ${className}`} role="article">
      <div className="card-img-wrap">
        <a href={`/article/${article.slug}`} onClick={handleCardClick} tabIndex={-1} aria-hidden="true">
          <img 
            src={article.imageUrl} 
            alt={article.imageAlt}
            loading="lazy"
            width="600"
            height="338"
          />
        </a>
        <span className="card-badge">
          {article.category}
        </span>
      </div>

      <div className="card-body">
        {/* Meta Bar */}
        <div className="card-meta">
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
          {isRecentlyUpdated && (
            <span style={{ color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
              <RefreshCw size={12} /> Updated {formatRelativeTime(article.updatedAt)}
            </span>
          )}
          <span>&bull;</span>
          <span>
            <Clock size={13} /> {article.readTime}
          </span>
        </div>

        {/* Semantic Card Title (h3 to preserve single h1 hierarchy per page) */}
        <h3 className="card-title">
          <a href={`/article/${article.slug}`} onClick={handleCardClick}>
            {article.title}
          </a>
        </h3>

        <p className="card-excerpt">
          {article.excerpt}
        </p>

        {/* Card Footer with Author and Actions */}
        <div className="card-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img 
              src={article.author.avatar} 
              alt={article.author.name} 
              width="26" 
              height="26" 
              style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{article.author.name}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.78rem' }}>
              <Eye size={13} /> {article.views.toLocaleString()}
            </span>
            <button 
              className="btn-icon" 
              style={{ width: '30px', height: '30px' }}
              onClick={handleCopyLink}
              title="Copy story link to clipboard"
              aria-label="Copy story link to clipboard"
            >
              <Share2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
