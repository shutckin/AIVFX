import React, { useState, useEffect, useRef } from 'react';
import { ALL_PROJECTS, ALL_FILTERS } from '../data/all-projects';

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

const TagBadges = ({ tags }) => {
  const visible = tags.filter((t) => t !== 'ADS');
  if (visible.length === 0) return null;
  return (
    <div className="badges">
      {visible.map((t) => {
        const label =
          t === 'Съемка' ? 'СЪЁМКА' :
          t === 'Real Estate' ? 'ЖК' :
          t.toUpperCase();
        const cls = t === 'AI' ? 'tag-ai' : t === 'VFX' ? 'tag-vfx' : 'tag-generic';
        return <span key={t} className={`tag ${cls}`}>{label}</span>;
      })}
    </div>
  );
};

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
  const isVertical = project.orientation === 'vertical';

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
          borderRadius: 'var(--r-lg)',
          maxWidth: isVertical ? 520 : 1100,
          width: '100%',
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
        <div style={{ aspectRatio: isVertical ? '9/16' : '16/9', background: 'black', position: 'relative' }}>
          <iframe
            src={`${project.embed}?autoplay=1`}
            title={project.title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 0 }}
          />
        </div>
        <div style={{ padding: 'clamp(24px, 3vw, 40px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{
            display: 'flex', gap: 20, flexWrap: 'wrap', fontFamily: 'var(--font-mono)',
            fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)',
          }}>
            <span style={{ color: 'var(--accent)' }}>{project.duration}</span>
            {project.tags.map((t) => (
              <span key={t} style={{ color: 'var(--fg-2)' }}>{t}</span>
            ))}
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.5vw, 36px)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0,
          }}>
            {project.title}
          </h2>
        </div>
      </div>
    </div>
  );
};

// Card variants for different layouts
const ProjectCard = ({ project, onClick, variant = 'horizontal' }) => {
  const cls = `project fp-project fp-card-${variant}` + (project.featured ? ' fp-featured' : '');
  return (
    <div className={cls} onClick={onClick}>
      <div className="thumb-wrap">
        <LazyVideo src={project.preview} title={project.title} />
        <TagBadges tags={project.tags} />
        <span className="duration">{project.duration}</span>
        <div className="play-overlay" aria-hidden="true">
          <span className="play-icon">▶</span>
        </div>
      </div>
      <div className="info">
        <h3>{project.title}</h3>
      </div>
    </div>
  );
};

const FullPortfolio = ({ onBack }) => {
  const [filterKey, setFilterKey] = useState('all');
  const [modalProject, setModalProject] = useState(null);

  const activeFilter = ALL_FILTERS.find((f) => f.key === filterKey) || ALL_FILTERS[0];
  const filtered = ALL_PROJECTS.filter(activeFilter.match);

  const featured = ALL_PROJECTS.filter((p) => p.featured);
  const horizontal = filtered.filter((p) => p.orientation === 'horizontal' && !p.featured);
  const vertical = filtered.filter((p) => p.orientation === 'vertical');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const showFeatured = filterKey === 'all';

  return (
    <div className="fp-page">
      <div className="fp-header">
        <div className="shell fp-header-inner">
          <button onClick={onBack} className="fp-back" aria-label="Назад на главную">
            <span style={{ fontSize: 18 }}>←</span>
            <span>Назад на главную</span>
          </button>
          <div className="fp-logo">
            <img src="/logo.png" alt="AIVFX" className="logo-img" />
            <span className="logo-wm">AIVFX</span>
          </div>
        </div>
      </div>

      <div className="shell fp-content">
        <div className="fp-title-block">
          <div className="sec-num">[ ВСЕ РАБОТЫ ]</div>
          <h1 className="sec-title">
            Полный <span className="it">каталог</span>
          </h1>
          <p className="fp-lede">
            {ALL_PROJECTS.length} проектов: AI-генерация, VFX, классическая съёмка,
            Reels для соцсетей и рекламные кампании для недвижимости.
          </p>
        </div>

        {/* Избранное — только когда фильтр "Все" */}
        {showFeatured && featured.length > 0 && (
          <section className="fp-section">
            <div className="fp-section-head">
              <span className="fp-section-num">★</span>
              <h2 className="fp-section-title">
                Избранные <span className="it">работы</span>
              </h2>
            </div>
            <div className="fp-grid-featured">
              {featured.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  variant="horizontal"
                  onClick={() => setModalProject(p)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Фильтры */}
        <div className="filter-bar fp-filters">
          <span className="label">FILTER:</span>
          {ALL_FILTERS.map((f) => {
            const count = ALL_PROJECTS.filter(f.match).length;
            return (
              <button
                key={f.key}
                className={`filter-chip ${filterKey === f.key ? 'active' : ''}`}
                onClick={() => setFilterKey(f.key)}
              >
                {f.label} <span className="fp-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Горизонтальные работы */}
        {horizontal.length > 0 && (
          <section className="fp-section">
            <div className="fp-section-head">
              <span className="fp-section-num">▬</span>
              <h2 className="fp-section-title">
                Горизонтальные <span className="it">работы</span>
                <span className="fp-section-count"> — {horizontal.length}</span>
              </h2>
            </div>
            <div className="fp-grid-horizontal">
              {horizontal.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  variant="horizontal"
                  onClick={() => setModalProject(p)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Вертикальные работы (Reels / сторис) */}
        {vertical.length > 0 && (
          <section className="fp-section">
            <div className="fp-section-head">
              <span className="fp-section-num">▯</span>
              <h2 className="fp-section-title">
                Вертикальные <span className="it">работы</span>
                <span className="fp-section-count"> — {vertical.length}</span>
              </h2>
            </div>
            <div className="fp-grid-vertical">
              {vertical.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  variant="vertical"
                  onClick={() => setModalProject(p)}
                />
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '60px 0' }}>
            В этой категории пока нет работ.
          </p>
        )}
      </div>

      {modalProject && (
        <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
      )}
    </div>
  );
};

export default FullPortfolio;
