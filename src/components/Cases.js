import React from 'react';
import SecHead from './SecHead';
import { useLocale, pick } from '../i18n';
import { CASES_SYS } from '../data/systems-content';
import { useCountUp } from '../hooks/useCountUp';
import './cases-approach.css';
import Pic from './Pic';
import DealCard from './DealCard';

// ── Секция «Работает у нас самих» ────────────────────────────────────────
// Компактная версия по светлому макету (03.11.2026): два живых контура.
// Сверху тёмно-синий блок «Заявки студии AIVFX» с карточкой заявки,
// под ним белая карточка EastRide со скриншотом. Длинные тексты
// «проблема / решение» и демо-сценарии на главной не показываем: они
// остаются в данных для ассистента и страниц услуг.

// Цифра с накруткой: значение анимируется при попадании в экран
// (при prefers-reduced-motion сразу финальное, это делает useCountUp)
const CountNum = ({ value, label }) => {
  const [ref, display] = useCountUp(value);
  return (
    <div className="cs-num">
      <dt className="cs-num-value" ref={ref}>{display}</dt>
      <dd className="cs-num-label">{label}</dd>
    </div>
  );
};

// Ряд из трёх цифр кейса. Берём короткую подпись (s), если она есть.
const Nums = ({ metrics, L }) => (
  <dl className="cs-nums">
    {metrics.map((m, i) => (
      <CountNum
        key={i}
        value={L === 'en' && m.vEn ? m.vEn : m.v}
        label={pick(L, m.s || m.l)}
      />
    ))}
  </dl>
);

const Cases = () => {
  const L = useLocale();
  const { head, items } = CASES_SYS;
  const studio = items.find((item) => item.id === 'own-crm');
  const eastride = items.find((item) => item.id === 'eastride');

  return (
    <section className="section" id="cases">
      <div className="shell">
        <SecHead
          num={pick(L, head.num)}
          title={pick(L, head.title)}
          titleIt={pick(L, head.titleIt)}
          sub={head.sub ? pick(L, head.sub) : null}
        />

        {/* ── Тёмно-синий блок: заявки студии ── */}
        {studio && (
          <article className="cs-live reveal">
            <div className="cs-live-text">
              <span className="cs-badge">{pick(L, studio.badge)}</span>
              <h3 className="cs-title">{pick(L, studio.title || studio.industry)}</h3>
              <p className="cs-text">{pick(L, studio.summary || studio.solution)}</p>
              <Nums metrics={studio.metrics} L={L} />
            </div>
            {studio.card && <DealCard card={studio.card} L={L} />}
          </article>
        )}

        {/* ── EastRide: скриншот и текст ── */}
        {eastride && (
          <article className="cs-er reveal">
            {eastride.shot && (
              <a
                className="cs-er-shot"
                href={eastride.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Pic
                  src={eastride.shot.src}
                  alt={pick(L, eastride.shot.alt)}
                  width={1280}
                  height={800}
                  sizes="(max-width: 900px) 100vw, 680px"
                />
              </a>
            )}
            <div className="cs-er-text">
              <div>
                <span className="cs-badge">{pick(L, eastride.badge)}</span>
                <h3 className="cs-title">{pick(L, eastride.title || eastride.industry)}</h3>
                <p className="cs-text">{pick(L, eastride.summary || eastride.solution)}</p>
                {eastride.link && (
                  <a
                    className="cs-er-link"
                    href={eastride.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`${eastride.link.replace(/^https?:\/\//, '')} ↗`}
                  </a>
                )}
              </div>
              <Nums metrics={eastride.metrics} L={L} />
            </div>
          </article>
        )}
      </div>
    </section>
  );
};

export default Cases;
