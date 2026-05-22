import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, ShoppingCart } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'gender',
    title: 'Для кого вы ищете аромат?',
    subtitle: 'Выберите желаемое направление парфюма',
    options: [
      { value: 'Men', title: 'Для него', desc: 'Мужественные, древесные, свежие ноты' },
      { value: 'Women', title: 'Для нее', desc: 'Женственные, сладкие, цветочные ноты' },
      { value: 'Unisex', title: 'Унисекс', desc: 'Универсальные, сбалансированные ароматы' }
    ]
  },
  {
    id: 'category',
    title: 'Какое семейство ароматов вам ближе?',
    subtitle: 'Ваш ольфакторный выбор',
    options: [
      { value: 'Fresh & Woody', title: 'Свежие и Древесные', desc: 'Цитрусы, хвоя, ветивер и кожа' },
      { value: 'Fresh & Citrus', title: 'Свежие и Цитрусовые', desc: 'Лимон, бергамот, чай, легкая свежесть' },
      { value: 'Sweet & Warm', title: 'Сладкие и Теплые', desc: 'Ваниль, кокос, персик, амбра' },
      { value: 'Exotic & Spicy', title: 'Экзотические и Пряные', desc: 'Специи, табак, уд, фрукты и кожа' }
    ]
  },
  {
    id: 'occasion',
    title: 'Для какого случая подбирается аромат?',
    subtitle: 'Где вы планируете его раскрывать',
    options: [
      { value: 'everyday', title: 'Каждый день / В офис', desc: 'Ненавязчивый шлейф, который не утомляет' },
      { value: 'evening', title: 'Вечерний выход / Свидания', desc: 'Манящий, глубокий и запоминающийся' },
      { value: 'special', title: 'Особое событие / Статус', desc: 'Дорогое, статусное звучание' },
      { value: 'any', title: 'Абсолютно универсальный', desc: 'На все случаи жизни под любое настроение' }
    ]
  }
];

export default function Quiz({ perfumes, addToCart, onCartOpen }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({ gender: '', category: '', occasion: '' });
  const [matchedProduct, setMatchedProduct] = useState(null);

  const handleSelectOption = (value) => {
    const key = QUESTIONS[currentStep].id;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const calculateResult = () => {
    // Basic recommendation rules
    let match = null;
    
    // Filter matching candidates
    const candidates = perfumes.filter((p) => {
      // Gender filter (unisex matches all, or exact match)
      const genderMatch = answers.gender === 'Unisex' || p.gender === 'Unisex' || p.gender === answers.gender;
      
      // Category filter (exact match, or fallback if none)
      const categoryMatch = p.category === answers.category;

      return genderMatch && categoryMatch;
    });

    if (candidates.length > 0) {
      // Pick first matching or highest rated
      match = candidates.sort((a, b) => b.rating - a.rating)[0];
    } else {
      // Secondary filter: just check gender
      const secondaryCandidates = perfumes.filter((p) => p.gender === answers.gender || p.gender === 'Unisex');
      if (secondaryCandidates.length > 0) {
        match = secondaryCandidates[Math.floor(Math.random() * secondaryCandidates.length)];
      } else {
        // Ultimate fallback
        match = perfumes[0];
      }
    }

    setMatchedProduct(match);
    setCurrentStep(QUESTIONS.length); // Result screen
  };

  const handleReset = () => {
    setAnswers({ gender: '', category: '', occasion: '' });
    setMatchedProduct(null);
    setCurrentStep(0);
  };

  const currentQuestion = QUESTIONS[currentStep];
  const isSelected = currentQuestion && answers[currentQuestion.id] !== '';

  return (
    <section className="quiz-section" id="scent-quiz">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Интерактивный помощник</span>
          <h2>Подбор аромата за 1 минуту</h2>
          <p>Ответьте на 3 вопроса, и наша система выберет идеальный парфюм под ваш стиль, а также подарит скидку!</p>
        </div>

        <div className="quiz-card">
          {/* Progress bar */}
          <div className="quiz-progress">
            <div
              className="quiz-progress-bar"
              style={{
                width: `${matchedProduct ? 100 : (currentStep / QUESTIONS.length) * 100}%`
              }}
            />
          </div>

          <div className="quiz-body">
            {currentStep < QUESTIONS.length ? (
              // Quiz Active Step
              <div>
                <span className="quiz-step-indicator">
                  Шаг {currentStep + 1} из {QUESTIONS.length}
                </span>
                <h3 className="quiz-question">{currentQuestion.title}</h3>
                
                <div className="quiz-options">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt.value}
                      className={`quiz-option-card ${
                        answers[currentQuestion.id] === opt.value ? 'active' : ''
                      }`}
                      onClick={() => handleSelectOption(opt.value)}
                    >
                      <div className="quiz-option-dot" />
                      <div className="quiz-option-info">
                        <span className="quiz-option-title">{opt.title}</span>
                        <span className="quiz-option-desc">{opt.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="quiz-navigation">
                  <button
                    className="btn btn-secondary"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    style={{ opacity: currentStep === 0 ? 0.3 : 1, cursor: currentStep === 0 ? 'default' : 'pointer' }}
                  >
                    <ArrowLeft size={16} /> Назад
                  </button>
                  
                  <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={!isSelected}
                    style={{ opacity: !isSelected ? 0.5 : 1, cursor: !isSelected ? 'not-allowed' : 'pointer' }}
                  >
                    {currentStep === QUESTIONS.length - 1 ? 'Получить результат' : 'Далее'} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              // Quiz Result Screen
              <div className="quiz-result">
                <div className="success-icon-wrapper" style={{ margin: '0 auto 1.5rem' }}>
                  <Sparkles size={32} />
                </div>
                <h3 className="result-congrats">Идеальный аромат найден!</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  На основе ваших ответов мы подобрали для вас этот потрясающий флакон:
                </p>

                {matchedProduct && (
                  <div className="result-matched-card">
                    <img
                      src={matchedProduct.image}
                      alt={matchedProduct.name}
                      className="result-matched-img"
                    />
                    <div>
                      <span className="product-brand">{matchedProduct.brand}</span>
                      <h4 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', margin: '0.25rem 0' }}>
                        {matchedProduct.name}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        {matchedProduct.description}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <span style={{ fontSize: '1.4rem', fontWeight: '700', fontFamily: 'var(--font-title)' }}>
                          ${matchedProduct.price}
                        </span>
                        <button
                          className="btn btn-primary"
                          style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                          onClick={() => {
                            addToCart(matchedProduct);
                            onCartOpen();
                          }}
                        >
                          <ShoppingCart size={16} /> В корзину
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="promo-code-container">
                  <span>Ваш секретный промокод на скидку 10%:</span>
                  <div className="promo-code">VITRINE10</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Введите при оформлении заказа в корзине
                  </span>
                </div>

                <button className="btn btn-secondary" onClick={handleReset}>
                  <RefreshCw size={14} /> Пройти тест заново
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
