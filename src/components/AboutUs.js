import React from 'react';
import { useLocale, pick } from '../i18n';
import { ABOUT_SYS } from '../data/systems-content';
import SecHead from './SecHead';
import './about-b2b.css';

// Секция «О нас» по макету светлой главной: три карточки.
// Слева белая карточка с текстом и чипами «для кого», справа столбик из
// тёмно-синей карточки основателя и белой карточки с брендами.
// FAQ живёт отдельной секцией (FaqSection).
const AboutUs = () => {
  const locale = useLocale();
  const en = locale === 'en';

  return (
    <section className="section" id="about">
      <div className="shell">
        <SecHead
          num={pick(locale, ABOUT_SYS.head.num)}
          title={pick(locale, ABOUT_SYS.head.title)}
          titleIt={pick(locale, ABOUT_SYS.head.titleIt)}
        />

        <div className="ab-grid reveal">
          <div className="ab-card ab-text">
            {ABOUT_SYS.paragraphs.map((p, i) => (
              <p key={i}>{pick(locale, p)}</p>
            ))}
            <ul className="ab-chips" aria-label={pick(locale, ABOUT_SYS.audience.title)}>
              {ABOUT_SYS.audience.items.map((item, i) => (
                <li key={i} className="ab-chip">{pick(locale, item)}</li>
              ))}
            </ul>
          </div>

          <div className="ab-side">
            <aside className="ab-founder">
              <div className="ab-founder-who">
                {/* Если файла public/founder.jpg нет, onError прячет картинку,
                    и остаётся круг с инициалами */}
                <div className="ab-founder-photo">
                  <img
                    src="/founder.jpg"
                    alt={pick(locale, ABOUT_SYS.founder.name)}
                    width="56"
                    height="56"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <span className="ab-founder-initials" aria-hidden="true">{en ? 'AS' : 'АШ'}</span>
                </div>
                <div>
                  <p className="ab-founder-name">{pick(locale, ABOUT_SYS.founder.name)}</p>
                  <p className="ab-founder-role">{pick(locale, ABOUT_SYS.founder.role)}</p>
                </div>
              </div>
              <p className="ab-founder-line">{pick(locale, ABOUT_SYS.founder.line)}</p>
            </aside>

            <div className="ab-card ab-brands">
              <span className="ab-brands-label">{pick(locale, ABOUT_SYS.brands.label)}</span>
              <div className="ab-brands-row">
                {ABOUT_SYS.brands.items.map((brand) => (
                  <span key={brand} className="ab-brand">{brand}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
