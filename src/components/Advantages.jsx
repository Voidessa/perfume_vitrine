import React from 'react';
import { ArrowDownRight } from 'lucide-react';

export default function Advantages({ t, onOpenModal }) {
  const advantagesList = [
    {
      id: `01 ${t.advPill}`,
      text: t.advantages[0],
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: `02 ${t.advPill}`,
      text: t.advantages[1],
      image: "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: `03 ${t.advPill}`,
      text: t.advantages[2],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: `04 ${t.advPill}`,
      text: t.advantages[3],
      image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <section className="advantages-section">
      <div className="container">
        <h2 className="section-title">
          {t.advTitle.split(' ')[0]} <span>{t.advTitle.split(' ').slice(1).join(' ')}</span>
        </h2>
        
        <div className="advantages-grid">
          {advantagesList.map((adv) => (
            <div className="advantage-card" key={adv.id}>
              <div className="advantage-img-wrapper">
                <img src={adv.image} alt={adv.text} />
              </div>
              <div className="advantage-content">
                <span className="advantage-pill">{adv.id}</span>
                <p className="advantage-text">{adv.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="advantages-action">
          <button className="cta-button" onClick={() => onOpenModal()}>
            <span>{t.heroCta}</span>
            <ArrowDownRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
