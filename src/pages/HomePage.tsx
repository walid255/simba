import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArticleCard } from '../components/ArticleCard';
import { AdBanner } from '../components/AdBanner';
import { useMetaTags } from '../hooks/useMetaTags';
import { Flame, TrendingUp, Sparkles, ChevronRight, Music, Film, Trophy, Clock } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { articles, navigate } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  // SEO & Schema for Homepage
  useMetaTags({
    title: 'Simba Yamoto | Breaking Entertainment, Music & Global News',
    description: 'Fast, fearless breaking entertainment news, celebrity gossip, African music awards, trending viral culture, and world headlines.',
    canonicalPath: '/',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Simba Yamoto',
      'url': 'https://simbayamoto.pages.dev/',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://simbayamoto.pages.dev/?search={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  });

  useEffect(() => {
    // Subtle initial loading animation to demonstrate shimmer
    const timer = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  const featuredStory = articles.find(a => a.isFeatured) || articles[0];
  const secondaryStories = articles.filter(a => a.id !== featuredStory?.id).slice(0, 5);
  const musicStories = articles.filter(a => a.category === 'music');
  const entertainmentStories = articles.filter(a => a.category === 'entertainment');

  return (
    <div className="container" id="main-content">
      {/* Strict Semantic Hierarchy: Exactly ONE H1 tag per page */}
      <h1 className="sr-only">
        Simba Yamoto Media | Hot Entertainment, Music &amp; Breaking News
      </h1>

      {/* Top Leaderboard Ad Slot */}
      <AdBanner placement="leaderboard" />

      {/* Hero Showcase Grid */}
      <section style={{ marginBottom: '2.5rem' }} aria-labelledby="featured-heading">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Flame size={22} color="var(--primary)" />
            <h2 id="featured-heading" style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
              Top Headliners &amp; Breaking Stories
            </h2>
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Updated every 15 minutes
          </span>
        </div>

        {isLoading ? (
          <div className="article-grid">
            <div className="skeleton skeleton-img col-8" style={{ height: '420px' }} />
            <div className="col-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="skeleton skeleton-img" style={{ height: '190px' }} />
              <div className="skeleton skeleton-img" style={{ height: '190px' }} />
            </div>
          </div>
        ) : (
          <div className="article-grid">
            {/* Primary Big Feature Card */}
            {featuredStory && (
              <div className="hero-feature">
                <div className="hero-card">
                  <img 
                    src={featuredStory.imageUrl} 
                    alt={featuredStory.imageAlt}
                    loading="eager"
                    width="800"
                    height="450"
                  />
                  <div className="hero-overlay">
                    <span className="card-badge" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
                      {featuredStory.category}
                    </span>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: '0.75rem' }}>
                      <a 
                        href={`/article/${featuredStory.slug}`} 
                        onClick={(e) => { e.preventDefault(); navigate(`/article/${featuredStory.slug}`); }}
                      >
                        {featuredStory.title}
                      </a>
                    </h2>
                    <p style={{ color: '#e2e8f0', fontSize: '0.95rem', maxWidth: '700px', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {featuredStory.excerpt}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
                      <span>By {featuredStory.author.name}</span>
                      <span>&bull;</span>
                      <span>{featuredStory.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sidebar Column Cards */}
            <div className="hero-sidebar">
              {secondaryStories.slice(0, 2).map(story => (
                <ArticleCard key={story.id} article={story} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* In-Article / Native Feed Ad Placement */}
      <AdBanner placement="inarticle" />

      {/* Section: Music & Sound Culture */}
      <section style={{ marginBottom: '3rem' }} aria-labelledby="music-heading">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Music size={22} color="var(--primary)" />
            <h2 id="music-heading" style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
              Afrobeats, Hip-Hop &amp; Global Sound
            </h2>
          </div>
          <button 
            className="btn btn-outline" 
            onClick={() => navigate('/category/music')}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}
          >
            View All Music <ChevronRight size={14} />
          </button>
        </div>

        <div className="article-grid">
          {musicStories.map(story => (
            <div key={story.id} className="col-4">
              <ArticleCard article={story} />
            </div>
          ))}
          {/* Fill with other stories if music count is low */}
          {secondaryStories.slice(2, 4).map(story => (
            <div key={story.id} className="col-4">
              <ArticleCard article={story} />
            </div>
          ))}
        </div>
      </section>

      {/* Grid with Sidebar: Entertainment & Trending */}
      <section style={{ marginBottom: '3rem' }} aria-labelledby="all-news-heading">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={22} color="var(--primary)" />
            <h2 id="all-news-heading" style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
              Latest Pop Culture &amp; Viral News
            </h2>
          </div>
        </div>

        <div className="article-grid">
          <div className="col-8">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {articles.map(story => (
                <ArticleCard key={story.id} article={story} />
              ))}
            </div>
          </div>

          {/* Right Column: Sidebar Ad & Quick Links */}
          <div className="col-4">
            <AdBanner placement="sidebar" />
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary)' }}>
                Trending Tags
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {['#Afrobeats', '#GlobalMusicAwards', '#BoxOffice', '#ChampionsLeague', '#Hollywood', '#Tech2026', '#SimbaExclusive'].map(tag => (
                  <span 
                    key={tag} 
                    className="card-badge" 
                    style={{ position: 'static', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-main)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                    onClick={() => navigate('/category/entertainment')}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
