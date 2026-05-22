import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';

export default function Footer({ t, scrollToCatalog }) {
  return (
    <footer className="footer" id="contacts">
      <div className="container">
        <div className="footer-logo">
          Mancerra Parfume<span>.</span>
        </div>
        
        {/* Navigation */}
        <div className="footer-nav">
          <button onClick={() => scrollToCatalog()}>{t.footerNavCatalog}</button>
          <a href="tel:+998901234567">{t.footerNavContact}</a>
        </div>

        {/* Contacts details */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', margin: '1.5rem 0', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Phone size={14} style={{ color: 'var(--accent-blue)' }} />
            <span>+998 (90) 123-45-67</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={14} style={{ color: 'var(--accent-blue)' }} />
            <span>{t.footerAddress}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={14} style={{ color: 'var(--accent-blue)' }} />
            <span>{t.footerHours} 10:00 - 22:00</span>
          </div>
        </div>

        <div className="footer-copy">
          <p>&copy; {new Date().getFullYear()} Mancerra Parfume. {t.footerRights}</p>
          <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {t.footerPayment}
          </div>
        </div>
      </div>
    </footer>
  );
}
