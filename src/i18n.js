// ─────────────────────────────────────────────────────────────────────────
// Двуязычность (RU / EN) для AIVFX
// ─────────────────────────────────────────────────────────────────────────
// Английская версия живёт под префиксом /en. Русская — в корне.
//   /            → RU главная
//   /en          → EN главная
//   /blog/slug/  → RU статья
//   /en/blog/slug/ → EN статья
//
// Локаль определяется ИЗ ПУТИ — поэтому и при prerender, и на клиенте
// рендерится правильный язык без мерцания.
// ─────────────────────────────────────────────────────────────────────────
import { createContext, useContext } from 'react';

export const LOCALES = ['ru', 'en'];
export const DEFAULT_LOCALE = 'ru';

// Локаль из текущего пути браузера
export const getLocaleFromUrl = () => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const p = window.location.pathname;
  return (p === '/en' || p.startsWith('/en/')) ? 'en' : 'ru';
};

// Убираем языковой префикс — получаем «логический» путь (всегда с ведущим /)
export const stripLocale = (pathname) => {
  let p = pathname.replace(/\/+$/, '') || '/';
  if (p === '/en') return '/';
  if (p.startsWith('/en/')) p = p.slice(3); // '/en/blog' → '/blog'
  return p || '/';
};

// Собираем URL с нужным языковым префиксом.
// localizedHref('/blog/', 'en') → '/en/blog/'
export const localizedHref = (logicalPath, locale) => {
  let p = logicalPath.startsWith('/') ? logicalPath : '/' + logicalPath;
  if (locale === 'en') {
    p = p === '/' ? '/en/' : '/en' + p;
  }
  return p;
};

// ── Контекст локали ──
export const LocaleContext = createContext('ru');
export const useLocale = () => useContext(LocaleContext);

// Удобный помощник: выбрать значение по локали с фолбэком на RU.
// pick(locale, { ru: 'Привет', en: 'Hello' })
export const pick = (locale, obj) => {
  if (!obj) return '';
  return (locale === 'en' && obj.en != null) ? obj.en : obj.ru;
};
