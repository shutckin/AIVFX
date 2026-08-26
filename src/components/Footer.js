import React from 'react';
import { useNotification } from '../App';
import { useLocale, pick, localizedHref } from '../i18n';
import { NAV_SYS, FOOTER_SYS } from '../data/systems-content';

const Footer = () => {
  const { scrollToSection, showPrivacy, showConsent, showBlog } = useNotification();
  const locale = useLocale();
  const en = locale === 'en';
  const blogHref = localizedHref('/blog/', locale);

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-mega">AIVFX</div>
        <div className="footer-cols">
          <div className="footer-col">
            <h5>{en ? 'STUDIO' : 'СТУДИЯ'}</h5>
            <p>{pick(locale, FOOTER_SYS.desc)}</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>
              {en ? 'EST. 2024 · AI SYSTEMS & CONTENT' : 'EST. 2024 · AI-СИСТЕМЫ И КОНТЕНТ'}
            </p>
          </div>
          <div className="footer-col">
            <h5>{en ? 'NAVIGATION' : 'НАВИГАЦИЯ'}</h5>
            <ul>
              <li><button type="button" onClick={() => scrollToSection('hero')}>{en ? 'Home' : 'Главная'}</button></li>
              {NAV_SYS.map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={() => scrollToSection(item.id)}>{pick(locale, item.label)}</button>
                </li>
              ))}
              <li>
                <a href={blogHref} onClick={(e) => { e.preventDefault(); showBlog(); }}>
                  {en ? 'Blog' : 'Блог'}
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>{pick(locale, FOOTER_SYS.servicesTitle)}</h5>
            <ul>
              {FOOTER_SYS.services.map((s) => (
                <li key={s.slug}>
                  <a href={localizedHref(`/services/${s.slug}/`, locale)}>{pick(locale, s.label)}</a>
                </li>
              ))}
              <li>
                <a href={localizedHref('/video-production/', locale)}>{pick(locale, FOOTER_SYS.videoLink)}</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>{en ? 'CONTACT' : 'КОНТАКТЫ'}</h5>
            <ul>
              <li><a href="mailto:info@aivfx.ru">info@aivfx.ru</a></li>
              <li><a href="https://t.me/aivfx" target="_blank" rel="noopener noreferrer">t.me/aivfx</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bot">
          <span>{en ? '© 2026 AIVFX. ALL RIGHTS RESERVED.' : '© 2026 AIVFX. ВСЕ ПРАВА ЗАЩИЩЕНЫ.'}</span>
          <div className="right">
            <button type="button" onClick={showPrivacy}>{en ? 'Privacy Policy' : 'Политика конфиденциальности'}</button>
            <button type="button" onClick={showConsent}>{en ? 'Personal Data Consent' : 'Согласие на обработку ПД'}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
