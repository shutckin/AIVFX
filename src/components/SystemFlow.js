import React from 'react';
import SecHead from './SecHead';
import { useLocale, pick } from '../i18n';
import { FLOW_SYS } from '../data/systems-content';
import './flow-graph.css';

// ── Секция «Система» — живой граф узлов (workflow-канвас в духе n8n) ─────
// Desktop: absolute-узлы на точечной сетке + SVG-кривые Безье с бегущими
// импульсами. Mobile/tablet: чипы источников → вертикальный рельс стадий.

// Координаты связей — в той же %-логике, что узлы:
// viewBox 0 0 1000 600, X = left% * 10, Y = top% * 6.
// Порты источников: x=135 (правый край колонки), y = top% * 6.
// Вход Intake: (190, 300). Дальше зигзаг: Intake → Qualification → CRM →
// Routing и вилка Routing → Follow-up (вверх) / Analytics (вниз).
const WIRES = [
  // источники → AI Intake (шесть кривых с разным темпом импульса)
  { id: 's1', d: 'M135,66 C180,66 145,300 190,300', dur: '4.6s' },
  { id: 's2', d: 'M135,156 C180,156 145,300 190,300', dur: '3.4s' },
  { id: 's3', d: 'M135,246 C180,246 145,300 190,300', dur: '4.1s' },
  { id: 's4', d: 'M135,336 C180,336 145,300 190,300', dur: '3.8s' },
  { id: 's5', d: 'M135,426 C180,426 145,300 190,300', dur: '4.9s' },
  { id: 's6', d: 'M135,516 C180,516 145,300 190,300', dur: '3.1s' },
  // цепочка стадий
  { id: 'c1', d: 'M330,300 C390,300 285,180 345,180', dur: '3.6s' }, // Intake → Qualification
  { id: 'c2', d: 'M485,180 C545,180 445,408 505,408', dur: '4.4s' }, // Qualification → CRM
  { id: 'c3', d: 'M645,408 C705,408 600,240 660,240', dur: '3.9s' }, // CRM → Routing
  // вилка
  { id: 'f1', d: 'M800,240 C860,240 780,78 840,78', dur: '4.7s' },   // Routing → Follow-up
  { id: 'f2', d: 'M800,240 C860,240 780,432 840,432', dur: '3.3s' }, // Routing → Analytics
];

// у каких стадий есть выходной порт (конечные узлы вилки — без выхода)
const HAS_OUT = ['intake', 'qualification', 'crm', 'routing'];

const SystemFlow = () => {
  const L = useLocale();
  const { head, sources, stages } = FLOW_SYS;

  const sourceLabel = (s) => (typeof s === 'string' ? s : pick(L, s));

  return (
    <section className="section sf2-band" id="system">
      <div className="shell">
        <SecHead
          num={pick(L, head.num)}
          title={pick(L, head.title)}
          titleIt={pick(L, head.titleIt)}
          side={pick(L, head.side)}
          sideTitle={head.sideTitle}
        />

        {/* ── Канвас графа (desktop ≥1024) ── */}
        <div className="sf2-canvas reveal">
          <svg
            className="sf2-svg"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* базовые нити */}
            {WIRES.map((w) => (
              <path key={w.id} className="sf2-wire" d={w.d} vectorEffect="non-scaling-stroke" />
            ))}
            {/* бегущие импульсы поверх нитей */}
            {WIRES.map((w) => (
              <path
                key={`${w.id}-pulse`}
                className="sf2-pulse"
                d={w.d}
                vectorEffect="non-scaling-stroke"
                style={{ animationDuration: w.dur }}
              />
            ))}
          </svg>

          {/* столбец узлов-источников */}
          {sources.map((s, i) => (
            <div className={`sf2-node sf2-src sf2-src-${i + 1} mono`} key={`src-${i}`}>
              {sourceLabel(s)}
              {/* пульс — у WhatsApp, чтобы канвас «дышал» */}
              <span className={`sf2-port sf2-port--out${i === 1 ? ' sf2-port--beat' : ''}`} aria-hidden="true" />
            </div>
          ))}

          {/* крупные узлы-стадии */}
          {stages.map((stage, i) => (
            <div className={`sf2-node sf2-stage sf2-node--${stage.key}`} key={stage.key}>
              <span
                className={`sf2-port sf2-port--in${stage.key === 'analytics' ? ' sf2-port--beat' : ''}`}
                aria-hidden="true"
              />
              {HAS_OUT.includes(stage.key) && (
                <span
                  className={`sf2-port sf2-port--out${stage.key === 'intake' ? ' sf2-port--beat' : ''}`}
                  aria-hidden="true"
                />
              )}
              <div className="sf2-stage-head">
                <span className="sf2-stage-num mono">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="sf2-stage-title mono">{stage.title}</h3>
                {stage.key === 'analytics' && <span className="sf2-live mono">LIVE</span>}
              </div>
              <p className="sf2-stage-desc">{pick(L, stage.desc)}</p>
            </div>
          ))}
        </div>

        {/* ── Вертикальная версия (<1024) ── */}
        <div className="sf2-mobile reveal">
          <div className="sf2-m-sources">
            {sources.map((s, i) => (
              <span className="sf2-m-chip mono" key={`mchip-${i}`}>
                {sourceLabel(s)}
              </span>
            ))}
          </div>

          <div className="sf2-m-arrow mono" aria-hidden="true">↓</div>

          <ol className="sf2-m-stages">
            {stages.map((stage, i) => (
              <li className="sf2-m-stage" key={`m-${stage.key}`}>
                <div className="sf2-stage-head">
                  <span className="sf2-stage-num mono">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="sf2-stage-title mono">{stage.title}</h3>
                  {stage.key === 'analytics' && <span className="sf2-live mono">LIVE</span>}
                </div>
                <p className="sf2-stage-desc">{pick(L, stage.desc)}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* подпись-итог */}
        <div className="sf2-result mono">
          {L === 'en' ? '→ measurable result' : '→ измеримый результат'}
        </div>
      </div>
    </section>
  );
};

export default SystemFlow;
