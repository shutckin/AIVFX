import React from 'react';
import SecHead from './SecHead';
import { TRAINING_SYS } from '../data/systems-content';
import { useLocale, pick } from '../i18n';
import './training.css';

// Секция «Обучение» на главной.
//
// Существует потому, что без неё направление было не найти: страницы
// обучения были связаны только подвалом и мелкими ссылками внизу
// страниц услуг. Человек листал главную и не видел их вообще.
//
// Две карточки, а не три: это не четвёртая «система», а другой способ
// работать - для тех, кому внедрение сейчас избыточно.
//
// На английской версии секция не выводится: занятия ведутся голосом и
// по-русски, английских версий этих страниц нет намеренно. Показывать
// карточки, ведущие в никуда, хуже, чем не показывать ничего.
const Training = () => {
  const L = useLocale();
  if (L === 'en') return null;

  const { head, items, more, lead } = TRAINING_SYS;

  return (
    <section className="section tr-section" id="training">
      <div className="shell">
        <SecHead
          num={pick(L, head.num)}
          title={pick(L, head.title)}
          titleIt={pick(L, head.titleIt)}
        />

        <p className="tr-lead">{pick(L, lead)}</p>

        <div className="tr-grid">
          {items.map((item) => (
            <a
              key={item.slug}
              href={`/services/${item.slug}/`}
              className="tr-card reveal"
            >
              <h3 className="tr-title">{pick(L, item.title)}</h3>
              <p className="tr-desc">{pick(L, item.desc)}</p>
              <span className="tr-more mono">
                {pick(L, more)}
                <span className="tr-more-arrow">↗</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Training;
