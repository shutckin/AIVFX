import React, { useState, useEffect } from 'react';
import { useNotification } from '../App';

const NAV_ITEMS = [
  { id: 'hero', label: 'Главная' },
  { id: 'services', label: 'Услуги' },
  { id: 'portfolio', label: 'Работы' },
  { id: 'about', label: 'Процесс' },
  { id: 'clients', label: 'Клиенты' },
  { id: 'contact', label: 'Контакты' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSec, setActiveSec] = useState('hero');
  const { scrollToSection } = useNotification();

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
              {item.label}
            </button>
          ))}
        </nav>
        <div className="header-status">
          <span className="status-pill"><span className="dot" /> ПРИНИМАЕМ ЗАКАЗЫ</span>
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
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default Header;
