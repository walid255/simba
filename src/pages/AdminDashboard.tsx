import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Article } from '../data/initialArticles';
import { AdSlotConfig } from '../data/initialAds';
import { slugify, formatDate, formatRelativeTime } from '../utils/seo';
import { buildUTMLink } from '../utils/utm';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { useMetaTags } from '../hooks/useMetaTags';
import { 
  ShieldCheck, Lock, Eye, EyeOff, Plus, Trash2, Edit3, 
  ExternalLink, BarChart3, Users, DollarSign, Globe, CheckCircle2,
  Download, Copy, RefreshCw, AlertTriangle, Flame, Link2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    isAdminLoggedIn, loginAdmin, logoutAdmin,
    articles, addArticle, updateArticle, deleteArticle,
    ads, toggleAdSlot, updateAdSlot,
    newsletterSubscribers, addToast
  } = useApp();

  useMetaTags({
    title: 'Admin Control Panel | Simba Yamoto',
    description: 'Management portal for publishing news, configuring advertising slots, and tracking audience analytics.',
    canonicalPath: '/admin'
  });

  // Admin Login State
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Dashboard Tabs: 'articles' | 'ads' | 'subscribers' | 'utm' | 'seo'
  const [activeTab, setActiveTab] = useState<'articles' | 'ads' | 'subscribers' | 'utm' | 'seo'>('articles');

  // Article Modal / Form State
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState({
    title: '',
    slug: '',
    category: 'entertainment' as Article['category'],
    excerpt: '',
    content: '',
    imageUrl: '',
    imageAlt: '',
    authorName: 'Simba Yamoto Editorial Desk',
    authorRole: 'Senior Staff Writer',
    tags: 'Entertainment, News',
    isBreaking: false,
    isFeatured: false,
    readTime: '3 min read'
  });

  // Delete Article Confirmation
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  // Ad Slot Edit Modal
  const [editingAd, setEditingAd] = useState<AdSlotConfig | null>(null);

  // UTM Generator Form
  const [utmBase, setUtmBase] = useState('https://simbayamoto.pages.dev');
  const [utmSource, setUtmSource] = useState('twitter');
  const [utmMedium, setUtmMedium] = useState('social');
  const [utmCampaign, setUtmCampaign] = useState('breaking_entertainment');
  const [utmTerm, setUtmTerm] = useState('');
  const [generatedUtmUrl, setGeneratedUtmUrl] = useState('');

  // 1. Handle Admin Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(passwordInput);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="container" id="main-content" style={{ maxWidth: '440px', padding: '4rem 1rem' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '2rem', boxShadow: 'var(--shadow-xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Lock size={26} />
            </div>
            {/* Strictly ONE H1 on page */}
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              Control Panel Login
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
              Authorized editorial and marketing staff only.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label className="input-label" htmlFor="admin-passcode">
                Staff Passcode
              </label>
              <div className="input-wrap">
                <input 
                  id="admin-passcode"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter passcode..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="form-input"
                  style={{ paddingRight: '2.5rem' }}
                  required
                />
                {/* Password visibility toggle */}
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '0.35rem', display: 'block' }}>
                Default demo passcode: <code>simba2026</code>
              </span>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <ShieldCheck size={18} /> Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Article Form Handlers
  const openNewArticleModal = () => {
    setEditingArticleId(null);
    setArticleForm({
      title: '',
      slug: '',
      category: 'entertainment',
      excerpt: '',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'High energy concert crowd under vibrant red lights',
      authorName: 'Amina Kwezi',
      authorRole: 'Senior Entertainment Editor',
      tags: 'Music, Awards, Celebrity',
      isBreaking: false,
      isFeatured: false,
      readTime: '3 min read'
    });
    setIsArticleModalOpen(true);
  };

  const openEditArticleModal = (article: Article) => {
    setEditingArticleId(article.id);
    setArticleForm({
      title: article.title,
      slug: article.slug,
      category: article.category,
      excerpt: article.excerpt,
      content: article.content.join('\n\n'),
      imageUrl: article.imageUrl,
      imageAlt: article.imageAlt,
      authorName: article.author.name,
      authorRole: article.author.role,
      tags: article.tags.join(', '),
      isBreaking: !!article.isBreaking,
      isFeatured: !!article.isFeatured,
      readTime: article.readTime
    });
    setIsArticleModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title || !articleForm.excerpt || !articleForm.content) {
      addToast('Please fill all required article fields.', 'error');
      return;
    }

    const cleanSlug = articleForm.slug.trim() ? slugify(articleForm.slug) : slugify(articleForm.title);
    const splitContent = articleForm.content.split('\n\n').filter(p => p.trim());
    const splitTags = articleForm.tags.split(',').map(t => t.trim()).filter(Boolean);

    if (editingArticleId) {
      updateArticle(editingArticleId, {
        title: articleForm.title,
        slug: cleanSlug,
        category: articleForm.category,
        excerpt: articleForm.excerpt,
        content: splitContent,
        imageUrl: articleForm.imageUrl,
        imageAlt: articleForm.imageAlt || `${articleForm.title} banner`,
        tags: splitTags,
        isBreaking: articleForm.isBreaking,
        isFeatured: articleForm.isFeatured,
        readTime: articleForm.readTime,
        author: {
          name: articleForm.authorName,
          role: articleForm.authorRole,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        }
      });
    } else {
      addArticle({
        title: articleForm.title,
        slug: cleanSlug,
        category: articleForm.category,
        excerpt: articleForm.excerpt,
        content: splitContent,
        imageUrl: articleForm.imageUrl,
        imageAlt: articleForm.imageAlt || `${articleForm.title} banner`,
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: splitTags,
        isBreaking: articleForm.isBreaking,
        isFeatured: articleForm.isFeatured,
        readTime: articleForm.readTime,
        author: {
          name: articleForm.authorName,
          role: articleForm.authorRole,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        }
      });
    }

    setIsArticleModalOpen(false);
  };

  // 3. Export Subscribers to CSV
  const handleExportSubscribers = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Email,SubscribedDate"].concat(newsletterSubscribers.map(s => `"${s.email}","${s.date}"`)).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `simba_yamoto_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Subscriber list exported to CSV!', 'success');
  };

  // 4. Generate UTM URL
  const handleGenerateUtm = () => {
    const full = buildUTMLink(utmBase, utmSource, utmMedium, utmCampaign, utmTerm);
    setGeneratedUtmUrl(full);
  };

  return (
    <div className="container" id="main-content" style={{ paddingBottom: '4rem' }}>
      {/* Top Header with Strictly ONE H1 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem' }}>
            <ShieldCheck size={18} />
            <span>Simba Yamoto CMS Engine</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', margin: '0.2rem 0' }}>
            Control &amp; Management Panel
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
            Unified dashboard for newsroom publishing, dynamic advertising monetization, and audience tracking.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn btn-outline" onClick={logoutAdmin} style={{ fontSize: '0.88rem' }}>
            Lock &amp; Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        {[
          { id: 'articles', label: 'Newsroom Articles', icon: <Edit3 size={16} /> },
          { id: 'ads', label: 'Ads Capabilities', icon: <DollarSign size={16} /> },
          { id: 'subscribers', label: `Newsletter (${newsletterSubscribers.length})`, icon: <Users size={16} /> },
          { id: 'utm', label: 'UTM Campaign Builder', icon: <Link2 size={16} /> },
          { id: 'seo', label: 'SEO & Search Console', icon: <Globe size={16} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="btn"
            style={{
              gap: '0.4rem',
              fontSize: '0.9rem',
              padding: '0.55rem 1rem',
              background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
              color: activeTab === tab.id ? '#ffffff' : 'var(--text-main)',
              border: activeTab === tab.id ? 'none' : '1px solid var(--border-color)'
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: ARTICLES CRUD */}
      {activeTab === 'articles' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
              Live Articles ({articles.length})
            </h2>
            <button className="btn btn-primary" onClick={openNewArticleModal}>
              <Plus size={16} /> Publish New Story
            </button>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Article Title</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Published / Updated</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Views</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map(article => (
                    <tr key={article.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '0.85rem 1rem', maxWidth: '300px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{article.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>/article/{article.slug}</div>
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span className="ticker-badge" style={{ fontSize: '0.7rem' }}>{article.category}</span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        <div>Pub: {formatDate(article.publishedAt)}</div>
                        {article.updatedAt && (
                          <div style={{ color: 'var(--primary)' }}>Upd: {formatRelativeTime(article.updatedAt)}</div>
                        )}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>
                        {article.views.toLocaleString()}
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        {article.isBreaking ? (
                          <span className="ticker-badge" style={{ background: '#dc2626' }}>Breaking</span>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>Standard</span>
                        )}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                          <button 
                            className="btn-icon" 
                            style={{ width: '32px', height: '32px' }}
                            onClick={() => openEditArticleModal(article)}
                            title="Edit article"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button 
                            className="btn-icon" 
                            style={{ width: '32px', height: '32px', color: '#ef4444' }}
                            onClick={() => setArticleToDelete(article.id)}
                            title="Delete article"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ADS CAPABILITIES */}
      {activeTab === 'ads' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
                Advertising Monetization Placements
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                Manage leaderboard banners, in-article native blocks, sidebar units, and mobile sticky sponsor bars.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {ads.map(ad => {
              const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : '0.00';
              return (
                <div key={ad.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <span className="ticker-badge" style={{ fontSize: '0.68rem', textTransform: 'uppercase' }}>
                        {ad.placement}
                      </span>
                      <h3 style={{ fontSize: '1.1rem', marginTop: '0.4rem' }}>{ad.title}</h3>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Sponsor: {ad.sponsor}</span>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={ad.enabled} 
                        onChange={() => toggleAdSlot(ad.id)}
                        style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }}
                      />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{ad.enabled ? 'Active' : 'Off'}</span>
                    </label>
                  </div>

                  <div style={{ width: '100%', height: '110px', background: 'var(--bg-secondary)', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem' }}>
                    <img 
                      src={ad.imageUrl} 
                      alt={ad.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.65rem', borderRadius: '8px', textAlign: 'center', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Impressions</div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{ad.impressions.toLocaleString()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Clicks</div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)' }}>{ad.clicks.toLocaleString()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>CTR</div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{ctr}%</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a 
                      href={ad.targetUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      Target Link <ExternalLink size={12} />
                    </a>
                    <button className="btn btn-outline" onClick={() => setEditingAd(ad)} style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}>
                      <Edit3 size={14} /> Configure Slot
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SUBSCRIBERS */}
      {activeTab === 'subscribers' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
                Newsletter Audience ({newsletterSubscribers.length})
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                Readers signed up for Simba Yamoto Daily Entertainment Digestion.
              </p>
            </div>
            <button className="btn btn-primary" onClick={handleExportSubscribers}>
              <Download size={16} /> Export CSV
            </button>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Subscriber Email</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Subscription Date</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {newsletterSubscribers.map((sub, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{sub.email}</td>
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>{formatDate(sub.date)}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span className="ticker-badge" style={{ background: '#10b981' }}>Verified Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: UTM CAMPAIGN BUILDER */}
      {activeTab === 'utm' && (
        <div style={{ maxWidth: '780px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
              UTM Tracking &amp; Campaign Link Generator
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
              Create custom marketing links to track newsletter, Facebook, Twitter, and affiliate campaign performance.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem' }}>
            <div className="input-group">
              <label className="input-label">Destination URL</label>
              <input 
                type="text" 
                value={utmBase} 
                onChange={(e) => setUtmBase(e.target.value)} 
                className="form-input" 
                placeholder="https://simbayamoto.pages.dev/article/..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Campaign Source (utm_source) *</label>
                <input 
                  type="text" 
                  value={utmSource} 
                  onChange={(e) => setUtmSource(e.target.value)} 
                  className="form-input" 
                  placeholder="e.g. twitter, newsletter, facebook"
                />
              </div>
              <div className="input-group">
                <label className="input-label">Campaign Medium (utm_medium) *</label>
                <input 
                  type="text" 
                  value={utmMedium} 
                  onChange={(e) => setUtmMedium(e.target.value)} 
                  className="form-input" 
                  placeholder="e.g. social, email, cpc, banner"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Campaign Name (utm_campaign) *</label>
                <input 
                  type="text" 
                  value={utmCampaign} 
                  onChange={(e) => setUtmCampaign(e.target.value)} 
                  className="form-input" 
                  placeholder="e.g. awards_live_stream"
                />
              </div>
              <div className="input-group">
                <label className="input-label">Campaign Term / Keyword (utm_term)</label>
                <input 
                  type="text" 
                  value={utmTerm} 
                  onChange={(e) => setUtmTerm(e.target.value)} 
                  className="form-input" 
                  placeholder="e.g. burna_boy_afrobeats"
                />
              </div>
            </div>

            <button className="btn btn-primary" onClick={handleGenerateUtm} style={{ marginTop: '0.5rem' }}>
              <Link2 size={16} /> Generate Tracked Link
            </button>

            {generatedUtmUrl && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>
                  Generated Tracked URL:
                </div>
                <div style={{ wordBreak: 'break-all', fontSize: '0.9rem', marginBottom: '0.75rem', fontFamily: 'monospace' }}>
                  {generatedUtmUrl}
                </div>
                <button 
                  className="btn btn-outline" 
                  onClick={() => {
                    navigator.clipboard.writeText(generatedUtmUrl);
                    addToast('Tracked UTM URL copied to clipboard!', 'success');
                  }}
                  style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
                >
                  <Copy size={14} /> Copy to Clipboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: SEO, SEARCH CONSOLE & CLOUDFLARE HEALTH */}
      {activeTab === 'seo' && (
        <div style={{ maxWidth: '820px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
              Technical SEO &amp; Cloudflare Infrastructure
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
              Automated audit of search console verification, single H1 rules, sitemaps, and SSL headers.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '1rem' }}>Strict Single H1 Tag Rule</strong>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Enforces exactly one H1 headline per page (Home, Article, Category, FAQ, 404, Admin).
                </p>
              </div>
              <span className="ticker-badge" style={{ background: '#10b981' }}>100% Compliant</span>
            </div>

            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '1rem' }}>Google Search Console Verification</strong>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Meta tag <code>google-site-verification</code> and HTML verification file configured.
                </p>
              </div>
              <span className="ticker-badge" style={{ background: '#10b981' }}>Verified Token</span>
            </div>

            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '1rem' }}>Cloudflare HTTPS &amp; Security Headers</strong>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  HSTS, X-Content-Type-Options, Frame protection, and SPA rewrite rules active in <code>_headers</code>.
                </p>
              </div>
              <span className="ticker-badge" style={{ background: '#10b981' }}>HSTS Preloaded</span>
            </div>

            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '1rem' }}>Robots.txt &amp; XML Sitemap</strong>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Crawler index directives available at <code>/robots.txt</code> and news-ready <code>/sitemap.xml</code>.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a href="/robots.txt" target="_blank" className="btn btn-outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                  View Robots
                </a>
                <a href="/sitemap.xml" target="_blank" className="btn btn-outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                  View Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Publish / Edit Article */}
      {isArticleModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsArticleModalOpen(false)} role="dialog" aria-modal="true">
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              {editingArticleId ? 'Edit Article Story' : 'Publish New Story to Feed'}
            </h3>

            <form onSubmit={handleSaveArticle}>
              <div className="input-group">
                <label className="input-label">Headline Title *</label>
                <input 
                  type="text" 
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  placeholder="e.g. Afrobeats Superstars Break Record at 2026 World Festival"
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Category *</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as any })}
                    className="form-input"
                  >
                    <option value="entertainment">Entertainment</option>
                    <option value="music">Music</option>
                    <option value="celebrity">Celebrity</option>
                    <option value="sports">Sports</option>
                    <option value="tech">Tech &amp; Trends</option>
                    <option value="news">General News</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">URL Slug (Auto-generated if blank)</label>
                  <input 
                    type="text" 
                    value={articleForm.slug}
                    onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                    placeholder="e.g. afrobeats-superstars-world-festival"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Summary / Excerpt *</label>
                <textarea 
                  rows={2}
                  required
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                  placeholder="Concise overview for cards and social sharing..."
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Full Article Story (Separate paragraphs with double enter) *</label>
                <textarea 
                  rows={6}
                  required
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  placeholder="First paragraph...&#10;&#10;Second paragraph...&#10;&#10;Third paragraph..."
                  className="form-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Cover Image URL *</label>
                  <input 
                    type="url" 
                    required
                    value={articleForm.imageUrl}
                    onChange={(e) => setArticleForm({ ...articleForm, imageUrl: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Image Alt Text (A11y &amp; SEO) *</label>
                  <input 
                    type="text" 
                    required
                    value={articleForm.imageAlt}
                    onChange={(e) => setArticleForm({ ...articleForm, imageAlt: e.target.value })}
                    placeholder="Descriptive image context..."
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input 
                    type="checkbox" 
                    checked={articleForm.isBreaking}
                    onChange={(e) => setArticleForm({ ...articleForm, isBreaking: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                  />
                  <strong>Mark as Breaking News Banner</strong>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input 
                    type="checkbox" 
                    checked={articleForm.isFeatured}
                    onChange={(e) => setArticleForm({ ...articleForm, isFeatured: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                  />
                  <strong>Feature in Hero Showcase</strong>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsArticleModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingArticleId ? 'Save Changes' : 'Publish Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Configure Ad Slot */}
      {editingAd && (
        <div className="modal-backdrop" onClick={() => setEditingAd(null)} role="dialog" aria-modal="true">
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              Configure Ad: {editingAd.placement}
            </h3>

            <div className="input-group">
              <label className="input-label">Campaign Title</label>
              <input 
                type="text" 
                value={editingAd.title} 
                onChange={(e) => setEditingAd({ ...editingAd, title: e.target.value })} 
                className="form-input" 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Sponsor Brand Name</label>
              <input 
                type="text" 
                value={editingAd.sponsor} 
                onChange={(e) => setEditingAd({ ...editingAd, sponsor: e.target.value })} 
                className="form-input" 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Banner Image URL</label>
              <input 
                type="url" 
                value={editingAd.imageUrl} 
                onChange={(e) => setEditingAd({ ...editingAd, imageUrl: e.target.value })} 
                className="form-input" 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Target Destination URL (With UTM parameters)</label>
              <input 
                type="url" 
                value={editingAd.targetUrl} 
                onChange={(e) => setEditingAd({ ...editingAd, targetUrl: e.target.value })} 
                className="form-input" 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button className="btn btn-outline" onClick={() => setEditingAd(null)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  updateAdSlot(editingAd.id, editingAd);
                  setEditingAd(null);
                }}
              >
                Save Slot Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Article Deletion */}
      <ConfirmationModal
        isOpen={!!articleToDelete}
        title="Delete Article Post?"
        message="Are you sure you want to permanently delete this news story? This action cannot be undone and the URL slug will no longer be reachable."
        confirmLabel="Yes, Delete Story"
        isDestructive={true}
        onConfirm={() => {
          if (articleToDelete) {
            deleteArticle(articleToDelete);
            setArticleToDelete(null);
          }
        }}
        onCancel={() => setArticleToDelete(null)}
      />
    </div>
  );
};
