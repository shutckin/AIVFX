import React, { useMemo, useState } from 'react';
import { BLOG_POSTS } from '../../data/blog-posts';
import { BLOG_POSTS_EN } from '../../data/blog-posts-en';
import { useLocale, localizedHref } from '../../i18n';
import Pic from '../Pic';
import LangSwitch from '../LangSwitch';
import { useBlogTheme, ThemeButton } from './theme';
import './blog-index.css';

// ── Витрина блога ───────────────────────────────────────────────────────
//
// Тридцать семь статей нельзя показать «просто списком»: человек приходит
// с конкретным вопросом, а не листать. Поэтому сверху поиск по названию,
// описанию и ключевым словам, рядом сортировка, под ними категории, и
// счётчик, который всегда говорит, сколько статей сейчас на экране.
//
// Поиск работает на клиенте по уже загруженным статьям: их несколько
// десятков, и это мгновенно, без запросов на сервер.

// «Новое» показываем только по дате публикации и только две недели:
// метка на каждой второй карточке перестаёт что-либо значить. Дату
// обновления пишем словами рядом со временем чтения - это и ориентир в
// списке, и подтверждение, что материал живой.
const NEW_DAYS = 14;
const MONTHS_SHORT = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const MONTHS_SHORT_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Нормализация для поиска: регистр и «ё» не должны мешать найти статью
const norm = (s) => String(s || '').toLowerCase().replace(/ё/g, 'е');

const shortDate = (iso, en) => {
  const [y, m, d] = String(iso || '').split('-').map(Number);
  if (!y || !m || !d) return '';
  return en ? `${MONTHS_SHORT_EN[m - 1]} ${d}` : `${d} ${MONTHS_SHORT[m - 1]}`;
};

const isNew = (post) => {
  if (!post.date) return false;
  const days = (Date.now() - new Date(post.date).getTime()) / 86400000;
  return days >= 0 && days <= NEW_DAYS;
};

const minutes = (post) => {
  const m = String(post.readingTime || '').match(/\d+/);
  return m ? Number(m[0]) : 99;
};

const Card = ({ post, onOpenPost, lead, locale, en }) => {
  const Title = lead ? 'h2' : 'h3';
  const updated = post.dateModified && post.dateModified !== post.date;
  return (
    <a
      href={localizedHref(`/blog/${post.slug}/`, locale)}
      onClick={(e) => { e.preventDefault(); onOpenPost(post.slug); }}
      className={`blogx-card${lead ? ' blogx-card--lead' : ''}`}
    >
      <div className="blogx-card-img">
        <Pic
          src={post.cover}
          alt=""
          sizes={lead ? '(max-width: 980px) 100vw, 520px' : '(max-width: 640px) 100vw, 360px'}
          width={640}
          height={360}
          eager={lead}
        />
      </div>
      <div className="blogx-card-body">
        <span className="blogx-card-cat">{post.category}</span>
        <Title>{post.title}</Title>
        {lead && <p>{post.excerpt}</p>}
        <span className="blogx-card-meta">
          <span>{post.readingTime}</span>
          <span>
            {updated ? `${en ? 'upd. ' : 'обн. '}${shortDate(post.dateModified, en)}` : shortDate(post.date, en)}
          </span>
          {isNew(post) && <span className="blogx-fresh">{en ? 'New' : 'Новое'}</span>}
        </span>
      </div>
    </a>
  );
};

const BlogIndex = ({ onBack, onOpenPost }) => {
  const locale = useLocale();
  const en = locale === 'en';
  const POSTS = en ? BLOG_POSTS_EN : BLOG_POSTS;
  const ALL = en ? 'All topics' : 'Все темы';
  const [theme, toggleTheme] = useBlogTheme();

  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('');
  const [sort, setSort] = useState('new');

  const categories = useMemo(() => {
    const out = [];
    POSTS.forEach((p) => { if (p.category && !out.includes(p.category)) out.push(p.category); });
    return out;
  }, [POSTS]);

  // Поисковый индекс: заголовок, описание, ключевые слова и весь текст
  // статьи одной строкой. Считается один раз, потому что по запросу
  // «оплата» человек ждёт все статьи, где про оплату написано, а не
  // только те, где это слово попало в заголовок.
  const index = useMemo(() => {
    const map = {};
    POSTS.forEach((p) => {
      const body = (p.content || [])
        .map((b) => b.text || (b.items ? b.items.join(' ') : ''))
        .join(' ');
      map[p.slug] = norm(`${p.title} ${p.excerpt} ${p.description} ${p.keywords} ${p.category} ${body}`);
    });
    return map;
  }, [POSTS]);

  const list = useMemo(() => {
    const q = norm(query).trim();
    let res = POSTS.filter((p) => {
      if (cat && p.category !== cat) return false;
      if (!q) return true;
      return (index[p.slug] || '').includes(q);
    });
    res = [...res];
    if (sort === 'new') res.sort((a, b) => String(b.date).localeCompare(String(a.date)));
    if (sort === 'updated') res.sort((a, b) => String(b.dateModified || b.date).localeCompare(String(a.dateModified || a.date)));
    if (sort === 'short') res.sort((a, b) => minutes(a) - minutes(b));
    return res;
  }, [POSTS, index, query, cat, sort]);

  // Крупная карточка только в исходном виде списка: при поиске или
  // выбранной категории раздувать первую попавшуюся статью незачем
  const plain = !query && !cat;
  const lead = plain && sort === 'new' ? list[0] : null;
  const rest = lead ? list.slice(1) : list;

  const sorts = [
    ['new', en ? 'Newest' : 'Новые'],
    ['updated', en ? 'Updated' : 'Обновлённые'],
    ['short', en ? 'Short reads' : 'Короткие'],
  ];

  return (
    <div className="blog-page blog-page--list blogx min-h-screen pt-24">
      <div className="blogx-wrap">
        <div className="blogx-top">
          <button type="button" className="blogx-wm" onClick={onBack}>AIVFX</button>
          <span aria-hidden="true">/</span>
          <span>{en ? 'Blog' : 'Блог'}</span>
          <LangSwitch locale={locale} />
          <ThemeButton theme={theme} onToggle={toggleTheme} en={en} />
        </div>

        <div className="blogx-head">
          <h1>{en ? 'Blog on neural networks and AI video' : 'Блог о нейросетях и AI-видео'}</h1>
          <p>
            {en
              ? 'Step-by-step guides to the tools, honest model comparisons and breakdowns of real cases.'
              : 'Пошаговые гайды по сервисам, честные сравнения моделей и разбор реальных кейсов. Найдите свой вопрос поиском или выберите тему.'}
          </p>
        </div>

        <div className="blogx-tools">
          <div className="blogx-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={en ? 'Search: Kling, payment, avatar...' : 'Поиск: Kling, оплата, аватар, промпты...'}
              aria-label={en ? 'Search articles' : 'Поиск по статьям'}
            />
            {query && (
              <button type="button" className="blogx-clear" onClick={() => setQuery('')} aria-label={en ? 'Clear' : 'Очистить'}>×</button>
            )}
          </div>
          <div className="blogx-sort" role="group" aria-label={en ? 'Sorting' : 'Сортировка'}>
            {sorts.map(([id, label]) => (
              <button key={id} type="button" className={sort === id ? 'on' : ''} onClick={() => setSort(id)} aria-pressed={sort === id}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="blogx-cats">
          <button type="button" className={`blogx-cat${cat === '' ? ' on' : ''}`} onClick={() => setCat('')} aria-pressed={cat === ''}>
            {ALL}<span>{POSTS.length}</span>
          </button>
          {categories.map((c) => (
            <button key={c} type="button" className={`blogx-cat${cat === c ? ' on' : ''}`} onClick={() => setCat(c)} aria-pressed={cat === c}>
              {c}<span>{POSTS.filter((p) => p.category === c).length}</span>
            </button>
          ))}
        </div>

        <p className="blogx-count">
          {en
            ? `${list.length} of ${POSTS.length} articles`
            : `Показано ${list.length} из ${POSTS.length}`}
        </p>

        {list.length === 0 ? (
          <div className="blogx-empty">
            <b>{en ? 'Nothing found' : 'Ничего не нашлось'}</b>
            <span>{en ? 'Try a shorter query or another topic.' : 'Попробуйте запрос короче или другую тему.'}</span>
            <br />
            <button type="button" onClick={() => { setQuery(''); setCat(''); }}>{en ? 'Reset' : 'Сбросить'}</button>
          </div>
        ) : (
          <div className="blogx-grid">
            {lead && <Card post={lead} onOpenPost={onOpenPost} lead locale={locale} en={en} />}
            {rest.map((p) => <Card key={p.slug} post={p} onOpenPost={onOpenPost} locale={locale} en={en} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogIndex;
