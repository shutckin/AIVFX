import React from 'react';
import SecHead from './SecHead';
import { useLocale, pick } from '../i18n';
import { PROBLEMS_SYS } from '../data/systems-content';
import './problems-bento.css';

// ── Секция «Проблема» — bento-сетка с мини-интерфейсами ─────────────────
// Каждая плитка — не абстрактный скелетон, а живой фрагмент интерфейса:
// реальная реплика в чате, реальная строка задачи, реальные данные в Excel.
// Пустота остаётся только там, где она и есть смысл: колонка CRM, куда
// данные не доехали. Тип мини-UI берётся из item.ui в PROBLEMS_SYS.

// Серые галочки «доставлено, не прочитано»
const Checks = () => (
  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
    <path d="M1 5l3 3 6-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 6.6L8.4 8 15 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Общая рамка мини-интерфейса: «экран внутри карточки».
// tone: 'live' — источник жив (кобальт), 'alert' — сломанное звено (алый).
const UiFrame = ({ label, tone, className, children }) => (
  <div className="pbx-ui" aria-hidden="true">
    <span className={`pbx-head pbx-head-${tone}`}>
      <i className="pbx-head-dot" />
      {label}
    </span>
    <div className={`pbx-body ${className}`}>{children}</div>
  </div>
);

// chat — ночная заявка ждёт утра
const UiChat = ({ L, time }) => (
  <UiFrame label="WhatsApp" tone="live" className="pbx-chat">
    <div className="pbx-chat-bubble">
      <p className="pbx-chat-msg">
        {L === 'en' ? 'Hi! Are you open tomorrow?' : 'Здравствуйте! Работаете завтра?'}
      </p>
      <span className="pbx-chat-meta">
        {time}
        <span className="pbx-chat-checks"><Checks /></span>
      </span>
    </div>
    <div className="pbx-chat-ghost">
      <span className="pbx-chat-ghost-bubble"><i /><i /><i /></span>
      <span className="pbx-cap pbx-cap-alert">{L === 'en' ? 'reply: 09:12' : 'ответ: 09:12'}</span>
    </div>
  </UiFrame>
);

// task — просроченный follow-up в трекере
const UiTask = ({ L }) => (
  <UiFrame label={L === 'en' ? 'CRM · Tasks' : 'CRM · Задачи'} tone="alert" className="pbx-task">
    <div className="pbx-task-row pbx-task-row-done">
      <span className="pbx-task-check pbx-task-check-done">
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path d="M1 3.6L3.2 5.8 8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="pbx-task-label">{L === 'en' ? 'Send invoice — Acme' : 'Счёт — ООО «Вектор»'}</span>
      <span className="pbx-task-date">{L === 'en' ? 'Mon' : 'ПН'}</span>
    </div>
    <div className="pbx-task-row pbx-task-row-main">
      <span className="pbx-task-check" />
      <span className="pbx-task-label">{L === 'en' ? 'Follow-up — John, quote' : 'Follow-up — Иван, КП'}</span>
      <span className="pbx-task-badge">OVERDUE · 3 DAYS</span>
    </div>
    <div className="pbx-task-row pbx-task-row-next">
      <span className="pbx-task-check" />
      <span className="pbx-task-label">{L === 'en' ? 'Call back — Northwind' : 'Перезвонить — Мосстрой'}</span>
      <span className="pbx-task-date">{L === 'en' ? 'Fri' : 'ПТ'}</span>
    </div>
  </UiFrame>
);

// pipe — разрыв между WhatsApp и CRM
const UiPipe = ({ L }) => (
  <UiFrame label={L === 'en' ? 'Integration' : 'Интеграция'} tone="alert" className="pbx-pipe">
    <span className="pbx-pipe-node">
      <span className="pbx-pipe-chip">WhatsApp</span>
      <span className="pbx-pipe-sub pbx-pipe-sub-ok">{L === 'en' ? '12 new' : '12 новых'}</span>
    </span>
    <span className="pbx-pipe-line">
      <i className="pbx-pipe-dot" />
    </span>
    <span className="pbx-pipe-break">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
    <span className="pbx-pipe-line pbx-pipe-line-dead" />
    <span className="pbx-pipe-node">
      <span className="pbx-pipe-chip pbx-pipe-chip-dead">CRM</span>
      <span className="pbx-pipe-sub pbx-pipe-sub-alert">{L === 'en' ? '0 deals' : '0 сделок'}</span>
    </span>
  </UiFrame>
);

// copy — ручной перенос Excel → CRM. Слева реальные данные, справа пусто.
const UiCopy = ({ L, time }) => (
  <UiFrame label="Excel → CRM" tone="live" className="pbx-copy">
    <div className="pbx-copy-win">
      <span className="pbx-cap">Excel</span>
      <span className="pbx-copy-row">{L === 'en' ? 'Miller · +1 415…' : 'Иванов · +7 916…'}</span>
      <span className="pbx-copy-row">{L === 'en' ? 'Davis · +1 202…' : 'Петров · +7 903…'}</span>
      <span className="pbx-copy-row">{L === 'en' ? 'Clark · +1 646…' : 'Смирнов · +7 925…'}</span>
    </div>
    <div className="pbx-copy-mid">
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
        <path d="M1 5h11M9 1.5L12.5 5 9 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="pbx-cap pbx-cap-alert">{time}</span>
    </div>
    <div className="pbx-copy-win pbx-copy-win-dst">
      <span className="pbx-cap">CRM</span>
      <span className="pbx-copy-empty" />
      <span className="pbx-copy-empty" />
      <span className="pbx-copy-empty" />
    </div>
    <span className="pbx-copy-carrier" />
  </UiFrame>
);

// churn — выручка держится, затем обрыв: клиент ушёл и не вернулся
const UiChurn = ({ L }) => (
  <UiFrame label={L === 'en' ? 'Revenue' : 'Выручка'} tone="alert" className="pbx-churn">
    <span className="pbx-churn-plot">
      <svg viewBox="0 0 200 72" fill="none" preserveAspectRatio="none" className="pbx-churn-svg">
        <defs>
          <linearGradient id="pbxChurnFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255, 107, 107, 0.14)" />
            <stop offset="100%" stopColor="rgba(255, 107, 107, 0)" />
          </linearGradient>
        </defs>
        <path
          className="pbx-churn-area"
          d="M4 26 L46 22 L86 27 L120 21 L142 29 L156 42 L178 66 L178 72 L4 72 Z"
          fill="url(#pbxChurnFill)"
        />
        <path
          className="pbx-churn-line"
          pathLength="1"
          vectorEffect="non-scaling-stroke"
          d="M4 26 L46 22 L86 27 L120 21 L142 29"
          stroke="var(--fg-2)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="pbx-churn-drop"
          pathLength="1"
          vectorEffect="non-scaling-stroke"
          d="M142 29 L156 42 L178 66"
          stroke="rgba(255, 107, 107, 0.9)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* Точка обрыва — HTML, чтобы ореол не искажался растяжением SVG */}
      <span className="pbx-churn-dot" />
    </span>
    <span className="pbx-churn-label">LTV → 0</span>
  </UiFrame>
);

const MINI_UI = { chat: UiChat, task: UiTask, pipe: UiPipe, copy: UiCopy, churn: UiChurn };

const Problems = () => {
  const L = useLocale();
  const { head, items, outro } = PROBLEMS_SYS;

  return (
    <section className="section" id="problems">
      <div className="shell">
        <SecHead
          num={pick(L, head.num)}
          title={pick(L, head.title)}
          titleIt={pick(L, head.titleIt)}
          side={pick(L, head.side)}
          sideTitle={head.sideTitle}
        />

        <div className="pbx-grid">
          {items.map((item, i) => {
            const Ui = MINI_UI[item.ui];
            const time = L === 'en' && item.timeEn ? item.timeEn : item.time;
            return (
              <article className="pbx-tile reveal" key={i}>
                {Ui ? <Ui L={L} time={time} /> : null}
                <h3 className="pbx-text">{pick(L, item.text)}</h3>
                <span className="pbx-tag">{pick(L, item.tag)}</span>
              </article>
            );
          })}
        </div>

        <div className="pbx-outro reveal">
          <p>{pick(L, outro)}</p>
        </div>
      </div>
    </section>
  );
};

export default Problems;
