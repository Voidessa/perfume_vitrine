import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Advantages from './components/Advantages';
import Catalog from './components/Catalog';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';
import { perfumes } from './data/perfumes';
import { translations } from './data/translations';
import './App.css';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [lang, setLang] = useState('uz'); // Default language set to Uzbek (uz)

  const t = translations[lang] || translations.uz;

  const handleOpenModal = (productName = '') => {
    setSelectedProduct(productName);
    setIsModalOpen(true);
  };

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

  return (
    <>
      <Header 
        lang={lang} 
        setLang={setLang} 
        t={t} 
        onOpenModal={() => handleOpenModal()} 
      />

      <Hero 
        t={t} 
        onOpenModal={() => handleOpenModal()} 
      />

      <Advantages 
        t={t} 
        onOpenModal={() => handleOpenModal()} 
      />

      <Catalog
        perfumes={perfumes}
        t={t}
        onOpenModal={(p) => handleOpenModal(p)}
      />

      <Footer 
        t={t} 
        scrollToCatalog={() => scrollToSection('catalog')} 
      />

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialProduct={selectedProduct}
        lang={lang}
        t={t}
      />
    </>
  );
}
