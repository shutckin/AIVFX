import React from 'react';
import { useNotification } from '../App';

const Footer = () => {
  const { scrollToSection, showPrivacy } = useNotification();

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-mega">AIVFX</div>
        <div className="footer-cols">
          <div className="footer-col">
            <h5>СТУДИЯ</h5>
            <p>
              Революционная AI + VFX студия для создания вирусного контента.
              Быстрее, дешевле, качественнее традиционного производства.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>
              EST. 2024 · MOSCOW
            </p>
          </div>
          <div className="footer-col">
            <h5>НАВИГАЦИЯ</h5>
            <ul>
              <li><button type="button" onClick={() => scrollToSection('hero')}>Главная</button></li>
              <li><button type="button" onClick={() => scrollToSection('services')}>Услуги</button></li>
              <li><button type="button" onClick={() => scrollToSection('portfolio')}>Портфолио</button></li>
              <li><button type="button" onClick={() => scrollToSection('about')}>Процесс</button></li>
              <li><button type="button" onClick={() => scrollToSection('clients')}>Клиенты</button></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>УСЛУГИ</h5>
            <ul>
              <li>AI + VFX Контент</li>
              <li>Вирусные ролики</li>
              <li>Рекламные видео</li>
              <li>Продуктовые демо</li>
              <li>Адаптации форматов</li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>КОНТАКТЫ</h5>
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
          <span>© 2026 AIVFX. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</span>
          <div className="right">
            <button type="button" onClick={showPrivacy}>Политика конфиденциальности</button>
            <button type="button" onClick={showPrivacy}>Условия использования</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
