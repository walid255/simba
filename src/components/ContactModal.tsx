import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, Mail, MessageSquare, Phone, MapPin, Sparkles } from 'lucide-react';

export const ContactModal: React.FC = () => {
  const { isContactOpen, setIsContactOpen, addToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Breaking Story Scoop',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isContactOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please complete all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast('Thank you! Your message has been routed to the Simba Yamoto editorial desk.', 'success');
      setIsContactOpen(false);
      setFormData({ name: '', email: '', subject: 'Breaking Story Scoop', message: '' });
    }, 600);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsContactOpen(false)} role="dialog" aria-modal="true" aria-labelledby="contact-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Mail size={22} color="var(--primary)" />
            <h3 id="contact-title" style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>
              Contact Simba Yamoto
            </h3>
          </div>
          <button className="btn-icon" onClick={() => setIsContactOpen(false)} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Got a verified celebrity tip, press release, advertising proposal, or feedback? Send us a direct dispatch.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="contact-name">Your Full Name *</label>
            <input 
              id="contact-name"
              type="text" 
              required
              placeholder="e.g. Maya Lin"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="contact-email">Email Address *</label>
            <input 
              id="contact-email"
              type="email" 
              required
              placeholder="e.g. maya@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="contact-subject">Topic / Purpose</label>
            <select
              id="contact-subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="form-input"
              style={{ cursor: 'pointer' }}
            >
              <option value="Breaking Story Scoop">Breaking Story Scoop</option>
              <option value="Press Release Submission">Press Release Submission</option>
              <option value="Advertising & Sponsorship">Advertising &amp; Sponsorship</option>
              <option value="Editorial Correction">Editorial Correction</option>
              <option value="Technical Support">Technical Support (PWA / App)</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="contact-message">Message *</label>
            <textarea 
              id="contact-message"
              rows={4}
              required
              placeholder="Provide complete details, links, or verified proof..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="form-input"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button 
              type="button" 
              className="btn btn-outline" 
              onClick={() => setIsContactOpen(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? 'Sending...' : <><Send size={16} /> Send Dispatch</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
