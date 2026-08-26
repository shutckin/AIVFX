import React, { useState } from 'react';
import { useLocale, pick, localizedHref } from '../i18n';
import { ABOUT_SYS, FAQ_SYS } from '../data/systems-content';
import SecHead from './SecHead';
import './about-b2b.css';

// Секция «О нас»: кто мы, для кого работаем, второе направление (видео) и FAQ.
const AboutUs = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const locale = useLocale();
  const en = locale === 'en';

  return (
    <section className="section" id="about">
      <div className="shell">
        <SecHead
          num={pick(locale, ABOUT_SYS.head.num)}
          title={pick(locale, ABOUT_SYS.head.title)}
          titleIt={pick(locale, ABOUT_SYS.head.titleIt)}
          side={pick(locale, ABOUT_SYS.head.side)}
          sideTitle={ABOUT_SYS.head.sideTitle}
        />

        <div className="ab-grid reveal">
          <div className="ab-main">
            <div className="ab-text">
              {ABOUT_SYS.paragraphs.map((p, i) => (
                <p key={i}>{pick(locale, p)}</p>
              ))}
            </div>

            <div className="ab-audience">
              <h4 className="ab-audience-title mono">{pick(locale, ABOUT_SYS.audience.title)}</h4>
              <div className="ab-chips">
                {ABOUT_SYS.audience.items.map((item, i) => (
                  <span key={i} className="ab-chip">{pick(locale, item)}</span>
                ))}
              </div>
            </div>

            <div className="ab-brands">
              <span className="ab-brands-label">{pick(locale, ABOUT_SYS.brands.label)}</span>
              <div className="ab-brands-row">
                {ABOUT_SYS.brands.items.map((brand) => (
                  <span key={brand} className="ab-brand">{brand}</span>
                ))}
              </div>
            </div>

            <div className="ab-founder">
              {/* Слот под фото: пока круг с инициалами, потом заменим на изображение */}
              <div className="ab-founder-photo" aria-hidden="true">{en ? 'AS' : 'АШ'}</div>
              <div className="ab-founder-body">
                <p className="ab-founder-name">{pick(locale, ABOUT_SYS.founder.name)}</p>
                <p className="ab-founder-role">{pick(locale, ABOUT_SYS.founder.role)}</p>
                <p className="ab-founder-line">{pick(locale, ABOUT_SYS.founder.line)}</p>
              </div>
            </div>

            <div className="ab-video-note">
              <p>{pick(locale, ABOUT_SYS.videoNote.text)}</p>
              <a className="ab-video-link mono" href={localizedHref('/video-production/', locale)}>
                {pick(locale, ABOUT_SYS.videoNote.link)}
              </a>
            </div>
          </div>

          <div className="ab-faq">
            <h3 className="ab-faq-title">
              {en ? 'Frequently asked' : 'Частые'}<br />
              <span className="it">{en ? 'questions' : 'вопросы'}</span>
            </h3>
            <div className="faq-list">
              {FAQ_SYS.map((item, i) => (
                <div
                  key={i}
                  className={`faq-item ${openIdx === i ? 'open' : ''}`}
                  onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                >
                  <div className="head">
                    <span className="q">{pick(locale, item.q)}</span>
                    <span className="ic">+</span>
                  </div>
                  <div className="body"><p>{pick(locale, item.a)}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
