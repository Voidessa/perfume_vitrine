import React from 'react';
import { Phone } from 'lucide-react';

export default function Header({ lang, setLang, t, onOpenModal }) {
  return (
    <header className="header">
      <div className="container header-container">
        {/* Logo and Slogan */}
        <div className="logo-group">
          <a href="/" className="logo">
            VITRINE<span>.</span>
          </a>
          <span className="logo-slogan">{t.slogan}</span>
        </div>

        {/* Actions (Language Switcher, Phone, CTA) */}
        <div className="header-actions">
          {/* Language Switcher */}
          <div className="lang-switcher">
            <button 
              className={`lang-btn ${lang === 'uz' ? 'active' : ''}`} 
              onClick={() => setLang('uz')}
            >
              UZ
            </button>
            <button 
              className={`lang-btn ${lang === 'ru' ? 'active' : ''}`} 
              onClick={() => setLang('ru')}
            >
              RU
            </button>
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>

          <a href="tel:+998901234567" className="header-phone">
            <Phone size={16} />
            <span>+998 (90) 123-45-67</span>
          </a>
          
          <button className="header-btn" onClick={() => onOpenModal()}>
            {t.installments}
          </button>
        </div>
      </div>
    </header>
  );
}
