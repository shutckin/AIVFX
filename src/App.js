import React, { useEffect, useState, createContext, useContext, lazy, Suspense } from 'react';
import './index.css';

import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';

const Services    = lazy(() => import('./components/Services'));
const Portfolio   = lazy(() => import('./components/Portfolio'));
const AboutUs     = lazy(() => import('./components/AboutUs'));
const Clients     = lazy(() => import('./components/Clients'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Footer      = lazy(() => import('./components/Footer'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const FullPortfolio = lazy(() => import('./components/FullPortfolio'));
const Consent      = lazy(() => import('./components/Consent'));
const Blog         = lazy(() => import('./components/Blog'));
const CookieBanner = lazy(() => import('./components/CookieBanner'));

const SectionFallback = () => (
  <div style={{ padding: '80px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div
      style={{
        width: 32,
        height: 32,
        border: '2px solid var(--accent)',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  </div>
);

const NotificationContext = createContext();

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
};

// Success modal — cinematic style
const SuccessModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(8,7,6,0.85)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-2)', border: '1px solid var(--line-2)',
          borderRadius: 'var(--r-lg)', padding: 'clamp(32px, 4vw, 56px)',
          maxWidth: 520, width: '100%', position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          style={{
            position: 'absolute', top: 20, right: 20, width: 36, height: 36,
            borderRadius: '50%', border: '1px solid var(--line-2)',
            display: 'grid', placeItems: 'center', background: 'transparent',
            color: 'var(--fg-2)', fontSize: 18, cursor: 'pointer',
          }}
        >✕</button>

        <div
          style={{
            width: 56, height: 56, borderRadius: '50%', background: 'var(--accent)',
            display: 'grid', placeItems: 'center', marginBottom: 24,
            color: 'var(--bg)', fontSize: 24, fontWeight: 800,
          }}
        >✓</div>

        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800,
          letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 14, margin: 0,
        }}>
          Заявка принята. <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 300 }}>Спасибо!</span>
        </h2>
        <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.55, marginTop: 14, marginBottom: 24 }}>
          Наш менеджер свяжется с вами в течение 24 часов для обсуждения деталей проекта.
        </p>
        <button className="btn btn-primary" onClick={onClose}>
          Вернуться на сайт <span className="btn-arrow">↗</span>
        </button>
      </div>
    </div>
  );
};

// Notification for "only contact form works" hint
const InfoNotification = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(8,7,6,0.85)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-2)', border: '1px solid var(--line-2)',
          borderRadius: 'var(--r-lg)', padding: 'clamp(32px, 4vw, 56px)',
          maxWidth: 520, width: '100%', position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          style={{
            position: 'absolute', top: 20, right: 20, width: 36, height: 36,
            borderRadius: '50%', border: '1px solid var(--line-2)',
            display: 'grid', placeItems: 'center', background: 'transparent',
            color: 'var(--fg-2)', fontSize: 18, cursor: 'pointer',
          }}
        >✕</button>

        <span className="kicker" style={{ display: 'block', marginBottom: 12 }}>QUICK START</span>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800,
          letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 14, margin: 0,
        }}>
          Оставьте <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 300 }}>заявку</span>
        </h2>
        <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.55, marginTop: 14, marginBottom: 24 }}>
          Заполните форму ниже — менеджер свяжется в течение 24 часов и пришлёт смету.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => {
            onClose();
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Перейти к форме <span className="btn-arrow">↗</span>
        </button>
      </div>
    </div>
  );
};

// URL-based routing: читаем путь при загрузке страницы
// Поддерживаемые URL:
//   /          — главная
//   /works     — полный каталог работ
//   /privacy   — политика конфиденциальности
//   /consent   — согласие на обработку персональных данных
const getPageFromUrl = () => {
  if (typeof window === 'undefined') return 'main';
  // Нормализуем путь: убираем хвостовой слэш (кроме корня),
  // чтобы /privacy и /privacy/ распознавались одинаково.
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/works' || path === '/portfolio') return 'works';
  if (path === '/privacy' || path === '/privacy-policy') return 'privacy';
  if (path === '/consent') return 'consent';
  if (path === '/blog' || path.startsWith('/blog/')) return 'blog';
  return 'main';
};

// Достаём slug статьи из /blog/<slug>/ (для /blog/ вернёт null — это список)
const getBlogSlugFromUrl = () => {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const m = path.match(/^\/blog\/(.+)$/);
  return m ? m[1] : null;
};

function App() {
  const [page, setPage] = useState(getPageFromUrl);
  const [blogSlug, setBlogSlug] = useState(getBlogSlugFromUrl);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showInfoNotification, setShowInfoNotification] = useState(false);

  const showPrivacyPolicy = page === 'privacy';
  const showFullPortfolio = page === 'works';
  const showConsentPage   = page === 'consent';
  const showBlogPage      = page === 'blog';

  // Синхронизируем состояние с кнопками браузера "назад"/"вперёд"
  useEffect(() => {
    const onPop = () => { setPage(getPageFromUrl()); setBlogSlug(getBlogSlugFromUrl()); };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Переход на новый URL без перезагрузки страницы
  const navigate = (nextPage, url) => {
    if (window.location.pathname !== url) {
      window.history.pushState({}, '', url);
    }
    setPage(nextPage);
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const show = () => setShowInfoNotification(true);
  const hide = () => setShowInfoNotification(false);
  const showSuccess = () => { setShowSuccessModal(true); setShowInfoNotification(false); };
  const hideSuccess = () => setShowSuccessModal(false);
  const showPrivacy = () => navigate('privacy', '/privacy/');
  const hidePrivacy = () => navigate('main', '/');
  const showConsent = () => navigate('consent', '/consent/');
  const hideConsent = () => navigate('main', '/');
  const showAllPortfolio = () => navigate('works', '/works/');
  const hideAllPortfolio = () => {
    navigate('main', '/');
    // После возврата на главную — прокрутить к секции "Работы"
    setTimeout(() => {
      const el = document.getElementById('portfolio');
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 50);
  };

  // ── Навигация по блогу ──
  const showBlog = () => { navigate('blog', '/blog/'); setBlogSlug(null); window.scrollTo(0, 0); };
  const hideBlog = () => navigate('main', '/');
  const openBlogPost = (slug) => { navigate('blog', `/blog/${slug}/`); setBlogSlug(slug); window.scrollTo(0, 0); };
  const backToBlogList = () => { navigate('blog', '/blog/'); setBlogSlug(null); window.scrollTo(0, 0); };

  // Reveal on scroll animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    const observe = (el) => {
      if (!el.classList.contains('in')) obs.observe(el);
    };

    document.querySelectorAll('.reveal').forEach(observe);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.classList?.contains('reveal')) observe(node);
          node.querySelectorAll?.('.reveal').forEach(observe);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { obs.disconnect(); mo.disconnect(); };
  }, []);

  const ctx = {
    show, hide, showSuccess, hideSuccess,
    showPrivacy, hidePrivacy, scrollToSection,
    showAllPortfolio, hideAllPortfolio,
    showConsent, hideConsent,
    showBlog,
  };

  return (
    <NotificationContext.Provider value={ctx}>
      <div className="app">
        <div className="grain" aria-hidden="true" />
        {showPrivacyPolicy ? (
          <Suspense fallback={<SectionFallback />}>
            <PrivacyPolicy onBack={hidePrivacy} />
          </Suspense>
        ) : showConsentPage ? (
          <Suspense fallback={<SectionFallback />}>
            <Consent onBack={hideConsent} />
          </Suspense>
        ) : showFullPortfolio ? (
          <Suspense fallback={<SectionFallback />}>
            <FullPortfolio onBack={hideAllPortfolio} />
          </Suspense>
        ) : showBlogPage ? (
          <Suspense fallback={<SectionFallback />}>
            <Blog
              slug={blogSlug}
              onBack={hideBlog}
              onOpenPost={openBlogPost}
              onBackToList={backToBlogList}
            />
          </Suspense>
        ) : (
          <>
            <a
              href="#portfolio"
              style={{
                position: 'absolute', left: -9999, top: 'auto',
                width: 1, height: 1, overflow: 'hidden',
              }}
              onFocus={(e) => {
                e.target.style.cssText =
                  'position:fixed;top:16px;left:16px;width:auto;height:auto;padding:10px 16px;background:var(--accent);color:var(--bg);border-radius:8px;z-index:9999;font-weight:600;';
              }}
              onBlur={(e) => {
                e.target.style.cssText =
                  'position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;';
              }}
            >
              Перейти к контенту
            </a>
            <Header />
            <main>
              <Hero />
              <Stats />
              <Suspense fallback={<SectionFallback />}><Services /></Suspense>
              <Suspense fallback={<SectionFallback />}><Portfolio /></Suspense>
              <Suspense fallback={<SectionFallback />}><AboutUs /></Suspense>
              <Suspense fallback={<SectionFallback />}><Clients /></Suspense>
              <Suspense fallback={<SectionFallback />}><ContactForm /></Suspense>
            </main>
            <Suspense fallback={null}><Footer /></Suspense>
          </>
        )}
        <InfoNotification isVisible={showInfoNotification} onClose={hide} />
        <SuccessModal isVisible={showSuccessModal} onClose={hideSuccess} />
        <Suspense fallback={null}>
          <CookieBanner onPrivacyClick={showPrivacy} />
        </Suspense>
      </div>
    </NotificationContext.Provider>
  );
}

export default App;
