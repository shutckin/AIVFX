import React, { useEffect, useRef, useState } from 'react';
import SecHead from './SecHead';
import ModeToggle from './ModeToggle';
import ContactForm from './ContactForm';
import { useLocale, pick, localizedHref } from '../i18n';
import {
  VIDEO_PAGE, VIDEO_FORMATS, VIDEO_FAQ,
  VIDEO_SHOWCASE, VIDEO_PROCESS, VIDEO_DELIVERABLES,
} from '../data/systems-content';
import { STATS, COMPARE_OLD, COMPARE_NEW, TESTIMONIALS, CLIENTS } from '../data/content';
import {
  STATS_EN, COMPARE_OLD_EN, COMPARE_NEW_EN, TESTIMONIALS_EN, CLIENTS_EN,
} from '../data/content-en';
import { localizedProjects } from '../data/projects';
import './video-production.css';

// Страница второго направления — AI-контент (/video-production/).
// v3: hero + marquee + полоса фактов + услуги + сравнение + форматы работы
// (без цен) + отзывы + FAQ + форма. Цены со страницы убраны полностью.
// v4: своя янтарная палитра (скоуп .vp-page), робот-визуал в hero,
// топбар без «шага назад».
// v5: вместо иконок-карточек услуг — витрина реальных кадров (VIDEO_SHOWCASE),
// плюс два новых блока: таймлайн процесса и список того, что клиент получает.

// ── Hero-визуал: робот ──
// Это то самое видео из старого hero (коммит 2d2b20a): /fixed/aivid.mp4 —
// 3D-голова красного робота, светящаяся на чёрном. Раньше оно лежало фоном
// во всю ширину, теперь это художественный объект в правой колонке: круглая
// маска с мягко растворяющимся краем, тёплое свечение под ним и тонкое кольцо.
//
// Параллакс: слушатель на секции hero (не на window), passive, троттлинг через
// requestAnimationFrame, лерп 0.08, диапазон ±6deg. Не вешается вовсе при
// prefers-reduced-motion и на тач-устройствах (нет hover / точного курсора).

// Сцена робота — точь-в-точь как в первой версии сайта: SVG-кольца, halo,
// сканирующая линия и HUD-подписи поверх фонового видео с 3D-роботом.
const RobotStage = () => {
  const ref = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      ref.current.style.setProperty('--mx', x + 'px');
      ref.current.style.setProperty('--my', y + 'px');
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="robot-stage" ref={ref} aria-hidden="true">
      <div className="robot-halo" />
      <div className="robot-scan" />
      <div className="robot-glow" />
      <svg className="robot-rings" viewBox="0 0 600 600">
        <circle cx="300" cy="300" r="220" className="r1" />
        <circle cx="300" cy="300" r="270" className="r2" />
        <circle cx="300" cy="300" r="150" className="r3" />
      </svg>
      <div className="robot-hud hud-bl">
        <span className="hud-dot" />
        <span>LAT +55.75°  LON +37.61°</span>
      </div>
      <div className="robot-hud hud-br">
        <span>© AIVFX SYSTEMS</span>
      </div>
    </div>
  );
};
// Шапка страницы — та же, что на главной: логотип прижат к левому краю
// экрана, тумблер направлений сразу за ним, CTA — к правому краю. Раньше
// шапка жила внутри .shell и «висела» посреди экрана, не попадая в углы.
const VpHeader = ({ contactHref, en }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header vp-header${scrolled ? ' scrolled' : ''}`}>
      <a className="logo" href={localizedHref('/video-production/', en ? 'en' : 'ru')}>
        <span className="logo-wm">AIVFX</span>
      </a>
      <ModeToggle mode="content" />
      <div className="header-status">
        <a className="btn btn-primary vp-header-cta" href={contactHref}>
          {en ? 'Contact' : 'Связаться'}
        </a>
      </div>
    </header>
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
      {/* Шапка вынесена из .shell: логотип и CTA стоят в углах экрана,
          ровно как на главной. Ссылки «← AIVFX» здесь нет намеренно —
          со страницы уходим переключением направления, а не шагом назад. */}
      <VpHeader contactHref={contactHref} en={en} />

      {/* Первый экран — во всю ширину и высоту окна: видео с 3D-роботом,
          градиентный overlay, кольца-HUD и текст поверх */}
      <header className="hero vp-hero-full" id="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/fixed/aivid-poster.jpg"
          ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
        >
          <source src="/fixed/aivid.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
        <RobotStage />

        <div className="shell hero-inner">
          <span className="kicker vp-hero-kicker">Moscow · Dubai · Bali</span>

          <h1 className="hero-headline display">
            <span className="ln">{pick(L, VIDEO_PAGE.title)}</span>
            <span className="ln"><span className="accent">{pick(L, VIDEO_PAGE.titleIt)}</span></span>
          </h1>

          <div className="hero-row">
            <p className="hero-sub">{pick(L, VIDEO_PAGE.sub)}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={worksHref}>
                {pick(L, VIDEO_PAGE.portfolioCta)}
                <span className="btn-arrow">↗</span>
              </a>
              <a className="btn btn-ghost" href={contactHref}>
                {pick(L, VIDEO_PAGE.contactCta)}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Видео-витрина: заголовок + два встречных ряда автоиграющих превью */}
      <section className="vp2-works" aria-label={en ? 'Selected works' : 'Избранные работы'}>
        <div className="shell">
          <SecHead
            num={en ? 'WORKS' : 'РАБОТЫ'}
            title={en ? 'What we have' : 'Что мы уже'}
            titleIt={en ? 'already shot' : 'сняли'}
          />
        </div>
        <div className="vp2-marquee">
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
        </div>
        <div className="shell">
          <a className="vp2-works-link" href={worksHref}>
            {en ? 'See all works ' : 'Смотреть все работы '}<span aria-hidden="true">→</span>
          </a>
        </div>
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

      {/* Что делаем — витрина реальных кадров вместо иконок.
          Каждая карточка: кадр из нашего пайплайна + чип с типом работы,
          под ним название формата и что именно клиент получает. */}
      <section className="section">
        <div className="shell">
          <SecHead
            num={pick(L, VIDEO_SHOWCASE.head.num)}
            title={pick(L, VIDEO_SHOWCASE.head.title)}
            titleIt={pick(L, VIDEO_SHOWCASE.head.titleIt)}
            side={pick(L, VIDEO_SHOWCASE.head.side)}
            sideTitle={VIDEO_SHOWCASE.head.sideTitle}
          />
          <div className="vp-show-grid reveal">
            {VIDEO_SHOWCASE.items.map((item, i) => (
              <article key={i} className="vp-show-card">
                <div className="vp-show-media">
                  <img
                    src={item.img}
                    alt={pick(L, item.title)}
                    width="1000"
                    height="750"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="vp-show-tag">{pick(L, item.tag)}</span>
                </div>
                <div className="vp-show-body">
                  <h3 className="vp-show-title display">{pick(L, item.title)}</h3>
                  <p className="vp-show-desc">{pick(L, item.desc)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Процесс: горизонтальный таймлайн из пяти шагов.
          Линия с узлами сверху, под каждым шагом — что клиент получает
          на этом этапе, чтобы работа не выглядела чёрным ящиком. */}
      <section className="section vp-band">
        <div className="shell">
          <SecHead
            num={pick(L, VIDEO_PROCESS.head.num)}
            title={pick(L, VIDEO_PROCESS.head.title)}
            titleIt={pick(L, VIDEO_PROCESS.head.titleIt)}
            side={pick(L, VIDEO_PROCESS.head.side)}
            sideTitle={VIDEO_PROCESS.head.sideTitle}
          />
          <ol className="vp-proc reveal">
            {VIDEO_PROCESS.steps.map((s, i) => (
              <li key={i} className="vp-proc-step">
                <span className="vp-proc-num">{s.num}</span>
                <h3 className="vp-proc-title">{pick(L, s.title)}</h3>
                <p className="vp-proc-desc">{pick(L, s.desc)}</p>
                <span className="vp-proc-out">
                  <span aria-hidden="true">→</span> {pick(L, s.out)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Сравнение: старый мир против нового (структурная замена ценового якоря) */}
      <section className="section">
        <div className="shell">
          <SecHead
            num={en ? 'WHY AI' : 'ПОЧЕМУ AI'}
            title={en ? 'The old world' : 'Старый мир'}
            titleIt={en ? 'vs the new' : 'против нового'}
            side={en
              ? 'Classic production against an AI pipeline: same cinematic image, a fraction of the time and budget.'
              : 'Классический продакшн против AI-пайплайна: та же кинематографичная картинка за долю времени и бюджета.'}
            sideTitle="COMPARE"
          />
          <div className="vp3-compare reveal">
            <div className="vp3-compare-col vp3-compare-old">
              <h4 className="vp3-compare-head">{en ? 'Traditional' : 'Традиционно'}</h4>
              <div className="vp3-compare-anchors">
                <div className="vp3-anchor">
                  <span className="v">2–6</span>
                  <span className="l">{en ? 'weeks per project' : 'недель на проект'}</span>
                </div>
                <div className="vp3-anchor">
                  <span className="v">100%</span>
                  <span className="l">{en ? 'of the budget' : 'бюджета'}</span>
                </div>
              </div>
              <ul className="vp3-compare-list">
                {COMPARE_OLD_L.map((item, i) => (
                  <li key={i}>
                    <span className="vp3-mark vp3-mark-x" aria-hidden="true">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="vp3-compare-col vp3-compare-new">
              <h4 className="vp3-compare-head">AIVFX</h4>
              <div className="vp3-compare-anchors">
                <div className="vp3-anchor">
                  <span className="v">1–5</span>
                  <span className="l">{en ? 'days per project' : 'дней на проект'}</span>
                </div>
                <div className="vp3-anchor">
                  <span className="v">~30%</span>
                  <span className="l">{en ? 'of the budget' : 'бюджета'}</span>
                </div>
              </div>
              <ul className="vp3-compare-list">
                {COMPARE_NEW_L.map((item, i) => (
                  <li key={i}>
                    <span className="vp3-mark vp3-mark-ok" aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Что получаете на выходе — лёгкий список с разделителями,
          без карточек-коробок: это перечень, а не витрина. */}
      <section className="section vp-band">
        <div className="shell">
          <SecHead
            num={pick(L, VIDEO_DELIVERABLES.head.num)}
            title={pick(L, VIDEO_DELIVERABLES.head.title)}
            titleIt={pick(L, VIDEO_DELIVERABLES.head.titleIt)}
            side={pick(L, VIDEO_DELIVERABLES.head.side)}
            sideTitle={VIDEO_DELIVERABLES.head.sideTitle}
          />
          <ul className="vp-deliv reveal">
            {VIDEO_DELIVERABLES.items.map((item, i) => (
              <li key={i} className="vp-deliv-item">
                <span className="vp-deliv-tick" aria-hidden="true">✓</span>
                <span className="vp-deliv-text">
                  <span className="vp-deliv-t">{pick(L, item.t)}</span>
                  <span className="vp-deliv-d">{pick(L, item.d)}</span>
                </span>
              </li>
            ))}
          </ul>
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
                <span className="vp3-format-timing">{pick(L, f.timing)}</span>
                <h3 className="vp3-format-name">{pick(L, f.name)}</h3>
                <p className="vp3-format-desc">{pick(L, f.desc)}</p>
                <ul className="vp3-format-features">
                  {f.features.map((feat, j) => (
                    <li key={j}>
                      <span className="vp3-tick" aria-hidden="true">✓</span>
                      <span>{pick(L, feat)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="vp3-formats-note">{pick(L, VIDEO_FORMATS.note)}</p>
        </div>
      </section>

      {/* Отзывы и клиенты: тёмные карточки, выделенная — с акцентным ребром */}
      <section className="section vp-band">
        <div className="shell">
          <SecHead
            num={en ? 'CLIENTS' : 'КЛИЕНТЫ'}
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
          {/* Трастбар: вордмарки клиентов крупно и приглушённо, как на главной */}
          <div className="vp3-trustbar reveal">
            <span className="vp3-trustbar-label">
              {en ? 'Selected clients' : 'Среди клиентов'}
            </span>
            <div className="vp3-trustbar-row">
              {CLIENTS_L.map((c, i) => (
                <span key={i} className="vp3-trust-brand">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ: аккордеон из VIDEO_FAQ (классы .faq-item из index.css) */}
      <section className="section">
        <div className="shell">
          <SecHead
            num="FAQ"
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
            {en ? 'View full portfolio' : 'Смотреть всё портфолио'}<span className="btn-arrow">↗</span>
          </a>
        </div>
      </div>

      {/* Форма заявки — свой контакт в контексте видео */}
      <ContactForm videoContext />
    </div>
  );
};

export default VideoProduction;
