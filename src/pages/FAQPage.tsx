import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQ_DATA, FAQItem } from '../data/faqData';
import { useMetaTags } from '../hooks/useMetaTags';
import { ChevronDown, HelpCircle, Search, Mail, Sparkles, BookOpen } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { navigate, setIsContactOpen } = useApp();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ 'faq-1': true, 'faq-2': true });
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useMetaTags({
    title: 'Help Center & Frequently Asked Questions | Simba Yamoto',
    description: 'Find answers about Simba Yamoto PWA app installation, offline capabilities, advertising specs, editorial guidelines, and privacy policies.',
    canonicalPath: '/faq',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQ_DATA.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    }
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = FAQ_DATA.filter(faq => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCat;
    return matchesCat && (faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q));
  });

  return (
    <div className="container" id="main-content" style={{ maxWidth: '840px' }}>
      {/* Header with Strictly ONE H1 */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
          <HelpCircle size={18} />
          <span>Simba Yamoto Knowledge Base</span>
        </div>
        <h1 style={{ marginBottom: '0.75rem' }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: 0 }}>
          Everything you need to know about our PWA capabilities, advertising options, and editorial operations.
        </p>
      </div>

      {/* Search Input for FAQs */}
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="search"
          placeholder="Filter FAQs (e.g. offline, install, sponsor, ads, cookies)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '2.75rem', fontSize: '1rem' }}
          aria-label="Filter FAQs"
        />
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
        {['all', 'general', 'pwa', 'advertising', 'editorial'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="btn"
            style={{
              padding: '0.4rem 0.9rem',
              fontSize: '0.85rem',
              textTransform: 'capitalize',
              background: activeCategory === cat ? 'var(--primary)' : 'var(--bg-secondary)',
              color: activeCategory === cat ? '#ffffff' : 'var(--text-main)',
              border: 'none',
              borderRadius: '20px'
            }}
          >
            {cat === 'all' ? 'All Topics' : cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div role="region" aria-label="FAQ Accordion">
        {filteredFaqs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <p style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              No questions found matching your search.
            </p>
            <button className="btn btn-primary" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFaqs.map(faq => {
            const isOpen = !!openItems[faq.id];
            return (
              <div key={faq.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span>{faq.question}</span>
                  <ChevronDown 
                    size={20} 
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                      color: isOpen ? 'var(--primary)' : 'var(--text-muted)'
                    }} 
                  />
                </button>
                {isOpen && (
                  <div id={`faq-answer-${faq.id}`} className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Need more help banner */}
      <div style={{ marginTop: '3.5rem', background: 'var(--bg-surface)', border: '2px dashed var(--primary-border)', borderRadius: '12px', padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Still Have Questions or Inquiries?</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 1.25rem auto' }}>
          Our editorial and commercial teams are available 24/7 for partnerships, press requests, and reader tips.
        </p>
        <button className="btn btn-primary" onClick={() => setIsContactOpen(true)}>
          <Mail size={16} /> Contact Us Directly
        </button>
      </div>
    </div>
  );
};
