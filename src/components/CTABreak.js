import React from 'react';
import { CTA_BREAK } from '../data/systems-content';
import { useLocale, pick } from '../i18n';
import { useNotification } from '../App';
import './cta-break.css';

// Компактная конверсионная врезка между секциями главной.
// variant='default' - графитовая полоса; variant='light' - светлая карточка-кульминация.
const CTABreak = ({ variant = 'default' }) => {
  const L = useLocale();
  const { scrollToSection } = useNotification();

  return (
    <section className="cta-break-section">
      <div className="shell">
        <div className={`cta-break reveal${variant === 'light' ? ' cta-break--light' : ''}`}>
          <div className="cta-break-text">
            <h3 className="cta-break-title">{pick(L, CTA_BREAK.title)}</h3>
            <p className="cta-break-sub">{pick(L, CTA_BREAK.sub)}</p>
          </div>
          <div className="cta-break-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => scrollToSection('contact')}
            >
              {pick(L, CTA_BREAK.btn)}
            </button>
            <a
              className="btn btn-ghost"
              href={CTA_BREAK.tgUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {pick(L, CTA_BREAK.tg)}
              <span className="cta-break-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABreak;
