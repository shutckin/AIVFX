import React from 'react';
import { useNotification } from '../App';
import { SERVICES, PRICING } from '../data/content';

const SecHead = ({ num, title, titleIt, side, sideTitle }) => (
  <div className="sec-head reveal">
    <div className="sec-num">{num}</div>
    <h2 className="sec-title">
      {title} {titleIt && <span className="it">{titleIt}</span>}
    </h2>
    {side && (
      <div className="sec-side">
        {sideTitle && <span className="kicker">{sideTitle}</span>}
        <p>{side}</p>
      </div>
    )}
  </div>
);

const Services = () => {
  const { show: showNotification } = useNotification();

  return (
    <section className="section" id="services">
      <div className="shell">
        <SecHead
          num="[ 01 / УСЛУГИ ]"
          title="Шесть способов"
          titleIt="сделать кадр"
          side="AI-генерация, классический VFX и гибридные пайплайны. Мы не выбираем инструмент — мы выбираем результат."
          sideTitle="CAPABILITIES"
        />

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className="service-card reveal" onClick={showNotification}>
              <span className="num">{s.num}</span>
              <span className="glyph">{s.glyph}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="read">
                Узнать больше
                <span className="arrow">→</span>
              </span>
            </div>
          ))}
        </div>

        <div className="pricing">
          {PRICING.map((p, i) => (
            <div key={i} className={`price-card ${p.popular ? 'featured' : ''} reveal`}>
              {p.popular && <span className="badge">Популярный</span>}
              <h4>{p.name}</h4>
              <div className="price-row">
                <span className="price-amt">{p.price}</span>
                <span className="price-per">{p.per}</span>
              </div>
              <p className="desc">{p.desc}</p>
              <span className="timing"><span className="dot" />Готово за {p.timing}</span>
              <ul>
                {p.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <button
                className={`btn ${p.popular ? 'btn-primary' : 'btn-ghost'}`}
                onClick={showNotification}
                style={{ justifyContent: 'center', width: '100%' }}
              >
                Начать проект <span className="btn-arrow">↗</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
