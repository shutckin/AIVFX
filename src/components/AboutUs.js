import React, { useState } from 'react';
import { COMPARE_OLD, COMPARE_NEW, FAQ_ITEMS } from '../data/content';

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

  return (
    <section className="section" id="about">
      <div className="shell">
        <SecHead
          num="[ 03 / ПРОЦЕСС ]"
          title="Почему AI+VFX"
          titleIt="— это будущее"
          side="Сравниваем традиционный продакшен и наш AI+VFX пайплайн по пяти осям."
          sideTitle="COMPARISON"
        />

        <div className="about-grid reveal">
          <div className="about-side">
            <h2>Старый мир<br /><span className="it">и новый мир</span></h2>
            <p>
              Традиционный продакшен — это недели препрода, съёмочные дни, аренда локаций и месяц пост-продакшена.
              Мы перестроили пайплайн так, чтобы 90% процесса происходило в компьютере.
            </p>
            <p>
              Результат: быстрее в 10 раз, дешевле на 70%, с качеством, неотличимым от студийной съёмки.
            </p>
          </div>

          <div className="compare">
            <div className="compare-col bad">
              <h4>⊖ <span className="label">Традиционно</span></h4>
              <ul>{COMPARE_OLD.map((c, i) => <li key={i}>{c}</li>)}</ul>
              <div className="compare-stat">
                <div className="compare-stat-cell"><div className="v">2–6</div><div className="l">недель</div></div>
                <div className="compare-stat-cell"><div className="v">100%</div><div className="l">стоимость</div></div>
              </div>
            </div>
            <div className="compare-col good">
              <h4>⊕ <span className="label" style={{ color: 'var(--accent)' }}>AIVFX</span></h4>
              <ul>{COMPARE_NEW.map((c, i) => <li key={i}>{c}</li>)}</ul>
              <div className="compare-stat">
                <div className="compare-stat-cell"><div className="v">1–5</div><div className="l">дней</div></div>
                <div className="compare-stat-cell"><div className="v">30%</div><div className="l">стоимость</div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="faq reveal">
          <h3>Частые<br /><span className="it">вопросы</span></h3>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
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
