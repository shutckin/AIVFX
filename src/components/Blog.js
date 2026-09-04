import React, { useEffect, useState } from 'react';
import { BLOG_POSTS, getPostBySlug } from '../data/blog-posts';
import { BLOG_POSTS_EN, getPostBySlugEn } from '../data/blog-posts-en';
import LangSwitch from './LangSwitch';
import { useLocale, localizedHref } from '../i18n';
import Pic from './Pic';

// Дата статьи в человеческом виде для подписи под заголовком
const MONTHS_RU = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const fmtDate = (iso, en) => {
  const [y, m, d] = String(iso || '').split('-').map(Number);
  if (!y || !m || !d) return iso || '';
  return en ? `${d} ${MONTHS_EN[m - 1]} ${y}` : `${d} ${MONTHS_RU[m - 1]} ${y}`;
};


const SITE = 'https://aivfx.ru';

// Разметка внутри абзаца: **жирный** и ссылки вида [текст](/адрес/).
//
// Ссылки прямо в тексте важнее блока «читайте также» в конце: читатель
// переходит по ним в тот момент, когда у него возник вопрос, а поисковик
// по ним понимает, какие статьи связаны между собой и о чём каждая из них.
// Внутренние адреса прогоняются через localizedHref, поэтому в английской
// версии статьи тот же '/blog/foo/' сам ведёт на '/en/blog/foo/'.
const renderRich = (text, locale) => {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white">{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const isInternal = href.startsWith('/');
      return (
        <a
          key={i}
          href={isInternal ? localizedHref(href, locale) : href}
          className="blog-inline-link"
          {...(isInternal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {label}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

// CTA-блок в конце статьи
const CtaBlock = ({ onBack }) => {
  const locale = useLocale();
  const en = locale === 'en';
  return (
    <div className="mt-10 p-6 lg:p-8 bg-white/5 rounded-lg border border-white/10 text-center">
      <p className="text-xl font-bold text-white mb-3">
        {en ? 'Need an AI system or a video for your business?' : 'Нужна AI-система или видео для вашего бизнеса?'}
      </p>
      <p className="text-white/70 mb-6">
        {en
          ? 'Describe your case - we will come back with a proposal and an estimate within a day.'
          : 'Опишите задачу - вернёмся с предложением и оценкой в течение дня.'}
      </p>
      <a
        href={`${localizedHref('/', locale)}#contact`}
        onClick={(e) => { if (onBack) { e.preventDefault(); onBack(); setTimeout(() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 100); } }}
        className="inline-block px-8 py-3 font-semibold rounded-lg hover:opacity-90 transition-opacity"
        style={{ background: 'var(--accent)', color: 'var(--bg)' }}
      >
        {en ? 'Discuss your case' : 'Обсудить задачу'}
      </a>
    </div>
  );
};

// Рендер одного блока контента
const Block = ({ block, onBack }) => {
  const locale = useLocale();
  const en = locale === 'en';
  switch (block.type) {
    case 'h2':
      return <h2 className="text-2xl lg:text-3xl font-bold text-white mt-10 mb-4">{block.text}</h2>;
    case 'h3':
      return <h3 className="text-xl font-bold text-white mt-6 mb-3">{block.text}</h3>;
    case 'p':
      return <p className="mb-4">{renderRich(block.text, locale)}</p>;
    case 'ul':
      return (
        <ul className="list-disc pl-6 space-y-2 mb-4">
          {block.items.map((it, i) => <li key={i}>{renderRich(it, locale)}</li>)}
        </ul>
      );
    case 'ol':
      return (
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          {block.items.map((it, i) => <li key={i}>{renderRich(it, locale)}</li>)}
        </ol>
      );
    case 'quote':
      return (
        <blockquote className="my-8 pl-6 border-l-4 text-white/90 italic text-lg" style={{ borderColor: 'var(--accent)' }}>
          {renderRich(block.text, locale)}
        </blockquote>
      );
    case 'image':
      return (
        <figure className="my-8 -mx-2 sm:mx-0">
          <div className="rounded-lg overflow-hidden border border-white/10 bg-black/30">
            <Pic
              src={block.src}
              alt={block.alt || ''}
              sizes="(max-width: 768px) 100vw, 1024px"
              className="w-full h-auto block"
            />
          </div>
          {(block.caption || block.source) && (
            <figcaption className="text-white/45 text-xs mt-2 px-1 leading-relaxed">
              {block.caption}
              {block.caption && block.source ? ' · ' : ''}
              {block.source && (
                <span className="text-white/35">
                  {`${en ? 'Source' : 'Источник'}: ${block.source}`}
                </span>
              )}
            </figcaption>
          )}
        </figure>
      );
    case 'cta':
      return <CtaBlock onBack={onBack} />;
    default:
      return null;
  }
};

// ── «Читайте также» ────────────────────────────────────────────────────
//
// Связи заданы в самой статье полем related, а не выводятся автоматически
// по совпадению категории: соседство по рубрике почти никогда не значит,
// что вторая статья отвечает на вопрос, возникший после первой.
//
// Несуществующий slug молча отбрасывается, а не роняет страницу и не
// рисует битую ссылку: список статей меняется, и опечатка в related не
// должна стоить читателю перехода в никуда. Если после отбора не осталось
// ни одной статьи, блока просто нет.
const RelatedPosts = ({ post, onOpenPost }) => {
  const locale = useLocale();
  const en = locale === 'en';
  const POSTS = en ? BLOG_POSTS_EN : BLOG_POSTS;

  const related = (post.related || [])
    .filter((slug) => slug !== post.slug)
    .map((slug) => POSTS.find((p) => p.slug === slug))
    .filter(Boolean)
    .slice(0, 3);

  if (!related.length) return null;

  return (
    <aside className="blog-related">
      <h2 className="blog-related-title">{en ? 'Read next' : 'Читайте дальше'}</h2>
      <div className="blog-related-list">
        {related.map((p) => (
          <a
            key={p.slug}
            href={localizedHref(`/blog/${p.slug}/`, locale)}
            onClick={(e) => { e.preventDefault(); onOpenPost(p.slug); }}
            className="blog-related-item"
          >
            <span className="blog-related-cat">{p.category}</span>
            <span className="blog-related-name">{p.title}</span>
            <span className="blog-related-time">{p.readingTime}</span>
          </a>
        ))}
      </div>
    </aside>
  );
};

// Вопросы и ответы для разметки, собранные из самой статьи.
//
// Отдельного поля с вопросами намеренно нет: любое второе место, где
// живёт тот же текст, однажды разойдётся с первым, а расхождение
// разметки и страницы поисковики считают нарушением и снимают
// расширенный сниппет со всего сайта.
//
// Поэтому источник один - содержимое статьи. Берём подзаголовки третьего
// уровня, оканчивающиеся вопросительным знаком, и абзацы под ними до
// следующего заголовка. Так вопросы попадают в разметку ровно в том
// виде, в каком их читает человек.
const faqFromContent = (content = []) => {
  const out = [];
  for (let i = 0; i < content.length; i += 1) {
    const b = content[i];
    if (b.type !== 'h3' || !b.text || !b.text.trim().endsWith('?')) continue;
    const answer = [];
    for (let j = i + 1; j < content.length; j += 1) {
      const next = content[j];
      if (next.type === 'h2' || next.type === 'h3') break;
      if (next.type === 'p') answer.push(next.text);
      if (next.type === 'ul' || next.type === 'ol') answer.push(next.items.join(' '));
    }
    if (!answer.length) continue;
    // Разметка не понимает нашу разметку жирного и ссылок - отдаём чистый текст
    const plain = answer
      .join(' ')
      .replace(/\*\*/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();
    out.push({ q: b.text.trim(), a: plain });
  }
  return out;
};

// Полоса прочитанного вверху страницы.
//
// В статье на пятнадцать минут человек не видит, сколько ещё осталось:
// полоса прокрутки браузера на длинной странице почти незаметна, а на
// телефоне её нет вовсе. Тонкая линия сверху отвечает на этот вопрос
// молча и заодно даёт понять, что материал длинный, но конечный.
//
// Считается на прокрутке через requestAnimationFrame: событие приходит
// чаще, чем браузер рисует кадры, и без этого мы бы пересчитывали
// геометрию впустую по нескольку раз на кадр.
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let scheduled = false;
    const measure = () => {
      scheduled = false;
      const doc = document.documentElement;
      const reach = doc.scrollHeight - window.innerHeight;
      // Страница короче экрана - прогресс не имеет смысла
      setProgress(reach > 40 ? Math.min(1, Math.max(0, window.scrollY / reach)) : 0);
    };
    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="blog-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
};

// Карточка статьи (обычная или featured - крупная горизонтальная)
const PostCard = ({ post, onOpenPost, featured }) => {
  const locale = useLocale();
  const en = locale === 'en';
  return (
    <a
      href={localizedHref(`/blog/${post.slug}/`, locale)}
      onClick={(e) => { e.preventDefault(); onOpenPost(post.slug); }}
      className={`blog-card ${featured ? 'md:grid md:grid-cols-2' : ''}`}
    >
      <div className={`blog-card-img ${featured ? 'aspect-video md:aspect-auto' : 'aspect-video'}`}>
        <Pic src={post.cover} alt={post.title} sizes="(max-width: 768px) 100vw, 520px" />
      </div>
      <div className={featured ? 'p-7 lg:p-9 flex flex-col justify-center' : 'p-6'}>
        <div className="flex items-center gap-3 mb-3">
          <span className="blog-badge">{post.category}</span>
          <span className="blog-meta">{post.readingTime}</span>
        </div>
        <h3
          className={`font-bold text-white leading-snug mb-2 ${featured ? 'text-2xl lg:text-3xl' : 'text-lg'}`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {post.title}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed">{post.excerpt}</p>
        <span className="blog-read mt-4 inline-block">{en ? 'Read →' : 'Читать →'}</span>
      </div>
    </a>
  );
};

// Строка оглавления: номер, категория, заголовок, маленькая обложка.
//
// Карточка с большой картинкой честно показывает одну статью и съедает
// пол-экрана. Когда статей много, читателю важнее увидеть их список
// целиком, а не разглядывать обложку каждой: строка занимает вчетверо
// меньше места, а картинка остаётся - просто в роли метки, а не героя.
const PostRow = ({ post, onOpenPost, num }) => {
  const locale = useLocale();
  return (
    <a
      href={localizedHref(`/blog/${post.slug}/`, locale)}
      onClick={(e) => { e.preventDefault(); onOpenPost(post.slug); }}
      className="blog-row"
    >
      <span className="blog-row-num" aria-hidden="true">{String(num).padStart(2, '0')}</span>
      <span className="blog-row-body">
        <span className="blog-row-cat">{post.category}</span>
        <span className="blog-row-title">{post.title}</span>
        <span className="blog-row-time">{post.readingTime}</span>
      </span>
      <span className="blog-row-thumb">
        <Pic src={post.cover} alt={post.title} sizes="120px" />
      </span>
    </a>
  );
};

// ── Витрина блога: фильтр по категориям + сетка ─────────────────────────
const BlogList = ({ onBack, onOpenPost }) => {
  const en = useLocale() === 'en';
  const POSTS = en ? BLOG_POSTS_EN : BLOG_POSTS;
  const ALL = en ? 'All' : 'Все';
  const FALLBACK = en ? 'Articles' : 'Статьи';

  const categories = [];
  POSTS.forEach((p) => {
    const c = p.category || FALLBACK;
    if (!categories.includes(c)) categories.push(c);
  });

  const [active, setActive] = useState(ALL);
  const filtered = active === ALL
    ? POSTS
    : POSTS.filter((p) => (p.category || FALLBACK) === active);

  // Три уровня подачи. В режиме «Все» первая статья идёт крупно, две
  // следующие - средними карточками, остальные - плотным оглавлением.
  // При выбранной категории статей мало, крупная подача там смотрелась бы
  // как случайно раздутая карточка, поэтому весь список идёт ровно.
  const isAll = active === ALL;
  const featured = isAll ? filtered[0] : null;
  const secondary = isAll ? filtered.slice(1, 3) : [];
  const listed = isAll ? filtered.slice(3) : filtered;

  return (
    <div className="blog-page blog-page--list min-h-screen pt-24 pb-20">
      <div className="blog-wrap">
        {/* Назад + переключатель языка */}
        <div className="page-topbar mb-10">
          <button
            onClick={onBack}
            className="flex items-center text-white/55 hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {en ? 'Back to home' : 'На главную'}
          </button>
          <LangSwitch locale={en ? 'en' : 'ru'} />
        </div>

        {/* Заголовок */}
        <div className="blog-kicker mb-4">{en ? 'AIVFX · JOURNAL' : 'AIVFX · ЖУРНАЛ'}</div>
        <h1
          className="text-4xl lg:text-6xl font-bold text-white mb-5 leading-[1.05]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {en
            ? <>The blog on neural networks<br />and AI video production</>
            : <>Блог о&nbsp;нейросетях<br />и&nbsp;AI-видеопроизводстве</>}
        </h1>
        <p className="text-white/55 text-lg max-w-2xl mb-10 leading-relaxed">
          {en
            ? 'Step-by-step guides to the tools, honest model comparisons and breakdowns of real cases - from the first prompt to a finished commercial.'
            : 'Пошаговые гайды по сервисам, честные сравнения моделей и разбор реальных кейсов - от первого промпта до готового рекламного ролика.'}
        </p>

        {/* Категории. Раньше это были восемь одинаковых «таблеток», которые
            на узком экране складывались в три ряда и занимали пол-экрана
            ещё до первой статьи. Теперь строка с прокруткой: активная
            подчёркнута, рядом счётчик статей. */}
        <nav className="blog-cats" aria-label={en ? 'Blog categories' : 'Категории блога'}>
          {[ALL, ...categories].map((cat) => {
            const count = cat === ALL
              ? POSTS.length
              : POSTS.filter((p) => (p.category || FALLBACK) === cat).length;
            return (
              <button
                key={cat}
                className={`blog-cat ${active === cat ? 'active' : ''}`}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
              >
                {cat}
                <span className="blog-cat-num">{count}</span>
              </button>
            );
          })}
        </nav>

        {/* Ритм страницы: одна крупная статья, затем пара средних, затем
            плотное оглавление. Ровная сетка одинаковых карточек не давала
            глазу зацепиться и заставляла листать одинаковые прямоугольники;
            здесь видно, что важнее, и на экран помещается втрое больше. */}
        {featured && (
          <div className="blog-lead-wrap">
            <PostCard post={featured} onOpenPost={onOpenPost} featured />
          </div>
        )}

        {secondary.length > 0 && (
          <div className="blog-duo">
            {secondary.map((post) => (
              <PostCard key={post.slug} post={post} onOpenPost={onOpenPost} />
            ))}
          </div>
        )}

        {listed.length > 0 && (
          <div className="blog-index">
            <div className="blog-index-head">
              <span>{en ? 'All articles' : 'Все статьи'}</span>
              <span className="blog-index-count">{listed.length}</span>
            </div>
            {listed.map((post, i) => (
              <PostRow
                key={post.slug}
                post={post}
                onOpenPost={onOpenPost}
                num={secondary.length + (featured ? 1 : 0) + i + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Страница статьи ─────────────────────────────────────────────────────
const BlogPost = ({ post, onBack, onBackToList, onOpenPost }) => {
  const locale = useLocale();
  const en = locale === 'en';
  // Внедряем Article + BreadcrumbList JSON-LD в <head>.
  // Prerender снимает DOM после рендера, поэтому разметка попадёт в HTML.
  useEffect(() => {
    const url = `${SITE}${localizedHref(`/blog/${post.slug}/`, locale)}`;
    const blogUrl = `${SITE}${localizedHref('/blog/', locale)}`;
    const homeUrl = `${SITE}${localizedHref('/', locale)}`;
    const ld = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${url}#article`,
          headline: post.title,
          description: post.description,
          image: `${SITE}${post.cover}`,
          datePublished: post.date,
          dateModified: post.dateModified,
          // Автор - человек, а не организация: ИИ-поиск и Google выше ценят
          // подписанный материал с понятной экспертизой (E-E-A-T)
          author: {
            '@type': 'Person',
            name: en ? 'Artem Shutkin' : 'Артем Шуткин',
            jobTitle: en ? 'Director, AI video producer' : 'Режиссёр, продюсер AI-видео',
            url: `${SITE}/#about`,
            sameAs: ['https://t.me/aivfx'],
          },
          publisher: {
            '@type': 'Organization',
            name: 'AIVFX',
            logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
          },
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          inLanguage: en ? 'en-US' : 'ru-RU',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: en ? 'Home' : 'Главная', item: homeUrl },
            { '@type': 'ListItem', position: 2, name: en ? 'Blog' : 'Блог', item: blogUrl },
            { '@type': 'ListItem', position: 3, name: post.title, item: url },
          ],
        },
        // Вопросы и ответы, если они есть в статье. Поисковик показывает
        // такую страницу развёрнутым сниппетом: строка в выдаче занимает
        // больше места и собирает больше переходов на той же позиции.
        //
        // Список собирается из тех же блоков, что видит читатель, поэтому
        // разметка не может разойтись с текстом страницы. Расхождение как
        // раз и считается нарушением: разметка, обещающая ответ, которого
        // на странице нет, приводит к снятию расширенного сниппета.
        ...(faqFromContent(post.content).length
          ? [{
            '@type': 'FAQPage',
            mainEntity: faqFromContent(post.content).map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }]
          : []),
      ],
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-blog-ld', post.slug);
    // textContent безопасен: контент полностью наш, без пользовательского ввода
    script.textContent = JSON.stringify(ld);
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [post, locale, en]);

  return (
    <div className="blog-page blog-page--article min-h-screen pt-24 pb-16">
      <ReadingProgress />
      <div className="blog-wrap container mx-auto px-4 py-6 max-w-3xl">
        <div className="mb-6 flex items-center gap-4 text-sm page-topbar">
          <button onClick={onBackToList} className="flex items-center text-white/80 hover:text-white transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {en ? 'All articles' : 'Все статьи'}
          </button>
          <span className="text-white/30">·</span>
          <button onClick={onBack} className="text-white/60 hover:text-white transition-colors">{en ? 'Back to home' : 'На главную'}</button>
          <LangSwitch locale={en ? 'en' : 'ru'} />
        </div>

        <article className="card">
          <figure className="m-0">
            <div className="aspect-video overflow-hidden bg-black/30 rounded-t-lg">
              {/* Обложка - самый крупный элемент первого экрана статьи (LCP):
                  грузим её первой, до скриптов и шрифтов */}
              <Pic src={post.cover} alt={post.title} width="768" height="432" eager sizes="(max-width: 768px) 100vw, 1024px" className="w-full h-full object-cover" />
            </div>
            {post.coverSource && (
              <figcaption className="text-white/40 text-xs px-6 pt-2">
                {`${en ? 'Image source' : 'Источник изображения'}: ${post.coverSource}`}
              </figcaption>
            )}
          </figure>
          <div className="p-6 lg:p-10">
            {/* Подпись автора и даты. Без видимого автора и даты обновления
                ИИ-поисковики и Google считают материал анонимным и не цитируют:
                разметка Article есть, но человек и дата должны быть и на
                странице, а не только в JSON-LD. */}
            <div className="text-white/50 text-sm mb-3 blog-byline">
              <span>{en ? 'Artem Shutkin, director' : 'Артем Шуткин, режиссёр'}</span>
              <span aria-hidden="true"> · </span>
              <time dateTime={post.dateModified || post.date}>
                {(post.dateModified && post.dateModified !== post.date)
                  ? `${en ? 'Updated' : 'Обновлено'} ${fmtDate(post.dateModified, en)}`
                  : `${en ? 'Published' : 'Опубликовано'} ${fmtDate(post.date, en)}`}
              </time>
              <span aria-hidden="true"> · </span>
              <span>{post.readingTime} {en ? 'read' : 'чтения'}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
            <div className="text-white/80 space-y-1 leading-relaxed text-base lg:text-lg">
              {post.content.map((block, i) => <Block key={i} block={block} onBack={onBack} />)}
            </div>
            <RelatedPosts post={post} onOpenPost={onOpenPost} />
          </div>
        </article>
      </div>
    </div>
  );
};

// Обновляет <title> и <meta name="description"> + og-теги под текущую страницу.
// Prerender снимает DOM после рендера, поэтому каждая страница блога
// получит в HTML свой уникальный заголовок и описание.
const setDocumentMeta = (title, description) => {
  document.title = title;
  const ensureMeta = (key, keyAttr, value) => {
    let el = document.head.querySelector(`meta[${keyAttr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(keyAttr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  };
  ensureMeta('description', 'name', description);
  ensureMeta('og:title', 'property', title);
  ensureMeta('og:description', 'property', description);
};

// ── Главный компонент: переключает список ↔ статью ──────────────────────
const Blog = ({ slug, onBack, onOpenPost, onBackToList }) => {
  const en = useLocale() === 'en';
  const post = slug ? (en ? getPostBySlugEn(slug) : getPostBySlug(slug)) : null;

  useEffect(() => {
    if (post) {
      setDocumentMeta(`${post.title} | AIVFX`, post.description);
    } else if (en) {
      setDocumentMeta(
        'AIVFX Blog - AI video guides and comparisons',
        'The AIVFX studio blog: step-by-step guides to creating AI video, neural network comparisons and breakdowns of real AI video production cases.'
      );
    } else {
      setDocumentMeta(
        'Блог AIVFX - гайды и сравнения по AI-видео',
        'Блог студии AIVFX: пошаговые гайды по созданию AI-видео, сравнения нейросетей и разбор реальных кейсов AI-видеопроизводства.'
      );
    }
  }, [post, en]);

  if (slug && post) {
    return <BlogPost post={post} onBack={onBack} onBackToList={onBackToList} onOpenPost={onOpenPost} />;
  }
  return <BlogList onBack={onBack} onOpenPost={onOpenPost} />;
};

export default Blog;
