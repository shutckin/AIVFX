import React, { useEffect, useRef } from 'react';
import SecHead from './SecHead';
import ModeToggle from './ModeToggle';
import { useLocale, pick, localizedHref } from '../i18n';
import { VIDEO_PAGE } from '../data/systems-content';
import { SERVICES, PRICING, TESTIMONIALS, CLIENTS } from '../data/content';
import { SERVICES_EN, PRICING_EN, TESTIMONIALS_EN, CLIENTS_EN } from '../data/content-en';
import { localizedProjects } from '../data/projects';
import './video-production.css';

// Страница второго направления — AI-контент (/video-production/).
// Визуальная витрина: hero + видео-marquee из портфолио + компактные услуги + тарифы + отзывы.

// Ленивое видео: играет только когда попадает в viewport (паттерн из Portfolio)
const LazyVideo = ({ src, title }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={title}
    />
  );
};

const TechBadges = ({ tech }) => {
  if (tech === 'AI+VFX') {
    return (
      <>
        <span className="tag tag-ai">AI</span>
        <span className="tag tag-vfx">VFX</span>
      </>
    );
  }
  if (tech === 'AI') return <span className="tag tag-ai">AI</span>;
  return <span className="tag tag-vfx">VFX</span>;
};

// Карточка в marquee: клик ведёт на страницу портфолио, без модалки
const MarqueeCard = ({ project, href }) => (
  <a className="project vp2-card" href={href}>
    <div className="thumb-wrap">
      <LazyVideo src={project.preview} title={project.title} />
      <div className="badges"><TechBadges tech={project.tech} /></div>
      <span className="duration">{project.duration}</span>
    </div>
    <div className="info">
      <div className="row">
        <span className="cat">{project.cat}</span>
        <span>{project.duration}</span>
      </div>
      <h3>{project.title}</h3>
    </div>
  </a>
);

const VideoProduction = () => {
  const L = useLocale();
  const en = L === 'en';

  const SERVICES_L = en ? SERVICES_EN : SERVICES;
  const PRICING_L = en ? PRICING_EN : PRICING;
  const TESTIMONIALS_L = en ? TESTIMONIALS_EN : TESTIMONIALS;
  const CLIENTS_L = en ? CLIENTS_EN : CLIENTS;

  const PROJECTS_L = localizedProjects(L);
  const row1 = PROJECTS_L.slice(0, 10);
  const row2 = PROJECTS_L.slice(10);

  // SEO: заголовок и описание страницы
  useEffect(() => {
    document.title = en ? 'AI Content — AIVFX' : 'AI-контент — AIVFX';
    let meta = document.head.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', pick(L, VIDEO_PAGE.sub));
  }, [L, en]);

  const contactHref = `${localizedHref('/', L)}#contact`;
  const worksHref = localizedHref('/works/', L);

  return (
    <div className="vp-page">
      <div className="shell">
        {/* Верхняя строка: назад + тумблер направлений */}
        <div className="vp2-topbar">
          <a href={localizedHref('/', L)} className="mono vp2-home">
            ← AIVFX
          </a>
          <ModeToggle mode="content" />
        </div>

        {/* Hero */}
        <header className="vp-hero">
          <span className="kicker kicker-accent">
            {en ? 'DIRECTION 02 / AI CONTENT' : 'НАПРАВЛЕНИЕ 02 / AI-КОНТЕНТ'}
          </span>
          <h1 className="vp-title">
            {pick(L, VIDEO_PAGE.title)} <span className="it">{pick(L, VIDEO_PAGE.titleIt)}</span>
          </h1>
          <p className="vp-sub">{pick(L, VIDEO_PAGE.sub)}</p>
          <div className="vp-cta-row">
            <a className="btn btn-primary" href={worksHref}>
              {pick(L, VIDEO_PAGE.portfolioCta)} <span className="btn-arrow">↗</span>
            </a>
            <a className="btn btn-ghost" href={contactHref}>
              {pick(L, VIDEO_PAGE.contactCta)} <span className="btn-arrow">↗</span>
            </a>
          </div>
        </header>
      </div>

      {/* Видео-витрина: два встречных ряда автоиграющих превью */}
      <section className="vp2-marquee" aria-label={en ? 'Selected works' : 'Избранные работы'}>
        {row1.length > 0 && (
          <div className="marquee-row">
            <div className="marquee-track">
              {[...row1, ...row1].map((p, i) => (
                <MarqueeCard key={`r1-${p.id}-${i}`} project={p} href={worksHref} />
              ))}
            </div>
          </div>
        )}
        {row2.length > 0 && (
          <div className="marquee-row">
            <div className="marquee-track">
              {[...row2, ...row2].map((p, i) => (
                <MarqueeCard key={`r2-${p.id}-${i}`} project={p} href={worksHref} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Что делаем: компактные чипы-строки вместо карточной сетки */}
      <section className="section vp2-services">
        <div className="shell">
          <span className="sec-num vp2-services-label">
            {en ? '[ 01 / WHAT WE DO ]' : '[ 01 / ЧТО ДЕЛАЕМ ]'}
          </span>
          <div className="vp2-chip-grid reveal">
            {SERVICES_L.map((s, i) => (
              <div key={i} className="vp2-chip">
                <span className="vp2-chip-num">{s.num}</span>
                <span className="vp2-chip-title">{s.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section className="section">
        <div className="shell">
          <SecHead
            num={en ? '[ 02 / PRICING ]' : '[ 02 / ТАРИФЫ ]'}
            title={en ? 'Transparent' : 'Прозрачные'}
            titleIt={en ? 'pricing' : 'тарифы'}
            side={en
              ? 'Fixed packages for videos of any complexity — from a quick test to a flagship brand film.'
              : 'Фиксированные пакеты под ролики любой сложности — от быстрого теста до флагманского фильма бренда.'}
            sideTitle="PRICING"
          />
          <div className="pricing">
            {PRICING_L.map((p, i) => (
              <div key={i} className={`price-card ${p.popular ? 'featured' : ''} reveal`}>
                {p.popular && <span className="badge">{en ? 'Popular' : 'Популярный'}</span>}
                <h4>{p.name}</h4>
                <div className="price-row">
                  <span className="price-amt">{p.price}</span>
                  <span className="price-per">{p.per}</span>
                </div>
                <p className="desc">{p.desc}</p>
                <span className="timing"><span className="dot" />{en ? `Ready in ${p.timing}` : `Готово за ${p.timing}`}</span>
                <ul>
                  {p.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
                <a
                  className={`btn ${p.popular ? 'btn-primary' : 'btn-ghost'}`}
                  href={contactHref}
                  style={{ justifyContent: 'center', width: '100%' }}
                >
                  {en ? 'Start a project' : 'Начать проект'} <span className="btn-arrow">↗</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы и клиенты */}
      <section className="section">
        <div className="shell">
          <SecHead
            num={en ? '[ 03 / CLIENTS ]' : '[ 03 / КЛИЕНТЫ ]'}
            title={en ? 'Brands that' : 'Нам доверяют'}
            titleIt={en ? 'trust us' : 'свои бренды'}
            side={en
              ? 'From German automotive giants to Gulf developers — we work with those who need speed without compromise.'
              : 'От немецких автоконцернов до арабских девелоперов — мы работаем с теми, кому важна скорость без компромиссов.'}
            sideTitle="TRUST"
          />
          <div className="testi-grid reveal">
            {TESTIMONIALS_L.map((t) => (
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
            {CLIENTS_L.map((c, i) => (
              <div key={i} className="client-cell">{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Финал: строка про блог + кнопка на портфолио */}
      <div className="shell">
        <div className="vp-blog-note reveal">
          <p>{pick(L, VIDEO_PAGE.blogNote)}</p>
          <a href={localizedHref('/blog/', L)} className="mono vp-blog-link">
            → {en ? 'Blog' : 'Блог'}
          </a>
          <span className="vp2-foot-spacer" />
          <a className="btn btn-ghost" href={worksHref}>
            {en ? 'View full portfolio' : 'Смотреть всё портфолио'} <span className="btn-arrow">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoProduction;
