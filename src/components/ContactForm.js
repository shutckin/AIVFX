import React, { useState } from 'react';
import { useNotification } from '../App';
import { useLocale, pick } from '../i18n';
import { BUDGETS } from '../data/content';
import { BUDGETS_EN } from '../data/content-en';
import { CONTACT_SYS, VIDEO_CONTACT } from '../data/systems-content';
import SecHead from './SecHead';


// Отправка в Telegram через env vars (бот-токен хранится на стороне сборки)
const sendToTelegram = async (data, videoContext) => {
  const token = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;
  // Нет конфигурации — заявка физически не может уйти, честно считаем это ошибкой
  if (!token || !chatId) throw new Error('Telegram credentials are not configured');

  const heading = videoContext
    ? '🎬 НОВАЯ ЗАЯВКА — AI-КОНТЕНТ (видео)'
    : '⚙️ НОВАЯ ЗАЯВКА — AIVFX AI SYSTEMS';

  const message = `${heading}

👤 Имя: ${data.name}
📧 Email: ${data.email}
📞 Телефон: ${data.phone || '—'}
🏢 Компания: ${data.company || '—'}
💰 Бюджет: ${data.budget || '—'}
💬 Задача: ${data.message}`;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
  });

  if (!res.ok) throw new Error(`Telegram API error: ${res.status}`);
};

const ContactForm = ({ videoContext = false }) => {
  const L = useLocale();
  const en = L === 'en';
  const BUDGETS_L = en ? BUDGETS_EN : BUDGETS;
  const { showSuccess, showPrivacy, showConsent } = useNotification();
  // В видео-контексте секция берёт свои тексты (заголовок, лейбл и плейсхолдер брифа)
  const CONTENT = videoContext ? VIDEO_CONTACT : CONTACT_SYS;
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', message: '', budget: ''
  });
  const [phoneErr, setPhoneErr] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handle = (k, v) => {
    if (k === 'phone') {
      const clean = v.replace(/[^\d\s()\-+]/g, '');
      const digits = clean.replace(/\D/g, '');
      let formatted = clean;
      if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
        const d = '7' + digits.slice(1);
        formatted = `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`;
        setPhoneErr('');
      } else if (digits.length > 0 && digits.length < 10) {
        setPhoneErr(en ? 'Number is too short' : 'Номер слишком короткий');
      } else {
        setPhoneErr('');
      }
      setForm((f) => ({ ...f, phone: formatted }));
    } else {
      setForm((f) => ({ ...f, [k]: v }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (phoneErr) return;
    if (!agreed) return; // защита от отправки без согласия
    setSendError(false); // новая попытка — сбрасываем прошлую ошибку
    setSending(true);
    try {
      await sendToTelegram(form, videoContext);
      // Успех: очищаем форму и показываем модалку
      setForm({ name: '', email: '', phone: '', company: '', message: '', budget: '' });
      setAgreed(false);
      showSuccess();
    } catch (_) {
      // Ошибка сети / API / конфигурации: успех НЕ показываем,
      // введённые данные сохраняем, даём прямые контакты
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="shell">
        <SecHead
          num={pick(L, CONTENT.head.num)}
          title={pick(L, CONTENT.head.title)}
          titleIt={pick(L, CONTENT.head.titleIt)}
          side={pick(L, CONTENT.head.side)}
          sideTitle={CONTENT.head.sideTitle}
        />

        <div className="contact-grid">
          <form className="contact-form reveal" onSubmit={submit}>
            <div className="contact-grid-fields">
              <div className="field">
                <label htmlFor="name">{`${en ? 'NAME' : 'ИМЯ'} `}<span className="req">*</span></label>
                <input id="name" required value={form.name} onChange={(e) => handle('name', e.target.value)} placeholder={en ? 'Your name' : 'Ваше имя'} />
              </div>
              <div className="field">
                <label htmlFor="email">EMAIL <span className="req">*</span></label>
                <input id="email" type="email" required value={form.email} onChange={(e) => handle('email', e.target.value)} placeholder="your@email.com" />
              </div>
            </div>

            <div className="contact-grid-fields">
              <div className="field">
                <label htmlFor="phone">{en ? 'PHONE' : 'ТЕЛЕФОН'}</label>
                <input id="phone" type="tel" value={form.phone} onChange={(e) => handle('phone', e.target.value)} placeholder="+7 (999) 123-45-67" />
                {phoneErr && <span className="field-error">{phoneErr}</span>}
              </div>
              <div className="field">
                <label htmlFor="company">{en ? 'COMPANY' : 'КОМПАНИЯ'}</label>
                <input id="company" value={form.company} onChange={(e) => handle('company', e.target.value)} placeholder={en ? 'Company name' : 'Название компании'} />
              </div>
            </div>

            {!videoContext && (
              <div className="field">
                <label>{en ? 'BUDGET' : 'БЮДЖЕТ'}</label>
                <div className="budget-options">
                  {BUDGETS_L.map((b) => (
                    <button
                      type="button"
                      key={b}
                      className={`budget-chip ${form.budget === b ? 'active' : ''}`}
                      onClick={() => handle('budget', b)}
                    >{b}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="field">
              <label htmlFor="message">{`${pick(L, CONTENT.briefLabel)} `}<span className="req">*</span></label>
              <textarea
                id="message"
                required
                value={form.message}
                onChange={(e) => handle('message', e.target.value)}
                placeholder={pick(L, CONTENT.briefPlaceholder)}
              />
            </div>

            <label className="consent-row">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                aria-required="true"
                required
              />
              <span className="consent-text">
                {en
                  ? 'I agree to the processing of my personal data in accordance with the '
                  : 'Я согласен(на) на обработку персональных данных в соответствии с '}
                <button type="button" onClick={showPrivacy} className="consent-link">
                  {en ? 'Privacy Policy' : 'Политикой конфиденциальности'}
                </button>
                {en ? ' and the ' : ' и '}
                <button type="button" onClick={showConsent} className="consent-link">
                  {en ? 'Consent to Personal Data Processing' : 'Согласием на обработку персональных данных'}
                </button>.
              </span>
            </label>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={sending || !agreed}
              style={{ alignSelf: 'flex-start' }}
            >
              {sending ? (en ? 'Sending...' : 'Отправка...') : (en ? 'Send request' : 'Отправить заявку')}<span className="btn-arrow">↗</span>
            </button>

            {sendError && (
              <div className="contact-error" role="alert">
                <p className="contact-error-text">
                  {en
                    ? 'The request could not be sent. Contact us directly:'
                    : 'Не получилось отправить. Напишите нам напрямую:'}
                </p>
                <div className="contact-error-links">
                  <a
                    href="https://t.me/aivfx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-error-link"
                  >Telegram @aivfx</a>
                  <a href="mailto:info@aivfx.ru" className="contact-error-link">info@aivfx.ru</a>
                </div>
              </div>
            )}
          </form>

          <div className="contact-side contact-aside-light reveal">
            <div>
              <h3>{en ? 'Need it' : 'Срочная'}<br /><span className="contact-aside-accent">{en ? 'urgently?' : 'консультация?'}</span></h3>
              <p className="contact-aside-note">
                {en
                  ? 'Message us on Telegram — we reply within an hour.'
                  : 'Напишите в Telegram — отвечаем в течение часа.'}
              </p>
              <a
                href="https://t.me/aivfx"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: 16 }}
              >
                {en ? 'Message on Telegram' : 'Написать в Telegram'}<span className="btn-arrow">↗</span>
              </a>
            </div>

            <div className="contact-block">
              <span className="lab">EMAIL</span>
              <a href="mailto:info@aivfx.ru" className="val">info@aivfx.ru</a>
            </div>

            <div className="contact-block">
              <span className="lab">{en ? 'WORKING HOURS' : 'ВРЕМЯ РАБОТЫ'}</span>
              <div className="hours">
                <div className="hours-row"><span>{en ? 'MON — FRI' : 'ПН — ПТ'}</span><span>09:00 — 18:00</span></div>
                <div className="hours-row"><span>{en ? 'SAT' : 'СБ'}</span><span>10:00 — 16:00</span></div>
                <div className="hours-row"><span>{en ? 'SUN' : 'ВС'}</span><span className="hours-closed">{en ? 'CLOSED' : 'ВЫХОДНОЙ'}</span></div>
              </div>
            </div>

            <div className="contact-block">
              <span className="lab">{en ? 'OFFICES' : 'ОФИСЫ'}</span>
              <span className="val" style={{ fontSize: 14, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                MSK · DXB · DPS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
