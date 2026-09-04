import React from 'react';
import SecHead from './SecHead';
import { useLocale, pick } from '../i18n';
import { CASES_SYS } from '../data/systems-content';
import { useCountUp } from '../hooks/useCountUp';
import './cases-approach.css';
import Pic from './Pic';

// ── Секция «Кейсы» ───────────────────────────────────────────────────────
// Флагман EastRide - живой продукт с реальными скриншотами в браузерных
// рамках и метриками с анимацией накрутки. Ниже - два компактных
// сценария «было → стало». Плашки «демо-сценарий» на карточках нет: она
// читалась как «здесь черновик» и сбивала. Честность держит сноска под сеткой.

// Первое предложение из текста (для компактных демо-карточек)
const firstSentence = (text) => {
  const s = String(text).split('. ')[0];
  return s.endsWith('.') || s.endsWith('!') || s.endsWith('?') ? s : `${s}.`;
};

// Метрика с накруткой: значение анимируется при попадании в viewport
const CountMetric = ({ value, label, size }) => {
  const [ref, display] = useCountUp(value);
  return (
    <div className={`cs2-metric${size === 'lg' ? ' cs2-metric--lg' : ''}`}>
      <span className="cs2-metric-value" ref={ref}>{display}</span>
      <span className="cs2-metric-label mono">{label}</span>
    </div>
  );
};

// Скриншот в макете браузерного окна: полоска с точками + пилюля-адрес
const BrowserFrame = ({ src, alt, width, height, className }) => (
  <figure className={`cs2-frame${className ? ` ${className}` : ''}`}>
    <div className="cs2-frame-bar" aria-hidden="true">
      <span className="cs2-frame-dot" />
      <span className="cs2-frame-dot" />
      <span className="cs2-frame-dot" />
      <span className="cs2-frame-url mono">eastride.cc</span>
    </div>
    <Pic
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, 640px"
    />
  </figure>
);

const Cases = () => {
  const L = useLocale();
  const { head, items, demoNote } = CASES_SYS;
  const flagship = items.find((item) => item.flagship);
  const demos = items.filter((item) => item.isDemo);

  return (
    <section className="section" id="cases">
      <div className="shell">
        <SecHead
          num={pick(L, head.num)}
          title={pick(L, head.title)}
          titleIt={pick(L, head.titleIt)}
          side={pick(L, head.side)}
          sideTitle={head.sideTitle}
        />

        <div className="cs-grid">
          {/* ── Флагман: EastRide, живой продукт ── */}
          {flagship && (
            <article className="cs2-flagship reveal" key={flagship.id}>
              <div className="cs2-left">
                <span className="cs2-badge mono">{pick(L, flagship.badge)}</span>
                <h3 className="cs2-title display">{pick(L, flagship.industry)}</h3>

                <div className="cs2-block">
                  <span className="cs2-block-label mono">
                    {L === 'en' ? 'PROBLEM' : 'ПРОБЛЕМА'}
                  </span>
                  <p className="cs2-block-text">{pick(L, flagship.problem)}</p>
                </div>

                <div className="cs2-block">
                  <span className="cs2-block-label mono">
                    {L === 'en' ? 'SOLUTION' : 'РЕШЕНИЕ'}
                  </span>
                  <p className="cs2-block-text">{pick(L, flagship.solution)}</p>
                </div>

                <div className="cs2-metrics">
                  {flagship.metrics.map((m, j) => (
                    <CountMetric
                      key={j}
                      size="lg"
                      value={L === 'en' && m.vEn ? m.vEn : m.v}
                      label={pick(L, m.l)}
                    />
                  ))}
                </div>

                <a
                  className="cs2-link mono"
                  href="https://eastride.cc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  eastride.cc ↗
                </a>
              </div>

              <div className="cs2-shots">
                <BrowserFrame
                  className="cs2-shot--main"
                  src="/case-media/eastride-home.jpg"
                  alt={L === 'en'
                    ? 'EastRide home page - live travel platform for riders in Asia'
                    : 'Главная страница EastRide - живая travel-платформа для райдеров в Азии'}
                  width={1280}
                  height={800}
                />
                <BrowserFrame
                  className="cs2-shot--overlay"
                  src="/case-media/eastride-catalog.jpg"
                  alt={L === 'en'
                    ? 'EastRide bike catalog - 180+ vehicles across 13 cities'
                    : 'Каталог байков EastRide - 180+ единиц техники в 13 городах'}
                  width={1280}
                  height={800}
                />
              </div>
            </article>
          )}

          {/* ── Демо-сценарии: компактно, «было → стало» + цифры ── */}
          {demos.map((item) => (
            <article className="cs2-demo reveal" key={item.id}>
              <div className="cs2-demo-top">
                <h3 className="cs2-demo-industry mono">{pick(L, item.industry)}</h3>
              </div>

              <p className="cs2-flow">
                <span className="cs2-flow-was">{firstSentence(pick(L, item.problem))}</span>
                <span className="cs2-flow-arrow mono">
                  {L === 'en' ? '→ Solution' : '→ Решение'}
                </span>
                <span className="cs2-flow-now">{firstSentence(pick(L, item.solution))}</span>
              </p>

              <div className="cs2-metrics cs2-metrics--demo">
                {item.metrics.map((m, j) => (
                  <CountMetric
                    key={j}
                    value={L === 'en' && m.vEn ? m.vEn : m.v}
                    label={pick(L, m.l)}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="cs-demo-note reveal">{pick(L, demoNote)}</p>
      </div>
    </section>
  );
};

export default Cases;
