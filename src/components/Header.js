import React, { useState, useEffect } from 'react';
import { useNotification } from '../App';
import { useLocale, stripLocale, localizedHref } from '../i18n';

const NAV_ITEMS = [
  { id: 'hero', ru: 'Главная', en: 'Home' },
  { id: 'services', ru: 'Услуги', en: 'Services' },
  { id: 'portfolio', ru: 'Работы', en: 'Work' },
  { id: 'about', ru: 'Процесс', en: 'Process' },
  { id: 'clients', ru: 'Клиенты', en: 'Clients' },
  { id: 'contact', ru: 'Контакты', en: 'Contact' },
];

// Переключатель языка — реальная навигация (полная перезагрузка),
// т.к. локаль определяется из URL при загрузке страницы.
const LangSwitch = ({ locale }) => {
  const logical = typeof window !== 'undefined' ? stripLocale(window.location.pathname) : '/';
  return (
    <div className="lang-switch" aria-label="Language">
      <a href={localizedHref(logical, 'ru')} className={`lang-opt ${locale === 'ru' ? 'active' : ''}`}>RU</a>
      <span className="lang-sep">/</span>
      <a href={localizedHref(logical, 'en')} className={`lang-opt ${locale === 'en' ? 'active' : ''}`}>EN</a>
    </div>
  );
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSec, setActiveSec] = useState('hero');
  const { scrollToSection, showBlog } = useNotification();
  const locale = useLocale();
  const en = locale === 'en';

  const handleBlog = () => { showBlog(); setMobileOpen(false); };
  const blogHref = localizedHref('/blog/', locale);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // scroll spy
      const y = window.scrollY + window.innerHeight * 0.3;
      let current = 'hero';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= y) current = item.id;
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

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo" onClick={() => handleNav('hero')}>
          <img src="/logo.png" alt="AIVFX" className="logo-img" />
          <span className="logo-wm">AIVFX</span>
        </div>
        <nav className="nav-loose" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeSec === item.id ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              {en ? item.en : item.ru}
            </button>
          ))}
          <a href={blogHref} className="nav-link" onClick={(e) => { e.preventDefault(); handleBlog(); }}>
            {en ? 'Blog' : 'Блог'}
          </a>
        </nav>
        <div className="header-status">
          <LangSwitch locale={locale} />
          <span className="status-pill"><span className="dot" /> {en ? 'OPEN FOR PROJECTS' : 'ПРИНИМАЕМ ЗАКАЗЫ'}</span>
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span style={{ transform: mobileOpen ? 'translateY(4px) rotate(45deg)' : 'none' }} />
          <span style={{ opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ transform: mobileOpen ? 'translateY(-4px) rotate(-45deg)' : 'none' }} />
        </button>
      </header>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <button key={item.id} className="nav-link" onClick={() => handleNav(item.id)}>
            {en ? item.en : item.ru}
          </button>
        ))}
        <a href={blogHref} className="nav-link" onClick={(e) => { e.preventDefault(); handleBlog(); }}>
          {en ? 'Blog' : 'Блог'}
        </a>
        <div className="mobile-lang"><LangSwitch locale={locale} /></div>
      </div>
    </>
  );
};

export default Header;
