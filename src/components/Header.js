import React, { useState, useEffect } from 'react';
import { useNotification } from '../App';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { show: showNotification, scrollToSection } = useNotification();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'hero', label: 'Главная' },
    { id: 'services', label: 'AI + VFX' },
    { id: 'portfolio', label: 'Портфолио' },
    { id: 'about', label: 'О нас' },
    { id: 'clients', label: 'Клиенты' },
  ];

  return (
    <>
      {/* Floating island header */}
      <header className="fixed top-0 left-0 right-0 z-30 pt-4 px-4 lg:px-6 pointer-events-none">
        <div
          className="mx-auto max-w-5xl pointer-events-auto transition-all duration-500"
          style={{
            padding: '1.5px',
            borderRadius: '9999px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            className="flex items-center justify-between px-4 lg:px-6 transition-all duration-500 glass-blur"
            style={{
              borderRadius: '9999px',
              paddingTop: isScrolled ? '0.5rem' : '0.625rem',
              paddingBottom: isScrolled ? '0.5rem' : '0.625rem',
            }}
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="AIVFX Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-black tracking-tight text-white">
                AI<span style={{ color: '#D35C00' }}>VFX</span>
              </span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavigation(link.id)}
                  className="px-3.5 py-1.5 text-sm font-medium text-white/70 hover:text-white rounded-full hover:bg-white/08 transition-all duration-250"
                  style={{ transition: 'color 0.25s, background 0.25s' }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={showNotification}
                className="btn btn-primary flex items-center gap-2"
                style={{ padding: '0.5rem 1.125rem 0.5rem 1.125rem', fontSize: '0.8rem' }}
              >
                <span>Начать AI-проект</span>
                <span className="btn-arrow-circle" style={{ width: '1.5rem', height: '1.5rem', fontSize: '0.75rem' }}>↗</span>
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className="block h-px bg-white transition-all duration-300"
                style={{
                  width: '1.25rem',
                  transform: isMobileMenuOpen ? 'translateY(5px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block h-px bg-white transition-all duration-300"
                style={{
                  width: '1.25rem',
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                className="block h-px bg-white transition-all duration-300"
                style={{
                  width: '1.25rem',
                  transform: isMobileMenuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-all duration-400"
        style={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'all' : 'none',
          background: 'rgba(6,6,6,0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          transition: 'opacity 0.35s cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              onClick={() => handleNavigation(link.id)}
              className="text-3xl font-bold text-white/80 hover:text-white transition-all duration-300"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 60}ms` : '0ms',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: `color 0.3s, opacity 0.4s ${index * 60}ms, transform 0.4s ${index * 60}ms cubic-bezier(0.32,0.72,0,1)`,
              }}
            >
              {link.label}
            </button>
          ))}

          <div
            className="flex flex-col items-center gap-4 pt-4"
            style={{
              transitionDelay: isMobileMenuOpen ? `${navLinks.length * 60}ms` : '0ms',
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: `opacity 0.4s ${navLinks.length * 60}ms, transform 0.4s ${navLinks.length * 60}ms cubic-bezier(0.32,0.72,0,1)`,
            }}
          >
            <button
              onClick={() => { showNotification(); setIsMobileMenuOpen(false); }}
              className="btn btn-primary"
            >
              <span>Начать AI-проект</span>
              <span className="btn-arrow-circle ml-2">↗</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
