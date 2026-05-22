import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare, Send } from 'lucide-react';

export default function Footer({ scrollToCatalog, scrollToQuiz, scrollToTestimonials }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer" id="contacts">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-column footer-brand">
            <h4 style={{ border: 'none', paddingLeft: 0, fontSize: '1.4rem', fontFamily: 'var(--font-serif)' }}>
              V I T R I N E
            </h4>
            <p>
              Ваш персональный гид в мире селективных ароматов. Мы продаем только сертифицированную продукцию от официальных дистрибьюторов по честным ценам.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="https://t.me/" className="icon-btn" style={{ width: 36, height: 36 }} target="_blank" rel="noreferrer" aria-label="Telegram">
                <Send size={16} />
              </a>
              <a href="https://wa.me/" className="icon-btn" style={{ width: 36, height: 36 }} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <MessageSquare size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4>Разделы сайта</h4>
            <ul className="footer-links">
              <li>
                <button onClick={scrollToCatalog}>Витрина духов</button>
              </li>
              <li>
                <button onClick={scrollToQuiz}>Подобрать аромат</button>
              </li>
              <li>
                <button onClick={scrollToTestimonials}>Отзывы покупателей</button>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="footer-column">
            <h4>Контакты</h4>
            <div className="footer-contact-info">
              <div className="contact-item">
                <Phone size={16} />
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>+7 (999) 123-45-67</p>
                  <p style={{ fontSize: '0.8rem' }}>Заказ по телефону / WhatsApp</p>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <p>info@parfum-vitrine.ru</p>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <p>г. Москва, ул. Тверская, д. 12, стр. 2 (Шоурум)</p>
              </div>
              <div className="contact-item">
                <Clock size={16} />
                <p>Ежедневно: с 10:00 до 21:00</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-column footer-newsletter">
            <h4>Скидки и новинки</h4>
            <p>Подпишитесь на нашу рассылку, чтобы первыми получать секретные промокоды на закрытые распродажи!</p>
            
            {subscribed ? (
              <p style={{ color: 'var(--success)', fontWeight: 600 }}>Вы успешно подписались!</p>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Ваш E-mail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="newsletter-btn" aria-label="Подписаться">
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Area */}
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} VITRINE Perfume. Все права защищены.
          </p>
          <div className="payment-methods">
            <span>Способы оплаты:</span>
            <span className="payment-badge">СДЭК НАЛОЖЕННЫЙ</span>
            <span className="payment-badge">МИР</span>
            <span className="payment-badge">VISA</span>
            <span className="payment-badge">MASTERCARD</span>
            <span className="payment-badge">СПБ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
