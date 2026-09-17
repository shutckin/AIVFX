import React, { useEffect, useState } from 'react';
import './theme.css';

// Тема блога. Светлая по умолчанию, выбор запоминается в браузере и
// действует и на витрине, и на страницах статей. Атрибут ставится на
// <html>, чтобы перекрасились шапка и меню, и снимается при уходе из
// блога: остальной сайт остаётся тёмным.
const THEME_KEY = 'aivfx-theme';

export const useBlogTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    let saved = 'light';
    try { saved = localStorage.getItem(THEME_KEY) || 'light'; } catch (e) { /* приватный режим */ }
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
    return () => document.documentElement.removeAttribute('data-theme');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* приватный режим */ }
  };

  return [theme, toggle];
};

export const ThemeButton = ({ theme, onToggle, en }) => (
  <button
    type="button"
    className="art-theme"
    onClick={onToggle}
    aria-label={en ? 'Switch theme' : 'Переключить тему'}
  >
    {theme === 'dark' ? (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    )}
    <span>{theme === 'dark' ? (en ? 'Light' : 'Светлая') : (en ? 'Dark' : 'Тёмная')}</span>
  </button>
);
