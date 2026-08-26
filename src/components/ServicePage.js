import React, { useEffect } from 'react';
import { SERVICE_PAGES, SERVICE_CTA } from '../data/systems-content';
import { SERVICE_GUIDES, GUIDE_UI } from '../data/service-guides';
import { useLocale, pick, localizedHref } from '../i18n';
import './services-systems.css';

const SITE = 'https://aivfx.ru';

// Универсальная страница услуги /services/<slug>/.
// Контент целиком берётся из SERVICE_PAGES; неизвестный slug — ничего не рендерим.
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

  // SEO: title, meta description и JSON-LD (Service + BreadcrumbList)
  useEffect(() => {
    if (!page) return undefined;

    document.title = `${pick(L, page.title)} — AIVFX`;

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
      // Блок вопросов и ответов из гайда — отдельной разметкой для поиска
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
        </nav>

        {/* Hero страницы */}
        <header className="sp-hero">
          <span className="kicker kicker-accent">{pick(L, page.kicker)}</span>
          <h1 className="sp-title">{pick(L, page.title)}</h1>
          <p className="sp-sub">{pick(L, page.sub)}</p>
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

          {/* Окно системы: живой лог вместо абстракций */}
          <aside className="sp-proof" aria-label="System log">
            <div className="sp-proof-head">
              <span className="sp-proof-dots" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span className="sp-proof-name mono">SYSTEM LOG</span>
            </div>
            <div className="sp-proof-body">
              {page.proof.map((line, i) => (
                <div
                  key={i}
                  className={`sp-proof-line${i === page.proof.length - 1 ? ' sp-proof-line--last' : ''}`}
                  style={{ animationDelay: `${0.15 + i * 0.18}s` }}
                >
                  <span className="sp-proof-ix">{`${String(i + 1).padStart(2, '0')} ▸`}</span>
                  <span>{pick(L, line)}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Возможности системы */}
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

        {/* ── Развёрнутый гайд ──
            Страница услуги перестаёт быть карточкой и становится материалом:
            слева липкое оглавление, справа текст с подзаголовками и FAQ. */}
        {guide && (
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

        {/* CTA */}
        <section className="sp-cta">
          <h2 className="sp-cta-title">{pick(L, SERVICE_CTA.title)}</h2>
          <p className="sp-cta-sub">{pick(L, SERVICE_CTA.sub)}</p>
          <a className="btn btn-primary" href={`${localizedHref('/', L)}#contact`}>
            {pick(L, SERVICE_CTA.btn)}<span className="btn-arrow">↗</span>
          </a>
        </section>
      </div>
    </div>
  );
};

export default ServicePage;
