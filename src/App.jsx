import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Advantages from './components/Advantages';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';
import { translations } from './data/translations';
import './App.css';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lang, setLang] = useState('uz'); // Default language set to Uzbek (uz)

  const t = translations[lang] || translations.uz;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Header 
        lang={lang} 
        setLang={setLang} 
        t={t} 
        onOpenModal={handleOpenModal} 
      />

      <Hero 
        t={t} 
        onOpenModal={handleOpenModal} 
      />

      <Advantages 
        t={t} 
        onOpenModal={handleOpenModal} 
      />

      <Footer 
        t={t} 
      />

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lang={lang}
        t={t}
      />
    </>
  );
}
