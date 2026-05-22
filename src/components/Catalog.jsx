import React, { useState, useMemo } from 'react';
import { Star, ShoppingCart, Filter, Inbox, SlidersHorizontal, Check } from 'lucide-react';

const BRANDS = ['Все', 'Mancera', 'Creed', 'Louis Vuitton', 'Montabaco', 'Dior', 'Clive Christian', 'Boadicea', 'Roja', 'Chanel'];
const CATEGORIES = [
  { value: 'Fresh & Woody', label: 'Свежие и Древесные' },
  { value: 'Fresh & Citrus', label: 'Свежие и Цитрусовые' },
  { value: 'Sweet & Warm', label: 'Сладкие и Теплые' },
  { value: 'Exotic & Spicy', label: 'Экзотические и Пряные' }
];
const GENDERS = [
  { value: 'Men', label: 'Для него' },
  { value: 'Women', label: 'Для нее' },
  { value: 'Unisex', label: 'Унисекс' }
];

export default function Catalog({ perfumes, addToCart, searchQuery }) {
  const [selectedBrand, setSelectedBrand] = useState('Все');
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 90, max: 130 });

  // Handle gender filter click
  const toggleGender = (gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  // Handle category filter click
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedBrand('Все');
    setSelectedGenders([]);
    setSelectedCategories([]);
    setPriceRange({ min: 90, max: 130 });
  };

  // Filter logic
  const filteredPerfumes = useMemo(() => {
    return perfumes.filter((item) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Object.values(item.notes).some((note) =>
          note.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Brand filter
      const matchesBrand = selectedBrand === 'Все' || item.brand === selectedBrand;

      // Gender filter
      const matchesGender =
        selectedGenders.length === 0 || selectedGenders.includes(item.gender);

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(item.category);

      // Price filter
      const matchesPrice = item.price >= priceRange.min && item.price <= priceRange.max;

      return matchesSearch && matchesBrand && matchesGender && matchesCategory && matchesPrice;
    });
  }, [perfumes, searchQuery, selectedBrand, selectedGenders, selectedCategories, priceRange]);

  return (
    <section className="catalog-section" id="catalog">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Витрина парфюмерии</span>
          <h2>Наш ассортимент</h2>
          <p>Выберите роскошный аромат из нашей тщательно собранной коллекции лучших мировых хитов</p>
        </div>

        {/* Brand Tabs */}
        <div className="brand-tabs-container">
          <div className="brand-tabs">
            {BRANDS.map((brand) => (
              <button
                key={brand}
                className={`brand-tab ${selectedBrand === brand ? 'active' : ''}`}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        <div className="catalog-layout">
          {/* Sidebar Filters */}
          <aside className="filter-sidebar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <SlidersHorizontal size={18} style={{ color: 'var(--accent-gold)' }} />
              <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-title)', fontWeight: 600 }}>Фильтры</h3>
            </div>

            {/* Filter by Gender */}
            <div className="filter-group">
              <h4 className="filter-title">Кому</h4>
              <div className="filter-options">
                {GENDERS.map((gender) => (
                  <label key={gender.value} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedGenders.includes(gender.value)}
                      onChange={() => toggleGender(gender.value)}
                    />
                    <div className="custom-checkbox">
                      <Check />
                    </div>
                    {gender.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Filter by Category */}
            <div className="filter-group">
              <h4 className="filter-title">Группы ароматов</h4>
              <div className="filter-options">
                {CATEGORIES.map((cat) => (
                  <label key={cat.value} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.value)}
                      onChange={() => toggleCategory(cat.value)}
                    />
                    <div className="custom-checkbox">
                      <Check />
                    </div>
                    {cat.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Filter by Price */}
            <div className="filter-group">
              <h4 className="filter-title">Цена ($)</h4>
              <div className="price-range-inputs">
                <input
                  type="number"
                  className="price-input"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) }))}
                  placeholder="Мин"
                />
                <span style={{ color: 'var(--text-secondary)' }}>—</span>
                <input
                  type="number"
                  className="price-input"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))}
                  placeholder="Макс"
                />
              </div>
              <div className="price-slider-bar">
                <div className="price-slider-fill" />
              </div>
            </div>

            <button className="clear-filters" onClick={resetFilters}>
              Сбросить фильтры
            </button>
          </aside>

          {/* Product Grid */}
          <main>
            {filteredPerfumes.length > 0 ? (
              <div className="product-grid">
                {filteredPerfumes.map((perfume) => (
                  <div key={perfume.id} className="product-card fade-in">
                    {/* Visual Area */}
                    <div className="product-card-visual">
                      <span className="product-badge">{perfume.badge}</span>
                      <span className="product-gender">
                        {perfume.gender === 'Men' ? 'Для мужчин' : perfume.gender === 'Women' ? 'Для женщин' : 'Унисекс'}
                      </span>
                      <img src={perfume.image} alt={perfume.name} />

                      {/* Hover Notes Overlay */}
                      <div className="notes-overlay">
                        <span className="notes-overlay-title">Ноты аромата:</span>
                        <div className="note-tier">
                          <span className="note-tier-label">Верхние:</span>
                          <p className="note-tier-value">{perfume.notes.top}</p>
                        </div>
                        <div className="note-tier">
                          <span className="note-tier-label">Сердце:</span>
                          <p className="note-tier-value">{perfume.notes.heart}</p>
                        </div>
                        <div className="note-tier">
                          <span className="note-tier-label">База:</span>
                          <p className="note-tier-value">{perfume.notes.base}</p>
                        </div>
                      </div>
                    </div>

                    {/* Info Area */}
                    <div className="product-info">
                      <span className="product-brand">{perfume.brand}</span>
                      <h3 className="product-name">{perfume.name}</h3>

                      <div className="product-rating">
                        <Star size={12} className="star-icon" />
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{perfume.rating}</span>
                        <span>({perfume.reviewsCount} отзывов)</span>
                      </div>

                      <div className="product-footer">
                        <div className="product-price-wrapper">
                          <span className="product-size">{perfume.size}</span>
                          <span className="product-price">${perfume.price}</span>
                        </div>
                        
                        <button
                          className="add-to-cart-btn"
                          onClick={() => addToCart(perfume)}
                          aria-label="Добавить в корзину"
                        >
                          <ShoppingCart size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <Inbox size={48} className="no-results-icon" />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Ароматы не найдены
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Попробуйте изменить параметры фильтрации или поисковый запрос.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
