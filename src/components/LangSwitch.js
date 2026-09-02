import React from 'react';
import { stripLocale, localizedHref, isRuOnly } from '../i18n';

// ── Переключатель языка ────────────────────────────────────────────────
//
// Раньше жил внутри Header.js и был доступен только на главной и на
// странице AI-контента. На всех остальных - услуги, блог, статьи,
// портфолио, юридические страницы - его просто не было: посетитель
// заходил на английскую версию, проваливался в любой раздел и не мог
// вернуться на русскую иначе как правкой адреса.
//
// Это настоящие ссылки, а не кнопки: локаль определяется из адреса при
// загрузке, поэтому переход должен быть полноценным, с перезагрузкой.
//
// Ссылка ведёт на ту же логическую страницу в другом языке: сначала с
// текущего пути снимается префикс /en, потом добавляется нужный.

const LangSwitch = ({ locale, className = '' }) => {
  const logical = typeof window !== 'undefined'
    ? stripLocale(window.location.pathname)
    : '/';

  // У части страниц английской версии нет намеренно: обучение ведётся
  // голосом по-русски, юридические документы написаны под российское
  // право. Кнопку всё равно показываем - иначе она то появляется, то
  // пропадает при переходах, и это выглядит поломкой. Но EN тут не
  // ссылка, а подпись: вести на страницу, которой нет, хуже.
  const ruOnly = isRuOnly(logical);

  return (
    <div className={`lang-switch ${className}`.trim()} aria-label="Language">
      <a
        href={localizedHref(logical, 'ru')}
        className={`lang-opt ${locale === 'ru' ? 'active' : ''}`}
        lang="ru"
        aria-current={locale === 'ru' ? 'true' : undefined}
      >
        RU
      </a>
      <span className="lang-sep" aria-hidden="true">/</span>
      {ruOnly ? (
        <span
          className="lang-opt lang-opt--off"
          lang="en"
          title="This page is only available in Russian"
        >
          EN
        </span>
      ) : (
        <a
          href={localizedHref(logical, 'en')}
          className={`lang-opt ${locale === 'en' ? 'active' : ''}`}
          lang="en"
          aria-current={locale === 'en' ? 'true' : undefined}
        >
          EN
        </a>
      )}
    </div>
  );
};

export default LangSwitch;
