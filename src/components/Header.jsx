import React from 'react';
import { ShoppingBag, Search, Sparkles } from 'lucide-react';

export default function Header({
  cartCount,
  onCartOpen,
  searchQuery,
  setSearchQuery,
  scrollToCatalog,
  scrollToQuiz,
  scrollToTestimonials,
  scrollToFooter
}) {
  return (
    <header className="header">
      <div className="container header-container">
        {/* Logo */}
        <a href="/" className="logo">
          V I T R I N <span>E</span>
        </a>

        {/* Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <button onClick={scrollToCatalog}>Каталог</button>
            </li>
            <li>
              <button onClick={scrollToQuiz} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Sparkles size={14} style={{ color: 'var(--accent-gold)' }} /> Подбор Аромата
              </button>
            </li>
            <li>
              <button onClick={scrollToTestimonials}>Отзывы</button>
            </li>
            <li>
              <button onClick={scrollToFooter}>Контакты</button>
            </li>
          </ul>
        </nav>

        {/* Actions (Search & Cart) */}
        <div className="header-actions">
          <div className="search-bar">
            <Search size={16} style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Поиск парфюма..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="icon-btn" onClick={onCartOpen} aria-label="Корзина">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
