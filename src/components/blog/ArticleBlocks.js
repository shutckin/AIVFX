import React from 'react';
import Pic from '../Pic';
import { useLocale, localizedHref } from '../../i18n';
import { partnerUrl, partnerText, trackPartnerClick } from '../../data/partners';

// Разметка внутри абзаца: **жирный** и ссылки вида [текст](/адрес/).
//
// Внутренние адреса прогоняются через localizedHref, поэтому в английской
// версии тот же '/blog/foo/' ведёт на '/en/blog/foo/'. Адрес partner:syntx
// подменяется на партнёрскую ссылку из data/partners.js и уходит с
// rel="sponsored nofollow": поисковик видит рекламу, читатель - обычную
// ссылку.
export const renderRich = (text, locale) => {
  const parts = String(text).split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!link) return <React.Fragment key={i}>{part}</React.Fragment>;
    const [, label, href] = link;
    if (href.startsWith('partner:')) {
      const id = href.slice(8);
      const url = partnerUrl(id);
      if (!url) return <React.Fragment key={i}>{label}</React.Fragment>;
      return (
        <a key={i} href={url} className="art-link" target="_blank" rel="sponsored nofollow noopener noreferrer" onClick={() => trackPartnerClick(id)}>
          {label}
        </a>
      );
    }
    const isInternal = href.startsWith('/');
    return (
      <a
        key={i}
        href={isInternal ? localizedHref(href, locale) : href}
        className="art-link"
        {...(isInternal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {label}
      </a>
    );
  });
};

// Якорь раздела для оглавления: из заголовка, без знаков препинания
export const headingId = (text) => String(text).toLowerCase().replace(/[^a-zа-яё0-9]+/gi, '-').replace(/^-|-$/g, '');

// Список тарифов: каждый пункт вида «**Название** - цена. Описание», и хотя
// бы у одного цена числом. Списки «**Задача** - модель» под это не подходят
// и рисуются обычным списком.
const splitTier = (it) => {
  const m = it.match(/^\*\*([^*]+)\*\*\s*-\s*([^.]+)\.\s*(.*)$/s);
  if (!m) return null;
  // «12 долларов в месяц при оплате за год, около 15 при помесячной» -> 12 $ и пояснение
  const d = m[2].match(/^(\d+)\s*(?:доллар[а-я]*|dollars?|\$)\s*(.*)$/i);
  if (d) return { name: m[1], price: `${d[1]} $`, note: d[2], rest: m[3] };
  const e = m[2].match(/^(\d+)\s*(?:евро|euros?|€)\s*(.*)$/i);
  if (e) return { name: m[1], price: `${e[1]} €`, note: e[2], rest: m[3] };
  const c = m[2].split(':');
  const custom = c.length > 1;
  return { name: m[1], price: custom ? null : m[2], note: custom ? c.slice(1).join(':').trim() : '', rest: m[3] };
};
const isTierList = (items) => {
  if (items.length < 3) return false;
  const parsed = items.map(splitTier);
  return parsed.every(Boolean) && parsed.some((t) => t.price && /\d/.test(t.price));
};

const Tiers = ({ items, locale }) => (
  <div className="art-tiers">
    {items.map((it, i) => {
      const t = splitTier(it);
      return (
        <div className="art-tier" key={i}>
          <div className="art-tier-name">{t.name}</div>
          <div className="art-tier-price">
            {t.price || (locale === 'en' ? 'On request' : 'По запросу')}
            {t.note && <small>{t.note}</small>}
          </div>
          {t.rest && <p>{renderRich(t.rest, locale)}</p>}
        </div>
      );
    })}
  </div>
);

// Строка «оплата рублями» внутри статьи: одна строка со стрелкой
export const PayRow = ({ id, compact }) => {
  const locale = useLocale();
  const t = partnerText(id, locale);
  if (!t) return null;
  return (
    <a
      href={t.url}
      className="art-pay"
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      onClick={() => trackPartnerClick(id)}
    >
      <span>{compact ? t.short : t.row}<b>{t.name}</b>{compact ? '' : t.rowTail}</span>
      <span className="go">{t.action}</span>
    </a>
  );
};

// Видео с YouTube: до клика только превью и кнопка, плеер подгружается
// по нажатию. Иначе каждый ролик тянет мегабайт скриптов ещё до того,
// как читатель дошёл до него.
const Video = ({ id, title }) => {
  const [open, setOpen] = React.useState(false);
  const en = useLocale() === 'en';
  if (open) {
    return (
      <figure className="art-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title || 'YouTube'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {title && <figcaption>{title}</figcaption>}
      </figure>
    );
  }
  return (
    <figure className="art-video">
      <button type="button" className="art-video-play" onClick={() => setOpen(true)} aria-label={en ? `Play: ${title || 'video'}` : `Смотреть: ${title || 'видео'}`}>
        <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" loading="lazy" width={1280} height={720} />
        <span className="art-video-btn">{en ? 'Watch' : 'Смотреть'}</span>
      </button>
      {title && <figcaption>{title}</figcaption>}
    </figure>
  );
};

const Cta = ({ onBack }) => {
  const en = useLocale() === 'en';
  return (
    <div className="art-cta">
      <p>{en ? 'Need a video or an AI system built for your task?' : 'Нужен ролик или AI-система под задачу?'}</p>
      <button type="button" onClick={onBack}>{en ? 'Discuss the project' : 'Обсудить задачу'}</button>
    </div>
  );
};

// Один блок содержимого статьи
const Block = ({ block, locale, onBack }) => {
  switch (block.type) {
    case 'h2':
      return <h2 id={headingId(block.text)}>{block.text}</h2>;
    case 'h3':
      return <h3>{block.text}</h3>;
    case 'p':
      return <p>{renderRich(block.text, locale)}</p>;
    case 'ul':
      if (isTierList(block.items)) return <Tiers items={block.items} locale={locale} />;
      return <ul>{block.items.map((it, i) => <li key={i}>{renderRich(it, locale)}</li>)}</ul>;
    case 'ol':
      return <ol className="art-steps">{block.items.map((it, i) => <li key={i}>{renderRich(it, locale)}</li>)}</ol>;
    case 'quote':
      return <blockquote>{renderRich(block.text, locale)}</blockquote>;
    case 'image':
    case 'gen':
      // Подписи, источник и промпт не показываем: читателю нужен кадр, а не
      // отчёт о том, как он сделан
      return (
        <figure>
          <Pic src={block.src} alt={block.alt || ''} sizes="(max-width: 768px) 100vw, 720px" width={1280} height={720} />
        </figure>
      );
    case 'video':
      return <Video id={block.id} title={block.title} />;
    case 'partner':
      return <PayRow id={block.id} />;
    case 'cta':
      return <Cta onBack={onBack} />;
    default:
      return null;
  }
};

// Раздел «Частые вопросы»: заголовки третьего уровня становятся
// раскрывающимися карточками, текст под ними - ответом.
const isFaqHead = (b) => b.type === 'h2' && /Частые вопросы|Frequently asked/i.test(b.text || '');

const Faq = ({ blocks, locale }) => {
  const items = [];
  blocks.forEach((b) => {
    if (b.type === 'h3') items.push({ q: b.text, a: [] });
    else if (items.length) items[items.length - 1].a.push(b);
  });
  return (
    <div className="art-faq">
      {items.map((it, i) => (
        <details key={i}>
          <summary>{it.q}</summary>
          <div className="art-faq-a">
            {it.a.map((b, j) => <Block key={j} block={b} locale={locale} />)}
          </div>
        </details>
      ))}
    </div>
  );
};

// Всё содержимое статьи. Блоки после заголовка «Частые вопросы» и до
// следующего заголовка второго уровня уходят в раскрывашки.
export const ArticleBody = ({ content, locale, onBack }) => {
  const out = [];
  for (let i = 0; i < content.length; i += 1) {
    const b = content[i];
    if (isFaqHead(b)) {
      let j = i + 1;
      while (j < content.length && content[j].type !== 'h2' && content[j].type !== 'cta') j += 1;
      out.push(<h2 key={`h${i}`} id={headingId(b.text)}>{b.text}</h2>);
      out.push(<Faq key={`faq${i}`} blocks={content.slice(i + 1, j)} locale={locale} />);
      i = j - 1;
    } else {
      out.push(<Block key={i} block={b} locale={locale} onBack={onBack} />);
    }
  }
  return <div className="art-body">{out}</div>;
};
