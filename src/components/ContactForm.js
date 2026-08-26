import React, { useMemo, useRef, useState } from 'react';
import { useNotification } from '../App';
import { useLocale, pick } from '../i18n';
import { BUDGETS } from '../data/content';
import { BUDGETS_EN } from '../data/content-en';
import { CONTACT_SYS, VIDEO_CONTACT } from '../data/systems-content';
import SecHead from './SecHead';
import PhoneField from './PhoneField';
import { sendLead } from '../lib/leadApi';
import { isValidEmail, normalizeEmail, suggestEmailFix } from '../lib/validate';

// Заявка уходит на наш серверный обработчик, а он уже пишет в Telegram.
// Токена бота в браузере нет и быть не должно: раньше он лежал прямо
// в коде сайта, и этим воспользовались.

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
  const [phoneValid, setPhoneValid] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [agreed, setAgreed] = useState(false);
  // Скрытое поле-ловушка для ботов и отметка времени открытия формы:
  // и то и другое проверяет сервер
  const [honeypot, setHoneypot] = useState('');
  const startedAt = useRef(Date.now());

  const emailOk = useMemo(() => isValidEmail(form.email), [form.email]);
  const emailFix = useMemo(() => suggestEmailFix(form.email), [form.email]);
  const showEmailError = emailTouched && form.email.length > 0 && !emailOk;

  const handle = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const canSubmit = agreed && phoneValid && !sending;

  const submit = async (e) => {
    e.preventDefault();
    if (!agreed || !phoneValid) return;
    if (!emailOk) { setEmailTouched(true); return; }

    setSendError(false); // новая попытка — сбрасываем прошлую ошибку
    setSending(true);
    try {
      await sendLead(
        { ...form, email: normalizeEmail(form.email) },
        videoContext ? 'video' : 'systems',
        { startedAt: startedAt.current, honeypot }
      );
      // Успех: очищаем форму и показываем модалку
      setForm({ name: '', email: '', phone: '', company: '', message: '', budget: '' });
      setAgreed(false);
      setEmailTouched(false);
      startedAt.current = Date.now();
      showSuccess();
    } catch (_) {
      // Ошибка сети / сервера / конфигурации: успех НЕ показываем,
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
                <label htmlFor="email">{'EMAIL '}<span className="req">*</span></label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(e) => handle('email', e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  placeholder="your@email.com"
                  aria-invalid={showEmailError || undefined}
                />
                {showEmailError && (
                  <span className="field-error">
                    {en ? 'Check the email address' : 'Проверьте адрес почты'}
                  </span>
                )}
                {!showEmailError && emailFix && (
                  <button
                    type="button"
                    className="field-hint"
                    onClick={() => handle('email', emailFix)}
                  >
                    {`${en ? 'Did you mean' : 'Возможно, вы имели в виду'} ${emailFix}?`}
                  </button>
                )}
              </div>
            </div>

            <div className="contact-grid-fields">
              <PhoneField
                id="phone"
                locale={L}
                label={en ? 'PHONE' : 'ТЕЛЕФОН'}
                value={form.phone}
                onChange={(v) => handle('phone', v)}
                onValidityChange={setPhoneValid}
              />
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

            {/* Поле-ловушка: спрятано от людей и от скринридеров,
                но видно автозаполнялкам ботов. Если оно заполнено —
                сервер молча отбрасывает заявку. */}
            <div className="hp-trap" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={!canSubmit}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
