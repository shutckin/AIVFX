import React from 'react';
import ScrollReel from './ScrollReel';
import { useLocale, pick } from '../i18n';
import { VIDEO_PROCESS } from '../data/systems-content';

// ── Блок «Как рождается ролик» ─────────────────────────────────────────
//
// Пять этапов производства поверх полноэкранного ролика. Вся механика
// пролёта живёт в ScrollReel, здесь только содержание шагов.

const VIDEO_SRC = '/process/reel.mp4';
const VIDEO_LIGHT_SRC = '/process/reel-lq.mp4';
const POSTER_SRC = '/process/reel-poster.jpg';

// Запасные кадры по одному на шаг. Нужны, если ролик не загрузился:
// у зрителя вместо чёрного экрана остаётся понятная картинка этапа.
const FALLBACK_SHOTS = [
  '/process/p01-moodboard.jpg',
  '/process/p02-storyboard.jpg',
  '/process/p03-rough.jpg',
  '/process/p04-grade.jpg',
  '/process/p05-final.jpg',
];

const ProcessFlow = () => {
  const L = useLocale();
  const steps = VIDEO_PROCESS.steps;
  const outLabel = L === 'en' ? 'You get' : 'На выходе';

  const renderStep = (i) => {
    const s = steps[i];
    return (
      <>
        <span className="vpf-step-ghost" aria-hidden="true">{s.num}</span>

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
          {`${outLabel} · ${pick(L, s.out)}`}
        </span>
      </>
    );
  };

  return (
    <>
      <div className="shell">
        <p className="vpf-lead reveal">{pick(L, VIDEO_PROCESS.lead)}</p>
      </div>

      <ScrollReel
        videoSrc={VIDEO_SRC}
        lightSrc={VIDEO_LIGHT_SRC}
        posterSrc={POSTER_SRC}
        count={steps.length}
        renderStep={renderStep}
        railLabels={steps.map((s) => pick(L, s.out))}
        fallbackShots={FALLBACK_SHOTS}
        label={L === 'en'
          ? 'How a commercial is made, from brief to final frame'
          : 'Как рождается ролик, от брифа до финального кадра'}
      />
    </>
  );
};

export default ProcessFlow;
