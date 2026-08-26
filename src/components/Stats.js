import React from 'react';
import { STATS_SYS } from '../data/systems-content';
import { useLocale, pick } from '../i18n';
import './hero-systems.css';

const Stats = () => {
  const L = useLocale();

  return (
    <section className="stats">
      <div className="stats-inner">
        {STATS_SYS.map((s, i) => (
          <div key={i} className="stat reveal hs-stat">
            <div className="stat-value">{s.v}</div>
            <div className="stat-label">{pick(L, s.l)}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
