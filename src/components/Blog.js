import React, { useEffect, useState } from 'react';
import { BLOG_POSTS, getPostBySlug } from '../data/blog-posts';
import { BLOG_POSTS_EN, getPostBySlugEn } from '../data/blog-posts-en';
import LangSwitch from './LangSwitch';
import { useLocale, localizedHref } from '../i18n';
import Pic from './Pic';
import Article from './blog/Article';

const SITE = 'https://aivfx.ru';

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

  return <Article post={post} onBack={onBack} onBackToList={onBackToList} onOpenPost={onOpenPost} />;
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
