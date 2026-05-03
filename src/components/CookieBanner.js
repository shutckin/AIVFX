import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'aivfx_cookies_accepted_v1';

const CookieBanner = ({ onPrivacyClick }) => {
  const [visible, setVisible] = useState(false);

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

  return (
    <div
      role="dialog"
      aria-label="Уведомление об использовании cookies"
      style={{
        position: 'fixed',
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 9990,
        background: 'rgba(10, 9, 8, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--line-2)',
        borderRadius: 'var(--r-lg)',
        padding: '20px 24px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        display: 'flex',
        gap: 24,
        alignItems: 'center',
        flexWrap: 'wrap',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <div style={{ flex: '1 1 320px', color: 'var(--fg-2)', fontSize: 13, lineHeight: 1.55 }}>
        <strong style={{ color: 'var(--fg)', display: 'block', marginBottom: 4, fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
          Мы используем cookies
        </strong>
        Сайт использует файлы cookies и метаданные браузера для корректной работы интерфейса
        и улучшения качества сервиса. Продолжая использовать сайт, вы соглашаетесь с условиями{' '}
        <button
          onClick={onPrivacyClick}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--accent)',
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: 0,
            font: 'inherit',
          }}
        >
          Политики конфиденциальности
        </button>.
      </div>
      <button
        onClick={accept}
        className="btn btn-primary"
        style={{ flexShrink: 0 }}
      >
        Принять <span className="btn-arrow">↗</span>
      </button>
    </div>
  );
};

export default CookieBanner;
