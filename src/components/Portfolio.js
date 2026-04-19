import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS, CATEGORIES } from '../data/projects';

// Ленивое видео: играет только когда попадает в viewport
const LazyVideo = ({ src, title }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={title}
    />
  );
};

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

const TechBadges = ({ tech }) => {
  if (tech === 'AI+VFX') {
    return (
      <>
        <span className="tag tag-ai">AI</span>
        <span className="tag tag-vfx">VFX</span>
      </>
    );
  }
  if (tech === 'AI') return <span className="tag tag-ai">AI</span>;
  return <span className="tag tag-vfx">VFX</span>;
};

const ProjectCard = ({ project, onClick }) => (
  <div className="project reveal" onClick={onClick}>
    <div className="thumb-wrap">
      <LazyVideo src={project.preview} title={project.title} />
      <div className="badges"><TechBadges tech={project.tech} /></div>
      <span className="duration">{project.duration}</span>
      <div className="play-overlay" aria-hidden="true">
        <span className="play-icon">▶</span>
      </div>
    </div>
    <div className="info">
      <div className="row">
        <span className="cat">{project.cat}</span>
        <span>{project.duration}</span>
      </div>
      <h3>{project.title}</h3>
    </div>
  </div>
);

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(8,7,6,0.9)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-2)', border: '1px solid var(--line-2)',
          borderRadius: 'var(--r-lg)', maxWidth: 1100, width: '100%',
          maxHeight: '92vh', overflow: 'auto', position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          style={{
            position: 'absolute', top: 20, right: 20, width: 36, height: 36,
            borderRadius: '50%', border: '1px solid var(--line-2)',
            display: 'grid', placeItems: 'center', background: 'rgba(10,9,8,0.6)',
            color: 'var(--fg-2)', fontSize: 18, cursor: 'pointer', zIndex: 10,
          }}
        >✕</button>

        <div style={{ aspectRatio: '16/9', background: 'black', position: 'relative' }}>
          <iframe
            src={`${project.embed}?autoplay=1`}
            title={project.title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 0 }}
          />
          <div className="badges" style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 6, zIndex: 2 }}>
            <TechBadges tech={project.tech} />
          </div>
        </div>

        <div style={{ padding: 'clamp(28px, 3vw, 48px)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            display: 'flex', gap: 24, flexWrap: 'wrap', fontFamily: 'var(--font-mono)',
            fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)',
          }}>
            <span style={{ color: 'var(--accent)' }}>{project.cat}</span>
            <span style={{ color: 'var(--fg-2)' }}>{project.tech}</span>
            <span style={{ color: 'var(--fg-2)' }}>{project.duration}</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 2.5vw, 36px)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0,
          }}>
            {project.title}
          </h2>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [cat, setCat] = useState('Все');
  const [modalProject, setModalProject] = useState(null);
  const filtered = cat === 'Все' ? PROJECTS : PROJECTS.filter((p) => p.cat === cat);

  const half = Math.ceil(filtered.length / 2);
  const row1 = filtered.slice(0, half);
  const row2 = filtered.slice(half);

  return (
    <section className="section portfolio" id="portfolio" data-layout="marquee">
      <div className="shell">
        <SecHead
          num="[ 02 / ПОРТФОЛИО ]"
          title="Полный"
          titleIt="лог работ"
          side="Реальные проекты с AI + VFX пайплайном. Кликните на работу, чтобы посмотреть видео."
          sideTitle="WORKS"
        />

        <div className="filter-bar reveal">
          <span className="label">FILTER:</span>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`filter-chip ${cat === c ? 'active' : ''}`}
              onClick={() => setCat(c)}
            >{c}</button>
          ))}
          <span style={{ flex: 1 }} />
          <span className="label">{String(filtered.length).padStart(2, '0')} ПРОЕКТОВ</span>
        </div>

        <div className="portfolio-list">
          {row1.length > 0 && (
            <div className="marquee-row">
              <div className="marquee-track">
                {[...row1, ...row1].map((p, i) => (
                  <ProjectCard key={`r1-${p.id}-${i}`} project={p} onClick={() => setModalProject(p)} />
                ))}
              </div>
            </div>
          )}
          {row2.length > 0 && (
            <div className="marquee-row">
              <div className="marquee-track">
                {[...row2, ...row2].map((p, i) => (
                  <ProjectCard key={`r2-${p.id}-${i}`} project={p} onClick={() => setModalProject(p)} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="portfolio-foot reveal">
          <span className="count">{PROJECTS.length} РАБОТ С AI + VFX ПАЙПЛАЙНОМ</span>
        </div>
      </div>

      {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}
    </section>
  );
};

export default Portfolio;
