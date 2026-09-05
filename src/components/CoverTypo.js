import React from 'react';
import { useLocale } from '../i18n';

/**
 * ТИПОГРАФСКАЯ ОБЛОЖКА СТАТЬИ - ЭЛЕМЕНТ ВЁРСТКИ, А НЕ КАРТИНКА.
 *
 * До 05.09.2026 у каждой статьи была jpeg-обложка: сгенерированная сцена
 * «человек за ноутбуком», «лампа и блокнот». Арт: «дебильные заглушки,
 * мониторы с рандомными картинками, не под брендинг». Типографский
 * вариант ему годился - но только если это делает сам сайт, а не
 * отдельно приклеенная картинка с текстом.
 *
 * Поэтому обложка теперь рисуется здесь, из данных статьи, тем же
 * шрифтом, сеткой и свечением, что и остальные страницы: категория
 * надстрочной строкой, заголовок крупно, метка AIVFX. Меняется текст
 * статьи - меняется обложка; локаль переключается вместе со страницей;
 * ничего не перерисовывать и не хранить.
 *
 * Поле `cover` у статей остаётся: оно уходит в og:image и в разметку
 * Article для превью в мессенджерах и поиске - там нужен файл.
 *
 * Варианты: card (карточка в ленте), hero (первый экран статьи),
 * thumb (маленькая плитка в списке строк - без заголовка, он рядом).
 */
/**
 * `titleTag` - каким тегом набрать заголовок внутри обложки. В ленте это
 * h3 карточки, на странице статьи - её h1: заголовок живёт в обложке
 * ОДИН раз, а не дублируется под ней. Обложка с настоящим заголовком
 * не прячется от скринридеров; декоративный вариант (thumb) - прячется.
 */
const CoverTypo = ({ post, variant = 'card', titleTag: TitleTag = 'span', className = '' }) => {
  const locale = useLocale();
  const en = locale === 'en';
  const kicker = post.category;
  const decorative = variant === 'thumb';
  return (
    <div className={`cover-typo cover-typo--${variant} ${className}`} aria-hidden={decorative ? 'true' : undefined}>
      <div className="cover-typo-glow" />
      <div className="cover-typo-body">
        <span className="cover-typo-kicker">{kicker}</span>
        {!decorative && <TitleTag className="cover-typo-title">{post.title}</TitleTag>}
        {variant === 'hero' && post.excerpt && (
          <span className="cover-typo-sub">{post.excerpt}</span>
        )}
      </div>
      <div className="cover-typo-foot">
        <span className="cover-typo-line" />
        <span className="cover-typo-mark">{variant === 'thumb' ? '' : 'AIVFX'}</span>
        {variant === 'hero' && <span className="cover-typo-time">{post.readingTime}{en ? '' : ''}</span>}
      </div>
    </div>
  );
};

export default CoverTypo;
