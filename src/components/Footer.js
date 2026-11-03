import React from 'react';
import { useNotification } from '../App';
import { useLocale, pick, localizedHref } from '../i18n';
import { NAV_SYS, FOOTER_SYS } from '../data/systems-content';
import SocialLinks from './SocialLinks';

const Footer = () => {
  const { scrollToSection, showPrivacy, showConsent, showBlog } = useNotification();
  const locale = useLocale();
  const en = locale === 'en';
  const blogHref = localizedHref('/blog/', locale);

  return (
    <footer className="footer">
      <div className="shell">
        {/* Крупный водяной знак виден только в тёмном подвале AI-контента:
            на светлых страницах он читался как забытый мусор (см. index.css) */}
        <div className="footer-mega" aria-hidden="true">AIVFX</div>
        <div className="footer-cols">
          <div className="footer-col">
            <h5>{en ? 'Studio' : 'Студия'}</h5>
            <p>{pick(locale, FOOTER_SYS.desc)}</p>
            <p className="footer-est">
              {en ? 'Est. 2024 · AI systems & content' : 'Est. 2024 · AI-системы и контент'}
            </p>
          </div>
          <div className="footer-col">
            <h5>{en ? 'Navigation' : 'Навигация'}</h5>
            <ul>
              <li><button type="button" onClick={() => scrollToSection('hero')}>{en ? 'Home' : 'Главная'}</button></li>
              {/* Русскоязычные пункты на английской версии скрываем:
                  секции, на которую они ведут, там нет */}
              {NAV_SYS.filter((item) => !(item.ruOnly && en)).map((item) => (
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
              {/* Обучение только в русском подвале: занятия ведутся
                  по-русски, английских версий этих страниц нет. */}
              {!en && FOOTER_SYS.training.map((s) => (
                <li key={s.slug}>
                  <a href={`/services/${s.slug}/`}>{pick(locale, s.label)}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h5>{en ? 'Contact' : 'Контакты'}</h5>
            <ul>
              <li><a href="mailto:info@aivfx.ru">info@aivfx.ru</a></li>
            </ul>
            <SocialLinks tone="dark" />
          </div>
        </div>
        <div className="footer-bot">
          <span>{en ? '© 2026 AIVFX. All rights reserved' : '© 2026 AIVFX. Все права защищены'}</span>
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
