import React from 'react';
import SecHead from './SecHead';
import { useLocale, pick } from '../i18n';
import { PROBLEMS_SYS } from '../data/systems-content';
import './problems-bento.css';

// ── Секция «Проблема» (светлая тема) ───────────────────────────────────
// Слева большая карточка-фото на две строки: первая боль написана поверх
// снимка. Справа четыре белые карточки: оранжевая метка, заголовок, серый
// тег. Под сеткой тёмная плашка-вывод, хвост фразы подсвечен голубым.
// Все тексты берутся из PROBLEMS_SYS (RU и EN).

// Делим фразу-вывод на обычную часть и подсвеченный хвост.
// Если хвост в тексте не нашёлся, показываем фразу целиком без подсветки.
const splitOutro = (full, tail) => {
  const at = tail ? full.lastIndexOf(tail) : -1;
  if (at <= 0) return { lead: full, tail: '' };
  return { lead: full.slice(0, at), tail };
};

const PainText = ({ L, item }) => (
  <>
    <span className="pbx-tm">{pick(L, item.time)}</span>
    <div className="pbx-body">
      <h3 className="pbx-title">{pick(L, item.text)}</h3>
      <p className="pbx-tg">{pick(L, item.tag)}</p>
    </div>
  </>
);

const Problems = () => {
  const L = useLocale();
  const { head, photo, items, outro, outroIt } = PROBLEMS_SYS;
  const [first, ...rest] = items;
  const { lead, tail } = splitOutro(pick(L, outro), outroIt ? pick(L, outroIt) : '');

  return (
    <section className="section" id="problems">
      <div className="shell">
        <SecHead
          num={pick(L, head.num)}
          title={pick(L, head.title)}
          titleIt={pick(L, head.titleIt)}
          sub={pick(L, head.side)}
        />

        <div className="pbx-grid">
          <article className="pbx-card pbx-card--photo reveal">
            <img
              className="pbx-photo"
              src={photo.src}
              alt={pick(L, photo.alt)}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: photo.pos }}
            />
            <div className="pbx-photo-in">
              <PainText L={L} item={first} />
            </div>
          </article>

          {rest.map((item) => (
            <article className="pbx-card reveal" key={item.text.ru}>
              <PainText L={L} item={item} />
            </article>
          ))}
        </div>

        <p className="pbx-outro reveal">
          {lead}
          {tail ? <span className="pbx-outro-it">{tail}</span> : null}
        </p>
      </div>
    </section>
  );
};

export default Problems;
