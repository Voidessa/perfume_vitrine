import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CheckCircle, ShoppingBag } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [formData, setFormData] = useState({ name: '', phone: '', delivery: 'SDEK' });
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  // Calculate prices
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = discountApplied ? Math.round(subtotal * discountPercent) : 0;
  const total = subtotal - discountAmount;

  // Apply Promo code
  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'VITRINE10') {
      setDiscountApplied(true);
      setDiscountPercent(0.10); // 10%
    } else {
      alert('Неверный промокод');
    }
  };

  // Submit Order Form
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Пожалуйста, заполните имя и телефон для связи');
      return;
    }

    // Generate random order number e.g. VT-18492
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    setOrderNumber(`VT-${randomNum}`);
    setIsOrdered(true);
  };

  const handleCloseAndReset = () => {
    setIsOrdered(false);
    setPromoCode('');
    setDiscountApplied(false);
    setDiscountPercent(0);
    setFormData({ name: '', phone: '', delivery: 'SDEK' });
    clearCart();
    onClose();
  };

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className="cart-drawer">
        <div className="cart-header">
          <h3>Ваш Выбор</h3>
          <button className="close-btn" onClick={onClose} aria-label="Закрыть">
            <X size={20} />
          </button>
        </div>

        {isOrdered ? (
          // Success checkout screen
          <div className="checkout-success">
            <div className="success-icon-wrapper">
              <CheckCircle size={32} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem' }}>Заказ успешно оформлен!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Спасибо за ваш заказ! Наш парфюмерный консультант свяжется с вами в течение 10 минут по указанному телефону для подтверждения доставки.
            </p>
            <div className="success-order-num">Номер заказа: {orderNumber}</div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleCloseAndReset}>
              Продолжить покупки
            </button>
          </div>
        ) : cartItems.length > 0 ? (
          // Cart Items List
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <span className="cart-item-brand">{item.brand}</span>
                    <h4 className="cart-item-name">{item.name}</h4>
                    <div className="cart-item-footer">
                      <div className="quantity-control">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={10} />
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      <span className="cart-item-price">${item.price * item.quantity}</span>
                    </div>
                  </div>
                  <button
                    className="delete-item-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Удалить товар"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {/* Express Checkout Form */}
              <form className="checkout-form" onSubmit={handleSubmitOrder}>
                <h4>Детали для отправки</h4>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ваше Имя"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Телефон для связи (например, +7...)"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-select"
                    value={formData.delivery}
                    onChange={(e) => setFormData((prev) => ({ ...prev, delivery: e.target.value }))}
                  >
                    <option value="SDEK">СДЭК (до пункта выдачи/курьером)</option>
                    <option value="Boxberry">Boxberry (пункт выдачи)</option>
                    <option value="Courier">Экспресс-курьер (по городу)</option>
                    <option value="Post">Почта России</option>
                  </select>
                </div>
              </form>
            </div>

            {/* Total / Promo section */}
            <div className="cart-footer">
              {/* Promo input */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input
                  type="text"
                  placeholder="Промокод (напр., VITRINE10)"
                  className="form-input"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color-light)' }}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={discountApplied}
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                  onClick={handleApplyPromo}
                  disabled={discountApplied}
                >
                  {discountApplied ? 'Применен' : 'Ввести'}
                </button>
              </div>

              {/* Cost summary */}
              <div className="cart-summary-line">
                <span>Промежуточный итог:</span>
                <span style={{ fontFamily: 'var(--font-title)' }}>${subtotal}</span>
              </div>
              {discountApplied && (
                <div className="cart-summary-line" style={{ color: 'var(--success)' }}>
                  <span>Скидка ({discountPercent * 100}%):</span>
                  <span style={{ fontFamily: 'var(--font-title)' }}>-${discountAmount}</span>
                </div>
              )}
              <div className="cart-summary-line total">
                <span>Итого:</span>
                <span className="total-val">${total}</span>
              </div>

              <button
                type="submit"
                className="btn btn-primary checkout-btn"
                onClick={handleSubmitOrder}
              >
                Оформить заказ
              </button>
            </div>
          </>
        ) : (
          // Empty State
          <div className="cart-empty">
            <ShoppingBag size={48} className="cart-empty-icon" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>Корзина пуста</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Выберите один или несколько изысканных ароматов в каталоге, чтобы оформить заказ.
            </p>
            <button className="btn btn-primary" onClick={onClose}>
              Вернуться в каталог
            </button>
          </div>
        )}
      </div>
    </>
  );
}
