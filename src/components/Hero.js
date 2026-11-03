import React, { useEffect, useRef } from 'react';
import { useNotification } from '../App';
import { useLocale, pick } from '../i18n';
import { HERO_SYS, HERO_CHAT } from '../data/systems-content';
import './hero-systems.css';

/* ── Наклон телефона за курсором ────────────────────────────────────────
   Как в утверждённом макете: курсор над первым экраном слегка поворачивает
   телефон (до 12° по горизонтали и 8° по вертикали), курсор ушёл - телефон
   плавно вернулся прямо. Плавность даёт CSS-переход на .hp-tilt.
   Работает только на настоящей мыши и если человек не просил убрать анимацию. */
const TILT_Y = 12; // градусов - поворот влево/вправо
const TILT_X = 8;  // градусов - наклон вверх/вниз

const usePointerTilt = (sectionRef, stageRef, tiltRef) => {
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const tilt = tiltRef.current;
    if (!section || !stage || !tilt || !window.matchMedia) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduce || !mouse) return undefined;

    let raf = 0;
    let px = 0;
    let py = 0;

    // Пересчёт не чаще одного раза за кадр
    const apply = () => {
      raf = 0;
      const r = stage.getBoundingClientRect();
      const nx = (px - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const ny = (py - (r.top + r.height / 2)) / (window.innerHeight / 2);
      tilt.style.transform =
        `rotateY(${(nx * TILT_Y).toFixed(2)}deg) rotateX(${(-ny * TILT_X).toFixed(2)}deg)`;
    };

    const onMove = (e) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      tilt.style.transform = '';
    };

    section.addEventListener('mousemove', onMove, { passive: true });
    section.addEventListener('mouseleave', onLeave, { passive: true });

    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      tilt.style.transform = '';
    };
  }, [sectionRef, stageRef, tiltRef]);
};

// Светлый телефон с перепиской ассистента. Реплики появляются по очереди
// (цикл целиком на CSS, см. hero-systems.css), рядом две плашки-итога.
const HeroPhone = ({ sectionRef }) => {
  const L = useLocale();
  const stageRef = useRef(null);
  const tiltRef = useRef(null);
  const ph = HERO_SYS.phone;

  usePointerTilt(sectionRef, stageRef, tiltRef);

  return (
    <div className="hp-stage reveal" ref={stageRef} aria-hidden="true">
      <div className="hp-tilt" ref={tiltRef}>
        <div className="hp-phone">
          <div className="hp-screen">
            <div className="hp-top">
              <span className="hp-avatar">AI</span>
              <span className="hp-head">
                <b className="hp-name">{pick(L, ph.name)}</b>
                <span className="hp-status">{pick(L, ph.status)}</span>
              </span>
            </div>

            <div className="hp-msgs">
              {HERO_CHAT.map((m, i) => (
                m.from === 'system' ? (
                  <div key={i} className={`hp-m hp-sys hp-d${i}`}>
                    <i className="hp-sys-dot" />
                    <span>{pick(L, m.text)}</span>
                  </div>
                ) : (
                  <div key={i} className={`hp-m hp-${m.from} hp-d${i}`}>
                    <span>{pick(L, m.text)}</span>
                    <small className="hp-time">{m.t}</small>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        <div className="hp-badge hp-badge-crm">
          <i className="hp-badge-dot hp-dot-ok" />
          <span>{pick(L, ph.badgeCrm)}</span>
        </div>
        <div className="hp-badge hp-badge-speed">
          <i className="hp-badge-dot" />
          <span>{pick(L, ph.badgeSpeed)}</span>
        </div>
      </div>
    </div>
  );
};

// Заголовок: начало обычным цветом, фраза-акцент синим, всё после неё серым.
// Пробел между фразами живёт внутри текста фразы: отдельный текстовый узел
// с пробелом ломал гидратацию предзарендеренной страницы (#418).
const phraseClass = (i) => {
  if (i === HERO_SYS.accentLineIndex) return 'hs-h-accent';
  if (i > HERO_SYS.accentLineIndex) return 'hs-h-tail';
  return undefined;
};

const Hero = () => {
  const { scrollToSection } = useNotification();
  const L = useLocale();
  const titleLines = pick(L, HERO_SYS.titleLines);
  const [offerStrong, offerRest] = pick(L, HERO_SYS.offer);
  const sectionRef = useRef(null);

  return (
    <section className="hs-hero" id="hero" ref={sectionRef}>
      <div className="shell hs-grid">
        <div className="hs-copy reveal">
          <span className="hs-kick">
            <i className="hs-kick-dot" />
            <span>{pick(L, HERO_SYS.kicker)}</span>
          </span>

          <h1 className="hs-headline">
            {titleLines.map((line, i) => (
              <span key={i} className={phraseClass(i)}>
                {i < titleLines.length - 1 ? `${line} ` : line}
              </span>
            ))}
          </h1>

          <p className="hs-sub">{pick(L, HERO_SYS.sub)}</p>

          <div className="hs-actions">
            <button className="btn btn-primary" onClick={() => scrollToSection('contact')}>
              {pick(L, HERO_SYS.cta1)}
              <span className="btn-arrow">↗</span>
            </button>
            <button className="btn btn-ghost" onClick={() => scrollToSection('services')}>
              {pick(L, HERO_SYS.cta2)}
            </button>
          </div>

          {/* Один крючок под кнопками - обещание ответа за 24 часа */}
          <p className="hs-offer">
            <b>{offerStrong}</b>
            <span>{` ${offerRest}`}</span>
          </p>
        </div>

        <HeroPhone sectionRef={sectionRef} />
      </div>
    </section>
  );
};

export default Hero;
