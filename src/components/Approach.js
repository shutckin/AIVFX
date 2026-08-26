import React from 'react';
import SecHead from './SecHead';
import { useLocale, pick } from '../i18n';
import { APPROACH_SYS } from '../data/systems-content';
import './cases-approach.css';

// ── Секция «Подход» ──────────────────────────────────────────────────────
// Вертикальный таймлайн из 5 шагов: слева огромный полупрозрачный номер и
// линия с узлами-точками, справа заголовок + описание.
const Approach = () => {
  const L = useLocale();
  const { head, steps } = APPROACH_SYS;

  return (
    <section className="section" id="approach">
      <div className="shell">
        <SecHead
          num={pick(L, head.num)}
          title={pick(L, head.title)}
          titleIt={pick(L, head.titleIt)}
          side={pick(L, head.side)}
          sideTitle={head.sideTitle}
        />

        <ol className="ap-timeline">
          {steps.map((step, i) => (
            <li className="ap-step reveal" key={step.num}>
              <span className="ap-num mono" aria-hidden="true">{step.num}</span>
              <span className="ap-rail" aria-hidden="true">
                <span className="ap-node" />
                {i < steps.length - 1 && <span className="ap-line" />}
              </span>
              <div className="ap-body">
                <h3 className="ap-title">{pick(L, step.title)}</h3>
                <p className="ap-desc">{pick(L, step.desc)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Approach;
