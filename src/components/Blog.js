import React, { useEffect } from 'react';
import { BLOG_POSTS, getPostBySlug } from '../data/blog-posts';

const SITE = 'https://aivfx.ru';

// Простой парсер **жирного** текста внутри абзаца
const renderRich = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white">{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

// CTA-блок в конце статьи
const CtaBlock = ({ onBack }) => (
  <div className="mt-10 p-6 lg:p-8 bg-white/5 rounded-lg border border-white/10 text-center">
    <p className="text-xl font-bold text-white mb-3">
      Нужен AI-ролик для вашего бизнеса?
    </p>
    <p className="text-white/70 mb-6">
      Опишите задачу — пришлём смету и сроки в течение дня. Готовый ролик за 72 часа.
    </p>
    <a
      href="/#contact"
      onClick={(e) => { if (onBack) { e.preventDefault(); onBack(); setTimeout(() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 100); } }}
      className="inline-block px-8 py-3 font-semibold rounded-lg hover:opacity-90 transition-opacity"
      style={{ background: 'var(--accent)', color: 'var(--bg)' }}
    >
      Обсудить проект
    </a>
  </div>
);

// Рендер одного блока контента
const Block = ({ block, onBack }) => {
  switch (block.type) {
    case 'h2':
      return <h2 className="text-2xl lg:text-3xl font-bold text-white mt-10 mb-4">{block.text}</h2>;
    case 'h3':
      return <h3 className="text-xl font-bold text-white mt-6 mb-3">{block.text}</h3>;
    case 'p':
      return <p className="mb-4">{renderRich(block.text)}</p>;
    case 'ul':
      return (
        <ul className="list-disc pl-6 space-y-2 mb-4">
          {block.items.map((it, i) => <li key={i}>{renderRich(it)}</li>)}
        </ul>
      );
    case 'ol':
      return (
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          {block.items.map((it, i) => <li key={i}>{renderRich(it)}</li>)}
        </ol>
      );
    case 'quote':
      return (
        <blockquote className="my-8 pl-6 border-l-4 text-white/90 italic text-lg" style={{ borderColor: 'var(--accent)' }}>
          {renderRich(block.text)}
        </blockquote>
      );
    case 'cta':
      return <CtaBlock onBack={onBack} />;
    default:
      return null;
  }
};

// Карточка статьи
const PostCard = ({ post, onOpenPost }) => (
  <a
    href={`/blog/${post.slug}/`}
    onClick={(e) => { e.preventDefault(); onOpenPost(post.slug); }}
    className="card group block overflow-hidden hover:border-white/30 transition-colors"
    style={{ textDecoration: 'none' }}
  >
    <div className="aspect-video overflow-hidden bg-black/30">
      <img
        src={post.cover}
        alt={post.title}
        width="640"
        height="360"
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-6">
      <div className="text-white/50 text-sm mb-2">{post.readingTime} чтения</div>
      <h2 className="text-xl font-bold text-white mb-3 leading-snug">{post.title}</h2>
      <p className="text-white/70 text-sm leading-relaxed">{post.excerpt}</p>
    </div>
  </a>
);

// ── Витрина блога: статьи, сгруппированные по категориям ────────────────
const BlogList = ({ onBack, onOpenPost }) => {
  // Группируем посты по category, сохраняя порядок появления категорий
  const groups = [];
  const byCat = {};
  BLOG_POSTS.forEach((post) => {
    const cat = post.category || 'Статьи';
    if (!byCat[cat]) { byCat[cat] = []; groups.push(cat); }
    byCat[cat].push(post);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Назад на главную
          </button>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Блог AIVFX</h1>
        <p className="text-white/70 text-lg mb-10 max-w-2xl">
          Гайды, сравнения нейросетей и разбор реальных кейсов AI-видеопроизводства.
          Делимся тем, что узнали на практике.
        </p>

        {groups.map((cat) => (
          <section key={cat} className="mb-12">
            <h2 className="text-sm uppercase tracking-widest text-white/40 mb-5 border-b border-white/10 pb-2">
              {cat}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {byCat[cat].map((post) => (
                <PostCard key={post.slug} post={post} onOpenPost={onOpenPost} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

// ── Страница статьи ─────────────────────────────────────────────────────
const BlogPost = ({ post, onBack, onBackToList }) => {
  // Внедряем Article + BreadcrumbList JSON-LD в <head>.
  // Prerender снимает DOM после рендера, поэтому разметка попадёт в HTML.
  useEffect(() => {
    const url = `${SITE}/blog/${post.slug}/`;
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
          author: { '@type': 'Organization', name: 'AIVFX', url: SITE },
          publisher: {
            '@type': 'Organization',
            name: 'AIVFX',
            logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
          },
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          inLanguage: 'ru-RU',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: 'Блог', item: `${SITE}/blog/` },
            { '@type': 'ListItem', position: 3, name: post.title, item: url },
          ],
        },
      ],
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-blog-ld', post.slug);
    // textContent безопасен: контент полностью наш, без пользовательского ввода
    script.textContent = JSON.stringify(ld);
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [post]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-6 flex items-center gap-4 text-sm">
          <button onClick={onBackToList} className="flex items-center text-white/80 hover:text-white transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Все статьи
          </button>
          <span className="text-white/30">·</span>
          <button onClick={onBack} className="text-white/60 hover:text-white transition-colors">На главную</button>
        </div>

        <article className="card">
          <div className="aspect-video overflow-hidden bg-black/30 rounded-t-lg">
            <img src={post.cover} alt={post.title} width="768" height="432" className="w-full h-full object-cover" />
          </div>
          <div className="p-6 lg:p-10">
            <div className="text-white/50 text-sm mb-3">{post.readingTime} чтения</div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
            <div className="text-white/80 space-y-1 leading-relaxed text-base lg:text-lg">
              {post.content.map((block, i) => <Block key={i} block={block} onBack={onBack} />)}
            </div>
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
  const post = slug ? getPostBySlug(slug) : null;

  useEffect(() => {
    if (post) {
      setDocumentMeta(`${post.title} | AIVFX`, post.description);
    } else {
      setDocumentMeta(
        'Блог AIVFX — гайды и сравнения по AI-видео',
        'Блог студии AIVFX: пошаговые гайды по созданию AI-видео, сравнения нейросетей и разбор реальных кейсов AI-видеопроизводства.'
      );
    }
  }, [post]);

  if (slug && post) {
    return <BlogPost post={post} onBack={onBack} onBackToList={onBackToList} />;
  }
  return <BlogList onBack={onBack} onOpenPost={onOpenPost} />;
};

export default Blog;
