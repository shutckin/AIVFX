import React, { useState } from 'react';
import { useNotification } from '../App';
import { BUDGETS } from '../data/content';

const SecHead = ({ num, title, titleIt, side, sideTitle }) => (
  <div className="sec-head reveal">
    <div className="sec-num">{num}</div>
    <h2 className="sec-title">
      {title} {titleIt && <span className="it">{titleIt}</span>}
    </h2>
    {side && (
      <div className="sec-side">
        {sideTitle && <span className="kicker">{sideTitle}</span>}
        <p>{side}</p>
      </div>
    )}
  </div>
);

// Отправка в Telegram через env vars (бот-токен хранится на стороне сборки)
const sendToTelegram = async (data) => {
  const token = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const message = `🎬 НОВАЯ ЗАЯВКА С САЙТА AIVFX

👤 Имя: ${data.name}
📧 Email: ${data.email}
📞 Телефон: ${data.phone || '—'}
🏢 Компания: ${data.company || '—'}
💰 Бюджет: ${data.budget || '—'}
💬 Бриф: ${data.message}`;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
  });

  if (!res.ok) throw new Error(`Telegram API error: ${res.status}`);
};

const ContactForm = () => {
  const { showSuccess } = useNotification();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', message: '', budget: ''
  });
  const [phoneErr, setPhoneErr] = useState('');
  const [sending, setSending] = useState(false);

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
        setPhoneErr('Номер слишком короткий');
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
    setSending(true);
    try {
      await sendToTelegram(form);
    } catch (_) {
      // показываем успех даже при сетевой ошибке
    }
    setSending(false);
    setForm({ name: '', email: '', phone: '', company: '', message: '', budget: '' });
    showSuccess();
  };

  return (
    <section className="section" id="contact">
      <div className="shell">
        <SecHead
          num="[ 05 / СВЯЗЬ ]"
          title="Начнём"
          titleIt="проект"
          side="Оставьте заявку — менеджер свяжется в течение 24 часов и пришлёт смету."
          sideTitle="BRIEF"
        />

        <div className="contact-grid">
          <form className="contact-form reveal" onSubmit={submit}>
            <div className="contact-grid-fields">
              <div className="field">
                <label htmlFor="name">ИМЯ <span className="req">*</span></label>
                <input id="name" required value={form.name} onChange={(e) => handle('name', e.target.value)} placeholder="Ваше имя" />
              </div>
              <div className="field">
                <label htmlFor="email">EMAIL <span className="req">*</span></label>
                <input id="email" type="email" required value={form.email} onChange={(e) => handle('email', e.target.value)} placeholder="your@email.com" />
              </div>
            </div>

            <div className="contact-grid-fields">
              <div className="field">
                <label htmlFor="phone">ТЕЛЕФОН</label>
                <input id="phone" type="tel" value={form.phone} onChange={(e) => handle('phone', e.target.value)} placeholder="+7 (999) 123-45-67" />
                {phoneErr && <span className="field-error">{phoneErr}</span>}
              </div>
              <div className="field">
                <label htmlFor="company">КОМПАНИЯ</label>
                <input id="company" value={form.company} onChange={(e) => handle('company', e.target.value)} placeholder="Название компании" />
              </div>
            </div>

            <div className="field">
              <label>БЮДЖЕТ</label>
              <div className="budget-options">
                {BUDGETS.map((b) => (
                  <button
                    type="button"
                    key={b}
                    className={`budget-chip ${form.budget === b ? 'active' : ''}`}
                    onClick={() => handle('budget', b)}
                  >{b}</button>
                ))}
              </div>
            </div>

            <div className="field">
              <label htmlFor="message">БРИФ <span className="req">*</span></label>
              <textarea
                id="message"
                required
                value={form.message}
                onChange={(e) => handle('message', e.target.value)}
                placeholder="Опишите проект, задачи, сроки и референсы..."
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={sending}
              style={{ alignSelf: 'flex-start' }}
            >
              {sending ? 'Отправка...' : 'Отправить заявку'} <span className="btn-arrow">↗</span>
            </button>
          </form>

          <div className="contact-side reveal">
            <div>
              <h3>Срочная<br /><span className="it">консультация?</span></h3>
              <p style={{ color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.55, marginTop: 8 }}>
                Напишите в Telegram — отвечаем в течение часа.
              </p>
              <a
                href="https://t.me/aivfx"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: 16 }}
              >
                Написать в Telegram <span className="btn-arrow">↗</span>
              </a>
            </div>

            <div className="contact-block">
              <span className="lab">EMAIL</span>
              <a href="mailto:info@aivfx.ru" className="val">info@aivfx.ru</a>
            </div>

            <div className="contact-block">
              <span className="lab">ВРЕМЯ РАБОТЫ</span>
              <div className="hours">
                <div className="hours-row"><span>ПН — ПТ</span><span>09:00 — 18:00</span></div>
                <div className="hours-row"><span>СБ</span><span>10:00 — 16:00</span></div>
                <div className="hours-row"><span>ВС</span><span style={{ color: 'var(--muted)' }}>ВЫХОДНОЙ</span></div>
              </div>
            </div>

            <div className="contact-block">
              <span className="lab">ОФИСЫ</span>
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
