import React from 'react';
import { useNotification } from '../App';
import { useLocale, pick } from '../i18n';
import { HERO_SYS, HERO_CHAT, TICKER_SYS } from '../data/systems-content';
import './hero-systems.css';

// Телефон с самопечатающимся чат-диалогом — главное продающее демо продукта
const HeroPhoneDemo = () => {
  const L = useLocale();

  return (
    <div className="hp-visual reveal" aria-hidden="true">
      <div className="hp-phone">
        <div className="hp-screen">
          <div className="hp-notch" />

          <div className="hp-chat-head">
            <span className="hp-avatar">AI</span>
            <span className="hp-head-text">
              <span className="hp-name">AIVFX Assistant</span>
              <span className="hp-head-status">
                {pick(L, { ru: 'online · отвечает мгновенно', en: 'online · replies instantly' })}
              </span>
            </span>
            <i className="hp-online-dot" />
          </div>

          <div className="hp-thread">
            {HERO_CHAT.map((m, i) => (
              <div key={i} className={`hp-msg hp-${m.from} hp-d${i}`}>
                {m.from === 'ai' && (
                  <span className="hp-typing">
                    <i />
                    <i />
                    <i />
                  </span>
                )}
                {m.from === 'system' ? (
                  <span className="hp-sysrow hp-entry">
                    <span className="hp-sys-check">✓</span>
                    {pick(L, m.text)}
                  </span>
                ) : (
                  <span className="hp-bubble hp-entry">
                    {pick(L, m.text)}
                    <span className="hp-time mono">{m.t}</span>
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="hp-footbar mono">
            {pick(L, { ru: 'ОТВЕТ ЗА 4 СЕК · 24/7', en: 'REPLY IN 4S · 24/7' })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const { scrollToSection } = useNotification();
  const L = useLocale();
  const titleLines = pick(L, HERO_SYS.titleLines);

  return (
    <section className="hero hs-hero" id="hero">
      <div className="hs-bg" aria-hidden="true" />
      <span className="corner tl" />
      <span className="corner tr" />

      <div className="shell hs-hero-inner">
        <div className="hs-hero-grid">
          <div className="hs-copy reveal">
            <span className="kicker kicker-accent hs-kicker">{pick(L, HERO_SYS.kicker)}</span>

            <h1 className="hs-headline display">
              {titleLines.map((line, i) => (
                <span className="ln" key={i}>
                  {i === HERO_SYS.accentLineIndex
                    ? <span className="accent">{line}</span>
                    : line}
                </span>
              ))}
            </h1>

            <p className="hs-sub">{pick(L, HERO_SYS.sub)}</p>

            <div className="hs-actions">
              <button className="btn btn-primary" onClick={() => scrollToSection('contact')}>
                {pick(L, HERO_SYS.cta1)}
                <span className="btn-arrow">↗</span>
              </button>
              <button className="btn btn-ghost" onClick={() => scrollToSection('services')}>
                {pick(L, HERO_SYS.cta2)}
              </button>
            </div>
          </div>

          <HeroPhoneDemo />
        </div>
      </div>

      <div className="hero-ticker">
        <div className="hero-ticker-track">
          {[...TICKER_SYS, ...TICKER_SYS].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
