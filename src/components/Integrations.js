import React from 'react';
import SecHead from './SecHead';
import { useLocale, pick } from '../i18n';
import { INTEGRATIONS_SYS } from '../data/systems-content';
import './cases-approach.css';

// ── Секция «Стек / интеграции» ───────────────────────────────────────────
// 4 группы инструментов: слева mono-лейбл группы, справа текстовые
// pill-бейджи. Никаких картинок-логотипов — только типографика.
const Integrations = () => {
  const L = useLocale();
  const { head, groups } = INTEGRATIONS_SYS;

  return (
    <section className="section" id="stack">
      <div className="shell">
        <SecHead
          num={pick(L, head.num)}
          title={pick(L, head.title)}
          titleIt={pick(L, head.titleIt)}
          side={pick(L, head.side)}
          sideTitle={head.sideTitle}
        />

        <div className="ig-rows">
          {groups.map((group) => (
            <div className="ig-row reveal" key={group.label}>
              <span className="ig-label mono">{group.label}</span>
              <div className="ig-badges">
                {group.items.map((name) => (
                  <span className="ig-badge mono" key={name}>{name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
