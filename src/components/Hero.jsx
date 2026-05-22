import React from 'react';
import { Sparkles, ShieldCheck, Truck, Percent } from 'lucide-react';

export default function Hero({ scrollToCatalog, scrollToQuiz }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        {/* Left Side: Content */}
        <div className="hero-content fade-in">
          <div className="hero-tagline">
            <Sparkles size={16} /> Умная роскошь
          </div>
          <h1>
            Витрина селективной парфюмерии <span>Mancera</span> и мировых брендов
          </h1>
          <p className="hero-description">
            Оригинальные ароматы в удобных объемах и тестерах от $97 до $120. Никакой переплаты за лишние миллилитры — только чистые эмоции и гарантированная стойкость.
          </p>

          {/* Marketing Benefits */}
          <div className="hero-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">
                <ShieldCheck size={20} />
              </span>
              <span>100% Оригинал (Гарантия)</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">
                <Truck size={20} />
              </span>
              <span>Быстрая отправка</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">
                <Percent size={20} />
              </span>
              <span>Лучшие цены сегмента</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={scrollToCatalog}>
              Открыть витрину
            </button>
            <button className="btn btn-secondary" onClick={scrollToQuiz}>
              Подобрать аромат
            </button>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="hero-visual">
          <div className="hero-image-container">
            <img
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800"
              alt="Mancera Cedrat Boise Premium Perfume"
            />
            {/* Elegant Floating Card */}
            <div className="hero-overlay-card">
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                Главный хит недели
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginTop: '0.25rem' }}>
                Mancera Cedrat Boise
              </h4>
              <p className="price">$97</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
