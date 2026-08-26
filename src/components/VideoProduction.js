import React, { useEffect, useRef, useState } from 'react';
import SecHead from './SecHead';
import ModeToggle from './ModeToggle';
import ContactForm from './ContactForm';
import { useLocale, pick, localizedHref } from '../i18n';
import { VIDEO_PAGE, VIDEO_FORMATS, VIDEO_FAQ } from '../data/systems-content';
import { STATS, SERVICES, COMPARE_OLD, COMPARE_NEW, TESTIMONIALS, CLIENTS } from '../data/content';
import {
  STATS_EN, SERVICES_EN, COMPARE_OLD_EN, COMPARE_NEW_EN, TESTIMONIALS_EN, CLIENTS_EN,
} from '../data/content-en';
import { localizedProjects } from '../data/projects';
import './video-production.css';

// Страница второго направления — AI-контент (/video-production/).
// v3: hero + marquee + полоса фактов + полные услуги + сравнение + форматы работы
// (без цен) + отзывы + FAQ + форма. Цены со страницы убраны полностью.

// Ленивое видео: играет только когда попадает в viewport (паттерн из Portfolio).
// При prefers-reduced-motion автоплей выключен — остаётся первый кадр.
const LazyVideo = ({ src, title }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Уважение к reduced motion: не автоплеим, показываем первый кадр
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return undefined;

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
  const [openFaq, setOpenFaq] = useState(0);

  const STATS_L = en ? STATS_EN : STATS;
  const SERVICES_L = en ? SERVICES_EN : SERVICES;
  const COMPARE_OLD_L = en ? COMPARE_OLD_EN : COMPARE_OLD;
  const COMPARE_NEW_L = en ? COMPARE_NEW_EN : COMPARE_NEW;
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

  const contactHref = '#contact';
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

      {/* Полоса фактов: 4 ячейки из STATS */}
      <section className="vp3-stats" aria-label={en ? 'Key numbers' : 'Ключевые цифры'}>
        <div className="vp3-stats-inner">
          {STATS_L.map((s, i) => (
            <div key={i} className="vp3-stat">
              <span className="vp3-stat-value">
                {s.v}<span className="vp3-stat-unit">{s.u}</span>
              </span>
              <span className="vp3-stat-label">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Услуги: полные карточки из SERVICES (классы из index.css) */}
      <section className="section vp3-services">
        <div className="shell">
          <span className="sec-num vp3-sec-label">
            {en ? '[ WHAT WE DO ]' : '[ ЧТО ДЕЛАЕМ ]'}
          </span>
          <div className="services-grid">
            {SERVICES_L.map((s, i) => (
              <div key={i} className="service-card reveal">
                <span className="num">{s.num}</span>
                <span className="glyph">{s.glyph}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Сравнение: старый мир против нового (структурная замена ценового якоря) */}
      <section className="section">
        <div className="shell">
          <SecHead
            num={en ? '[ WHY AI ]' : '[ ПОЧЕМУ AI ]'}
            title={en ? 'The old world' : 'Старый мир'}
            titleIt={en ? 'vs the new' : 'против нового'}
            side={en
              ? 'Classic production against an AI pipeline: same cinematic image, a fraction of the time and budget.'
              : 'Классический продакшн против AI-пайплайна: та же кинематографичная картинка за долю времени и бюджета.'}
            sideTitle="COMPARE"
          />
          <div className="vp3-compare reveal">
            <div className="vp3-compare-col vp3-compare-old">
              <h4 className="vp3-compare-head">
                <span className="vp3-compare-glyph">⊖</span>
                {en ? 'Traditional' : 'Традиционно'}
              </h4>
              <div className="vp3-compare-stats">
                <div className="vp3-compare-cell">
                  <span className="v">2–6</span>
                  <span className="l">{en ? 'weeks' : 'недель'}</span>
                </div>
                <div className="vp3-compare-cell">
                  <span className="v">100%</span>
                  <span className="l">{en ? 'of cost' : 'стоимости'}</span>
                </div>
              </div>
              <ul className="vp3-compare-list">
                {COMPARE_OLD_L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="vp3-compare-col vp3-compare-new">
              <h4 className="vp3-compare-head">
                <span className="vp3-compare-glyph">⊕</span>
                AIVFX
              </h4>
              <div className="vp3-compare-stats">
                <div className="vp3-compare-cell">
                  <span className="v">1–5</span>
                  <span className="l">{en ? 'days' : 'дней'}</span>
                </div>
                <div className="vp3-compare-cell">
                  <span className="v">~30%</span>
                  <span className="l">{en ? 'of cost' : 'стоимости'}</span>
                </div>
              </div>
              <ul className="vp3-compare-list">
                {COMPARE_NEW_L.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Форматы работы — без цен, смета под задачу */}
      <section className="section">
        <div className="shell">
          <SecHead
            num={pick(L, VIDEO_FORMATS.head.num)}
            title={pick(L, VIDEO_FORMATS.head.title)}
            titleIt={pick(L, VIDEO_FORMATS.head.titleIt)}
            side={pick(L, VIDEO_FORMATS.head.side)}
            sideTitle={VIDEO_FORMATS.head.sideTitle}
          />
          <div className="vp3-formats reveal">
            {VIDEO_FORMATS.items.map((f, i) => (
              <div key={i} className={`vp3-format ${f.popular ? 'popular' : ''}`}>
                {f.popular && (
                  <span className="vp3-format-badge">
                    {en ? 'MOST POPULAR' : 'ЧАЩЕ ВСЕГО'}
                  </span>
                )}
                <h3 className="vp3-format-name">{pick(L, f.name)}</h3>
                <span className="vp3-format-timing">{pick(L, f.timing)}</span>
                <p className="vp3-format-desc">{pick(L, f.desc)}</p>
                <ul className="vp3-format-features">
                  {f.features.map((feat, j) => (
                    <li key={j}>{pick(L, feat)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="vp3-formats-note">{pick(L, VIDEO_FORMATS.note)}</p>
        </div>
      </section>

      {/* Отзывы и клиенты: тёмные карточки, выделенная — контурная */}
      <section className="section">
        <div className="shell">
          <SecHead
            num={en ? '[ CLIENTS ]' : '[ КЛИЕНТЫ ]'}
            title={en ? 'Brands that' : 'Нам доверяют'}
            titleIt={en ? 'trust us' : 'свои бренды'}
            side={en
              ? 'From German automotive giants to Gulf developers — we work with those who need speed without compromise.'
              : 'От немецких автоконцернов до арабских девелоперов — мы работаем с теми, кому важна скорость без компромиссов.'}
            sideTitle="TRUST"
          />
          <div className="vp3-testi-grid reveal">
            {TESTIMONIALS_L.map((t) => (
              <div key={t.id} className={`vp3-testi ${t.featured ? 'featured' : ''}`}>
                <span className="vp3-testi-quote">"</span>
                <span className="vp3-testi-tag">◆ {t.project}</span>
                <p className="vp3-testi-text">{t.text}</p>
                <div className="vp3-testi-author">
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

      {/* FAQ: аккордеон из VIDEO_FAQ (классы .faq-item из index.css) */}
      <section className="section">
        <div className="shell">
          <SecHead
            num="[ FAQ ]"
            title={en ? 'Frequently asked questions' : 'Частые вопросы'}
          />
          <div className="faq-list vp3-faq reveal">
            {VIDEO_FAQ.map((item, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                <div className="head">
                  <span className="q">{pick(L, item.q)}</span>
                  <span className="ic">+</span>
                </div>
                <div className="body"><p>{pick(L, item.a)}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Строка про блог + кнопка на портфолио */}
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

      {/* Форма заявки — свой контакт в контексте видео */}
      <ContactForm videoContext />
    </div>
  );
};

export default VideoProduction;
