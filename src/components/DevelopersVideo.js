import React, { useEffect, useState } from 'react';
import SecHead from './SecHead';
import LazyVideo from './LazyVideo';
import Pic from './Pic';
import {
  DEV_PAGE, DEV_WORKS, DEV_FRAMES, DEV_SCENES, DEV_PRICES, DEV_LAW, DEV_STEPS,
} from '../data/developers-video';
import './video-production.css';
import './developers-video.css';

// Страница «ИИ-ролики для ЖК» (/video-production/zastroyshchikam/).
// Только русская (см. isRuOnly в i18n.js). Палитра - янтарная, как у
// всего направления AI-видео (.vp-page).

// Карточка ролика: до клика крутится трёхсекундное превью, по клику
// на его месте открывается полный ролик с Kinescope. Плеер не грузится
// заранее: четыре iframe сразу съели бы загрузку страницы.
const WorkCard = ({ item }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <article className={`dv-work${item.vertical ? ' dv-work--vertical' : ''}`}>
      <div className="dv-work-media">
        {playing ? (
          <iframe
            src={`${item.embed}?autoplay=1`}
            title={item.title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media;"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="dv-work-play"
            onClick={() => setPlaying(true)}
            aria-label={`${DEV_PAGE.watch} «${item.title}»`}
          >
            <LazyVideo src={item.preview} title={item.title} />
            <span className="dv-work-btn" aria-hidden="true">▶</span>
            <span className="dv-work-dur">{item.duration}</span>
          </button>
        )}
      </div>
      <h3 className="dv-work-title">{item.title}</h3>
      <p className="dv-work-desc">{item.desc}</p>
    </article>
  );
};

const DevelopersVideo = () => {
  // SEO: заголовок и описание страницы
  useEffect(() => {
    document.title = DEV_PAGE.seoTitle;
    let meta = document.head.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', DEV_PAGE.seoDescription);
  }, []);

  const contactHref = '/video-production/#contact';

  return (
    <div className="vp-page dv-page">
      <div className="shell">
        <nav className="dv-topnav" aria-label={DEV_PAGE.nav}>
          <a className="dv-back" href="/video-production/">{DEV_PAGE.back}</a>
        </nav>

        <header className="dv-hero">
          <span className="kicker kicker-accent">{DEV_PAGE.kicker}</span>
          <h1 className="dv-title display">
            {`${DEV_PAGE.title} `}
            <span className="accent">{DEV_PAGE.titleIt}</span>
          </h1>
          <p className="dv-sub">{DEV_PAGE.sub}</p>
          <div className="dv-actions">
            <a className="btn btn-primary" href={contactHref}>
              {DEV_PAGE.ctaPrimary}<span className="btn-arrow">↗</span>
            </a>
            <a className="btn btn-ghost" href="#works">{DEV_PAGE.ctaSecondary}</a>
          </div>
        </header>

        <section className="dv-section" id="works">
          <SecHead num={DEV_WORKS.head.num} title={DEV_WORKS.head.title} titleIt={DEV_WORKS.head.titleIt} />
          <p className="dv-note">{DEV_WORKS.note}</p>
          <div className="dv-works">
            {DEV_WORKS.items.map((item) => <WorkCard key={item.embed} item={item} />)}
          </div>
        </section>

        <section className="dv-section">
          <SecHead num={DEV_SCENES.head.num} title={DEV_SCENES.head.title} titleIt={DEV_SCENES.head.titleIt} />
          <div className="dv-grid">
            {DEV_SCENES.items.map((s, i) => (
              <div className="dv-cell" key={s.t}>
                <span className="dv-cell-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="dv-cell-t">{s.t}</h3>
                <p className="dv-cell-d">{s.d}</p>
              </div>
            ))}
          </div>
          {/* Три кадра из роликов: сразу видно, что значит «сцены жизни» */}
          <div className="dv-trio">
            {DEV_FRAMES.trio.map((f) => (
              <figure className="dv-frame" key={f.src}>
                <Pic src={f.src} alt={f.alt} width={1200} height={1500} sizes="(max-width: 600px) 100vw, 33vw" />
              </figure>
            ))}
          </div>
          <p className="dv-note">{DEV_FRAMES.caption}</p>
        </section>

        <figure className="dv-frame dv-frame--wide">
          <Pic src={DEV_FRAMES.wide.src} alt={DEV_FRAMES.wide.alt} width={1920} height={1080} sizes="100vw" />
        </figure>

        <section className="dv-section">
          <SecHead num={DEV_PRICES.head.num} title={DEV_PRICES.head.title} titleIt={DEV_PRICES.head.titleIt} />
          <div className="dv-prices">
            {DEV_PRICES.items.map((p) => (
              <div className="dv-price" key={p.t}>
                <h3 className="dv-price-t">{p.t}</h3>
                <span className="dv-price-v">{p.price}</span>
                <span className="dv-price-term">{p.term}</span>
                <p className="dv-price-d">{p.d}</p>
              </div>
            ))}
          </div>
          <p className="dv-note">{DEV_PRICES.note}</p>
        </section>

        <section className="dv-section dv-law">
          <SecHead num={DEV_LAW.head.num} title={DEV_LAW.head.title} titleIt={DEV_LAW.head.titleIt} />
          <p className="dv-law-lead">{DEV_LAW.lead}</p>
          <ul className="dv-law-list">
            {DEV_LAW.items.map((text) => <li key={text}>{text}</li>)}
          </ul>
          <a className="dv-law-more" href={DEV_LAW.moreHref}>
            {DEV_LAW.more} <span aria-hidden="true">→</span>
          </a>
        </section>

        <figure className="dv-frame dv-frame--wide">
          <Pic src={DEV_FRAMES.family.src} alt={DEV_FRAMES.family.alt} width={1920} height={1080} sizes="100vw" />
        </figure>

        <section className="dv-section">
          <SecHead num={DEV_STEPS.head.num} title={DEV_STEPS.head.title} titleIt={DEV_STEPS.head.titleIt} />
          <ol className="dv-steps">
            {DEV_STEPS.items.map((s) => (
              <li className="dv-step" key={s.t}>
                <h3 className="dv-step-t">{s.t}</h3>
                <p className="dv-step-d">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="dv-cta">
          <h2 className="dv-cta-title display">{DEV_PAGE.ctaPrimary}</h2>
          <p className="dv-cta-sub">{DEV_PAGE.ctaSub}</p>
          <a className="btn btn-primary" href={contactHref}>
            {DEV_PAGE.ctaBtn}<span className="btn-arrow">↗</span>
          </a>
        </section>
      </div>
    </div>
  );
};

export default DevelopersVideo;
