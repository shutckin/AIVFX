import React, { useState } from 'react';
import { useLocale, pick } from '../i18n';
import { FAQ_SYS } from '../data/systems-content';
import './faq-section.css';

// ── Секция «Частые вопросы» ──────────────────────────────────────────────
//
// Раньше FAQ жил хвостом внутри «О нас», и та секция превращалась в свалку:
// трастбар, текст, чипы, заметка о видео и сверху ещё аккордеон.
//
// Здесь он отдельной секцией и намеренно ломает ритм остальной страницы:
// своя полоса фона, заголовок в левой колонке, вопросы карточками справа.
// Обычный SecHead не используется - именно он и делал секцию неотличимой
// от соседних.
const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const locale = useLocale();
  const en = locale === 'en';

  return (
    <section className="section faq-band" id="faq">
      <div className="shell faq-grid">
        <aside className="faq-aside reveal">
          <span className="faq-kicker mono">FAQ</span>
          <h2 className="faq-heading">
            {en ? 'What people ask ' : 'О чём спрашивают '}
            <span className="it">{en ? 'before starting' : 'перед стартом'}</span>
          </h2>
          <p className="faq-aside-note">
            {en
              ? 'If your question is not here, ask it directly - we answer with a solution architecture, not a price list.'
              : 'Если вашего вопроса здесь нет, задайте его напрямую - в ответ придёт архитектура решения, а не прайс.'}
          </p>
          <a className="faq-aside-link" href="#contact">
            {en ? 'Ask a question' : 'Задать вопрос'}
          </a>
        </aside>

        <div className="faq-cards reveal">
          {FAQ_SYS.map((item, i) => {
            const open = openIdx === i;
            return (
              <div
                key={i}
                className={`faq-card${open ? ' faq-card--open' : ''}`}
                onClick={() => setOpenIdx(open ? -1 : i)}
              >
                <div className="faq-card-head">
                  <span className="faq-card-q">{pick(locale, item.q)}</span>
                  <span className="faq-card-sign" aria-hidden="true" />
                </div>
                <div className="faq-card-body">
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
