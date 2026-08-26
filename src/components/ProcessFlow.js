import React, { useEffect, useRef, useState } from 'react';
import { useLocale, pick } from '../i18n';
import { VIDEO_PROCESS } from '../data/systems-content';

// ── Блок «Как рождается ролик» ─────────────────────────────────────────
//
// Слева липкая сцена, справа шаги. Пока читаешь шаги, сцена не уезжает,
// а перестраивается: одни и те же двенадцать кадров проходят весь путь
// от разрозненных референсов до собранного ролика.
//
//   01  россыпь референсов, разного размера и наклона
//   02  выстраиваются в ровную сетку раскадровки
//   03  сжимаются в ленту отснятых кадров
//   04  расходятся на дорожки монтажного стола
//   05  сходятся в один кадр: готовый ролик
//
// Метафора буквальная: зритель видит не пять картинок, а одну вещь,
// которая на глазах становится фильмом.

const FRAMES = 12;

// Разброс для первого состояния. Значения заданы руками, а не случайно:
// страница отдаётся предзарендеренной, и раскладка обязана совпадать
// с точностью до пикселя, иначе гидратация сломается.
const SCATTER = [
  { x: 4, y: 8, w: 26, h: 19, r: -7 },
  { x: 38, y: 3, w: 22, h: 16, r: 5 },
  { x: 66, y: 11, w: 28, h: 20, r: -4 },
  { x: 8, y: 33, w: 21, h: 15, r: 6 },
  { x: 34, y: 26, w: 27, h: 20, r: -3 },
  { x: 68, y: 38, w: 23, h: 17, r: 8 },
  { x: 3, y: 55, w: 25, h: 18, r: -6 },
  { x: 33, y: 52, w: 20, h: 15, r: 4 },
  { x: 60, y: 62, w: 26, h: 19, r: -8 },
  { x: 12, y: 76, w: 23, h: 17, r: 7 },
  { x: 41, y: 74, w: 27, h: 20, r: -5 },
  { x: 71, y: 83, w: 21, h: 15, r: 3 },
];

// Раскладка одного кадра для конкретного шага. Возвращает проценты
// внутри сцены, поэтому всё тянется вместе с ней на любом экране.
const layoutFor = (step, i) => {
  if (step <= 0) return { ...SCATTER[i], o: 1, accent: false };

  // 02 — ровная сетка раскадровки, 4 колонки на 3 ряда
  if (step === 1) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    return { x: 4 + col * 24, y: 12 + row * 27, w: 20, h: 15, r: 0, o: 1, accent: false };
  }

  // 03 — лента отснятых кадров; первые семь уже собраны, остальные ждут
  if (step === 2) {
    return { x: 2 + i * 8.1, y: 41, w: 7, h: 18, r: 0, o: i < 7 ? 1 : 0.28, accent: i < 7 };
  }

  // 04 — монтажный стол: три дорожки разной длины
  if (step === 3) {
    const track = Math.floor(i / 4);
    const pos = i % 4;
    const w = track === 0 ? 22 : track === 1 ? 18 : 20;
    return {
      x: 4 + pos * (w + 2.5),
      y: 26 + track * 18,
      w,
      h: 12,
      r: 0,
      o: 1,
      accent: track === 1,
    };
  }

  // 05 — всё сходится в один кадр: слои чуть смещены, виден только верхний
  return {
    x: 12 + i * 0.35,
    y: 27 + i * 0.25,
    w: 76,
    h: 43,
    r: 0,
    o: i === 0 ? 1 : 0.05,
    accent: i === 0,
  };
};

const ProcessFlow = () => {
  const L = useLocale();
  const steps = VIDEO_PROCESS.steps;
  // Стартовое значение не зависит от браузера: первый рендер обязан
  // совпасть с предзарендеренной разметкой
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean);
    if (!nodes.length) return undefined;

    // Активным считаем шаг, который ближе всех к середине экрана
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

  const current = steps[active] || steps[0];

  return (
    <div className="vpf">
      <p className="vpf-lead reveal">{pick(L, VIDEO_PROCESS.lead)}</p>

      <div className="vpf-grid">
        {/* ── Сцена ── */}
        <div className="vpf-visual">
          <div className="vpf-stage" aria-hidden="true">
            <div className="vpf-stage-inner">
              {Array.from({ length: FRAMES }, (_, i) => {
                const l = layoutFor(active, i);
                return (
                  <span
                    key={i}
                    className={`vpf-frame${l.accent ? ' vpf-frame--on' : ''}`}
                    style={{
                      left: `${l.x}%`,
                      top: `${l.y}%`,
                      width: `${l.w}%`,
                      height: `${l.h}%`,
                      opacity: l.o,
                      transform: `rotate(${l.r}deg)`,
                      transitionDelay: `${i * 22}ms`,
                    }}
                  />
                );
              })}
            </div>

            {/* Подпись текущего состояния сцены */}
            <span className="vpf-stage-label mono">
              {`${current.num} · ${pick(L, current.out)}`}
            </span>

            {/* Прогресс по этапам */}
            <span className="vpf-track">
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
