import React from 'react';
import { useNotification } from '../App';
import { useLocale } from '../i18n';

const Footer = () => {
  const { scrollToSection, showPrivacy, showConsent } = useNotification();
  const en = useLocale() === 'en';

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-mega">AIVFX</div>
        <div className="footer-cols">
          <div className="footer-col">
            <h5>{en ? 'STUDIO' : 'СТУДИЯ'}</h5>
            <p>
              {en
                ? 'A revolutionary AI + VFX studio for creating viral content. Faster, cheaper and higher quality than traditional production.'
                : 'Революционная AI + VFX студия для создания вирусного контента. Быстрее, дешевле, качественнее традиционного производства.'}
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>
              EST. 2024 · MOSCOW
            </p>
          </div>
          <div className="footer-col">
            <h5>{en ? 'NAVIGATION' : 'НАВИГАЦИЯ'}</h5>
            <ul>
              <li><button type="button" onClick={() => scrollToSection('hero')}>{en ? 'Home' : 'Главная'}</button></li>
              <li><button type="button" onClick={() => scrollToSection('services')}>{en ? 'Services' : 'Услуги'}</button></li>
              <li><button type="button" onClick={() => scrollToSection('portfolio')}>{en ? 'Portfolio' : 'Портфолио'}</button></li>
              <li><button type="button" onClick={() => scrollToSection('about')}>{en ? 'Process' : 'Процесс'}</button></li>
              <li><button type="button" onClick={() => scrollToSection('clients')}>{en ? 'Clients' : 'Клиенты'}</button></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>{en ? 'SERVICES' : 'УСЛУГИ'}</h5>
            <ul>
              <li>{en ? 'AI + VFX Content' : 'AI + VFX Контент'}</li>
              <li>{en ? 'Viral Videos' : 'Вирусные ролики'}</li>
              <li>{en ? 'Ad Films' : 'Рекламные видео'}</li>
              <li>{en ? 'Product Demos' : 'Продуктовые демо'}</li>
              <li>{en ? 'Format Adaptations' : 'Адаптации форматов'}</li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>{en ? 'CONTACT' : 'КОНТАКТЫ'}</h5>
            <ul>
              <li><a href="mailto:info@aivfx.ru">info@aivfx.ru</a></li>
              <li><a href="https://t.me/aivfx" target="_blank" rel="noopener noreferrer">t.me/aivfx</a></li>
              <li style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>
                MSK · DXB · DPS
              </li>
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
