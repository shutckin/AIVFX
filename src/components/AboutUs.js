import React, { useState } from 'react';
import { COMPARE_OLD, COMPARE_NEW, FAQ_ITEMS } from '../data/content';
import { COMPARE_OLD_EN, COMPARE_NEW_EN, FAQ_ITEMS_EN } from '../data/content-en';
import { useLocale } from '../i18n';

const SecHead = ({ num, title, titleIt, side, sideTitle }) => (
  <div className="sec-head reveal">
    <div className="sec-num">{num}</div>
    <h2 className="sec-title">
      {title} {titleIt && <span className="it">{titleIt}</span>}
    </h2>
    {side && (
      <div className="sec-side">
        {sideTitle && <span className="kicker">{sideTitle}</span>}
        <p>{side}</p>
      </div>
    )}
  </div>
);

const AboutUs = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const en = useLocale() === 'en';

  // Подмена данных по локали
  const COMPARE_OLD_L = en ? COMPARE_OLD_EN : COMPARE_OLD;
  const COMPARE_NEW_L = en ? COMPARE_NEW_EN : COMPARE_NEW;
  const FAQ_ITEMS_L = en ? FAQ_ITEMS_EN : FAQ_ITEMS;

  return (
    <section className="section" id="about">
      <div className="shell">
        <SecHead
          num={en ? '[ 03 / PROCESS ]' : '[ 03 / ПРОЦЕСС ]'}
          title={en ? 'Why AI+VFX' : 'Почему AI+VFX'}
          titleIt={en ? '— is the future' : '— это будущее'}
          side={en
            ? 'We compare traditional production and our AI+VFX pipeline across five axes.'
            : 'Сравниваем традиционный продакшен и наш AI+VFX пайплайн по пяти осям.'}
          sideTitle="COMPARISON"
        />

        <div className="about-grid reveal">
          <div className="about-side">
            <h2>
              {en ? 'The old world' : 'Старый мир'}<br />
              <span className="it">{en ? 'and the new world' : 'и новый мир'}</span>
            </h2>
            <p>
              {en
                ? 'Traditional production means weeks of pre-production, shooting days, location rentals and a month of post. We rebuilt the pipeline so that 90% of the process happens inside the computer.'
                : 'Традиционный продакшен — это недели препрода, съёмочные дни, аренда локаций и месяц пост-продакшена. Мы перестроили пайплайн так, чтобы 90% процесса происходило в компьютере.'}
            </p>
            <p>
              {en
                ? 'The result: 10× faster, 70% cheaper, with quality indistinguishable from a studio shoot.'
                : 'Результат: быстрее в 10 раз, дешевле на 70%, с качеством, неотличимым от студийной съёмки.'}
            </p>
          </div>

          <div className="compare">
            <div className="compare-col bad">
              <h4>⊖ <span className="label">{en ? 'Traditional' : 'Традиционно'}</span></h4>
              <ul>{COMPARE_OLD_L.map((c, i) => <li key={i}>{c}</li>)}</ul>
              <div className="compare-stat">
                <div className="compare-stat-cell"><div className="v">2–6</div><div className="l">{en ? 'weeks' : 'недель'}</div></div>
                <div className="compare-stat-cell"><div className="v">100%</div><div className="l">{en ? 'cost' : 'стоимость'}</div></div>
              </div>
            </div>
            <div className="compare-col good">
              <h4>⊕ <span className="label" style={{ color: 'var(--accent)' }}>AIVFX</span></h4>
              <ul>{COMPARE_NEW_L.map((c, i) => <li key={i}>{c}</li>)}</ul>
              <div className="compare-stat">
                <div className="compare-stat-cell"><div className="v">1–5</div><div className="l">{en ? 'days' : 'дней'}</div></div>
                <div className="compare-stat-cell"><div className="v">30%</div><div className="l">{en ? 'cost' : 'стоимость'}</div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="faq reveal">
          <h3>{en ? 'Frequently asked' : 'Частые'}<br /><span className="it">{en ? 'questions' : 'вопросы'}</span></h3>
          <div className="faq-list">
            {FAQ_ITEMS_L.map((item, i) => (
              <div
                key={i}
                className={`faq-item ${openIdx === i ? 'open' : ''}`}
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              >
                <div className="head">
                  <span className="q">{item.q}</span>
                  <span className="ic">+</span>
                </div>
                <div className="body"><p>{item.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
