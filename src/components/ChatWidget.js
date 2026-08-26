import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale, pick } from '../i18n';
import { CHAT_DEMO } from '../data/systems-content';
import './chat-widget.css';

// ─────────────────────────────────────────────────────────────────────────
// Живой демо-ассистент AIVFX.
// Сайт сам показывает продукт, который студия продаёт: посетитель задаёт
// вопросы, получает осмысленные ответы по сценарию и оставляет контакт.
// Никаких внешних API для ответов — сценарий целиком лежит в CHAT_DEMO.
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

// Отправка лида в Telegram — тот же подход, что и в ContactForm:
// токен и chat id приходят из env на этапе сборки.
// parse_mode намеренно не передаём: посетитель может написать «<» или «&»,
// и HTML-разбор на стороне Telegram сломал бы отправку.
const sendLeadToTelegram = async ({ name, contact, questions, locale }) => {
  const token = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error('Telegram credentials are not configured');

  const list = questions.length
    ? questions.map((q, i) => `${i + 1}. ${q}`).join('\n')
    : '—';

  const message = `💬 ЗАЯВКА ИЗ ЧАТА — AIVFX

👤 Имя: ${name}
📞 Контакт: ${contact}
🌐 Язык сайта: ${String(locale).toUpperCase()}

❓ Вопросы посетителя:
${list}`;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message }),
  });

  if (!res.ok) throw new Error(`Telegram API error: ${res.status}`);
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

  // Все отложенные «обдумывания» гасим при размонтировании
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

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
    setMessages([{ id: nextId(), role: 'bot', text: pick(L, CHAT_DEMO.greeting) }]);
    setChips(CHAT_DEMO.start);
  }, [open, L]);

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

    // Сам ответ: узел либо напрямую (клик по чипу), либо через ключевые слова
    const reply = () => {
      setTyping(false);
      const nodeId = forcedNode || matchNode(text);
      const node = nodeId ? CHAT_DEMO.nodes[nodeId] : null;

      if (!node) {
        setMessages((m) => [
          ...m,
          { id: nextId(), role: 'bot', text: pick(L, CHAT_DEMO.fallback) },
        ]);
        setChips(FALLBACK_CHIPS);
        return;
      }

      setMessages((m) => {
        const withAnswer = [
          ...m,
          { id: nextId(), role: 'bot', text: pick(L, node.a) },
        ];
        // Лид-форма живёт прямо в ленте и добавляется ровно один раз
        if (node.lead && !m.some((x) => x.role === 'lead')) {
          return [...withAnswer, { id: nextId(), role: 'lead' }];
        }
        return withAnswer;
      });
      setChips(node.next || []);
    };

    if (prefersReducedMotion()) {
      reply();
      return;
    }

    setTyping(true);
    const delay = THINK_MIN + Math.round(Math.random() * (THINK_MAX - THINK_MIN));
    timers.current.push(setTimeout(reply, delay));
  }, [L]);

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
      await sendLeadToTelegram({ name, contact, questions: asked, locale: L });
      // Успех: форму сворачиваем, ассистент подтверждает в ленте
      setLeadSent(true);
      setChips([]);
      setMessages((m) => [
        ...m,
        { id: nextId(), role: 'bot', text: pick(L, CHAT_DEMO.lead.success) },
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
