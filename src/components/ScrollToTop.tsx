import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUp, MessageCircle } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { setIsContactOpen } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 280);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', left: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', zIndex: 940 }}>
      {/* Floating to contact button */}
      <button 
        className="fab-btn" 
        onClick={() => setIsContactOpen(true)}
        title="Send a Scoop or Contact Editorial Desk"
        aria-label="Floating Contact Button"
        style={{ width: '44px', height: '44px' }}
      >
        <MessageCircle size={20} />
      </button>

      {/* Scroll back to top */}
      {visible && (
        <button 
          className="fab-btn btn-top" 
          onClick={scrollToTop}
          title="Scroll back to top"
          aria-label="Scroll back to top"
          style={{ width: '44px', height: '44px' }}
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};
