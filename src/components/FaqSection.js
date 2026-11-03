import React, { useState } from 'react';
import { useLocale, pick } from '../i18n';
import { FAQ_SYS } from '../data/systems-content';
import SecHead from './SecHead';
import './faq-section.css';

// ── Секция «Частые вопросы» ──────────────────────────────────────────────
//
// По макету светлой главной: заголовок сверху, под ним две колонки белых
// скруглённых строк с синим «+». Все ответы сразу лежат в разметке (их
// читают поисковики и разметка FAQ), на экране раскрывается один.
// Вопрос - настоящая кнопка: открывается с клавиатуры, читалка слышит,
// раскрыт ответ или нет.
const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState(-1);
  const locale = useLocale();
  const en = locale === 'en';

  return (
    <section className="section faq-band" id="faq">
      <div className="shell">
        <SecHead
          num={en ? 'FAQ' : 'Вопросы'}
          title={en ? 'What people ask' : 'О чём спрашивают'}
          titleIt={en ? 'before starting' : 'перед стартом'}
        />

        <div className="faq-cards reveal">
          {FAQ_SYS.map((item, i) => {
            const open = openIdx === i;
            const bodyId = `faq-a-${i}`;
            return (
              <div key={i} className={`faq-card${open ? ' faq-card--open' : ''}`}>
                <button
                  type="button"
                  className="faq-card-head"
                  aria-expanded={open}
                  aria-controls={bodyId}
                  onClick={() => setOpenIdx(open ? -1 : i)}
                >
                  <span className="faq-card-q">{pick(locale, item.q)}</span>
                  <span className="faq-card-sign" aria-hidden="true" />
                </button>
                <div className="faq-card-body" id={bodyId}>
                  <div><p>{pick(locale, item.a)}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
