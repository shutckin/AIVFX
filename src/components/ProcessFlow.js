import React, { useEffect, useRef, useState } from 'react';
import { useLocale, pick } from '../i18n';
import { VIDEO_PROCESS } from '../data/systems-content';

// ── Блок «Как рождается ролик» ─────────────────────────────────────────
//
// Слева липкая сцена с одним кадром, справа шаги. Кадр — не абстракция,
// а сгенерированная раскадровка одного и того же продуктового ролика на
// пяти стадиях готовности: мудборд → карандашный сторибоард → плоский
// черновой рендер → грейд до/после → готовый рекламный кадр.
//
// Пока читаешь шаги (или водишь пальцем по сцене на телефоне), кадр
// кросс-фейдится в следующую стадию — история буквально листается.

const IMAGES = [
  '/process/p01-moodboard.jpg',
  '/process/p02-storyboard.jpg',
  '/process/p03-rough.jpg',
  '/process/p04-grade.jpg',
  '/process/p05-final.jpg',
];

const ProcessFlow = () => {
  const L = useLocale();
  const steps = VIDEO_PROCESS.steps;
  // Стартовое значение не зависит от браузера: первый рендер обязан
  // совпасть с предзарендеренной разметкой
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);
  const stageRef = useRef(null);

  // ── Активная стадия по прокрутке ──
  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
        }
        if (!best) return;
        const idx = nodes.indexOf(best.target);
        if (idx >= 0) setActive(idx);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.5, 1] }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  // ── Тонкая доводка стадии положением курсора / пальца над самой сценой ──
  // Прокрутка задаёт «какой шаг сейчас читается», а движение над картинкой
  // позволяет буквально провести историю вперёд-назад одним жестом —
  // то самое ощущение «ролик листается за движением».
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    let raf = 0;
    let pending = null;

    const apply = () => {
      raf = 0;
      if (pending == null) return;
      setActive(pending);
      pending = null;
    };

    const fromX = (clientX) => {
      const r = stage.getBoundingClientRect();
      if (r.width <= 0) return null;
      const t = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      return Math.min(steps.length - 1, Math.floor(t * steps.length));
    };

    const onMove = (e) => {
      const idx = fromX(e.clientX);
      if (idx == null) return;
      pending = idx;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onTouch = (e) => {
      const t = e.touches[0];
      if (!t) return;
      const idx = fromX(t.clientX);
      if (idx == null) return;
      pending = idx;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    stage.addEventListener('mousemove', onMove, { passive: true });
    stage.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('touchmove', onTouch);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [steps.length]);

  const current = steps[active] || steps[0];

  return (
    <div className="vpf">
      <p className="vpf-lead reveal">{pick(L, VIDEO_PROCESS.lead)}</p>

      <div className="vpf-grid">
        {/* ── Сцена: один и тот же ролик на пяти стадиях ── */}
        <div className="vpf-visual">
          <div className="vpf-stage" ref={stageRef}>
            {IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === IMAGES.length - 1
                  ? (L === 'en' ? 'Finished commercial frame' : 'Готовый рекламный кадр')
                  : ''}
                aria-hidden={i !== IMAGES.length - 1}
                className={`vpf-frame${i === active ? ' vpf-frame--on' : ''}`}
                width={1200}
                height={900}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
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

            <span className="vpf-scrub-hint mono" aria-hidden="true">
              {L === 'en' ? 'move to scrub' : 'веди курсором'}
            </span>
          </div>
        </div>

        {/* ── Шаги ── */}
        <ol className="vpf-steps">
          {steps.map((s, i) => (
            <li
              key={s.num}
              ref={(el) => { stepRefs.current[i] = el; }}
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
