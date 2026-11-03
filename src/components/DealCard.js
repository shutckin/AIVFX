import React from 'react';
import { pick } from '../i18n';
import { SERVICE_UI } from '../data/service-guides';
import './deal-card.css';

// Карточка сделки из CRM, нарисованная разметкой. Не скриншот: так она
// не зависит от срока демо-портала, читается на телефоне и не тащит в
// кадр адрес портала и чужие данные.
// Используется в кейсах на главной и на странице автоматизации процессов.
// Светлая тема: белая карточка, статус синей «таблеткой», поля сделки в
// сером блоке, внизу лента событий с синим временем.
const DealCard = ({ card, L }) => (
  <div className="cs2-deal" role="group" aria-label={pick(L, SERVICE_UI.dealAria)}>
    <div className="cs2-deal-head">
      <span className="cs2-deal-stage">{pick(L, card.stage)}</span>
      <span className="cs2-deal-source">{pick(L, card.source)}</span>
    </div>
    <h4 className="cs2-deal-title">{pick(L, card.title)}</h4>

    <div className="cs2-deal-note">
      <span className="cs2-deal-note-label">{pick(L, card.noteLabel)}</span>
      <dl className="cs2-deal-rows">
        {card.rows.map((row, i) => (
          <React.Fragment key={i}>
            <dt>{pick(L, row.k)}</dt>
            <dd className={row.good ? 'is-good' : undefined}>{pick(L, row.v)}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>

    <ul className="cs2-deal-log">
      {card.log.map((row, i) => (
        <li key={i}><span>{row.t}</span>{L === 'en' ? row.en : row.ru}</li>
      ))}
    </ul>
  </div>
);

export default DealCard;
