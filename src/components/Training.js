import React from 'react';
import { TRAINING_SYS } from '../data/systems-content';
import { useLocale, pick } from '../i18n';
import './training.css';

// Секция «Обучение» на главной.
//
// Существует потому, что без неё направление было не найти: страницы
// обучения были связаны только подвалом и мелкими ссылками внизу
// страниц услуг. Человек листал главную и не видел их вообще.
//
// Светлая тема (по макету): слева синяя карточка с заголовком и вводным
// абзацем, справа белые строки-ссылки на страницы обучения. Это не
// четвёртая «система», а другой способ работать - поэтому без фото и
// без общего заголовка секции, заголовок живёт внутри синей карточки.
//
// На английской версии секция не выводится: занятия ведутся голосом и
// по-русски, английских версий этих страниц нет намеренно. Показывать
// карточки, ведущие в никуда, хуже, чем не показывать ничего.
const Training = () => {
  const L = useLocale();
  if (L === 'en') return null;

  const { head, items, lead } = TRAINING_SYS;

  return (
    <section className="section tr-section" id="training">
      <div className="shell">
        <div className="tr-layout">
          <div className="tr-intro reveal">
            <h2 className="tr-intro-title">
              {/* Пробел вклеен в выражение: два соседних текстовых узла
                  ломают гидратацию предзарендеренной страницы */}
              {`${pick(L, head.title)} ${pick(L, head.titleIt)}`}
            </h2>
            <p className="tr-intro-lead">{pick(L, lead)}</p>
          </div>

          <div className="tr-list">
            {items.map((item) => (
              <a
                key={item.slug}
                href={`/services/${item.slug}/`}
                className="tr-row reveal"
              >
                <h3 className="tr-row-title">{pick(L, item.title)}</h3>
                <p className="tr-row-desc">{pick(L, item.desc)}</p>
                <span className="tr-row-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Training;
