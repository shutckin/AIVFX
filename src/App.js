import React, { useEffect, useState, createContext, useContext, lazy, Suspense } from 'react';
import './index.css';
import { LocaleContext, getLocaleFromUrl, stripLocale, localizedHref, isRuOnly, useLocale } from './i18n';
import { FAQ_SYS } from './data/systems-content';

import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';

// Ленивые чанки объявлены парами «фабрика импорта + lazy-компонент».
// Фабрика нужна, чтобы прогреть чанк до гидратации — см. preloadRouteChunks.
const loadAboutUs        = () => import('./components/AboutUs');
const loadContactForm    = () => import('./components/ContactForm');
const loadFooter         = () => import('./components/Footer');
const loadPrivacyPolicy  = () => import('./components/PrivacyPolicy');
const loadFullPortfolio  = () => import('./components/FullPortfolio');
const loadConsent        = () => import('./components/Consent');
const loadBlog           = () => import('./components/Blog');
const loadCookieBanner   = () => import('./components/CookieBanner');

// ── Новые секции главной (AI Systems) ──
const loadProblems        = () => import('./components/Problems');
const loadSystemFlow      = () => import('./components/SystemFlow');
const loadServicesSystems = () => import('./components/ServicesSystems');
const loadCases           = () => import('./components/Cases');
const loadTraining        = () => import('./components/Training');
const loadApproach        = () => import('./components/Approach');
const loadFaqSection      = () => import('./components/FaqSection');
const loadIntegrations    = () => import('./components/Integrations');

// ── Новые страницы ──
const loadServicePage     = () => import('./components/ServicePage');
const loadVideoProduction = () => import('./components/VideoProduction');

// ── Конверсионные элементы ──
const loadCTABreak   = () => import('./components/CTABreak');
// Демо-ассистент: сайт сам показывает продукт, который студия продаёт.
// Заменяет плавающую Telegram-кнопку — Telegram живёт внутри чата.
const loadChatWidget = () => import('./components/ChatWidget');

const AboutUs         = lazy(loadAboutUs);
const ContactForm     = lazy(loadContactForm);
const Footer          = lazy(loadFooter);
const PrivacyPolicy   = lazy(loadPrivacyPolicy);
const FullPortfolio   = lazy(loadFullPortfolio);
const Consent         = lazy(loadConsent);
const Blog            = lazy(loadBlog);
const CookieBanner    = lazy(loadCookieBanner);
const Problems        = lazy(loadProblems);
const SystemFlow      = lazy(loadSystemFlow);
const ServicesSystems = lazy(loadServicesSystems);
const Cases           = lazy(loadCases);
const Training        = lazy(loadTraining);
const Approach        = lazy(loadApproach);
const FaqSection      = lazy(loadFaqSection);
const Integrations    = lazy(loadIntegrations);
const ServicePage     = lazy(loadServicePage);
const VideoProduction = lazy(loadVideoProduction);
const CTABreak        = lazy(loadCTABreak);
const ChatWidget      = lazy(loadChatWidget);

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
  const en = useLocale() === 'en';
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
          aria-label={en ? 'Close' : 'Закрыть'}
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
          {en ? 'Request received.' : 'Заявка принята.'} <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 300 }}>{en ? 'Thank you!' : 'Спасибо!'}</span>
        </h2>
        <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.55, marginTop: 14, marginBottom: 24 }}>
          {en
            ? 'Our manager will get in touch within 24 hours to discuss the details of your project.'
            : 'Наш менеджер свяжется с вами в течение 24 часов для обсуждения деталей проекта.'}
        </p>
        <button className="btn btn-primary" onClick={onClose}>
          {en ? 'Back to the site' : 'Вернуться на сайт'}<span className="btn-arrow">↗</span>
        </button>
      </div>
    </div>
  );
};

// Notification for "only contact form works" hint
const InfoNotification = ({ isVisible, onClose }) => {
  const en = useLocale() === 'en';
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
          aria-label={en ? 'Close' : 'Закрыть'}
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
          {en ? 'Send a' : 'Оставьте'} <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 300 }}>{en ? 'request' : 'заявку'}</span>
        </h2>
        <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.55, marginTop: 14, marginBottom: 24 }}>
          {en
            ? 'Fill in the form below — a manager will get back to you within 24 hours with an estimate.'
            : 'Заполните форму ниже — менеджер свяжется в течение 24 часов и пришлёт смету.'}
        </p>
        <button
          className="btn btn-primary"
          onClick={() => {
            onClose();
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {en ? 'Go to the form' : 'Перейти к форме'}<span className="btn-arrow">↗</span>
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
  // Сначала снимаем языковой префикс (/en), потом разбираем логический путь.
  const path = stripLocale(window.location.pathname);
  if (path === '/works' || path === '/portfolio') return 'works';
  if (path === '/privacy' || path === '/privacy-policy') return 'privacy';
  if (path === '/consent') return 'consent';
  if (path === '/blog' || path.startsWith('/blog/')) return 'blog';
  if (path === '/video-production') return 'video';
  if (path.startsWith('/services/')) return 'service';
  return 'main';
};

// Английский адрес русскоязычной-только страницы: уводим на русскую
// версию, вместо того чтобы показывать англоязычному читателю страницу
// об услуге, которую он не сможет получить. Ссылок на такие адреса нет
// нигде, но прямые переходы и старые закладки возможны.
const redirectRuOnlyFromEn = () => {
  if (typeof window === 'undefined') return;
  const { search, hash } = window.location;
  const logical = stripLocale(window.location.pathname);
  if (getLocaleFromUrl() !== 'en' || !isRuOnly(logical)) return;
  window.location.replace(localizedHref(logical, 'ru') + search + hash);
};

// Достаём slug услуги из /services/<slug>/ (например ai-sales-automation)
const getServiceSlugFromUrl = () => {
  if (typeof window === 'undefined') return null;
  const path = stripLocale(window.location.pathname);
  const m = path.match(/^\/services\/([^/]+)$/);
  return m ? m[1] : null;
};

// Достаём slug статьи из /blog/<slug>/ (для /blog/ вернёт null — это список)
const getBlogSlugFromUrl = () => {
  if (typeof window === 'undefined') return null;
  const path = stripLocale(window.location.pathname);
  const m = path.match(/^\/blog\/(.+)$/);
  return m ? m[1] : null;
};

// ── Прогрев ленивых чанков перед гидратацией ────────────────────────────
// Страницы отдаются предзарендеренными: в HTML уже лежит готовая разметка
// всех секций. Но React.lazy при гидратации сначала показал бы заглушку
// Suspense — разметка не совпадала бы с серверной, React ругался ошибками
// #418/#423 и выбрасывал готовый HTML, перерисовывая страницу с нуля.
// Поэтому перед hydrateRoot дожидаемся чанков, которые нужны этому маршруту.
// Для пользователя это незаметно: предзарендеренная страница уже на экране.
export const preloadRouteChunks = () => {
  const page = getPageFromUrl();

  // Общее для всех страниц
  const chunks = [loadFooter(), loadCookieBanner(), loadChatWidget()];

  if (page === 'main') {
    chunks.push(
      loadProblems(), loadSystemFlow(), loadCTABreak(), loadServicesSystems(),
      loadTraining(), loadCases(), loadApproach(), loadIntegrations(), loadAboutUs(),
      loadFaqSection(),
      loadContactForm()
    );
  } else if (page === 'service') {
    chunks.push(loadServicePage());
  } else if (page === 'video') {
    chunks.push(loadVideoProduction());
  } else if (page === 'works') {
    chunks.push(loadFullPortfolio());
  } else if (page === 'blog') {
    chunks.push(loadBlog());
  } else if (page === 'privacy') {
    chunks.push(loadPrivacyPolicy());
  } else if (page === 'consent') {
    chunks.push(loadConsent());
  }

  // Один упавший чанк не должен блокировать гидратацию целиком
  return Promise.all(chunks.map((p) => p.catch(() => null)));
};

function App() {
  const [page, setPage] = useState(getPageFromUrl);
  const [blogSlug, setBlogSlug] = useState(getBlogSlugFromUrl);
  const [serviceSlug, setServiceSlug] = useState(getServiceSlugFromUrl);
  const [locale] = useState(getLocaleFromUrl);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showInfoNotification, setShowInfoNotification] = useState(false);

  // Проставляем язык документа для SEO и доступности
  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = locale;
  }, [locale]);

  // Английский адрес русскоязычной-только страницы уводим на русскую версию
  useEffect(redirectRuOnlyFromEn, []);

  // Локализованные title/description + скролл к якорю (#contact)
  // после перехода со страниц услуг и /video-production
  //
  // Правовые страницы раньше не ставили ничего своего и донашивали
  // заголовок с описанием главной. Для поиска это дубли: Яндекс
  // отдельно жаловался на них в диагностике, а Google при дублях сам
  // выбирает, какую из страниц показывать, — и выбирает не всегда ту.
  useEffect(() => {
    const en = locale === 'en';

    const META = {
      main: {
        ru: ['AIVFX — AI-системы и автоматизация бизнеса | От заявки до повторных продаж',
          'Проектируем и внедряем AI-автоматизации для бизнеса: приём и квалификация заявок, AI-ассистенты, интеграция с CRM и автоматизация процессов.'],
        en: ['AIVFX — AI Systems & Business Automation | From First Inquiry to Repeat Sales',
          'We design and deploy AI automations for business: lead intake and qualification, AI assistants, CRM integration and process automation. No lead gets lost.'],
      },
      privacy: {
        ru: ['Политика конфиденциальности — AIVFX',
          'Как AIVFX собирает, использует и хранит персональные данные посетителей сайта: состав данных, цели обработки, сроки хранения и права пользователя.'],
        en: ['Privacy Policy — AIVFX',
          'How AIVFX collects, uses and stores personal data of site visitors: what data is processed, for what purposes, how long it is kept and what rights you have.'],
      },
      consent: {
        ru: ['Согласие на обработку персональных данных — AIVFX',
          'Текст согласия на обработку персональных данных, которое даёт посетитель при отправке заявки через формы на сайте AIVFX.'],
        en: ['Consent to Personal Data Processing — AIVFX',
          'The consent to personal data processing given by a visitor when submitting a request through the forms on the AIVFX website.'],
      },
    };

    const entry = META[page];
    if (entry) {
      const [title, description] = entry[en ? 'en' : 'ru'];
      document.title = title;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', description);
    }

    // Разметка вопросов и ответов - только на главной, где эти вопросы
    // действительно на странице.
    //
    // Раньше она лежала прямо в public/index.html и потому уезжала на все
    // 45 страниц сайта, включая статьи блога: разметка обещала поисковику
    // ответы, которых на странице нет. Google такое расхождение считает
    // нарушением и снимает расширенный сниппет - причём не с одной
    // страницы, а со всего сайта. На статьях вдобавок сталкивались две
    // разные разметки FAQ, своя и эта.
    //
    // Текст берём из тех же данных, что рисуют видимый блок вопросов,
    // поэтому разойтись им негде, и перевод получается сам собой.
    // Очистку собираем в список: у эффекта есть и вторая обязанность -
    // прокрутка к якорю, и ранний return из одной ветки отменил бы её
    const cleanups = [];

    if (page === 'main' && typeof document !== 'undefined') {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-home-faq', '1');
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_SYS.map((item) => ({
          '@type': 'Question',
          name: en ? item.q.en : item.q.ru,
          acceptedAnswer: { '@type': 'Answer', text: en ? item.a.en : item.a.ru },
        })),
      });
      document.head.appendChild(script);
      cleanups.push(() => script.remove());
    }
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.slice(1);
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 600);
      cleanups.push(() => clearTimeout(t));
    }

    return () => cleanups.forEach((fn) => fn());
    // en выводится из locale внутри эффекта, отдельной зависимостью быть не может
  }, [page, locale]);

  const showPrivacyPolicy = page === 'privacy';
  const showFullPortfolio = page === 'works';
  const showConsentPage   = page === 'consent';
  const showBlogPage      = page === 'blog';
  const showServicePage   = page === 'service';
  const showVideoPage     = page === 'video';

  // Синхронизируем состояние с кнопками браузера "назад"/"вперёд"
  useEffect(() => {
    const onPop = () => { setPage(getPageFromUrl()); setBlogSlug(getBlogSlugFromUrl()); setServiceSlug(getServiceSlugFromUrl()); };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Переход на новый URL без перезагрузки страницы.
  // Принимает «логический» путь (/, /works/, /blog/...), сам добавляет /en при EN.
  const navigate = (nextPage, logicalPath) => {
    const url = localizedHref(logicalPath, locale);
    const norm = (s) => s.replace(/\/+$/, '') || '/';
    if (norm(window.location.pathname) !== norm(url)) {
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

    // Страховка: в фоновой вкладке браузер не запускает IntersectionObserver,
    // и секции остались бы невидимыми. Через 2.5 с показываем всё, что уже
    // попадает в экран, — анимация появления не должна прятать контент.
    const safety = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in');
      });
    }, 2500);

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

    return () => { clearTimeout(safety); obs.disconnect(); mo.disconnect(); };
  }, []);

  const ctx = {
    show, hide, showSuccess, hideSuccess,
    showPrivacy, hidePrivacy, scrollToSection,
    showAllPortfolio, hideAllPortfolio,
    showConsent, hideConsent,
    showBlog,
  };

  return (
   <LocaleContext.Provider value={locale}>
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
        ) : showVideoPage ? (
          <Suspense fallback={<SectionFallback />}>
            {/* vp-theme: янтарная палитра направления «AI-контент» — вместе с футером */}
            <div className="vp-theme">
              <VideoProduction />
              <Footer />
            </div>
          </Suspense>
        ) : showServicePage ? (
          <Suspense fallback={<SectionFallback />}>
            <ServicePage slug={serviceSlug} />
            <Footer />
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
              {locale === 'en' ? 'Skip to content' : 'Перейти к контенту'}
            </a>
            <Header />
            <main>
              <Hero />
              <Stats />
              <Suspense fallback={<SectionFallback />}><Problems /></Suspense>
              <Suspense fallback={<SectionFallback />}><SystemFlow /></Suspense>
              <Suspense fallback={null}><CTABreak /></Suspense>
              <Suspense fallback={<SectionFallback />}><ServicesSystems /></Suspense>
              {/* Обучение идёт сразу за услугами: человек только что прочитал,
                  что мы строим системы, и здесь узнаёт про второй путь. */}
              <Suspense fallback={null}><Training /></Suspense>
              <Suspense fallback={<SectionFallback />}><Cases /></Suspense>
              <Suspense fallback={null}><CTABreak variant="light" /></Suspense>
              <Suspense fallback={<SectionFallback />}><Approach /></Suspense>
              <Suspense fallback={<SectionFallback />}><Integrations /></Suspense>
              <Suspense fallback={<SectionFallback />}><AboutUs /></Suspense>
              <Suspense fallback={<SectionFallback />}><FaqSection /></Suspense>
              <Suspense fallback={<SectionFallback />}><ContactForm /></Suspense>
            </main>
            <Suspense fallback={null}><Footer /></Suspense>
          </>
        )}
        <InfoNotification isVisible={showInfoNotification} onClose={hide} />
        <SuccessModal isVisible={showSuccessModal} onClose={hideSuccess} />
        <Suspense fallback={null}><ChatWidget /></Suspense>
        <Suspense fallback={null}>
          <CookieBanner onPrivacyClick={showPrivacy} />
        </Suspense>
      </div>
    </NotificationContext.Provider>
   </LocaleContext.Provider>
  );
}

export default App;
