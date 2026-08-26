import React, { useState, useEffect } from 'react';
import { useLocale } from '../i18n';

const STORAGE_KEY = 'aivfx_cookies_accepted_v1';

const CookieBanner = ({ onPrivacyClick }) => {
  const [visible, setVisible] = useState(false);
  const en = useLocale() === 'en';

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(STORAGE_KEY);
      if (!accepted) {
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      }
    } catch (_) {
      // если localStorage недоступен — показываем баннер
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch (_) {}
    setVisible(false);
  };

  if (!visible) return null;

  // Компактная нижняя полоса: раскладка и адаптив — в about-b2b.css (.cookie-banner).
  // z-index 9990 — ниже модалок приложения (9998/9999).
  return (
    <div
      role="dialog"
      aria-label={en ? 'Cookie usage notice' : 'Уведомление об использовании cookies'}
      className="cookie-banner"
    >
      <div className="cookie-banner-text">
        <strong className="cookie-banner-title">
          {en ? 'We use cookies' : 'Мы используем cookies'}
        </strong>
        <span className="cookie-banner-full">
          {en
            ? 'This website uses cookies and browser metadata for the interface to work correctly and to improve the quality of the service. By continuing to use the site, you agree to the terms of the '
            : 'Сайт использует файлы cookies и метаданные браузера для корректной работы интерфейса и улучшения качества сервиса. Продолжая использовать сайт, вы соглашаетесь с условиями '}
          <button onClick={onPrivacyClick} className="cookie-banner-link">
            {en ? 'Privacy Policy' : 'Политики конфиденциальности'}
          </button>.
        </span>
        <span className="cookie-banner-short">
          {en
            ? 'We use cookies. By continuing you accept the '
            : 'Используем cookies. Продолжая, вы принимаете '}
          <button onClick={onPrivacyClick} className="cookie-banner-link">
            {en ? 'Privacy Policy' : 'Политику конфиденциальности'}
          </button>.
        </span>
      </div>
      <button onClick={accept} className="btn btn-primary cookie-banner-accept">
        {en ? 'Accept' : 'Принять'} <span className="btn-arrow">↗</span>
      </button>
    </div>
  );
};

export default CookieBanner;
