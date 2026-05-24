import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function OrderModal({ isOpen, onClose, lang, t }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [region, setRegion] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const perfumesList = [
    "Creed Aventus (Outlet)",
    "Louis Vuitton Imagination (Decant)",
    "Montabaco Rio (Ormonde Jayne)",
    "Dior Sauvage EDP",
    "Clive Christian 1872 Masculine",
    "Boadicea Blue Sapphire (Tester)",
    "Roja Parfums Elysium Pour Homme",
    "Chanel Bleu de Chanel"
  ];

  const regionsListByLang = {
    uz: [
      "Toshkent shahar", "Toshkent viloyati", "Andijon viloyati", "Buxoro viloyati", 
      "Farg'ona viloyati", "Jizzax viloyati", "Xorazm viloyati", "Namangan viloyati", 
      "Navoiy viloyati", "Qashqadaryo viloyati", "Qoraqalpog'iston Respublikasi", 
      "Samarqand viloyati", "Sirdaryo viloyati", "Surxondaryo viloyati"
    ],
    ru: [
      "г. Ташкент", "Ташкенская область", "Андижанская область", "Бухарская область", 
      "Ферганская область", "Джизакская область", "Хорезмская область", "Наманганская область", 
      "Навоийская область", "Кашкадарьинская область", "Республика Каракалпакстан", 
      "Самаркандская область", "Сырдарьинская область", "Сурхандарьинская область"
    ],
    en: [
      "Tashkent City", "Tashkent Region", "Andijan Region", "Bukhara Region", 
      "Fergana Region", "Jizzakh Region", "Khorezm Region", "Namangan Region", 
      "Navoiy Region", "Qashqadaryo Region", "Republic of Karakalpakstan", 
      "Samarkand Region", "Syrdarya Region", "Surxondaryo Region"
    ]
  };

  const currentRegions = regionsListByLang[lang] || regionsListByLang.uz;

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith('+998')) {
      value = '+998 ';
    }
    setPhone(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || phone.trim() === '+998' || !region) {
      alert(t.alertFill);
      return;
    }
    
    console.log("Lead submitted successfully:", { name, phone, selectedProducts, region, lang });
    setIsSuccess(true);
  };

  const handleReset = () => {
    setName('');
    setPhone('+998 ');
    setSelectedProducts([]);
    setRegion('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleReset}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={handleReset} aria-label="Yopish">
          <X size={20} />
        </button>

        {!isSuccess ? (
          <>
            <div className="modal-header">
              <h3 className="modal-title">{t.modalTitle}</h3>
              <p className="modal-subtitle">{t.modalSubtitle}</p>
            </div>

            <form className="modal-body" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="client-name">
                  {t.labelName}
                </label>
                <input
                  type="text"
                  id="client-name"
                  className="form-input"
                  placeholder="Bobur"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label" htmlFor="client-phone">
                  {t.labelPhone}
                </label>
                <input
                  type="text"
                  id="client-phone"
                  className="form-input"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+998 (90) 123-45-67"
                  required
                />
              </div>

              {/* Product Select (Multiple Checkboxes) */}
              <div className="form-group">
                <label className="form-label">
                  {t.labelProduct}
                </label>
                <div className="perfume-checkbox-list">
                  {perfumesList.map((p) => {
                    const isChecked = selectedProducts.includes(p);
                    return (
                      <label key={p} className="perfume-checkbox-item">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              setSelectedProducts(selectedProducts.filter(item => item !== p));
                            } else {
                              setSelectedProducts([...selectedProducts, p]);
                            }
                          }}
                        />
                        <span>{p}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Region Select */}
              <div className="form-group">
                <label className="form-label" htmlFor="client-region">
                  {t.labelRegion}
                </label>
                <select
                  id="client-region"
                  className="form-select"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    {t.placeholderRegion}
                  </option>
                  {currentRegions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button type="submit" className="modal-submit-btn">
                {t.submitBtn}
              </button>
            </form>
          </>
        ) : (
          <div className="success-card">
            <div className="success-icon-wrapper">
              <Check size={36} />
            </div>
            <h3 className="success-title">{t.successTitle}</h3>
            <p className="success-description">{t.successDesc}</p>
            <button className="success-btn" onClick={handleReset}>
              {t.successClose}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
