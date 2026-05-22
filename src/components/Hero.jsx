import React from 'react';
import { ArrowDownRight } from 'lucide-react';

export default function Hero({ t, onOpenModal }) {
  // Safe helper to highlight the "97$" in the translatable heading string
  const renderHeading = (text) => {
    if (!text) return '';
    const parts = text.split(/(97\$)/g);
    return parts.map((part, i) => 
      part === '97$' ? <span key={i}>97$</span> : part
    );
  };

  return (
    <section className="hero">
      {/* Background ambient glows */}
      <div className="ambient-glow-1"></div>
      
      <div className="container hero-grid">
        {/* Left: Content */}
        <div className="hero-content">
          <div className="ramadan-badge">
            {t.ramadanBadge}
          </div>
          <div>
            <span className="bonus-badge">
              {t.bonusBadge}
            </span>
          </div>
          <h1>
            {renderHeading(t.mainHeading)}
          </h1>
          <p className="hero-description">
            {t.heroDesc}
          </p>
          <div className="hero-btn-wrapper">
            <button className="cta-button" onClick={() => onOpenModal()}>
              <span>{t.heroCta}</span>
              <ArrowDownRight size={20} />
            </button>
          </div>
        </div>

        {/* Right: Visual (Composite floating bottles) */}
        <div className="hero-visual">
          <div className="composite-image-container">
            <div className="floating-circle-bg"></div>
            
            {/* Main center bottle */}
            <img 
              src="/roja_elysium.png" 
              alt="Roja Elysium Premium Perfume" 
              className="bottle-img-main" 
            />
            
            {/* Left background bottle */}
            <img 
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600" 
              alt="Dior Sauvage Perfume" 
              className="bottle-img-sub1" 
            />
            
            {/* Right background bottle */}
            <img 
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600" 
              alt="Louis Vuitton Imagination Perfume" 
              className="bottle-img-sub2" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
