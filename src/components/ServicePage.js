import React, { useEffect } from 'react';
import { SERVICE_PAGES, SERVICE_CTA, CASES_SYS } from '../data/systems-content';
import { SERVICE_GUIDES, GUIDE_UI, SERVICE_UI } from '../data/service-guides';
import { BLOG_POSTS } from '../data/blog-posts';
import { BLOG_POSTS_EN } from '../data/blog-posts-en';
import { useLocale, pick, localizedHref, isRuOnly } from '../i18n';
import Pic from './Pic';
import DealCard from './DealCard';
import './services-systems.css';

const SITE = 'https://aivfx.ru';

// Универсальная страница услуги /services/<slug>/ (светлая тема).
// Контент целиком берётся из SERVICE_PAGES; неизвестный slug - ничего не рендерим.
// Страница автоматизации процессов собрана по одобренному макету
// mock-auto.html: коллаж из фото, схема «руками / само», цепочки, живые
// примеры, цены, шаги, свёрнутый гайд. Остальные страницы используют те
// же блоки - какие есть в их данных.

// Номер по порядку: 1 → «01»
const num2 = (i) => String(i + 1).padStart(2, '0');

// Цена «от 30 000 ₽ в месяц» → приставка «от», сумма и хвост «в месяц»:
// приставку и хвост набираем мельче, как в макете. Если строка не похожа
// на цену в рублях, показываем её как есть.
const splitPrice = (str) => {
  const m = /^(?:(от|from)\s+)?(.+?₽)\s*(.*)$/.exec(str || '');
  if (!m) return { pre: '', main: str, post: '' };
  return { pre: m[1] || '', main: m[2], post: m[3] || '' };
};

// Рендер одного блока гайда: абзац, список, нумерованные шаги или врезка
const GuideBlock = ({ block, L }) => {
  if (block.type === 'p') return <p className="sg-p">{pick(L, block.text)}</p>;
  if (block.type === 'note') return <p className="sg-note">{pick(L, block.text)}</p>;
  if (block.type === 'list') {
    return (
      <ul className="sg-list">
        {block.items.map((item, i) => <li key={i}>{pick(L, item)}</li>)}
      </ul>
    );
  }
  if (block.type === 'steps') {
    return (
      <ol className="sg-steps">
        {block.items.map((item, i) => <li key={i}>{pick(L, item)}</li>)}
      </ol>
    );
  }
  return null;
};

// Хлебная крошка из kicker «Услуга / автоматизация процессов»:
// вторая часть выделена синим
const Crumb = ({ text }) => {
  const [first, ...rest] = text.split(' / ');
  if (!rest.length) return <span className="sp-crumb">{first}</span>;
  return <span className="sp-crumb">{`${first} / `}<b>{rest.join(' / ')}</b></span>;
};

// Коллаж из трёх фото на первом экране: первое крупное, у каждого подпись
const HeroMosaic = ({ photos, L }) => (
  <div className="sp-mosaic">
    {photos.map((ph, i) => (
      <figure key={ph.src} className={`sp-ph${i === 0 ? ' sp-ph--big' : ''}`}>
        <img
          src={ph.src}
          alt={pick(L, ph.alt)}
          width={ph.w}
          height={ph.h}
          decoding="async"
          style={{ objectPosition: ph.pos }}
          {...(i === 0 ? { fetchpriority: 'high' } : {})}
        />
        {ph.t && (
          <figcaption className="sp-ph-tag">
            <b>{pick(L, ph.t)}</b>
            <span><em aria-hidden="true">→</em>{pick(L, ph.s)}</span>
          </figcaption>
        )}
      </figure>
    ))}
  </div>
);

// Одно фото справа от заголовка (страницы без коллажа)
const HeroPhoto = ({ photo, L }) => (
  <figure className="sp-hero-photo">
    <img
      src={photo.src}
      alt={pick(L, photo.alt)}
      width={photo.w}
      height={photo.h}
      decoding="async"
      fetchpriority="high"
      style={{ objectPosition: photo.pos }}
    />
  </figure>
);

// Схема «Сейчас: руками → После: само» (страница автоматизации)
const PainsGraphic = ({ g, L }) => (
  <div className="sp-gx" role="img" aria-label={pick(L, SERVICE_UI.graphicAria)}>
    <div className="sp-gx-col">
      <div className="sp-gx-cap">{pick(L, g.before.cap)}</div>
      <div className="sp-gx-sheet">
        <div className="sp-gx-row sp-gx-row--head">
          {g.before.head.map((h, i) => <span key={i}>{pick(L, h)}</span>)}
        </div>
        {g.before.rows.map((r, i) => (
          <div key={i} className={`sp-gx-row${r.sel ? ' sp-gx-row--sel' : ''}`}>
            <span>{pick(L, r.name)}</span>
            <span>{r.phone}</span>
            <span className={r.warn ? 'sp-gx-warn' : undefined}>{pick(L, r.status)}</span>
          </div>
        ))}
      </div>
      <div className="sp-gx-note">{pick(L, g.before.note)}</div>
    </div>
    <div className="sp-gx-arrow" aria-hidden="true">→</div>
    <div className="sp-gx-col">
      <div className="sp-gx-cap sp-gx-cap--ok">{pick(L, g.after.cap)}</div>
      {g.after.cards.map((c, i) => (
        <div key={i} className="sp-gx-card">
          <span className="sp-gx-dot" aria-hidden="true" />
          <span><b>{pick(L, c.b)}</b><span>{pick(L, c.s)}</span></span>
        </div>
      ))}
      <div className="sp-gx-note">{pick(L, g.after.note)}</div>
    </div>
  </div>
);

// Окно «Одно обращение по шагам» (страницы без схемы)
const ProofPanel = ({ proof, L }) => (
  <aside className="sp-proof" aria-label={pick(L, SERVICE_UI.example)}>
    <div className="sp-proof-head">
      <span className="sp-proof-name">{pick(L, SERVICE_UI.proofTitle)}</span>
    </div>
    <ol className="sp-proof-body">
      {proof.map((line, i) => (
        <li
          key={i}
          className={`sp-proof-line${i === proof.length - 1 ? ' sp-proof-line--last' : ''}`}
          style={{ animationDelay: `${0.15 + i * 0.18}s` }}
        >
          <span className="sp-proof-ix">{num2(i)}</span>
          <span>{pick(L, line)}</span>
        </li>
      ))}
    </ol>
  </aside>
);

// Цепочки «событие → что происходит само». Цепочка с полем flow рисуется
// крупной тёмной схемой во всю высоту сетки, остальные - белыми карточками.
const Recipes = ({ recipes, L }) => {
  const flows = recipes.items.filter((r) => r.flow);
  const rest = recipes.items.filter((r) => !r.flow);
  // Сколько рядов занимают обычные карточки (по две в ряд рядом со схемой)
  const rows = Math.max(1, Math.ceil(rest.length / 2));
  // Нечётная последняя карточка рядом со схемой растягивается на две колонки
  const widenLast = flows.length > 0 && rest.length % 2 === 1;

  return (
    <ol className={`sp-rc-grid${flows.length ? ' sp-rc-grid--flow' : ''}`} style={{ '--sp-rc-rows': rows }}>
      {flows.map((r, i) => (
        <li key={`f-${i}`} className="sp-rc sp-rc--flow">
          {r.cat && <span className="sp-rc-cat">{pick(L, r.cat)}</span>}
          <p className="sp-fl-trig"><i aria-hidden="true" />{pick(L, r.when)}</p>
          <ol className="sp-fl-steps">
            {r.then.map((step, j) => (
              <li key={j} className="sp-fl-step">
                {r.flow[j] && <span className="sp-fl-t">{pick(L, r.flow[j].t)}</span>}
                <b>{pick(L, step)}</b>
                {r.flow[j] && <span>{pick(L, r.flow[j].s)}</span>}
              </li>
            ))}
          </ol>
        </li>
      ))}
      {rest.map((r, i) => (
        <li
          key={i}
          className={`sp-rc${widenLast && i === rest.length - 1 ? ' sp-rc--wide' : ''}`}
        >
          <div>
            {r.cat && <span className="sp-rc-cat">{pick(L, r.cat)}</span>}
            <p className="sp-rc-when">{pick(L, r.when)}</p>
          </div>
          <ul className="sp-rc-then">
            {r.then.map((step, j) => <li key={j}>{pick(L, step)}</li>)}
          </ul>
        </li>
      ))}
    </ol>
  );
};

// Цифры кейса: значение и подпись
const Metrics = ({ metrics, L, className }) => (
  <dl className={className}>
    {metrics.map((m, j) => (
      <div key={j}>
        <dt>{L === 'en' && m.vEn ? m.vEn : m.v}</dt>
        <dd>{pick(L, m.l)}</dd>
      </div>
    ))}
  </dl>
);

// Живой пример: с карточкой сделки - тёмно-синяя плашка, со скриншотом -
// пара «картинка + белая карточка с текстом»
const Example = ({ ex, L }) => {
  const item = CASES_SYS.items.find((c) => c.id === ex.caseId);
  if (!item) return null;

  if (item.card && !ex.image) {
    return (
      <article className="sp-live">
        <div className="sp-live-text">
          <span className="sp-live-badge">{pick(L, item.badge)}</span>
          <h3 className="sp-live-title">{pick(L, item.industry)}</h3>
          <p className="sp-live-desc">{pick(L, ex.note)}</p>
          <Metrics metrics={item.metrics} L={L} className="sp-nums sp-nums--dark" />
        </div>
        <DealCard card={item.card} L={L} />
      </article>
    );
  }

  return (
    <article className="sp-ex2">
      {ex.image && (
        <figure className="sp-ex2-media">
          <Pic src={ex.image} alt={pick(L, ex.imageAlt)} width={1280} height={800} sizes="(max-width: 900px) 100vw, 680px" />
        </figure>
      )}
      <div className="sp-ex2-text">
        <div>
          <span className="sp-ex2-badge">{pick(L, item.badge)}</span>
          <h3 className="sp-ex2-title">{pick(L, item.industry)}</h3>
          <p className="sp-ex2-desc">{pick(L, ex.note)}</p>
        </div>
        <Metrics metrics={item.metrics} L={L} className="sp-nums" />
        {item.card && <DealCard card={item.card} L={L} />}
      </div>
    </article>
  );
};

const ServicePage = ({ slug }) => {
  const L = useLocale();
  const page = SERVICE_PAGES[slug];
  const guide = SERVICE_GUIDES[slug];

  // Статьи блога по теме услуги. Берём из той же локали, что и страница:
  // отправлять англоязычного читателя в русскую статью значит терять его.
  // Не найденный slug молча отбрасывается - список статей меняется, и
  // опечатка не должна стоить читателю перехода в никуда.
  const posts = L === 'en' ? BLOG_POSTS_EN : BLOG_POSTS;
  const readMore = (page?.readMore || [])
    .map((s) => posts.find((p) => p.slug === s))
    .filter(Boolean)
    .slice(0, 6);

  // Соседние страницы: с общей услуги ведём в отраслевые, с отраслевой -
  // обратно в общую. Без этих ссылок отраслевые страницы существовали бы
  // только в карте сайта: ни посетитель, ни обход по ссылкам на них не
  // попадают, а страница без входящих ссылок для поиска почти невидима.
  //
  // На английской версии русскоязычные-только страницы (обучение) из
  // списка убираем: ссылка вела бы на страницу, которой на английском
  // нет, и посетителя перебрасывало бы на русскую.
  const alsoSee = (page?.alsoSee || [])
    .filter((s) => L !== 'en' || !isRuOnly(`/services/${s}`))
    .map((s) => (SERVICE_PAGES[s] ? { slug: s, page: SERVICE_PAGES[s] } : null))
    .filter(Boolean)
    .slice(0, 4);

  // SEO: title, meta description и JSON-LD (Service + BreadcrumbList)
  useEffect(() => {
    if (!page) return undefined;

    // seoTitle - когда маркетинговый заголовок («Ни одна заявка больше не
    // теряется») хорош на странице, но ничего не говорит поиску
    document.title = `${pick(L, page.seoTitle || page.title)} - AIVFX`;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', pick(L, page.sub));

    const pageUrl = `${SITE}${localizedHref('/services/' + slug + '/', L)}`;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-service-jsonld', slug);
    const faq = SERVICE_GUIDES[slug]?.faq;
    script.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: pick(L, page.title),
        description: pick(L, page.sub),
        url: pageUrl,
        provider: {
          '@type': 'Organization',
          name: 'AIVFX',
          url: SITE,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: pick(L, SERVICE_UI.crumbHome),
            item: `${SITE}${localizedHref('/', L)}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: pick(L, SERVICE_UI.crumbServices),
            item: `${SITE}${localizedHref('/', L)}#services`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: pick(L, page.title),
            item: pageUrl,
          },
        ],
      },
      // Блок вопросов и ответов из гайда - отдельной разметкой для поиска
      ...(faq && faq.length
        ? [{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: pick(L, item.q),
            acceptedAnswer: { '@type': 'Answer', text: pick(L, item.a) },
          })),
        }]
        : []),
    ]);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [slug, L, page]);

  if (!page) return null;

  const hasMedia = Boolean(page.heroPhotos || page.heroPhoto);

  return (
    <div className="sp-page">
      <div className="shell">
        {/* Верхнюю навигацию «← На главную» и языки заменила общая шапка
            сайта (App.js рендерит Header и на страницах услуг). */}
        {/* Первый экран: текст слева, справа коллаж или одно фото (если есть) */}
        <header className={`sp-hero${hasMedia ? ' sp-hero--media' : ''}`}>
          <div className="sp-hero-text">
            <Crumb text={pick(L, page.kicker)} />
            <h1 className="sp-title">{pick(L, page.title)}</h1>
            <p className="sp-sub">{pick(L, page.sub)}</p>
            {page.heroActions && (
              <div className="sp-hero-actions">
                <a className="btn btn-primary" href={`${localizedHref('/', L)}#contact`}>
                  {pick(L, page.heroActions.primary)}<span className="btn-arrow">↗</span>
                </a>
                <a className="btn btn-ghost" href="#sp-examples">{pick(L, page.heroActions.secondary)}</a>
              </div>
            )}
            {page.heroTools && (
              <p className="sp-tools"><i aria-hidden="true" />{pick(L, page.heroTools)}</p>
            )}
          </div>
          {page.heroPhotos && <HeroMosaic photos={page.heroPhotos} L={L} />}
          {!page.heroPhotos && page.heroPhoto && <HeroPhoto photo={page.heroPhoto} L={L} />}
        </header>

        {/* «Когда это нужно»: слева схема или окно с шагами, справа боли */}
        <section className="sp-sec" aria-labelledby={`sp-pains-${slug}`}>
          <h2 id={`sp-pains-${slug}`} className="sp-h2">{pick(L, page.pains.title)}</h2>
          {page.pains.lead && <p className="sp-lead">{pick(L, page.pains.lead)}</p>}
          <div className="sp-when">
            {page.painsGraphic
              ? <PainsGraphic g={page.painsGraphic} L={L} />
              : page.proof && <ProofPanel proof={page.proof} L={L} />}
            <ol className="sp-pains">
              {page.pains.items.map((item, i) => (
                <li key={i} className="sp-pain">
                  <span className="sp-pain-n" aria-hidden="true">{num2(i)}</span>
                  <p className="sp-pain-text">{pick(L, item)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Возможности системы */}
        {page.features && (
          <section className="sp-sec" aria-labelledby={`sp-features-${slug}`}>
            <h2 id={`sp-features-${slug}`} className="sp-h2">{pick(L, page.features.title)}</h2>
            <div className="sp-features-grid">
              {page.features.items.map((f, i) => (
                <div key={i} className="sp-feature">
                  <span className="sp-feature-n" aria-hidden="true">{num2(i)}</span>
                  <h3 className="sp-feature-t">{pick(L, f.t)}</h3>
                  <p className="sp-feature-d">{pick(L, f.d)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Цепочки «событие → что происходит само» */}
        {page.recipes && (
          <section className="sp-sec" aria-labelledby={`sp-recipes-${slug}`}>
            <h2 id={`sp-recipes-${slug}`} className="sp-h2">{pick(L, page.recipes.title)}</h2>
            {page.recipes.lead && <p className="sp-lead">{pick(L, page.recipes.lead)}</p>}
            <Recipes recipes={page.recipes} L={L} />
          </section>
        )}

        {/* Живые примеры из кейсов главной: заявки студии и EastRide */}
        {page.examples && (
          <section className="sp-sec" id="sp-examples" aria-labelledby={`sp-examples-${slug}`}>
            <h2 id={`sp-examples-${slug}`} className="sp-h2">{pick(L, page.examples.title)}</h2>
            {page.examples.lead && <p className="sp-lead">{pick(L, page.examples.lead)}</p>}
            <div className="sp-example-list">
              {page.examples.items.map((ex) => <Example key={ex.caseId} ex={ex} L={L} />)}
            </div>
          </section>
        )}

        {/* Цены из pricing.md: первая карточка (с чего начинаем) выделена */}
        {page.prices && (
          <section className="sp-sec" aria-labelledby={`sp-prices-${slug}`}>
            <h2 id={`sp-prices-${slug}`} className="sp-h2">{pick(L, page.prices.title)}</h2>
            {page.prices.lead && <p className="sp-lead">{pick(L, page.prices.lead)}</p>}
            <div className="sp-price-grid">
              {page.prices.items.map((pr, i) => {
                const price = splitPrice(pick(L, pr.price));
                return (
                  <div key={i} className={`sp-price${i === 0 ? ' sp-price--hl' : ''}`}>
                    <h3 className="sp-price-t">{pick(L, pr.t)}</h3>
                    <span className="sp-price-v">
                      {price.pre && <small>{price.pre}</small>}
                      <span className="sp-price-sum">{price.main}</span>
                      {price.post && <small className="sp-price-post">{price.post}</small>}
                    </span>
                    <span className="sp-price-term">{pick(L, pr.term)}</span>
                    {pr.d && <p className="sp-price-d">{pick(L, pr.d)}</p>}
                  </div>
                );
              })}
            </div>
            {page.prices.note && <p className="sp-note">{pick(L, page.prices.note)}</p>}
          </section>
        )}

        {/* Шаги внедрения: одна белая карточка, шаги через разделители */}
        {page.steps && (
          <section className="sp-sec" aria-labelledby={`sp-steps-${slug}`}>
            <h2 id={`sp-steps-${slug}`} className="sp-h2">{pick(L, page.steps.title)}</h2>
            <ol className="sp-step-list">
              {page.steps.items.map((st, i) => (
                <li key={i} className="sp-step">
                  <span className="sp-step-no" aria-hidden="true">{i + 1}</span>
                  <h3 className="sp-step-t">{pick(L, st.t)}</h3>
                  <p className="sp-step-d">{pick(L, st.d)}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Свёрнутый гайд: на странице видны только заголовки разделов и
            вопросы, текст раскрывается по клику. Для поиска он весь в HTML. */}
        {guide && page.compactGuide && (
          <section className="sp-sec sg-fold" aria-labelledby={`sg-fold-${slug}`}>
            <h2 id={`sg-fold-${slug}`} className="sp-h2">{pick(L, GUIDE_UI.fold)}</h2>
            <div className="sg-fold-list">
              {guide.sections.map((sec) => (
                <details className="sg-fold-item" id={sec.id} key={sec.id}>
                  <summary className="sg-fold-sum">{pick(L, sec.h)}</summary>
                  <div className="sg-fold-body">
                    {sec.blocks.map((block, i) => (
                      <GuideBlock block={block} L={L} key={i} />
                    ))}
                  </div>
                </details>
              ))}
              {(guide.faq || []).map((item, i) => (
                <details className="sg-fold-item" key={`faq-${i}`}>
                  <summary className="sg-fold-sum">{pick(L, item.q)}</summary>
                  <div className="sg-fold-body"><p className="sg-p">{pick(L, item.a)}</p></div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Развёрнутый гайд: слева липкое оглавление, справа текст и FAQ */}
        {guide && !page.compactGuide && (
          <div className="sg-wrap">
            <aside className="sg-toc" aria-label={pick(L, GUIDE_UI.toc)}>
              <div className="sg-toc-in">
                <span className="sg-toc-title">{pick(L, GUIDE_UI.toc)}</span>
                <ol className="sg-toc-list">
                  {guide.sections.map((sec) => (
                    <li key={sec.id}>
                      <a href={`#${sec.id}`}>{pick(L, sec.h)}</a>
                    </li>
                  ))}
                </ol>
                <span className="sg-readtime">{pick(L, guide.readTime)}</span>
              </div>
            </aside>

            <article className="sg-body">
              <p className="sg-lead">{pick(L, guide.lead)}</p>

              {guide.sections.map((sec) => (
                <section className="sg-sec" id={sec.id} key={sec.id}>
                  <h2 className="sg-h">{pick(L, sec.h)}</h2>
                  {sec.blocks.map((block, i) => (
                    <GuideBlock block={block} L={L} key={i} />
                  ))}
                </section>
              ))}

              {guide.faq && guide.faq.length > 0 && (
                <section className="sg-sec sg-faq">
                  <h2 className="sg-h">{pick(L, GUIDE_UI.faqTitle)}</h2>
                  <dl className="sg-faq-list">
                    {guide.faq.map((item, i) => (
                      <div className="sg-faq-item" key={i}>
                        <dt>{pick(L, item.q)}</dt>
                        <dd>{pick(L, item.a)}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
            </article>
          </div>
        )}

        {alsoSee.length > 0 && (
          <section className="sp-alsosee" aria-labelledby={`sp-alsosee-${slug}`}>
            <h2 id={`sp-alsosee-${slug}`} className="sp-h3">{pick(L, SERVICE_UI.related)}</h2>
            <div className="sp-alsosee-list">
              {alsoSee.map((item) => (
                <a
                  key={item.slug}
                  className="sp-alsosee-item"
                  href={localizedHref(`/services/${item.slug}/`, L)}
                >
                  {pick(L, item.page.title)}
                  <span className="sp-alsosee-arrow" aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Материалы блога по теме услуги: читателю естественно продолжить
            разбором в блоге, а статьи получают ссылку со страницы, у
            которой вес выше, чем у них самих. */}
        {readMore.length > 0 && (
          <section className="sp-readmore" aria-labelledby={`sp-readmore-${slug}`}>
            <h2 id={`sp-readmore-${slug}`} className="sp-h3">{pick(L, SERVICE_UI.readOn)}</h2>
            <div className="sp-readmore-list">
              {readMore.map((post) => (
                <a
                  key={post.slug}
                  className="sp-readmore-item"
                  href={localizedHref(`/blog/${post.slug}/`, L)}
                >
                  <span className="sp-readmore-cat">{post.category}</span>
                  <span className="sp-readmore-title">{post.title}</span>
                  <span className="sp-readmore-time">{post.readingTime}</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Призыв: синяя плашка, белая кнопка */}
        <section className="sp-cta">
          <div className="sp-cta-text">
            <h2 className="sp-cta-title">{pick(L, page.cta?.title || SERVICE_CTA.title)}</h2>
            <p className="sp-cta-sub">{pick(L, page.cta?.sub || SERVICE_CTA.sub)}</p>
          </div>
          <a className="btn sp-cta-btn" href={`${localizedHref('/', L)}#contact`}>
            {pick(L, page.cta?.btn || SERVICE_CTA.btn)}<span className="btn-arrow">↗</span>
          </a>
        </section>
      </div>
    </div>
  );
};

export default ServicePage;
