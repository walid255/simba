import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AdBanner } from '../components/AdBanner';
import { ArticleCard } from '../components/ArticleCard';
import { useMetaTags } from '../hooks/useMetaTags';
import { formatDate, formatRelativeTime, generateArticleSchema, buildCanonicalUrl } from '../utils/seo';
import { Share2, Clock, Calendar, RefreshCw, ChevronLeft, Bookmark, Check, Eye } from 'lucide-react';

interface ArticlePageProps {
  slug: string;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ slug }) => {
  const { articles, navigate, addToast } = useApp();

  const article = articles.find(a => a.slug === slug);

  // SEO & Schema.org NewsArticle Structured Data
  useMetaTags({
    title: article ? `${article.title} | Simba Yamoto` : 'Article Not Found | Simba Yamoto',
    description: article ? article.excerpt : 'The requested entertainment news story could not be found.',
    canonicalPath: `/article/${slug}`,
    imageUrl: article?.imageUrl,
    type: 'article',
    schema: article ? generateArticleSchema(article) : null
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!article) {
    return (
      <div className="container" id="main-content" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Article Not Found</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          The news or entertainment report you are looking for may have been moved or updated.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Return to All Headlines
        </button>
      </div>
    );
  }

  const handleCopyLink = () => {
    const url = `${window.location.origin}/article/${article.slug}?utm_source=article_share&utm_medium=copy_button`;
    navigator.clipboard.writeText(url).then(() => {
      addToast('Story URL copied with tracking parameters!', 'success');
    }).catch(() => {
      addToast('Failed to copy link.', 'error');
    });
  };

  const isRecentlyUpdated = article.updatedAt && article.updatedAt !== article.publishedAt;
  const relatedStories = articles.filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t)))).slice(0, 3);

  return (
    <article className="container" id="main-content" style={{ maxWidth: '920px' }}>
      {/* Print-Only Header */}
      <div className="print-header">
        <h2 style={{ color: '#000000', fontSize: '18pt', margin: '0 0 5px 0' }}>SIMBA YAMOTO NEWS &amp; ENTERTAINMENT</h2>
        <p style={{ margin: 0, fontSize: '10pt', color: '#555' }}>
          Original Source: {buildCanonicalUrl(`/article/${article.slug}`)} &bull; Printed on: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Breadcrumb & Navigation */}
      <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        <button 
          onClick={() => navigate('/')} 
          className="btn btn-outline" 
          style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', border: 'none' }}
        >
          <ChevronLeft size={16} /> Home
        </button>
        <span>/</span>
        <button 
          onClick={() => navigate(`/category/${article.category}`)} 
          className="btn btn-outline" 
          style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', border: 'none', textTransform: 'capitalize' }}
        >
          {article.category}
        </button>
      </nav>

      {/* Category Pill */}
      <div style={{ marginBottom: '0.75rem' }}>
        <span className="card-badge" style={{ position: 'static', display: 'inline-block' }}>
          {article.category}
        </span>
      </div>

      {/* Strictly ONE H1 Tag on the Article Page */}
      <h1 style={{ marginBottom: '1.25rem', lineHeight: 1.25 }}>
        {article.title}
      </h1>

      {/* Subhead / Excerpt */}
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem', fontWeight: 500 }}>
        {article.excerpt}
      </p>

      {/* Author & Publication Timestamps Meta Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1rem 0',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '2rem'
      }}>
        {/* Author info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img 
            src={article.author.avatar} 
            alt={article.author.name}
            width="46"
            height="46"
            style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-main)' }}>
              {article.author.name}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {article.author.role} &bull; Simba Yamoto Media
            </div>
          </div>
        </div>

        {/* Timestamps & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={13} />
              Published: <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            </span>
            {isRecentlyUpdated && (
              <span style={{ color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <RefreshCw size={12} />
                Updated: <time dateTime={article.updatedAt}>{formatRelativeTime(article.updatedAt)}</time>
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button 
              className="btn btn-outline" 
              onClick={handleCopyLink}
              title="Copy link with UTM tracking"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
            >
              <Share2 size={16} />
              <span>Copy Link</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image with Alt Text and Caption */}
      <figure style={{ margin: '0 0 2rem 0' }}>
        <img 
          src={article.imageUrl} 
          alt={article.imageAlt}
          loading="eager"
          width="920"
          height="518"
          style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', maxHeight: '520px' }}
        />
        <figcaption style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', marginTop: '0.5rem', textAlign: 'center' }}>
          {article.imageAlt} &bull; Image courtesy of Simba Yamoto Photo Archives
        </figcaption>
      </figure>

      {/* Main Article Body */}
      <div className="article-body" style={{ fontSize: '1.12rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
        {article.content.map((paragraph, idx) => (
          <React.Fragment key={idx}>
            <p style={{ marginBottom: '1.5rem' }}>
              {paragraph}
            </p>
            {/* Insert In-Article Native Ad between 2nd and 3rd paragraph */}
            {idx === 1 && (
              <AdBanner placement="inarticle" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Article Tags */}
      <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
          Related Story Tags:
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {article.tags.map(tag => (
            <span 
              key={tag} 
              className="card-badge" 
              style={{ position: 'static', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-main)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
              onClick={() => navigate('/category/entertainment')}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Related Stories (Internal Links) */}
      {relatedStories.length > 0 && (
        <section style={{ marginTop: '3.5rem', marginBottom: '2rem' }} aria-labelledby="related-heading">
          <h2 id="related-heading" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            More Hot Stories You Might Like
          </h2>
          <div className="article-grid">
            {relatedStories.map(story => (
              <div key={story.id} className="col-4">
                <ArticleCard article={story} />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
