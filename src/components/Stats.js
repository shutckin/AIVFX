import React from 'react';
import { STATS } from '../data/content';
import { STATS_EN } from '../data/content-en';
import { useLocale } from '../i18n';

const Stats = () => {
  const en = useLocale() === 'en';
  const STATS_L = en ? STATS_EN : STATS;
  return (
    <section className="stats">
      <div className="stats-inner">
        {STATS_L.map((s, i) => (
          <div key={i} className="stat reveal">
            <div className="stat-value">{s.v}<span className="unit">{s.u}</span></div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
