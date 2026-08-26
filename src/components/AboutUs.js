import React, { useState } from 'react';
import { useLocale, pick, localizedHref } from '../i18n';
import { ABOUT_SYS, FAQ_SYS } from '../data/systems-content';
import SecHead from './SecHead';
import './about-b2b.css';

// Секция «О нас». Иерархия сверху вниз:
// трастбар брендов → [текст о студии | карточка основателя] → «для кого» → видео → FAQ.
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

        {/* Трастбар: первое, что видит глаз в секции — крупные вордмарки брендов */}
        <div className="ab-trustbar reveal">
          <span className="ab-brands-label">{pick(locale, ABOUT_SYS.brands.label)}</span>
          <div className="ab-brands-row">
            {ABOUT_SYS.brands.items.map((brand) => (
              <span key={brand} className="ab-brand">{brand}</span>
            ))}
          </div>
        </div>

        {/* Текст о студии слева, карточка основателя справа */}
        <div className="ab-grid reveal">
          <div className="ab-text">
            {ABOUT_SYS.paragraphs.map((p, i) => (
              <p key={i}>{pick(locale, p)}</p>
            ))}
          </div>

          <aside className="ab-founder">
            {/* Слот под фото: пока круг с инициалами, потом заменим на изображение */}
            <div className="ab-founder-photo" aria-hidden="true">{en ? 'AS' : 'АШ'}</div>
            <div className="ab-founder-body">
              <p className="ab-founder-name">{pick(locale, ABOUT_SYS.founder.name)}</p>
              <p className="ab-founder-role">{pick(locale, ABOUT_SYS.founder.role)}</p>
              <p className="ab-founder-line">{pick(locale, ABOUT_SYS.founder.line)}</p>
            </div>
          </aside>
        </div>

        {/* «Для кого» — компактная строка без карточки */}
        <div className="ab-audience reveal">
          <span className="ab-audience-title mono">{pick(locale, ABOUT_SYS.audience.title)}</span>
          <div className="ab-chips">
            {ABOUT_SYS.audience.items.map((item, i) => (
              <span key={i} className="ab-chip">{pick(locale, item)}</span>
            ))}
          </div>
        </div>

        {/* Второе направление студии — одной компактной строкой */}
        <div className="ab-video-note reveal">
          <p>{pick(locale, ABOUT_SYS.videoNote.text)}</p>
          <a className="ab-video-link mono" href={localizedHref('/video-production/', locale)}>
            {pick(locale, ABOUT_SYS.videoNote.link)}
          </a>
        </div>

        {/* FAQ — отдельный смысловой блок */}
        <div className="ab-faq reveal">
          <div className="ab-faq-head">
            <span className="ab-faq-kicker mono">FAQ</span>
            <h3 className="ab-faq-title">{en ? 'Frequently asked questions' : 'Частые вопросы'}</h3>
          </div>
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
    </section>
  );
};

export default AboutUs;
