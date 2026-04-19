import React from 'react';
import { STATS } from '../data/content';

const Stats = () => {
  return (
    <section className="stats">
      <div className="stats-inner">
        {STATS.map((s, i) => (
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
