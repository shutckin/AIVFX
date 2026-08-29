import React from 'react';
import { stripLocale, localizedHref } from '../i18n';

// ── Переключатель языка ────────────────────────────────────────────────
//
// Раньше жил внутри Header.js и был доступен только на странице
// AI-систем. Страница AI-контента со своей шапкой оставалась вообще без
// переключателя: посетитель заходил на английскую версию и не мог
// вернуться на русскую иначе как правкой адреса.
//
// Это настоящие ссылки, а не кнопки: локаль определяется из адреса при
// загрузке, поэтому переход должен быть полноценным, с перезагрузкой.
//
// Ссылка ведёт на ту же логическую страницу в другом языке: сначала с
// текущего пути снимается префикс /en, потом добавляется нужный.

const LangSwitch = ({ locale }) => {
  const logical = typeof window !== 'undefined'
    ? stripLocale(window.location.pathname)
    : '/';

  return (
    <div className="lang-switch" aria-label="Language">
      <a
        href={localizedHref(logical, 'ru')}
        className={`lang-opt ${locale === 'ru' ? 'active' : ''}`}
        lang="ru"
        aria-current={locale === 'ru' ? 'true' : undefined}
      >
        RU
      </a>
      <span className="lang-sep" aria-hidden="true">/</span>
      <a
        href={localizedHref(logical, 'en')}
        className={`lang-opt ${locale === 'en' ? 'active' : ''}`}
        lang="en"
        aria-current={locale === 'en' ? 'true' : undefined}
      >
        EN
      </a>
    </div>
  );
};

export default LangSwitch;
