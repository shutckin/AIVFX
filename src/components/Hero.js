import React, { useEffect, useRef, useState } from 'react';
import { useNotification } from '../App';
import { useLocale, pick } from '../i18n';
import { HERO_SYS, HERO_CHAT, TICKER_SYS } from '../data/systems-content';
import './hero-systems.css';

/* ── Параллакс телефона по курсору ──────────────────────────────────────
   Базовый наклон (телефон «в перспективе» в покое) задан в CSS,
   курсор добавляет к нему доворот в пределах ±MAX. */
const BASE_RY = -8;   // deg — базовый разворот по вертикальной оси
const BASE_RX = 3;    // deg — базовый наклон по горизонтальной оси
const MAX_RY = 9;     // deg — максимальный доворот курсором влево/вправо
const MAX_RX = 6;     // deg — максимальный доворот курсором вверх/вниз
const SHADOW_PX = 14; // px — насколько тень уезжает против наклона
const LERP = 0.08;    // коэффициент сглаживания: телефон «догоняет» курсор
const EPS = 0.01;     // порог, ниже которого считаем, что доводка закончена

const clamp = (v) => (v < -1 ? -1 : v > 1 ? 1 : v);

// Параллакс включаем только на настоящей мыши и при разрешённой анимации
const useTiltAllowed = () => {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(min-width: 769px) and (hover: hover) and (pointer: fine)');
    const sync = () => setAllowed(fine.matches && !reduce.matches);

    sync();
    reduce.addEventListener('change', sync);
    fine.addEventListener('change', sync);
    return () => {
      reduce.removeEventListener('change', sync);
      fine.removeEventListener('change', sync);
    };
  }, []);

  return allowed;
};

/* Слушаем mousemove на секции hero (а не на window — чтобы не считать зря),
   складываем координаты в переменные и один раз за кадр (rAF) лерпим
   текущие углы к целевым. Пишем результат в CSS-переменные --ry/--rx/--sx. */
const usePointerTilt = (sectionRef, stageRef, allowed) => {
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!allowed || !section || !stage) return undefined;

    let targetRy = 0;
    let targetRx = 0;
    let ry = 0;
    let rx = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pointerDirty = false;
    let raf = 0;

    const write = () => {
      stage.style.setProperty('--ry', `${(BASE_RY + ry).toFixed(2)}deg`);
      stage.style.setProperty('--rx', `${(BASE_RX + rx).toFixed(2)}deg`);
      // Тень уезжает в противоход развороту — читается как объём
      stage.style.setProperty('--sx', `${(-(BASE_RY + ry) / MAX_RY * SHADOW_PX).toFixed(2)}px`);
    };

    const frame = () => {
      raf = 0;

      // Пересчёт цели делаем только когда пришла новая позиция курсора
      if (pointerDirty) {
        pointerDirty = false;
        const r = section.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          const nx = clamp(((pointerX - r.left) / r.width - 0.5) * 2);
          const ny = clamp(((pointerY - r.top) / r.height - 0.5) * 2);
          targetRy = nx * MAX_RY;
          targetRx = -ny * MAX_RX;
        }
      }

      const dy = targetRy - ry;
      const dx = targetRx - rx;
      const settled = Math.abs(dy) < EPS && Math.abs(dx) < EPS;

      if (settled) {
        ry = targetRy;
        rx = targetRx;
      } else {
        ry += dy * LERP;
        rx += dx * LERP;
      }

      write();
      if (!settled) raf = requestAnimationFrame(frame);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      pointerDirty = true;
      schedule();
    };

    const onLeave = () => {
      targetRy = 0;
      targetRx = 0;
      pointerDirty = false;
      schedule();
    };

    section.addEventListener('mousemove', onMove, { passive: true });
    section.addEventListener('mouseleave', onLeave, { passive: true });

    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      // Возвращаем управление CSS — базовый наклон снова из стилей
      stage.style.removeProperty('--ry');
      stage.style.removeProperty('--rx');
      stage.style.removeProperty('--sx');
    };
  }, [sectionRef, stageRef, allowed]);
};

/* ── Лента сервисов, привязанная к скроллу ──────────────────────────────
   Раньше лента ехала бесконечной CSS-анимацией и в покое читалась как
   мигающая гирлянда. Теперь сдвиг считается из scrollY: листаешь — лента
   едет, остановился — замерла. Позиция берётся по модулю половины ширины
   трека (содержимое продублировано), поэтому стык не виден.  */
const TICKER_SPEED = 0.42; // px сдвига ленты на 1px скролла страницы

const useScrollTicker = (trackRef) => {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let half = 0;
    let raf = 0;

    const measure = () => {
      // Внутри трека контент лежит дважды — половина и есть длина петли
      half = track.scrollWidth / 2;
    };

    const apply = () => {
      raf = 0;
      if (!half) return;
      const shift = (window.scrollY * TICKER_SPEED) % half;
      track.style.transform = `translate3d(${-shift}px, 0, 0)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
      track.style.transform = '';
    };
  }, [trackRef]);
};

// Телефон с самопечатающимся чат-диалогом — главное продающее демо продукта
const HeroPhoneDemo = ({ sectionRef }) => {
  const L = useLocale();
  const stageRef = useRef(null);
  const tiltAllowed = useTiltAllowed();

  usePointerTilt(sectionRef, stageRef, tiltAllowed);

  return (
    <div className="hp-visual reveal" aria-hidden="true">
      <div className="hp-stage" ref={stageRef}>
        <span className="hp-shadow" />

        <div className="hp-phone">
          {/* Боковые кнопки корпуса */}
          <span className="hp-btn-vol" />
          <span className="hp-btn-vol" />
          <span className="hp-btn-pwr" />

          <div className="hp-screen">
            <div className="hp-notch" />

            <div className="hp-chat-head">
              <span className="hp-avatar">AI</span>
              <span className="hp-head-text">
                <span className="hp-name">AIVFX Assistant</span>
                <span className="hp-head-status">
                  {pick(L, { ru: 'online · отвечает мгновенно', en: 'online · replies instantly' })}
                </span>
              </span>
              <i className="hp-online-dot" />
            </div>

            <div className="hp-thread">
              {HERO_CHAT.map((m, i) => (
                <div key={i} className={`hp-msg hp-${m.from} hp-d${i}`}>
                  {m.from === 'ai' && (
                    <span className="hp-typing">
                      <i />
                      <i />
                      <i />
                    </span>
                  )}
                  {m.from === 'system' ? (
                    <span className="hp-sysrow hp-entry">
                      <span className="hp-sys-check">✓</span>
                      {pick(L, m.text)}
                    </span>
                  ) : (
                    <span className="hp-bubble hp-entry">
                      {pick(L, m.text)}
                      <span className="hp-time mono">{m.t}</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Плавающие «доказательства» — живут глубже экрана, при повороте расходятся */}
          <span className="hp-badge hp-badge-crm">
            <span className="hp-badge-in mono">
              <i className="hp-badge-dot hp-dot-ok" />
              {pick(L, { ru: 'CRM · сделка создана', en: 'CRM · deal created' })}
            </span>
          </span>

          <span className="hp-badge hp-badge-speed">
            <span className="hp-badge-in mono">
              <i className="hp-badge-dot hp-dot-accent" />
              {pick(L, { ru: 'Ответ 4 сек', en: 'Reply in 4s' })}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const { scrollToSection } = useNotification();
  const L = useLocale();
  const titleLines = pick(L, HERO_SYS.titleLines);
  const sectionRef = useRef(null);
  const tickerRef = useRef(null);

  useScrollTicker(tickerRef);

  return (
    <section className="hero hs-hero" id="hero" ref={sectionRef}>
      <div className="hs-bg" aria-hidden="true" />
      <span className="corner tl" />
      <span className="corner tr" />

      <div className="shell hs-hero-inner">
        <div className="hs-hero-grid">
          <div className="hs-copy reveal">
            <span className="kicker kicker-accent hs-kicker">{pick(L, HERO_SYS.kicker)}</span>

            <h1 className="hs-headline display">
              {titleLines.map((line, i) => (
                <span className="ln" key={i}>
                  {i === HERO_SYS.accentLineIndex
                    ? <span className="accent">{line}</span>
                    : line}
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

            {/* Один крючок под CTA — обещание ответа за 24 часа */}
            <p className="hs-offer">{pick(L, HERO_SYS.offer)}</p>
          </div>

          <HeroPhoneDemo sectionRef={sectionRef} />
        </div>
      </div>

      <div className="hero-ticker">
        <div className="hero-ticker-track" ref={tickerRef}>
          {[...TICKER_SYS, ...TICKER_SYS].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
