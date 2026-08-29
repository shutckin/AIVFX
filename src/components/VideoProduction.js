import React, { useEffect, useRef, useState } from 'react';
import SecHead from './SecHead';
import ModeToggle from './ModeToggle';
import ProcessFlow from './ProcessFlow';
import LazyVideo from './LazyVideo';
import ContactForm from './ContactForm';
import LangSwitch from './LangSwitch';
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
// Разделы страницы для навигации и подсветки активного пункта
const VP_NAV = [
  { id: 'works', label: { ru: 'Работы', en: 'Works' } },
  { id: 'capabilities', label: { ru: 'Что делаем', en: 'What we do' } },
  { id: 'process', label: { ru: 'Процесс', en: 'Process' } },
  { id: 'formats', label: { ru: 'Форматы', en: 'Formats' } },
  { id: 'contact', label: { ru: 'Контакты', en: 'Contact' } },
];

const VpHeader = ({ contactHref, en, locale }) => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Активным считаем последний раздел, чей верх уже прошёл треть экрана
      const y = window.scrollY + window.innerHeight * 0.3;
      let current = 'hero';
      for (const item of VP_NAV) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= y) current = item.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`header vp-header${scrolled ? ' scrolled' : ''}`}>
      <a className="logo" href={localizedHref('/video-production/', locale)}>
        <span className="logo-wm">AIVFX</span>
      </a>
      <ModeToggle mode="content" />
      <nav className="nav-loose vp-nav" aria-label={en ? 'Page sections' : 'Разделы страницы'}>
        {VP_NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-link${active === item.id ? ' active' : ''}`}
            onClick={() => go(item.id)}
          >
            {pick(locale, item.label)}
          </button>
        ))}
      </nav>
      <div className="header-status">
        <LangSwitch locale={locale} />
        <a className="btn btn-primary vp-header-cta" href={contactHref}>
          {en ? 'Contact' : 'Связаться'}
        </a>
      </div>
    </header>
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
      {/* always: лента едет анимацией, событий прокрутки в ней нет,
          и обычная ленивая загрузка оставляла бы карточки чёрными */}
      <LazyVideo src={project.preview} title={project.title} always />
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

  // Витрина работ — один ряд. Раньше было два встречных, но от этого
  // блок разрастался на пол-экрана и превращался в стену превью, где
  // глазу не за что зацепиться. Один ряд читается как лента, а не как
  // склад, и каждая работа получает больше внимания.
  const PROJECTS_L = localizedProjects(L);

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
      <VpHeader contactHref={contactHref} en={en} locale={L} />

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
          <span className="kicker vp-hero-kicker">
            {en ? 'AI VIDEO & VFX FOR BRANDS' : 'AI-ВИДЕО И VFX ДЛЯ БРЕНДОВ'}
          </span>

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
      <section className="vp2-works" id="works" aria-label={en ? 'Selected works' : 'Избранные работы'}>
        <div className="shell">
          <SecHead
            num={en ? 'WORKS' : 'РАБОТЫ'}
            title={en ? 'What we have' : 'Что мы уже'}
            titleIt={en ? 'already shot' : 'сняли'}
          />
        </div>
        <div className="vp2-marquee">
          {PROJECTS_L.length > 0 && (
            <div className="marquee-row">
              {/* Список продублирован: пока первая копия уезжает влево,
                  вторая занимает её место, и лента идёт без стыка */}
              <div className="marquee-track">
                {[...PROJECTS_L, ...PROJECTS_L].map((p, i) => (
                  <MarqueeCard key={`${p.id}-${i}`} project={p} href={worksHref} />
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

      {/* Что делаем — редакторский разворот вместо ровной сетки.
          Раньше здесь стояли шесть одинаковых карточек 3×2: одинаковый
          кадр, одинаковая рамка, одинаковый вес у каждого пункта — блок
          читался как каталог, где не за что зацепиться глазу.
          Теперь размеры разные (см. vp-show-grid в css): широкий кадр
          соседствует с узким, ряды зеркалят друг друга, а рамки карточек
          убраны — остались кадр, крупный номер и подпись под тонкой
          линией. Порядок пунктов задаёт ритм, поэтому он не случайный. */}
      <section className="section" id="capabilities">
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
                  {/* У пункта про AI-генерацию видео вместо кадра стоит
                      сам ролик — направление про движение, картинкой оно
                      не показывается. Адрес ролика LazyVideo подставит
                      только когда карточка подъедет к экрану, а до тех
                      пор в кадре стоит постер: страница не тянет
                      четыре с половиной мегабайта ради блока, до
                      которого читатель может и не долистать. */}
                  {item.video ? (
                    <LazyVideo
                      src={item.video}
                      poster={item.img}
                      title={pick(L, item.title)}
                    />
                  ) : (
                    /* Размеры настоящие, у каждого кадра свои: браузер
                       резервирует место заранее и вёрстка не дёргается,
                       когда картинка догрузится. Первый кадр панорамный,
                       последние три почти квадратные — единый размер на
                       всех дал бы скачок. */
                    <img
                      src={item.img}
                      alt={pick(L, item.title)}
                      width={item.w}
                      height={item.h}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <span className="vp-show-tag">{pick(L, item.tag)}</span>
                </div>
                <div className="vp-show-body">
                  {/* Номер декоративный: порядок уже читается глазом,
                      поэтому от экранного диктора его прячем */}
                  <span className="vp-show-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="vp-show-title display">{pick(L, item.title)}</h3>
                  <p className="vp-show-desc">{pick(L, item.desc)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Процесс: пять шагов поверх полноэкранного ролика.
          Заголовок остаётся в колонке, а сам блок вынесен из .shell —
          сцена должна доставать до краёв экрана, иначе это снова окно. */}
      <section className="section vp-band vp-band--flow" id="process">
        <div className="shell">
          <SecHead
            num={pick(L, VIDEO_PROCESS.head.num)}
            title={pick(L, VIDEO_PROCESS.head.title)}
            titleIt={pick(L, VIDEO_PROCESS.head.titleIt)}
            side={pick(L, VIDEO_PROCESS.head.side)}
            sideTitle={VIDEO_PROCESS.head.sideTitle}
          />
        </div>
        <ProcessFlow />
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
      <section className="section" id="formats">
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
                <span className="vp3-testi-tag">{`◆ ${t.project}`}</span>
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
            {en ? '→ Blog' : '→ Блог'}
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
