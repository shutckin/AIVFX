import React, { useEffect, useState, createContext, useContext, useRef } from 'react';
import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Clients from './components/Clients';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Notification from './components/Notification';
import PrivacyPolicy from './components/PrivacyPolicy';
import VideoBackground from './components/VideoBackground';

// Section → video mapping
const SECTION_VIDEO_MAP = {
  hero:      '/fixed/aivid.mp4',
  services:  '/fixed/porsche.mp4',
  portfolio: '/fixed/rolex.mp4',
  about:     '/fixed/house.mp4',
  clients:   '/fixed/danube.mp4',
  contact:   '/fixed/synr.mp4',
};

// Создаем контекст для управления уведомлениями
const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

// Глобальный компонент модального окна с благодарностью
const SuccessModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="relative bg-[#0e0e0e] border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
           style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Логотип */}
        <div className="text-center mb-6">
          <div className="text-4xl font-black mb-4">
            <span className="text-gradient">AIVFX</span>
          </div>
        </div>

        {/* Основное сообщение */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
            Заявка принята. Спасибо!
          </h2>
          <p className="text-white/60 leading-relaxed text-sm">
            Наш менеджер свяжется с вами в ближайшее время для обсуждения деталей.
            Пока ждёте — посмотрите больше наших работ.
          </p>
        </div>

        {/* Кнопка возврата */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="btn btn-primary"
          >
            <span>Вернуться на сайт</span>
            <span className="btn-arrow-circle ml-3">↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [showNotification, setShowNotification] = useState(false);
  const [isNotificationAnimating, setIsNotificationAnimating] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(SECTION_VIDEO_MAP.hero);

  const sectionRatioMap = useRef({});

  useEffect(() => {
    if (showNotification) {
      setIsNotificationAnimating(true);
    } else {
      const timer = setTimeout(() => {
        setIsNotificationAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const show = () => setShowNotification(true);
  const showSuccess = () => {
    setShowSuccessModal(true);
    setShowNotification(false);
  };
  const hide = () => setShowNotification(false);
  const hideSuccess = () => setShowSuccessModal(false);
  const showPrivacy = () => setShowPrivacyPolicy(true);
  const hidePrivacy = () => setShowPrivacyPolicy(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Observer #1: scroll reveal animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    const revealEls = document.querySelectorAll('.reveal-ready');
    revealEls.forEach((el) => observer.observe(el));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      revealEls.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Observer #2: video switching based on section visibility
  useEffect(() => {
    const sectionIds = Object.keys(SECTION_VIDEO_MAP);

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (sectionIds.includes(id)) {
            sectionRatioMap.current[id] = entry.intersectionRatio;
          }
        });

        // Find section with highest intersection ratio
        let maxRatio = 0;
        let topSection = null;
        sectionIds.forEach((id) => {
          const ratio = sectionRatioMap.current[id] || 0;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            topSection = id;
          }
        });

        if (topSection && SECTION_VIDEO_MAP[topSection]) {
          setCurrentVideo(SECTION_VIDEO_MAP[topSection]);
        }
      },
      {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) videoObserver.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) videoObserver.unobserve(el);
      });
    };
  }, []);

  const notificationContextValue = {
    showNotification,
    isNotificationAnimating,
    show,
    hide,
    showSuccess,
    hideSuccess,
    showSuccessModal,
    showPrivacy,
    hidePrivacy,
    scrollToSection
  };

  return (
    <NotificationContext.Provider value={notificationContextValue}>
      <div className="app">
        {showPrivacyPolicy ? (
          <PrivacyPolicy onBack={hidePrivacy} />
        ) : (
          <>
            <VideoBackground currentVideo={currentVideo} />
            <Header />
            <main>
              <Hero />
              <Services />
              <Portfolio />
              <AboutUs />
              <Clients />
              <ContactForm />
            </main>
            <Footer />
          </>
        )}
        <Notification />
        <SuccessModal isVisible={showSuccessModal} onClose={hideSuccess} />
      </div>
    </NotificationContext.Provider>
  );
}

export default App;
