import React, { useEffect, useState } from 'react';
import { BLOG_POSTS } from '../../data/blog-posts';
import { BLOG_POSTS_EN } from '../../data/blog-posts-en';
import { useLocale, localizedHref } from '../../i18n';
import Pic from '../Pic';
import LangSwitch from '../LangSwitch';
import { ArticleBody, PayRow, headingId } from './ArticleBlocks';
import { partnerUrl, trackPartnerClick } from '../../data/partners';
import './article.css';

// ── Страница статьи: «карточки + справочник» ────────────────────────────
//
// Заголовок рядом с обложкой, под ними блок «коротко» с ответами на главные
// вопросы, дальше текст в колонке 720 и липкое оглавление справа. На
// телефоне оглавление сворачивается в строку над текстом.
//
// Промпты, подписи к кадрам и должность автора не показываем: они
// отвлекали от чтения, а поисковикам хватает имени в конце и разметки.

const THEME_KEY = 'aivfx-theme';
const MONTHS_RU = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const fmtDate = (iso, en) => {
  const [y, m, d] = String(iso || '').split('-').map(Number);
  if (!y || !m || !d) return iso || '';
  return en ? `${d} ${MONTHS_EN[m - 1]} ${y}` : `${d} ${MONTHS_RU[m - 1]} ${y}`;
};

// Тема статьи. Светлая по умолчанию, выбор запоминается в браузере.
// Атрибут стоит на <html>, чтобы перекрасились и шапка, и меню; при
// уходе со статьи атрибут снимается, остальной сайт остаётся тёмным.
const readTheme = () => {
  try { return localStorage.getItem(THEME_KEY) || 'light'; } catch (e) { return 'light'; }
};
const useArticleTheme = () => {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const t = readTheme();
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
    return () => document.documentElement.removeAttribute('data-theme');
  }, []);
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* приватный режим */ }
  };
  return [theme, toggle];
};

const ThemeButton = ({ theme, onToggle, en }) => (
  <button type="button" className="art-theme" onClick={onToggle} aria-label={en ? 'Switch theme' : 'Переключить тему'}>
    {theme === 'dark' ? (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" /></svg>
    ) : (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
    )}
    <span>{theme === 'dark' ? (en ? 'Light' : 'Светлая') : (en ? 'Dark' : 'Тёмная')}</span>
  </button>
);

// Полоса прочитанного вверху страницы. Считается на прокрутке через
// requestAnimationFrame: событий приходит больше, чем кадров.
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let scheduled = false;
    const measure = () => {
      scheduled = false;
      const doc = document.documentElement;
      const reach = doc.scrollHeight - window.innerHeight;
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

// Оглавление из заголовков второго уровня. Текущий раздел подсвечивается
// по IntersectionObserver, без обработчика прокрутки.
const Toc = ({ content, active }) => (
  <div className="art-toc">
    {content.filter((b) => b.type === 'h2').map((b) => {
      const id = headingId(b.text);
      return <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{b.text}</a>;
    })}
  </div>
);

const useActiveHeading = (content) => {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const heads = content.filter((b) => b.type === 'h2').map((b) => document.getElementById(headingId(b.text))).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-84px 0px -70% 0px' });
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [content]);
  return active;
};

// «Коротко»: четыре ответа до текста. Заданы в статье полем facts.
// Ответ со ссылкой partner:... становится карточкой-ссылкой.
const Facts = ({ facts, locale }) => {
  if (!facts || !facts.length) return null;
  return (
    <div className="art-facts">
      {facts.map((f, i) => {
        const tone = f.tone ? ` is-${f.tone}` : '';
        if (f.href && f.href.startsWith('partner:')) {
          const id = f.href.slice(8);
          const url = partnerUrl(id);
          if (url) {
            return (
              <a key={i} className="art-fact" href={url} target="_blank" rel="sponsored nofollow noopener noreferrer" onClick={() => trackPartnerClick(id)}>
                <small>{f.label}</small><b>{f.value}</b>
              </a>
            );
          }
        }
        return <div key={i} className="art-fact"><small>{f.label}</small><b className={tone.trim()}>{f.value}</b></div>;
      })}
    </div>
  );
};

// «Читайте дальше»: связи заданы в самой статье полем related. Опечатка в
// related молча отбрасывается, а не рисует битую ссылку.
const Related = ({ post, onOpenPost, locale }) => {
  const en = locale === 'en';
  const POSTS = en ? BLOG_POSTS_EN : BLOG_POSTS;
  const list = (post.related || [])
    .filter((slug) => slug !== post.slug)
    .map((slug) => POSTS.find((p) => p.slug === slug))
    .filter(Boolean)
    .slice(0, 3);
  if (!list.length) return null;
  return (
    <aside className="art-more">
      <h2>{en ? 'Read next' : 'Читайте дальше'}</h2>
      <div className="art-more-list">
        {list.map((p) => (
          <a
            key={p.slug}
            href={localizedHref(`/blog/${p.slug}/`, locale)}
            onClick={(e) => { e.preventDefault(); onOpenPost(p.slug); }}
            className="art-rel"
          >
            <div className="art-rel-img"><Pic src={p.cover} alt="" sizes="(max-width: 720px) 100vw, 240px" width={640} height={360} /></div>
            <span><small>{p.category}</small><b>{p.title}</b><i>{p.readingTime}</i></span>
          </a>
        ))}
      </div>
    </aside>
  );
};

const Article = ({ post, onBack, onBackToList, onOpenPost }) => {
  const locale = useLocale();
  const en = locale === 'en';
  const [theme, toggleTheme] = useArticleTheme();
  const active = useActiveHeading(post.content);
  const updated = post.dateModified && post.dateModified !== post.date;

  return (
    <div className="blog-page blog-page--article art min-h-screen pt-24 pb-16">
      <ReadingProgress />
      <div className="art-wrap">
        {/* Шапки сайта на страницах блога нет, поэтому дорога домой и к списку
            статей живёт в строке хлебных крошек */}
        <div className="art-crumbs">
          <button type="button" className="art-wm" onClick={onBack}>AIVFX</button>
          <span aria-hidden="true">/</span>
          <button type="button" onClick={onBackToList}>{en ? 'Blog' : 'Блог'}</button>
          <span aria-hidden="true">/</span>
          <span>{post.category}</span>
          <LangSwitch locale={locale} />
          <ThemeButton theme={theme} onToggle={toggleTheme} en={en} />
        </div>

        <article>
          <header className="art-hero">
            <div>
              <h1>{post.title}</h1>
              {post.excerpt && <p className="art-lead">{post.excerpt}</p>}
              <div className="art-meta">
                <time dateTime={post.dateModified || post.date}>
                  {updated
                    ? `${en ? 'Updated' : 'Обновлено'} ${fmtDate(post.dateModified, en)}`
                    : `${en ? 'Published' : 'Опубликовано'} ${fmtDate(post.date, en)}`}
                </time>
                <span>{`${post.readingTime} ${en ? 'read' : 'чтения'}`}</span>
              </div>
            </div>
            <figure>
              {/* Обложка - самый крупный элемент первого экрана: грузим первой */}
              <Pic src={post.cover} alt={post.title} width="960" height="720" eager sizes="(max-width: 860px) 100vw, 520px" className="art-cover" />
            </figure>
          </header>

          <Facts facts={post.facts} locale={locale} />

          <div className="art-grid">
            <div>
              <details className="art-toc-m">
                <summary>{en ? 'In this article' : 'В статье'}</summary>
                <Toc content={post.content} active="" />
              </details>
              <ArticleBody content={post.content} locale={locale} onBack={onBack} />
              <p className="art-sign">{en ? 'Text: Artem Shutkin, AIVFX studio' : 'Текст: Артем Шуткин, студия AIVFX'}</p>
              <Related post={post} onOpenPost={onOpenPost} locale={locale} />
            </div>
            <aside className="art-side">
              <h5>{en ? 'In this article' : 'В статье'}</h5>
              <Toc content={post.content} active={active} />
              {!en && post.partner && <PayRow id={post.partner} compact />}
            </aside>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Article;
