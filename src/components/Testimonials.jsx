import React from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Александр К.',
    status: 'Верифицированный покупатель',
    avatar: 'АК',
    stars: 5,
    perfume: 'Mancera - Cedrat Boise',
    text: 'Шикарный цитрусово-кожаный аромат! Стойкость на высоте, на одежде держится больше суток. Проверил по батч-коду на коробке — оригинал на 100%. Очень доволен быстрой отправкой через СДЭК.'
  },
  {
    id: 2,
    name: 'Мария С.',
    status: 'Верифицированный покупатель',
    avatar: 'МС',
    stars: 5,
    perfume: 'Mancera - Coco Vanille',
    text: 'Для любителей сладкой гурманики это просто находка! Мягкий кокос и теплая ваниль. Муж подарил флакон 120мл, цена тут оказалась намного приятнее, чем в крупных сетевых магазинах. Доставка за 3 дня.'
  },
  {
    id: 3,
    name: 'Дмитрий В.',
    status: 'Верифицированный покупатель',
    avatar: 'ДВ',
    stars: 5,
    perfume: 'Creed - Aventus',
    text: 'Взял специальный дорожный формат 30мл на пробу. Знаменитый запах спелого ананаса с легкой дымной березой. Удобно брать в поездки, звучит очень дорого. Спасибо менеджеру за подбор аромата!'
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Отзывы клиентов</span>
          <h2>Что говорят о нас</h2>
          <p>Честные отзывы от наших покупателей о качестве парфюмерии и сервисе доставки</p>
        </div>

        <div className="testimonials-grid">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="testimonial-card fade-in">
              <div className="testimonial-stars">
                {[...Array(rev.stars)].map((_, i) => (
                  <Star key={i} size={14} className="star-icon" />
                ))}
              </div>
              <p className="testimonial-text">"{rev.text}"</p>
              <div className="testimonial-perfume-tag">Куплено: {rev.perfume}</div>
              
              <div className="testimonial-user">
                <div className="user-avatar">{rev.avatar}</div>
                <div className="user-info">
                  <span className="user-name">{rev.name}</span>
                  <span className="user-status">{rev.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
