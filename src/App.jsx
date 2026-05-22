import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Quiz from './components/Quiz';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { perfumes } from './data/perfumes';
import './App.css';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Hot Deal Countdown state: starts at 2 hours, 14 minutes, 35 seconds
  const [timeLeft, setTimeLeft] = useState(8075); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 8075));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format countdown
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: hrs.toString().padStart(2, '0'),
      minutes: mins.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0')
    };
  };

  const timeFormatted = formatTime(timeLeft);

  // Cart operations
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Optional: open cart drawer automatically for direct checkout
    setIsCartOpen(true);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Scroll Helpers
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Header
        cartCount={totalCartCount}
        onCartOpen={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        scrollToCatalog={() => scrollToSection('catalog')}
        scrollToQuiz={() => scrollToSection('scent-quiz')}
        scrollToTestimonials={() => scrollToSection('testimonials')}
        scrollToFooter={() => scrollToSection('contacts')}
      />

      <Hero
        scrollToCatalog={() => scrollToSection('catalog')}
        scrollToQuiz={() => scrollToSection('scent-quiz')}
      />

      {/* URGENCY MARKETING BANNER: HOT DEAL COUNTDOWN */}
      <section className="hot-deal">
        <div className="container hot-deal-container">
          <div className="hot-deal-info">
            <span className="deal-badge">Суперпредложение</span>
            <div className="hot-deal-title">
              <h3>Набор тестеров Mancera Duo (Cedrat Boise + Coco Vanille)</h3>
              <p>Два легендарных противоположных настроения в дорожном формате 2х15мл за <b>$110</b> вместо $196</p>
            </div>
          </div>
          
          <div className="countdown">
            <div className="countdown-item">
              <span className="countdown-number">{timeFormatted.hours}</span>
              <span className="countdown-label">Час</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeFormatted.minutes}</span>
              <span className="countdown-label">Мин</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeFormatted.seconds}</span>
              <span className="countdown-label">Сек</span>
            </div>
          </div>
        </div>
      </section>

      <Catalog
        perfumes={perfumes}
        addToCart={addToCart}
        searchQuery={searchQuery}
      />

      <Quiz
        perfumes={perfumes}
        addToCart={addToCart}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <Testimonials />

      <Footer
        scrollToCatalog={() => scrollToSection('catalog')}
        scrollToQuiz={() => scrollToSection('scent-quiz')}
        scrollToTestimonials={() => scrollToSection('testimonials')}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </>
  );
}
