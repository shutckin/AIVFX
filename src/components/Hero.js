import React, { useEffect, useRef } from 'react';
import { useNotification } from '../App';
import { TICKER_ITEMS } from '../data/content';

const RobotStage = () => {
  const ref = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      ref.current.style.setProperty('--mx', x + 'px');
      ref.current.style.setProperty('--my', y + 'px');
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="robot-stage" ref={ref} aria-hidden="true">
      <div className="robot-halo" />
      <div className="robot-scan" />
      <div className="robot-glow" />
      <svg className="robot-rings" viewBox="0 0 600 600">
        <circle cx="300" cy="300" r="220" className="r1" />
        <circle cx="300" cy="300" r="270" className="r2" />
        <circle cx="300" cy="300" r="150" className="r3" />
      </svg>
      <div className="robot-hud hud-bl">
        <span className="hud-dot" />
        <span>LAT +55.75°  LON +37.61°</span>
      </div>
      <div className="robot-hud hud-br">
        <span>© AIVFX SYSTEMS</span>
      </div>
    </div>
  );
};

const Hero = () => {
  const { show: showNotification, scrollToSection } = useNotification();

  return (
    <section className="hero" id="hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
      >
        <source src="/fixed/aivid.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-overlay" />
      <RobotStage />
      <span className="corner tl" />
      <span className="corner tr" />

      <div className="shell hero-inner">
        <div className="hero-meta">
          <div className="hero-meta-left" style={{ alignItems: 'flex-end', marginLeft: 'auto' }}>
            <span className="kicker">Moscow · Dubai · Bali</span>
            <span className="kicker kicker-accent">◈ ПРИНИМАЕМ ЗАКАЗЫ</span>
          </div>
        </div>

        <h1 className="hero-headline display">
          <span className="ln">СОЗДАЁМ</span>
          <span className="ln"><span className="accent">вирусный</span></span>
          <span className="ln">контент с AI+VFX</span>
        </h1>

        <div className="hero-row">
          <p className="hero-sub">
            Голливудский уровень визуальных эффектов за дни, а не недели.<br />
            Быстрее × дешевле × качественнее традиционного продакшена.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={showNotification}>
              Создать AI-контент
              <span className="btn-arrow">↗</span>
            </button>
            <button className="btn btn-ghost" onClick={() => scrollToSection('portfolio')}>
              Смотреть reel
            </button>
          </div>
        </div>
      </div>

      <div className="hero-ticker">
        <div className="hero-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
