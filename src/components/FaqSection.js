import React, { useState } from 'react';
import SecHead from './SecHead';
import { useLocale, pick } from '../i18n';
import { FAQ_SYS } from '../data/systems-content';

// ── Секция «Частые вопросы» ──────────────────────────────────────────────
// Раньше FAQ жил хвостом внутри «О нас», и секция превращалась в свалку:
// трастбар, текст, чипы, заметка о видео и сверху ещё аккордеон. Теперь
// это отдельная секция с таким же заголовком, как у остальных.
const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const locale = useLocale();
  const en = locale === 'en';

  return (
    <section className="section" id="faq">
      <div className="shell">
        {/* Заголовок не повторяет метку: «FAQ» уже сказано сверху,
            крупная строка отвечает на то, что человека здесь держит */}
        <SecHead
          num="FAQ"
          title={en ? 'What people ask' : 'О чём спрашивают'}
          titleIt={en ? 'before starting' : 'перед стартом'}
        />

        <div className="faq-sec reveal">
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

export default FaqSection;
