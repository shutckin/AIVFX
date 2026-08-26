import React from 'react';
import SecHead from './SecHead';
import { SERVICES_SYS } from '../data/systems-content';
import { useLocale, pick, localizedHref } from '../i18n';
import './services-systems.css';

// Секция «Услуги» нового позиционирования: три крупные карточки-направления.
// Каждая карточка — обычная ссылка на /services/<slug>/ (полная перезагрузка, prerender).
const ServicesSystems = () => {
  const L = useLocale();
  const { head, items, more } = SERVICES_SYS;

  return (
    <section className="section" id="services">
      <div className="shell">
        <SecHead
          num={pick(L, head.num)}
          title={pick(L, head.title)}
          titleIt={pick(L, head.titleIt)}
          side={pick(L, head.side)}
          sideTitle={head.sideTitle}
        />

        <div className="ss-grid">
          {items.map((item) => (
            <a
              key={item.slug}
              href={localizedHref(`/services/${item.slug}/`, L)}
              className="ss-card reveal"
            >
              <span className="ss-num mono">{item.num}</span>
              <h3 className="ss-title">{pick(L, item.title)}</h3>
              <p className="ss-desc">{pick(L, item.desc)}</p>
              <div className="ss-chips">
                {item.chips.map((chip) => (
                  <span key={chip} className="ss-chip mono">{chip}</span>
                ))}
              </div>
              <span className="ss-more mono">
                {pick(L, more)}
                <span className="ss-more-arrow">↗</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSystems;
