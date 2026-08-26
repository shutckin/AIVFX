import React from 'react';
import { SOCIALS } from '../data/socials';

// ── Ряд соцсетей значками ──────────────────────────────────────────────
//
// Почта намеренно остаётся текстом рядом с этим блоком: адрес хотят
// скопировать или прочитать, а значок конверта такой возможности не даёт.
// Значками показываем только то, куда переходят одним нажатием.
//
// Ссылка без адреса просто не рендерится: лучше три живых значка,
// чем четыре, один из которых ведёт в никуда.

const ICONS = {
  telegram: (
    <path d="M21.8 4.2 2.9 11.5c-1 .4-1 1.8.1 2.1l4.7 1.4 1.8 5.5c.3.9 1.4 1.1 2 .4l2.6-2.7 4.7 3.5c.8.6 1.9.1 2.1-.8L23.4 5.5c.2-1-.7-1.7-1.6-1.3ZM9.3 14.6l9-5.6-7.4 6.9-.3 3.6-1.3-4.9Z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" strokeWidth="1.8" stroke="currentColor" />
      <circle cx="12" cy="12" r="4" fill="none" strokeWidth="1.8" stroke="currentColor" />
      <circle cx="17.4" cy="6.6" r="1.3" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4.2" fill="none" strokeWidth="1.8" stroke="currentColor" />
      <path d="M10.2 8.9v6.2l5.4-3.1z" />
    </>
  ),
};

// tone: 'light' — на светлой карточке контактов, 'dark' — в футере
const SocialLinks = ({ tone = 'light' }) => {
  const links = SOCIALS.filter((item) => item.url);
  if (!links.length) return null;

  return (
    <div className={`soc-row soc-row--${tone}`}>
      {links.map((item) => (
        <a
          key={item.key}
          className="soc-link"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          title={item.label}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
            {ICONS[item.key]}
          </svg>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
