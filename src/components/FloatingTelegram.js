import React, { useEffect, useState } from 'react';
import { useLocale } from '../i18n';
import './cta-break.css';

const SCROLL_THRESHOLD = 600;

// Плавающая кнопка Telegram: появляется после скролла 600px,
// живёт в правом нижнем углу поверх контента.
const FloatingTelegram = () => {
  const L = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      className={`floating-tg${visible ? ' is-visible' : ''}`}
      href="https://t.me/aivfx"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={L === 'ru' ? 'Написать в Telegram' : 'Message on Telegram'}
      aria-hidden={visible ? undefined : 'true'}
      tabIndex={visible ? 0 : -1}
    >
      <svg
        className="floating-tg-icon"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Бумажный самолётик */}
        <path
          d="M21.5 3.1 L2.8 10.4 C2.1 10.7 2.1 11.4 2.9 11.6 L9.6 13.6 L11.9 20.4 C12.2 21.1 12.9 21.1 13.2 20.4 L21.5 3.1 Z"
          stroke="var(--fg)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9.6 13.6 L21.5 3.1"
          stroke="var(--fg)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </a>
  );
};

export default FloatingTelegram;
