import React, { useEffect, useRef, useState } from 'react';
import { useLocale, pick } from '../i18n';
import { VIDEO_PROCESS } from '../data/systems-content';

// ── Блок «Как рождается ролик» ─────────────────────────────────────────
//
// Слева липкий ролик, справа шаги. Ролик не играет сам по себе: он
// перематывается вместе с прокруткой. Листаешь текст вниз, и производство
// на экране идёт вперёд; листаешь вверх, и оно отматывается назад.
// Шаг, который сейчас читают, подсвечивается из того же прогресса, поэтому
// текст и картинка не могут разъехаться.
//
// Почему перемотка, а не обычное воспроизведение: у блока пять шагов и своя
// длина прокрутки, а у ролика своя длительность. Привязав одно к другому,
// получаем управление кадром вместо параллельно бегущего видео.

const VIDEO_SRC = '/process/reel.mp4';
const POSTER_SRC = '/process/reel-poster.jpg';

// Запасные кадры по одному на шаг. Нужны, если ролик не загрузился:
// у зрителя вместо чёрной дыры остаётся понятная картинка этапа.
const FALLBACK_SHOTS = [
  '/process/p01-moodboard.jpg',
  '/process/p02-storyboard.jpg',
  '/process/p03-rough.jpg',
  '/process/p04-grade.jpg',
  '/process/p05-final.jpg',
];

// Насколько быстро текущий кадр догоняет целевой. Меньше — плавнее,
// но заметнее отставание от прокрутки.
const CATCH_UP = 0.22;

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

const ProcessFlow = () => {
  const L = useLocale();
  const steps = VIDEO_PROCESS.steps;

  // Стартовое значение не зависит от браузера: первый рендер обязан
  // совпасть с предзарендеренной разметкой
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  // Целевая позиция в ролике, 0..1. Пишет скролл, читает анимация.
  const targetRef = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return undefined;

    const reduced = window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;

    // Прогресс прокрутки блока: 0 — шаги только начались,
    // 1 — последний шаг дочитан
    const readProgress = () => {
      const r = wrap.getBoundingClientRect();
      // Блок «проезжает» мимо экрана: считаем, какая его часть уже позади
      const travel = r.height - window.innerHeight;
      if (travel <= 0) return 0;
      return clamp01(-r.top / travel);
    };

    const applyStep = (p) => {
      const idx = Math.min(steps.length - 1, Math.floor(p * steps.length));
      setActive((prev) => (prev === idx ? prev : idx));
    };

    // Кадр за кадром подтягиваем ролик к целевой позиции. Резкое присвоение
    // currentTime на каждый пиксель прокрутки даёт рывки, поэтому догоняем
    // плавно и останавливаемся, когда разница перестала быть заметной.
    const tick = () => {
      raf = 0;
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const target = targetRef.current * (duration - 0.05);
      const diff = target - video.currentTime;

      if (Math.abs(diff) < 0.015) {
        video.currentTime = target;
        return;
      }

      video.currentTime += diff * CATCH_UP;
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const p = readProgress();
      targetRef.current = p;
      applyStep(p);

      if (reduced) return; // системная настройка: кадр не гоняем
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLoaded = () => {
      setReady(true);
      onScroll();
    };

    const onError = () => setFailed(true);

    if (video.readyState >= 1) onLoaded();
    else video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('error', onError);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('error', onError);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [steps.length]);

  const current = steps[active] || steps[0];

  return (
    <div className="vpf" ref={wrapRef}>
      <p className="vpf-lead reveal">{pick(L, VIDEO_PROCESS.lead)}</p>

      <div className="vpf-grid">
        {/* ── Ролик, привязанный к прокрутке ── */}
        <div className="vpf-visual">
          <div className={`vpf-stage${ready ? ' vpf-stage--ready' : ''}`}>
            <video
              ref={videoRef}
              className="vpf-video"
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              muted
              playsInline
              preload="auto"
              // Ролик управляется прокруткой, поэтому не играет сам
              // и не зациклен
              aria-label={L === 'en'
                ? 'How a commercial is made, from brief to final frame'
                : 'Как рождается ролик, от брифа до финального кадра'}
            />

            {failed && steps.map((s, i) => (
              <img
                key={s.num}
                className={`vpf-shot${i === active ? ' vpf-shot--on' : ''}`}
                src={FALLBACK_SHOTS[i] || FALLBACK_SHOTS[0]}
                alt={pick(L, s.title)}
                loading="lazy"
                width="720"
                height="960"
              />
            ))}

            <span className="vpf-stage-label mono">
              {`${current.num} · ${pick(L, current.out)}`}
            </span>

            <span className="vpf-track" aria-hidden="true">
              {steps.map((s, i) => (
                <span key={s.num} className={`vpf-tick${i <= active ? ' vpf-tick--on' : ''}`} />
              ))}
            </span>
          </div>
        </div>

        {/* ── Шаги ── */}
        <ol className="vpf-steps">
          {steps.map((s, i) => (
            <li
              key={s.num}
              className={`vpf-step${i === active ? ' vpf-step--on' : ''}`}
            >
              <div className="vpf-step-head">
                <span className="vpf-step-num mono">{s.num}</span>
                <span className="vpf-step-time mono">{pick(L, s.time)}</span>
              </div>

              <h3 className="vpf-step-title">{pick(L, s.title)}</h3>
              <p className="vpf-step-desc">{pick(L, s.desc)}</p>

              <ul className="vpf-step-list">
                {s.detail.map((d, j) => (
                  <li key={j}>{pick(L, d)}</li>
                ))}
              </ul>

              <span className="vpf-step-out mono">
                {`${L === 'en' ? 'You get' : 'На выходе'} · ${pick(L, s.out)}`}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ProcessFlow;
