import React from 'react';
import SecHead from './SecHead';
import ScrollReel from './ScrollReel';
import { useLocale, pick } from '../i18n';
import { APPROACH_SYS } from '../data/systems-content';
import './cases-approach.css';

// ── Секция «Подход» ──────────────────────────────────────────────────────
//
// Раньше это был вертикальный таймлайн из пяти шагов мелким текстом.
// Теперь те же пять шагов идут крупно поверх полноэкранного ролика,
// который перематывается прокруткой - как на странице видеопродакшна.
// Механика общая, живёт в ScrollReel; здесь только содержание.

const VIDEO_SRC = '/process/approach.mp4';
const VIDEO_LIGHT_SRC = '/process/approach-lq.mp4';
const POSTER_SRC = '/process/approach-poster.jpg';

// Короткая подпись к каждому шагу для полосы прогресса справа:
// полные заголовки там не помещаются
const RAIL = [
  { ru: 'разбор', en: 'mapping' },
  { ru: 'узкие места', en: 'bottlenecks' },
  { ru: 'проект', en: 'design' },
  { ru: 'внедрение', en: 'deploy' },
  { ru: 'метрики', en: 'metrics' },
];

const Approach = () => {
  const L = useLocale();
  const { head, steps } = APPROACH_SYS;

  const renderStep = (i) => {
    const step = steps[i];
    return (
      <>
        <span className="vpf-step-ghost" aria-hidden="true">{step.num}</span>

        <div className="vpf-step-head">
          <span className="vpf-step-num mono">{step.num}</span>
        </div>

        <h3 className="vpf-step-title">{pick(L, step.title)}</h3>
        <p className="vpf-step-desc">{pick(L, step.desc)}</p>
      </>
    );
  };

  return (
    <section className="section vp-band--flow" id="approach">
      <div className="shell">
        <SecHead
          num={pick(L, head.num)}
          title={pick(L, head.title)}
          titleIt={pick(L, head.titleIt)}
        />
      </div>

      <ScrollReel
        videoSrc={VIDEO_SRC}
        lightSrc={VIDEO_LIGHT_SRC}
        posterSrc={POSTER_SRC}
        count={steps.length}
        renderStep={renderStep}
        railLabels={RAIL.map((r) => pick(L, r))}
        label={L === 'en'
          ? 'How we build a system, from mapping the process to measuring results'
          : 'Как мы собираем систему, от разбора процесса до метрик'}
      />
    </section>
  );
};

export default Approach;
