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
// v4: своя янтарная палитра (скоуп .vp-page), робот-визуал в hero,
// анимированные иконки услуг, топбар без «шага назад».

// ── Hero-визуал: робот-сцена ──
// Перенесён из старого Hero (коммит 2d2b20a), классы переименованы в vp-robot-*,
// чтобы не пересекаться со старыми .robot-* в index.css.
// Параллакс: слушатель мыши на самой сцене, passive, с очисткой;
// при prefers-reduced-motion не вешается вовсе.
const RobotStage = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return undefined;

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="vp-robot-stage" ref={ref} aria-hidden="true">
      <div className="vp-robot-halo" />
      <div className="vp-robot-scan" />
      <div className="vp-robot-glow" />
      <svg className="vp-robot-rings" viewBox="0 0 600 600">
        <circle cx="300" cy="300" r="220" className="r1" />
        <circle cx="300" cy="300" r="270" className="r2" />
        <circle cx="300" cy="300" r="150" className="r3" />
      </svg>
      <div className="vp-robot-hud vp-hud-bl">
        <span className="vp-hud-dot" />
        <span>LAT +55.75° LON +37.61°</span>
      </div>
      <div className="vp-robot-hud vp-hud-br">
        <span>© AIVFX SYSTEMS</span>
      </div>
    </div>
  );
};

// ── Анимированные иконки услуг ──
// Заменяют глифы ∆ ○ ◇ ⌒ ∇ ✕. Каждая — свой смысл, анимация постоянная и медленная,
// только transform / opacity / stroke-dashoffset. Отключается при reduced-motion (в CSS).
const ICON_PROPS = {
  className: 'vp-ico',
  viewBox: '0 0 26 26',
  width: 28,
  height: 28,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  focusable: 'false',
  'aria-hidden': 'true',
};

// S/01 — AI-генерация видео: кадр-рамка с бегущей внутри линией-сканом
const IcoGenerate = () => (
  <svg {...ICON_PROPS}>
    <rect x="2.5" y="4.5" width="21" height="17" rx="2.5" />
    <path d="M2.5 8.5h21" opacity="0.45" />
    <g className="vp-ico-scan">
      <path d="M5.5 11.5h15" />
    </g>
    <circle cx="5.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="8" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

// S/02 — VFX и композитинг: три слоя-прямоугольника, расходящиеся и сходящиеся
const IcoLayers = () => (
  <svg {...ICON_PROPS}>
    <rect className="vp-ico-layer vp-ico-layer-1" x="6" y="6" width="14" height="10" rx="1.5" />
    <rect className="vp-ico-layer vp-ico-layer-2" x="6" y="9" width="14" height="10" rx="1.5" opacity="0.7" />
    <rect className="vp-ico-layer vp-ico-layer-3" x="6" y="12" width="14" height="10" rx="1.5" opacity="0.45" />
  </svg>
);

// S/03 — Гибрид AI + VFX: два перетекающих круга и точка на орбите
const IcoHybrid = () => (
  <svg {...ICON_PROPS}>
    <g className="vp-ico-blend">
      <circle cx="10" cy="13" r="6.5" />
      <circle cx="16" cy="13" r="6.5" opacity="0.6" />
    </g>
    <g className="vp-ico-orbit">
      <circle cx="13" cy="3.6" r="1.2" fill="currentColor" stroke="none" />
    </g>
  </svg>
);

// S/04 — Адаптация форматов: прямоугольник, морфящий 16:9 ↔ 9:16 (чистый transform)
const IcoFormats = () => (
  <svg {...ICON_PROPS}>
    <rect className="vp-ico-frame" x="2" y="2" width="22" height="22" rx="2" vectorEffect="non-scaling-stroke" />
    <path d="M13 10.5v5" opacity="0.5" />
  </svg>
);

// S/05 — Продуктовые демо: изометрический куб с проявляющейся гранью
const IcoCube = () => (
  <svg {...ICON_PROPS}>
    <g className="vp-ico-cube">
      <path d="M13 2.5 23 8v10l-10 5.5L3 18V8z" />
      <path d="M3 8l10 5.5L23 8" opacity="0.55" />
      <path d="M13 13.5v10" opacity="0.55" />
      <path className="vp-ico-face" d="M13 2.5 23 8v10l-10-4.5z" opacity="0.18" fill="currentColor" stroke="none" />
    </g>
  </svg>
);

// S/06 — Виртуальные персонажи: силуэт головы с пульсирующим контуром и точками
const IcoAvatar = () => (
  <svg {...ICON_PROPS}>
    <g className="vp-ico-head">
      <circle cx="13" cy="9" r="5" />
      <path d="M4.5 22.5c0-4.4 3.8-7.5 8.5-7.5s8.5 3.1 8.5 7.5" />
    </g>
    <circle className="vp-ico-node vp-ico-node-1" cx="6" cy="6" r="1.1" fill="currentColor" stroke="none" />
    <circle className="vp-ico-node vp-ico-node-2" cx="20" cy="6" r="1.1" fill="currentColor" stroke="none" />
    <circle className="vp-ico-node vp-ico-node-3" cx="23" cy="13" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const SERVICE_ICONS = {
  'S/01': IcoGenerate,
  'S/02': IcoLayers,
  'S/03': IcoHybrid,
  'S/04': IcoFormats,
  'S/05': IcoCube,
  'S/06': IcoAvatar,
};

const ICON_ORDER = [IcoGenerate, IcoLayers, IcoHybrid, IcoFormats, IcoCube, IcoAvatar];

const ServiceIcon = ({ num, index }) => {
  const Icon = SERVICE_ICONS[num] || ICON_ORDER[index % ICON_ORDER.length];
  return (
    <span className="vp-ico-wrap">
      <Icon />
    </span>
  );
};

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
        {/* Верхняя строка: бренд-вордмарк + тумблер направлений.
            Ссылки «← AIVFX» тут нет намеренно: со страницы уходим только
            переключением направления, а не шагом назад. */}
        <div className="vp2-topbar">
          <span className="vp2-wordmark">AIVFX</span>
          <ModeToggle mode="content" />
          <span className="vp2-topbar-spacer" aria-hidden="true" />
        </div>

        {/* Hero: слева текст, справа робот-сцена */}
        <header className="vp-hero">
          <div className="vp-hero-copy">
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
          </div>
          <div className="vp-hero-visual">
            <RobotStage />
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
                <ServiceIcon num={s.num} index={i} />
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
