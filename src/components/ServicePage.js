import React, { useEffect } from 'react';
import { SERVICE_PAGES, SERVICE_CTA, CASES_SYS } from '../data/systems-content';
import { SERVICE_GUIDES, GUIDE_UI } from '../data/service-guides';
import { BLOG_POSTS } from '../data/blog-posts';
import { BLOG_POSTS_EN } from '../data/blog-posts-en';
import { useLocale, pick, localizedHref, isRuOnly } from '../i18n';
import LangSwitch from './LangSwitch';
import Pic from './Pic';
import DealCard from './DealCard';
import './services-systems.css';

const SITE = 'https://aivfx.ru';

// Универсальная страница услуги /services/<slug>/.
// Контент целиком берётся из SERVICE_PAGES; неизвестный slug - ничего не рендерим.
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
            name: L === 'en' ? 'Home' : 'Главная',
            item: `${SITE}${localizedHref('/', L)}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: L === 'en' ? 'Services' : 'Услуги',
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

  return (
    <div className="sp-page">
      <div className="shell">
        {/* Тонкая верхняя навигация */}
        <nav className="sp-topnav" aria-label={L === 'en' ? 'Breadcrumb' : 'Навигация'}>
          <a className="sp-back mono" href={localizedHref('/', L)}>
            {L === 'en' ? '← Back to home' : '← На главную'}
          </a>
          <LangSwitch locale={L} />
        </nav>

        {/* Hero страницы */}
        <header className="sp-hero">
          <span className="kicker kicker-accent">{pick(L, page.kicker)}</span>
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
        </header>

        {/* Боли + панель-доказательство */}
        <div className="sp-main">
          <section className="sp-pains" aria-labelledby={`sp-pains-${slug}`}>
            <h2 id={`sp-pains-${slug}`} className="sp-block-title mono">
              {pick(L, page.pains.title)}
            </h2>
            <ul className="sp-pains-list">
              {page.pains.items.map((item, i) => (
                <li key={i} className="sp-pain">
                  <span className="sp-pain-glyph mono" aria-hidden="true">✕</span>
                  <span className="sp-pain-text">{pick(L, item)}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Как это выглядит: шаги одного обращения вместо абстракций */}
          <aside className="sp-proof" aria-label={L === 'en' ? 'Example' : 'Пример'}>
            <div className="sp-proof-head">
              <span className="sp-proof-name">{L === 'en' ? 'One inquiry, step by step' : 'Одно обращение по шагам'}</span>
            </div>
            <div className="sp-proof-body">
              {page.proof.map((line, i) => (
                <div
                  key={i}
                  className={`sp-proof-line${i === page.proof.length - 1 ? ' sp-proof-line--last' : ''}`}
                  style={{ animationDelay: `${0.15 + i * 0.18}s` }}
                >
                  <span className="sp-proof-ix">{String(i + 1).padStart(2, '0')}</span>
                  <span>{pick(L, line)}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Возможности системы */}
        {page.features && (
        <section className="sp-features" aria-labelledby={`sp-features-${slug}`}>
          <h2 id={`sp-features-${slug}`} className="sp-block-title mono">
            {pick(L, page.features.title)}
          </h2>
          <div className="sp-features-grid">
            {page.features.items.map((f, i) => (
              <div key={i} className="sp-feature">
                <h3 className="sp-feature-t">{pick(L, f.t)}</h3>
                <p className="sp-feature-d">{pick(L, f.d)}</p>
              </div>
            ))}
          </div>
        </section>
        )}

        {/* Цепочки «событие → что происходит само». Подпись страницы
            автоматизации: каждая строка начинается с момента в работе. */}
        {page.recipes && (
          <section className="sp-recipes" aria-labelledby={`sp-recipes-${slug}`}>
            <h2 id={`sp-recipes-${slug}`} className="sp-block-title mono">{pick(L, page.recipes.title)}</h2>
            {page.recipes.lead && <p className="sp-lead">{pick(L, page.recipes.lead)}</p>}
            <ol className="sp-recipe-list">
              {page.recipes.items.map((r, i) => (
                <li key={i} className="sp-recipe">
                  <span className="sp-recipe-when">{pick(L, r.when)}</span>
                  <span className="sp-recipe-chain">
                    {r.then.map((step, j) => (
                      <span key={j} className="sp-recipe-step">
                        <span className="sp-recipe-arrow" aria-hidden="true">→</span>
                        {pick(L, step)}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Живые примеры из кейсов главной: карточка заявки студии и EastRide */}
        {page.examples && (
          <section className="sp-examples" id="sp-examples" aria-labelledby={`sp-examples-${slug}`}>
            <h2 id={`sp-examples-${slug}`} className="sp-block-title mono">{pick(L, page.examples.title)}</h2>
            {page.examples.lead && <p className="sp-lead">{pick(L, page.examples.lead)}</p>}
            <div className="sp-example-list">
              {page.examples.items.map((ex) => {
                const item = CASES_SYS.items.find((c) => c.id === ex.caseId);
                if (!item) return null;
                return (
                  <article key={ex.caseId} className="sp-example">
                    <div className="sp-example-text">
                      <span className="sp-example-badge">{pick(L, item.badge)}</span>
                      <h3 className="sp-example-title">{pick(L, item.industry)}</h3>
                      <p className="sp-example-desc">{pick(L, ex.note)}</p>
                      <dl className="sp-example-metrics">
                        {item.metrics.map((m, j) => (
                          <div key={j} className="sp-example-metric">
                            <dt>{L === 'en' && m.vEn ? m.vEn : m.v}</dt>
                            <dd>{pick(L, m.l)}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    <div className="sp-example-media">
                      {item.card && <DealCard card={item.card} L={L} />}
                      {ex.image && (
                        <figure className="sp-example-shot">
                          <Pic src={ex.image} alt={pick(L, ex.imageAlt)} width={1280} height={800} sizes="(max-width: 1024px) 100vw, 560px" />
                        </figure>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Цены из pricing.md */}
        {page.prices && (
          <section className="sp-prices" aria-labelledby={`sp-prices-${slug}`}>
            <h2 id={`sp-prices-${slug}`} className="sp-block-title mono">{pick(L, page.prices.title)}</h2>
            <div className="sp-price-grid">
              {page.prices.items.map((pr, i) => (
                <div key={i} className="sp-price">
                  <h3 className="sp-price-t">{pick(L, pr.t)}</h3>
                  <span className="sp-price-v">{pick(L, pr.price)}</span>
                  <span className="sp-price-term">{pick(L, pr.term)}</span>
                  {pr.d && <p className="sp-price-d">{pick(L, pr.d)}</p>}
                </div>
              ))}
            </div>
            {page.prices.note && <p className="sp-note">{pick(L, page.prices.note)}</p>}
          </section>
        )}

        {/* Шаги внедрения */}
        {page.steps && (
          <section className="sp-steps" aria-labelledby={`sp-steps-${slug}`}>
            <h2 id={`sp-steps-${slug}`} className="sp-block-title mono">{pick(L, page.steps.title)}</h2>
            <ol className="sp-step-list">
              {page.steps.items.map((st, i) => (
                <li key={i} className="sp-step">
                  <h3 className="sp-step-t">{pick(L, st.t)}</h3>
                  <p className="sp-step-d">{pick(L, st.d)}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* ── Развёрнутый гайд ──
            Страница услуги перестаёт быть карточкой и становится материалом:
            слева липкое оглавление, справа текст с подзаголовками и FAQ. */}
        {/* Свёрнутый гайд: на странице видны только заголовки разделов и
            вопросы, текст раскрывается по клику. Для поиска он весь в HTML. */}
        {guide && page.compactGuide && (
          <section className="sg-fold" aria-labelledby={`sg-fold-${slug}`}>
            <h2 id={`sg-fold-${slug}`} className="sp-block-title mono">{pick(L, GUIDE_UI.fold)}</h2>
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

        {guide && !page.compactGuide && (
          <div className="sg-wrap">
            <aside className="sg-toc" aria-label={pick(L, GUIDE_UI.toc)}>
              <div className="sg-toc-in">
                <span className="sg-toc-title mono">{pick(L, GUIDE_UI.toc)}</span>
                <ol className="sg-toc-list">
                  {guide.sections.map((sec) => (
                    <li key={sec.id}>
                      <a href={`#${sec.id}`}>{pick(L, sec.h)}</a>
                    </li>
                  ))}
                </ol>
                <span className="sg-readtime mono">{pick(L, guide.readTime)}</span>
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
            <h2 id={`sp-alsosee-${slug}`} className="sp-block-title mono">
              {L === 'en' ? 'Related solutions' : 'Смежные решения'}
            </h2>
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

        {/* Материалы блога по теме услуги.
            Читателю, дочитавшему страницу услуги, естественно продолжить
            разбором в блоге - а статьи получают ссылку со страницы, у
            которой вес выше, чем у них самих. До этого блог был связан
            только сам с собой и с подвалом.
            Ненайденный slug молча отбрасывается: список статей меняется,
            и опечатка не должна стоить читателю перехода в никуда. */}
        {readMore.length > 0 && (
          <section className="sp-readmore" aria-labelledby={`sp-readmore-${slug}`}>
            <h2 id={`sp-readmore-${slug}`} className="sp-block-title mono">
              {L === 'en' ? 'Read on the topic' : 'Почитать по теме'}
            </h2>
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

        {/* CTA */}
        <section className="sp-cta">
          <h2 className="sp-cta-title">{pick(L, page.cta?.title || SERVICE_CTA.title)}</h2>
          <p className="sp-cta-sub">{pick(L, page.cta?.sub || SERVICE_CTA.sub)}</p>
          <a className="btn btn-primary" href={`${localizedHref('/', L)}#contact`}>
            {pick(L, page.cta?.btn || SERVICE_CTA.btn)}<span className="btn-arrow">↗</span>
          </a>
        </section>
      </div>
    </div>
  );
};

export default ServicePage;
