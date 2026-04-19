import React from 'react';
import { TESTIMONIALS, CLIENTS } from '../data/content';

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

const Clients = () => {
  return (
    <section className="section" id="clients">
      <div className="shell">
        <SecHead
          num="[ 04 / КЛИЕНТЫ ]"
          title="Нам доверяют"
          titleIt="свои бренды"
          side="От немецких автоконцернов до арабских девелоперов — мы работаем с теми, кому важна скорость без компромиссов."
          sideTitle="TRUST"
        />

        <div className="testi-grid reveal">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className={`testi ${t.featured ? 'featured' : ''}`}>
              <span className="quote-mark">"</span>
              <span className="project-tag">◆ {t.project}</span>
              <p className="text">{t.text}</p>
              <div className="author">
                <span className="name">{t.name}</span>
                <span className="role">{t.role}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="client-row reveal">
          {CLIENTS.map((c, i) => (
            <div key={i} className="client-cell">{c}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
