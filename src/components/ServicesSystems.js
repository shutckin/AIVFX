import React from 'react';
import SecHead from './SecHead';
import { SERVICES_SYS } from '../data/systems-content';
import { useLocale, pick, localizedHref } from '../i18n';
import './services-systems.css';

// Секция «Услуги»: три белые карточки-направления (светлая тема).
// Сверху фото, ниже серый номер, название, короткое описание и синяя
// ссылка «Подробнее →». Вся карточка - обычная ссылка на /services/<slug>/
// (полная перезагрузка, prerender).
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
          sub={head.sub ? pick(L, head.sub) : null}
        />

        <div className="ss-grid">
          {items.map((item, i) => (
            <a
              key={item.slug}
              href={localizedHref(`/services/${item.slug}/`, L)}
              className="ss-card reveal"
            >
              {item.image && (
                <span className="ss-media">
                  <img
                    src={item.image}
                    alt={pick(L, item.imageAlt)}
                    width={1400}
                    height={1047}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: item.imagePos || '50% 50%' }}
                  />
                </span>
              )}
              <span className="ss-body">
                {/* Номер считаем по порядку: 01, 02, 03 */}
                <span className="ss-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="ss-title">{pick(L, item.title)}</h3>
                <p className="ss-desc">{pick(L, item.desc)}</p>
                <span className="ss-more">
                  {pick(L, more)}
                  <span className="ss-more-arrow" aria-hidden="true">→</span>
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSystems;
