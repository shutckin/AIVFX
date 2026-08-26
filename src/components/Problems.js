import React from 'react';
import SecHead from './SecHead';
import { useLocale, pick } from '../i18n';
import { PROBLEMS_SYS } from '../data/systems-content';
import './problems-bento.css';

// ── Секция «Проблема» — bento-сетка с мини-интерфейсами ─────────────────
// Каждая плитка показывает потерю заявки как «скрин из продукта»:
// чат без ответа, просроченная задача, разрыв каналов, ручной перенос,
// обрыв LTV. Тип мини-UI берётся из item.ui в PROBLEMS_SYS.

// Серые галочки «доставлено, не прочитано»
const Checks = () => (
  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
    <path d="M1 5l3 3 6-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 6.6L8.4 8 15 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// chat — ночная заявка ждёт утра
const UiChat = ({ L, time }) => (
  <div className="pbx-ui pbx-chat" aria-hidden="true">
    <div className="pbx-chat-bubble">
      <span className="pbx-chat-lines"><i /><i /></span>
      <span className="pbx-chat-meta">
        {time}
        <span className="pbx-chat-checks"><Checks /></span>
      </span>
    </div>
    <div className="pbx-chat-ghost">
      <span className="pbx-chat-ghost-bubble"><i /><i /><i /></span>
      <span className="pbx-cap">{L === 'en' ? 'reply: 09:12' : 'ответ: 09:12'}</span>
    </div>
  </div>
);

// task — просроченный follow-up в трекере
const UiTask = ({ L }) => (
  <div className="pbx-ui pbx-task" aria-hidden="true">
    <div className="pbx-task-row pbx-task-row-ghost">
      <span className="pbx-task-check" />
      <span className="pbx-task-label">{L === 'en' ? 'Send invoice: Acme' : 'Счёт: ООО «Вектор»'}</span>
    </div>
    <div className="pbx-task-row pbx-task-row-main">
      <span className="pbx-task-check" />
      <span className="pbx-task-label">{L === 'en' ? 'Follow-up: John, proposal' : 'Follow-up: Иван, КП'}</span>
      <span className="pbx-task-badge">OVERDUE · 3 DAYS</span>
    </div>
  </div>
);

// pipe — разрыв между WhatsApp и CRM
const UiPipe = () => (
  <div className="pbx-ui pbx-pipe" aria-hidden="true">
    <span className="pbx-pipe-chip">WhatsApp</span>
    <span className="pbx-pipe-line" />
    <span className="pbx-pipe-break">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
    <span className="pbx-pipe-line" />
    <span className="pbx-pipe-chip">CRM</span>
  </div>
);

// copy — ручной перенос Excel → CRM
const UiCopy = ({ L, time }) => (
  <div className="pbx-ui pbx-copy" aria-hidden="true">
    <div className="pbx-copy-win">
      <span className="pbx-cap">Excel</span>
      <i /><i /><i /><i />
    </div>
    <div className="pbx-copy-mid">
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
        <path d="M1 5h11M9 1.5L12.5 5 9 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="pbx-cap">{time}</span>
    </div>
    <div className="pbx-copy-win pbx-copy-win-dst">
      <span className="pbx-cap">CRM</span>
      <i /><i /><i /><i />
    </div>
    <span className="pbx-copy-carrier" />
  </div>
);

// churn — линия ровная, затем обрыв: клиент ушёл
const UiChurn = () => (
  <div className="pbx-ui pbx-churn" aria-hidden="true">
    <svg viewBox="0 0 200 64" fill="none" preserveAspectRatio="xMidYMid meet">
      <path
        d="M4 26 L52 24 L96 26 L128 24 L148 30 L162 52"
        stroke="rgba(216, 234, 255, 0.35)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M162 52 L172 58"
        stroke="rgba(255, 107, 107, 0.75)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="172" cy="58" r="3" fill="rgba(255, 107, 107, 0.75)" />
    </svg>
    <span className="pbx-churn-label">LTV → 0</span>
  </div>
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
