import React from 'react';
import { Star } from 'lucide-react';

export default function Catalog({ perfumes, t, onOpenModal }) {
  // Helper to map brands to translation dictionary keys
  const getTranslationKey = (brand) => {
    const b = brand.toLowerCase();
    if (b.includes('creed')) return 'creed';
    if (b.includes('louis') || b.includes('vuitton')) return 'lv';
    if (b.includes('montabaco')) return 'montabaco';
    if (b.includes('dior')) return 'dior';
    if (b.includes('clive') || b.includes('christian')) return 'clive';
    if (b.includes('boadicea') || b.includes('boadicia')) return 'boadicea';
    if (b.includes('roja')) return 'roja';
    if (b.includes('chanel')) return 'chanel';
    return '';
  };

  const getGenderText = (gender) => {
    if (gender === 'Men') return t.genderMen;
    if (gender === 'Women') return t.genderWomen;
    return t.genderUnisex;
  };

  return (
    <section className="catalog-section" id="catalog">
      <div className="container">
        <h2 className="section-title" style={{ marginBottom: '3.5rem' }}>
          {t.catalogTitle.split(' ')[0]} <span>{t.catalogTitle.split(' ').slice(1).join(' ')}</span>
        </h2>

        <div className="catalog-grid">
          {perfumes.map((perfume) => {
            const key = getTranslationKey(perfume.brand);
            const pTrans = t.perfumes[key] || {};
            
            const badge = pTrans.badge || perfume.badge;
            const description = pTrans.description || perfume.description;
            const notesTop = pTrans.top || perfume.notes.top;
            const notesHeart = pTrans.heart || perfume.notes.heart;
            const notesBase = pTrans.base || perfume.notes.base;

            return (
              <div key={perfume.id} className="product-card">
                {/* Product Visual */}
                <div className="product-card-visual">
                  <span className="product-badge">{badge}</span>
                  <span className="product-gender">
                    {getGenderText(perfume.gender)}
                  </span>
                  <img src={perfume.image} alt={perfume.name} />
                </div>

                {/* Product Info */}
                <div className="product-info">
                  <span className="product-brand">{perfume.brand}</span>
                  <h3 className="product-name">{perfume.name}</h3>

                  {/* Rating */}
                  <div className="product-rating">
                    <Star size={14} />
                    <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{perfume.rating}</span>
                    <span>({perfume.reviewsCount} {t.reviewsCountLabel})</span>
                  </div>

                  {/* Description */}
                  <p className="product-description">{description}</p>

                  {/* Scent Notes */}
                  <div className="product-notes">
                    <div><b>{t.topNotes}</b> {notesTop}</div>
                    <div><b>{t.heartNotes}</b> {notesHeart}</div>
                    <div><b>{t.baseNotes}</b> {notesBase}</div>
                  </div>

                  {/* Footer and CTA */}
                  <div className="product-footer">
                    <div className="product-price-box">
                      <span className="product-size">{perfume.size}</span>
                      <span className="product-price">${perfume.price}</span>
                    </div>
                    
                    <button
                      className="product-order-btn"
                      onClick={() => onOpenModal(perfume.brand + ' ' + perfume.name)}
                    >
                      {t.orderBtn}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
