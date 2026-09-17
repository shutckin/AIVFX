import React, { useEffect } from 'react';
import { getPostBySlug } from '../data/blog-posts';
import { getPostBySlugEn } from '../data/blog-posts-en';
import { useLocale, localizedHref } from '../i18n';
import Article from './blog/Article';
import BlogIndex from './blog/BlogIndex';

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
  return <BlogIndex onBack={onBack} onOpenPost={onOpenPost} />;
};

export default Blog;
