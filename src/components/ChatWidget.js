import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale, pick } from '../i18n';
import { CHAT_DEMO } from '../data/systems-content';
import { sendLead, sendLeadBeacon } from '../lib/leadApi';
import { askAssistant, isAssistantConfigured } from '../lib/assistantApi';
import './chat-widget.css';

// ─────────────────────────────────────────────────────────────────────────
// Живой демо-ассистент AIVFX.
// Сайт сам показывает продукт, который студия продаёт: посетитель задаёт
// вопросы, получает осмысленные ответы по сценарию и оставляет контакт.
// Отвечает настоящая модель на сервере: ключ в браузер не попадает.
// Сценарий из CHAT_DEMO остался запасным путём — на случай, когда сервер
// недоступен или ключ ещё не подключён. Посетитель не должен упираться
// в поломку из-за чужой проблемы, поэтому чат в любом случае отвечает.
// ─────────────────────────────────────────────────────────────────────────

const SCROLL_TRIGGER = 500;   // после какого скролла показать лаунчер
const IDLE_TRIGGER_MS = 4000; // либо просто через 4 секунды на странице
const THINK_MIN = 600;        // «обдумывание» ответа, мс
const THINK_MAX = 900;

// Счётчик id сообщений живёт на уровне модуля — так функции-обработчики
// остаются стабильными и не тянут лишние зависимости в хуки.
let uid = 0;
const nextId = () => {
  uid += 1;
  return uid;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Свободный ввод → узел сценария.
// Приводим текст к нижнему регистру и берём первое совпадение по ключевым словам.
export const matchNode = (text) => {
  const t = (text || '').toLowerCase();
  if (!t.trim()) return null;
  const hit = CHAT_DEMO.keywords.find((k) => k.words.some((w) => t.includes(w)));
  return hit ? hit.node : null;
};

// Когда не поняли вопрос — предлагаем стартовые темы и путь к живому человеку.
const FALLBACK_CHIPS = CHAT_DEMO.start.includes('contact')
  ? CHAT_DEMO.start
  : [...CHAT_DEMO.start, 'contact'];

// ─── Фоновая запись диалога ──────────────────────────────────────────────
// Диалог пишется в localStorage, а владельцу уходит краткая сводка — даже
// если посетитель не оставил контакт. В интерфейсе это никак не видно.
const LOG_KEY = 'aivfx_chat_log_v1';
const LOG_LIMIT = 100;           // храним последние N реплик, чтобы не раздувать
const SUMMARY_IDLE_MS = 60000;   // минута тишины после вопроса → шлём сводку
const SUMMARY_MIN_QUESTIONS = 2; // меньше двух вопросов — владельца не дёргаем

const makeSessionId = () => {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch (_) { /* старый браузер или приватный режим — уходим на фолбэк */ }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const saveLog = (log) => {
  try {
    window.localStorage.setItem(LOG_KEY, JSON.stringify(log));
  } catch (_) { /* приватный режим может запрещать запись — молча пропускаем */ }
};

// Единая точка отправки: и лид, и авто-сводка идут через серверный
// обработчик заявок. Токена Telegram в браузере нет — он живёт только
// на сервере (см. src/lib/leadApi.js и папку aivfx-lead-api).
// beacon=true — посетитель уходит со страницы, запрос обязан пережить уход.
const sendChatMessage = (text, { beacon = false } = {}) => {
  if (beacon) {
    // sendBeacon не сообщает результат — считаем отправку состоявшейся,
    // если браузер принял запрос в очередь
    if (sendLeadBeacon({ message: text })) return Promise.resolve(true);
  }

  return sendLead({ message: text }, 'chat', { startedAt: Date.now() - 60000 })
    .then(() => true);
};

const formatDuration = (startedAt) => {
  const sec = Math.max(0, Math.round((Date.now() - new Date(startedAt).getTime()) / 1000));
  return sec < 60 ? `${sec} сек` : `${Math.round(sec / 60)} мин`;
};

// Сводка по диалогу без контакта: что спрашивали и по каким темам отвечал бот
const buildSummary = (log, questions, topics) => {
  const list = questions.length
    ? questions.map((q, i) => `${i + 1}. ${q}`).join('\n')
    : '—';
  const uniqueTopics = topics.filter((t, i) => topics.indexOf(t) === i);
  const path = typeof window !== 'undefined' ? window.location.pathname : '—';

  return `👀 ДИАЛОГ В ЧАТЕ (без контакта)
🕒 ${new Date(log.startedAt).toLocaleString('ru-RU', { hour12: false })} · ${formatDuration(log.startedAt)}
🌐 Язык: ${String(log.locale).toUpperCase()} · Страница: ${path}
❓ Вопросы (${questions.length}):
${list}
🧩 Темы: ${uniqueTopics.length ? uniqueTopics.join(', ') : '—'}
💬 Всего сообщений: ${log.messages.length}`;
};

// Лид: посетитель оставил имя и контакт — это отдельное событие от сводки
const sendLeadToTelegram = async ({ name, contact, questions, locale, summarySent }) => {
  const list = questions.length
    ? questions.map((q, i) => `${i + 1}. ${q}`).join('\n')
    : '—';

  const message = `💬 ЗАЯВКА ИЗ ЧАТА — AIVFX

👤 Имя: ${name}
📞 Контакт: ${contact}
🌐 Язык сайта: ${String(locale).toUpperCase()}
${summarySent ? '(summary отправлен ранее)\n' : ''}
❓ Вопросы посетителя:
${list}`;

  const ok = await sendChatMessage(message);
  if (!ok) throw new Error('lead api is not configured');
};

const ChatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H9.6L5 20.2V16.5H4A1.5 1.5 0 0 1 2.5 15V7A1.5 1.5 0 0 1 4 5.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M7 10.2h10M7 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ChatWidget = () => {
  const L = useLocale();
  const en = L === 'en';

  const [launcherVisible, setLauncherVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chips, setChips] = useState([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState('');
  const [asked, setAsked] = useState([]);

  const [lead, setLead] = useState({ name: '', contact: '' });
  const [leadSending, setLeadSending] = useState(false);
  const [leadError, setLeadError] = useState(false);
  const [leadSent, setLeadSent] = useState(false);

  const feedRef = useRef(null);
  const inputRef = useRef(null);
  const timers = useRef([]);
  const greeted = useRef(false);

  // Фоновая запись: сам лог, вопросы, темы ответов и флаги отправки.
  // Всё в ref — обработчики ухода со страницы должны видеть свежие значения.
  const logRef = useRef(null);
  const askedRef = useRef([]);
  const topicsRef = useRef([]);
  // Диалог в том виде, в каком его ждёт модель. Держим отдельно от
  // messages: там есть служебные записи вроде формы контакта, модели
  // они не нужны и только путали бы её.
  const convoRef = useRef([]);
  const summarySent = useRef(false);
  const leadDelivered = useRef(false);
  // Обёртка-объект, а не голый ref: так cleanup видит актуальный таймер
  const summaryTimer = useRef({ id: null });

  if (logRef.current === null) {
    logRef.current = {
      sessionId: makeSessionId(),
      startedAt: new Date().toISOString(),
      locale: L,
      messages: [],
      summarySent: false,
    };
  }

  // Язык может переключиться посреди сессии — держим в логе актуальный
  useEffect(() => {
    logRef.current.locale = L;
  }, [L]);

  const appendLog = useCallback((role, text) => {
    const log = logRef.current;
    log.messages = [...log.messages, { role, text, ts: new Date().toISOString() }]
      .slice(-LOG_LIMIT);
    saveLog(log);
  }, []);

  // Сводка уходит один раз за сессию и только если вопросов было минимум два.
  // Если контакт уже оставлен — сводка не нужна, владелец получил заявку.
  const flushSummary = useCallback((beacon = false) => {
    if (summarySent.current || leadDelivered.current) return;
    if (askedRef.current.length < SUMMARY_MIN_QUESTIONS) return;

    summarySent.current = true;
    if (summaryTimer.current.id) {
      clearTimeout(summaryTimer.current.id);
      summaryTimer.current.id = null;
    }

    const log = logRef.current;
    log.summarySent = true;
    saveLog(log);

    sendChatMessage(buildSummary(log, askedRef.current, topicsRef.current), { beacon })
      .catch(() => { /* сводка — фоновая история, интерфейс ломать нечем */ });
  }, []);

  // Уход со страницы и сворачивание вкладки: тут только beacon успевает
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flushSummary(true);
    };
    const onLeave = () => flushSummary(true);

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onLeave);
    window.addEventListener('beforeunload', onLeave);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onLeave);
      window.removeEventListener('beforeunload', onLeave);
    };
  }, [flushSummary]);

  // Все отложенные «обдумывания» и таймер сводки гасим при размонтировании
  useEffect(() => {
    const pending = timers.current;
    const summary = summaryTimer.current;
    return () => {
      pending.forEach(clearTimeout);
      if (summary.id) clearTimeout(summary.id);
    };
  }, []);

  // Лаунчер: после 500px скролла ИЛИ через 4 секунды — что раньше
  useEffect(() => {
    if (window.scrollY > SCROLL_TRIGGER) {
      setLauncherVisible(true);
      return undefined;
    }
    const onScroll = () => {
      if (window.scrollY > SCROLL_TRIGGER) setLauncherVisible(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(() => setLauncherVisible(true), IDLE_TRIGGER_MS);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(t);
    };
  }, []);

  // Приветствие — один раз, при первом открытии
  useEffect(() => {
    if (!open || greeted.current) return;
    greeted.current = true;
    const hello = pick(L, CHAT_DEMO.greeting);
    appendLog('bot', hello);
    setMessages([{ id: nextId(), role: 'bot', text: hello }]);
    setChips(CHAT_DEMO.start);
  }, [open, L, appendLog]);

  // Esc закрывает панель
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Фокус в поле ввода при открытии
  useEffect(() => {
    if (!open) return undefined;
    const t = setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 140);
    return () => clearTimeout(t);
  }, [open]);

  // Автоскролл ленты вниз
  useEffect(() => {
    const el = feedRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, chips, open]);

  const handleAsk = useCallback((rawText, forcedNode) => {
    const text = (rawText || '').trim();
    if (!text) return;

    setMessages((m) => [...m, { id: nextId(), role: 'user', text }]);
    setAsked((a) => [...a, text]);
    setChips([]);

    appendLog('user', text);
    askedRef.current = [...askedRef.current, text];
    // Тишина после вопроса — повод отправить сводку, не дожидаясь ухода
    if (summaryTimer.current.id) clearTimeout(summaryTimer.current.id);
    summaryTimer.current.id = setTimeout(() => flushSummary(false), SUMMARY_IDLE_MS);

    convoRef.current = [...convoRef.current, { role: 'user', content: text }].slice(-16);

    // Ответ по сценарию: узел напрямую по клику или через ключевые слова.
    // Работает как запасной путь, когда живой ассистент недоступен.
    const reply = () => {
      setTyping(false);
      const nodeId = forcedNode || matchNode(text);
      const node = nodeId ? CHAT_DEMO.nodes[nodeId] : null;

      if (!node) {
        const miss = pick(L, CHAT_DEMO.fallback);
        // Нераспознанные вопросы — самое ценное: видно, чего боту не хватает
        topicsRef.current = [...topicsRef.current, `не распознано: ${text}`];
        appendLog('bot', miss);
        setMessages((m) => [
          ...m,
          { id: nextId(), role: 'bot', text: miss },
        ]);
        setChips(FALLBACK_CHIPS);
        return;
      }

      const answer = pick(L, node.a);
      topicsRef.current = [...topicsRef.current, nodeId];
      appendLog('bot', answer);

      setMessages((m) => {
        const withAnswer = [
          ...m,
          { id: nextId(), role: 'bot', text: answer },
        ];
        // Лид-форма живёт прямо в ленте и добавляется ровно один раз
        if (node.lead && !m.some((x) => x.role === 'lead')) {
          return [...withAnswer, { id: nextId(), role: 'lead' }];
        }
        return withAnswer;
      });
      setChips(node.next || []);
    };

    // Клик по подсказке ведёт в конкретный узел сценария — там ответ
    // уже написан и утверждён, спрашивать модель незачем
    if (!forcedNode && isAssistantConfigured()) {
      setTyping(true);
      askAssistant(convoRef.current).then((res) => {
        if (!res) {
          // Сервер молчит — отвечаем по сценарию, посетитель не заметит
          reply();
          return;
        }

        setTyping(false);
        convoRef.current = [...convoRef.current, { role: 'assistant', content: res.reply }].slice(-16);
        appendLog('bot', res.reply);
        // Что модель поняла о посетителе — уходит владельцу в сводку
        if (res.slots) {
          topicsRef.current = [...topicsRef.current, `данные: ${JSON.stringify(res.slots)}`];
        }
        setMessages((m) => [...m, { id: nextId(), role: 'bot', text: res.reply }]);
      });
      return;
    }

    if (prefersReducedMotion()) {
      reply();
      return;
    }

    setTyping(true);
    const delay = THINK_MIN + Math.round(Math.random() * (THINK_MAX - THINK_MIN));
    timers.current.push(setTimeout(reply, delay));
  }, [L, appendLog, flushSummary]);

  const submitDraft = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || typing) return;
    setDraft('');
    handleAsk(text, null);
  };

  const submitLead = async (e) => {
    e.preventDefault();
    const name = lead.name.trim();
    const contact = lead.contact.trim();
    if (!name || !contact || leadSending) return;

    setLeadError(false);
    setLeadSending(true);
    try {
      await sendLeadToTelegram({
        name,
        contact,
        questions: asked,
        locale: L,
        summarySent: summarySent.current,
      });
      // Успех: форму сворачиваем, ассистент подтверждает в ленте
      leadDelivered.current = true;
      if (summaryTimer.current.id) {
        clearTimeout(summaryTimer.current.id);
        summaryTimer.current.id = null;
      }
      const done = pick(L, CHAT_DEMO.lead.success);
      appendLog('bot', done);
      setLeadSent(true);
      setChips([]);
      setMessages((m) => [
        ...m,
        { id: nextId(), role: 'bot', text: done },
      ]);
    } catch (_) {
      // Ошибка: введённое НЕ стираем, даём прямой путь в Telegram
      setLeadError(true);
    } finally {
      setLeadSending(false);
    }
  };

  const tgLink = (className) => (
    <a
      className={className}
      href={CHAT_DEMO.lead.tgUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {pick(L, CHAT_DEMO.lead.tg)}
    </a>
  );

  const renderLead = () => {
    if (leadSent) {
      return (
        <div className="chat-lead chat-lead-done">
          {tgLink('chat-lead-tg')}
        </div>
      );
    }
    return (
      <form className="chat-lead" onSubmit={submitLead}>
        <input
          className="chat-lead-input"
          value={lead.name}
          onChange={(e) => setLead((s) => ({ ...s, name: e.target.value }))}
          placeholder={pick(L, CHAT_DEMO.lead.namePlaceholder)}
          aria-label={pick(L, CHAT_DEMO.lead.namePlaceholder)}
          required
        />
        <input
          className="chat-lead-input"
          value={lead.contact}
          onChange={(e) => setLead((s) => ({ ...s, contact: e.target.value }))}
          placeholder={pick(L, CHAT_DEMO.lead.contactPlaceholder)}
          aria-label={pick(L, CHAT_DEMO.lead.contactPlaceholder)}
          required
        />
        <div className="chat-lead-actions">
          <button type="submit" className="chat-lead-submit" disabled={leadSending}>
            {leadSending
              ? (en ? 'Sending...' : 'Отправка...')
              : pick(L, CHAT_DEMO.lead.submit)}
          </button>
          {tgLink('chat-lead-tg')}
        </div>
        {leadError && (
          <p className="chat-lead-error" role="alert">
            {pick(L, CHAT_DEMO.lead.error)}
          </p>
        )}
      </form>
    );
  };

  return (
    <>
      <button
        type="button"
        className={`chat-launcher${launcherVisible && !open ? ' is-visible' : ''}`}
        onClick={() => setOpen(true)}
        aria-label={pick(L, CHAT_DEMO.launcher)}
        aria-expanded={open}
        tabIndex={launcherVisible && !open ? 0 : -1}
        aria-hidden={launcherVisible && !open ? undefined : 'true'}
      >
        <span className="chat-launcher-dot" aria-hidden="true" />
        <span className="chat-launcher-text">{pick(L, CHAT_DEMO.launcher)}</span>
        <span className="chat-launcher-icon" aria-hidden="true"><ChatIcon /></span>
      </button>

      <div
        className={`chat-panel${open ? ' is-open' : ''}`}
        role="dialog"
        aria-label={CHAT_DEMO.title}
        aria-hidden={open ? undefined : 'true'}
      >
        <header className="chat-head">
          <div className="chat-avatar" aria-hidden="true">AI</div>
          <div className="chat-head-text">
            <span className="chat-head-title">{CHAT_DEMO.title}</span>
            <span className="chat-head-status">
              <span className="chat-head-status-dot" aria-hidden="true" />
              {pick(L, CHAT_DEMO.status)}
            </span>
          </div>
          <span className="chat-badge">{pick(L, CHAT_DEMO.badge)}</span>
          <button
            type="button"
            className="chat-close"
            onClick={() => setOpen(false)}
            aria-label={en ? 'Close' : 'Закрыть'}
            tabIndex={open ? 0 : -1}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path
                d="M2 2l10 10M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="chat-feed" ref={feedRef} aria-live="polite">
          {messages.map((m) => {
            if (m.role === 'lead') {
              return <div key={m.id} className="chat-row chat-row-lead">{renderLead()}</div>;
            }
            return (
              <div key={m.id} className={`chat-row chat-row-${m.role}`}>
                <div className={`chat-bubble chat-bubble-${m.role}`}>{m.text}</div>
              </div>
            );
          })}

          {typing && (
            <div className="chat-row chat-row-bot" aria-hidden="true">
              <div className="chat-bubble chat-bubble-bot chat-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        {chips.length > 0 && (
          <div className="chat-chips">
            {chips.map((id) => {
              const node = CHAT_DEMO.nodes[id];
              if (!node) return null;
              return (
                <button
                  key={id}
                  type="button"
                  className="chat-chip"
                  onClick={() => handleAsk(pick(L, node.q), id)}
                  tabIndex={open ? 0 : -1}
                >
                  {pick(L, node.q)}
                </button>
              );
            })}
          </div>
        )}

        <form className="chat-composer" onSubmit={submitDraft}>
          <input
            ref={inputRef}
            className="chat-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={pick(L, CHAT_DEMO.inputPlaceholder)}
            aria-label={pick(L, CHAT_DEMO.inputPlaceholder)}
            tabIndex={open ? 0 : -1}
          />
          <button
            type="submit"
            className="chat-send"
            aria-label={en ? 'Send' : 'Отправить'}
            disabled={!draft.trim() || typing}
            tabIndex={open ? 0 : -1}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M8 13V3.5M8 3.5L3.8 7.7M8 3.5l4.2 4.2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>

        <p className="chat-disclaimer">{pick(L, CHAT_DEMO.disclaimer)}</p>
      </div>
    </>
  );
};

export default ChatWidget;
