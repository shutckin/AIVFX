import React from 'react';
import { useLocale, localizedHref } from '../i18n';
import './mode-toggle.css';

// Тумблер направлений студии: AI-системы (primary, главная) ↔ AI-контент.
// Переход — полная навигация (страницы предзарендерены).
const ModeToggle = ({ mode = 'systems' }) => {
  const L = useLocale();
  const en = L === 'en';
  return (
    <nav className="mode-toggle" aria-label={en ? 'Studio directions' : 'Направления студии'}>
      <a
        href={localizedHref('/', L)}
        data-mode="systems"
        className={`mode-opt${mode === 'systems' ? ' active' : ''}`}
        aria-current={mode === 'systems' ? 'page' : undefined}
      >
        {en ? 'AI Systems' : 'AI-системы'}
      </a>
      <a
        href={localizedHref('/video-production/', L)}
        data-mode="content"
        className={`mode-opt${mode === 'content' ? ' active' : ''}`}
        aria-current={mode === 'content' ? 'page' : undefined}
      >
        {en ? 'AI Content' : 'AI-контент'}
      </a>
    </nav>
  );
};

export default ModeToggle;
