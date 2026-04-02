import React, { useRef, useState, useEffect } from 'react';

const HERO_VIDEO = '/fixed/aivid.mp4';

// On mobile: play only the hero video, no section switching (saves bandwidth)
const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

// Detect save-data / very slow connection — skip video entirely
const isLowEnd = () => {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  return conn && (conn.saveData || ['slow-2g', '2g'].includes(conn.effectiveType));
};

const VideoBackground = ({ currentVideo }) => {
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const [activeSlot, setActiveSlot] = useState(0);
  const pendingVideoRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const [mobile] = useState(() => isMobile());
  const [skipVideo] = useState(() => isLowEnd());

  // On mount — start playing the initial video in slot A
  useEffect(() => {
    if (skipVideo) return;
    const videoA = videoARef.current;
    // Mobile plays only the hero video; desktop plays whatever section is active
    const src = mobile ? HERO_VIDEO : currentVideo;
    if (videoA && src) {
      videoA.src = src;
      videoA.load();
      videoA.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipVideo]);

  // When currentVideo prop changes — desktop only, mobile stays on hero video
  useEffect(() => {
    if (skipVideo || mobile || !currentVideo) return;

    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    const activeRef = activeSlot === 0 ? videoA : videoB;
    if (activeRef.src && activeRef.src.endsWith(currentVideo)) return;

    if (isTransitioningRef.current) {
      pendingVideoRef.current = currentVideo;
      return;
    }

    startTransition(currentVideo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo, mobile, skipVideo]);

  const startTransition = (videoSrc) => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    isTransitioningRef.current = true;

    const inactiveSlot = activeSlot === 0 ? 1 : 0;
    const inactiveVideo = inactiveSlot === 0 ? videoA : videoB;

    inactiveVideo.src = videoSrc;
    inactiveVideo.load();

    let transitioned = false;

    const doTransition = () => {
      if (transitioned) return;
      transitioned = true;
      inactiveVideo.play().catch(() => {});
      setActiveSlot(inactiveSlot);

      setTimeout(() => {
        isTransitioningRef.current = false;
        if (pendingVideoRef.current) {
          const next = pendingVideoRef.current;
          pendingVideoRef.current = null;
          startTransition(next);
        }
      }, 950);
    };

    const fallbackTimer = setTimeout(doTransition, 2000);
    inactiveVideo.addEventListener('canplay', () => {
      clearTimeout(fallbackTimer);
      doTransition();
    }, { once: true });
  };

  // Only skip video on save-data / 2G
  if (skipVideo) {
    return (
      <div className="video-bg-wrapper">
        <div
          className="video-bg-layer is-active"
          style={{ background: 'radial-gradient(ellipse at 60% 40%, #1a0a00 0%, #0a0500 40%, #080808 100%)' }}
        />
        <div className="video-bg-overlay" style={{ opacity: 0.3 }} />
      </div>
    );
  }

  return (
    <div className="video-bg-wrapper">
      {/* Slot A */}
      <video
        ref={videoARef}
        className={`video-bg-layer ${activeSlot === 0 ? 'is-active' : 'is-inactive'}`}
        muted
        playsInline
        loop
        preload="none"
        aria-hidden="true"
      />
      {/* Slot B — not used on mobile */}
      {!mobile && (
        <video
          ref={videoBRef}
          className={`video-bg-layer ${activeSlot === 1 ? 'is-active' : 'is-inactive'}`}
          muted
          playsInline
          loop
          preload="none"
          aria-hidden="true"
        />
      )}
      {/* Dark overlay */}
      <div className="video-bg-overlay" />
    </div>
  );
};

export default VideoBackground;
