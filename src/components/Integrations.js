import React from 'react';
import SecHead from './SecHead';
import { useLocale, pick } from '../i18n';
import { INTEGRATIONS_SYS } from '../data/systems-content';
import './cases-approach.css';

// ── Секция «Стек / интеграции» ───────────────────────────────────────────
// Стек подан на языке выгоды: 4 карточки, у каждой заголовок-обещание,
// пояснение и ряд контурных чипов с названиями инструментов внизу.
// Никаких картинок-логотипов - только типографика.
const Integrations = () => {
  const L = useLocale();
  const { head, groups, note } = INTEGRATIONS_SYS;

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

        <div className="ig-grid">
          {groups.map((group) => {
            // Английские подписи инструментов там, где они отличаются
            // (Битрикс24 → Bitrix24, Сайт → Website). Если itemsEn нет -
            // берём общий список.
            const items = (L === 'en' && group.itemsEn) ? group.itemsEn : group.items;

            return (
              <article className="ig-card reveal" key={pick(L, group.label)}>
                <h3 className="ig-card-title">{pick(L, group.label)}</h3>
                <p className="ig-card-desc">{pick(L, group.desc)}</p>
                <div className="ig-chips">
                  {items.map((name) => (
                    <span className="ig-chip mono" key={name}>{name}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <p className="ig-note">{pick(L, note)}</p>
      </div>
    </section>
  );
};

export default Integrations;
