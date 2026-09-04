import React, { useState, useEffect } from 'react';
import { useNotification } from '../App';
import { useLocale, pick, localizedHref } from '../i18n';
import { NAV_SYS } from '../data/systems-content';
import ModeToggle from './ModeToggle';
import LangSwitch from './LangSwitch';
import './about-b2b.css';

// Секции для scroll-spy (порядок = порядок на странице)
const SPY_SECTIONS = ['hero', 'services', 'training', 'cases', 'approach', 'about', 'contact'];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSec, setActiveSec] = useState('hero');
  const { scrollToSection } = useNotification();
  const locale = useLocale();
  const en = locale === 'en';


  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // scroll spy
      const y = window.scrollY + window.innerHeight * 0.3;
      let current = 'hero';
      for (const id of SPY_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActiveSec(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  // Пока меню открыто, страница под ним не должна прокручиваться: иначе
  // палец «проваливается» на страницу и она уезжает за панелью
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    if (!mobileOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  // Закрытие по Escape: меню занимает весь экран, и выйти из него нужно
  // уметь не только мышью
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const blogHref = localizedHref('/blog/', locale);
  const worksHref = localizedHref('/works/', locale);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo" onClick={() => handleNav('hero')}>
          <span className="logo-wm">AIVFX</span>
        </div>
        <ModeToggle mode="systems" />
        <nav className="nav-loose" aria-label="Main navigation">
          {NAV_SYS.filter((item) => !(item.ruOnly && en)).map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeSec === item.id ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              {pick(locale, item.label)}
            </button>
          ))}
          {/* Блог живёт отдельной страницей, поэтому это ссылка, а не якорь.
              Без неё в блог с главной было не попасть вообще: в шапке пункта
              не было, оставалась одна ссылка в подвале. */}
          <a className="nav-link" href={blogHref}>{en ? 'Blog' : 'Блог'}</a>
        </nav>
        <div className="header-status">
          <LangSwitch locale={locale} />
          <button type="button" className="btn btn-primary ab-header-cta" onClick={() => handleNav('contact')}>
            {en ? 'Contact' : 'Связаться'}
          </button>
        </div>
        {/* Бургер прячется, когда панель открыта: закрывать её теперь
            нечем иным, как собственной кнопкой меню, и два крестика
            друг поверх друга не спорят за один угол экрана */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          aria-label={en ? 'Open menu' : 'Открыть меню'}
          aria-expanded={mobileOpen}
          hidden={mobileOpen}
        >
          <span /><span /><span />
        </button>
      </header>

      {/* ── Мобильное меню ────────────────────────────────────────────────
          Раньше это был центрированный столбик из четырёх пунктов, и он
          ломался сразу в трёх местах: кнопка закрытия принадлежала шапке и
          обрезалась о край экрана, «Связаться» уезжала в левый край из-за
          align-self: flex-start, а переключение языков висело мелкой
          строкой внизу. Плюс из меню было не попасть ни в блог, ни в
          работы - этих пунктов там просто не было.

          Теперь панель разложена по трём поясам: шапка со своей кнопкой
          закрытия, список во всю ширину и подвал с действием и языком.
          Пункты выровнены по левому краю: столбик по центру читается как
          заглушка, а не как навигация. */}
      <div
        className={`mobile-menu ${mobileOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={en ? 'Menu' : 'Меню'}
        aria-hidden={mobileOpen ? undefined : 'true'}
      >
        <div className="mm-head">
          <span className="mm-logo">AIVFX</span>
          <button
            type="button"
            className="mm-close"
            onClick={() => setMobileOpen(false)}
            aria-label={en ? 'Close menu' : 'Закрыть меню'}
          >
            <span /><span />
          </button>
        </div>

        <nav className="mm-nav" aria-label={en ? 'Mobile navigation' : 'Мобильная навигация'}>
          {NAV_SYS.filter((item) => !(item.ruOnly && en)).map((item) => (
            <button key={item.id} type="button" className="mm-link" onClick={() => handleNav(item.id)}>
              {pick(locale, item.label)}
            </button>
          ))}
          {/* Разделы-страницы отделены от якорей: они уводят со страницы,
              и смешивать их с прокруткой по текущей - врать читателю */}
          <a className="mm-link mm-link--page" href={worksHref}>{en ? 'Work' : 'Работы'}</a>
          <a className="mm-link mm-link--page" href={blogHref}>{en ? 'Blog' : 'Блог'}</a>
        </nav>

        <div className="mm-foot">
          <button type="button" className="btn btn-primary mm-cta" onClick={() => handleNav('contact')}>
            {en ? 'Contact' : 'Связаться'}
          </button>
          <div className="mm-lang"><LangSwitch locale={locale} /></div>
        </div>
      </div>
    </>
  );
};

export default Header;
