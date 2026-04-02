import React, { useRef, useState, useEffect } from 'react';

// Detect if we should skip video (saves bandwidth on mobile/slow connections)
const isMobileOrLowEnd = () => {
  // Touch device with small screen
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  // Slow connection hint from Network Information API
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isSlowConn = conn && (conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType));
  return isMobile || isSlowConn;
};

const VideoBackground = ({ currentVideo }) => {
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const [activeSlot, setActiveSlot] = useState(0);
  const pendingVideoRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const [skipVideo] = useState(() => isMobileOrLowEnd());

  // On mount — start playing the initial video in slot A (desktop only)
  useEffect(() => {
    if (skipVideo) return;
    const videoA = videoARef.current;
    if (videoA && currentVideo) {
      videoA.src = currentVideo;
      videoA.load();
      videoA.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipVideo]);

  // When currentVideo prop changes, crossfade to the new video (desktop only)
  useEffect(() => {
    if (skipVideo || !currentVideo) return;

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
  }, [currentVideo, skipVideo]);

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

  // Mobile: show animated gradient instead of video
  if (skipVideo) {
    return (
      <div className="video-bg-wrapper">
        <div
          className="video-bg-layer is-active"
          style={{
            background: 'radial-gradient(ellipse at 60% 40%, #1a0a00 0%, #0a0500 40%, #080808 100%)',
          }}
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
      {/* Slot B */}
      <video
        ref={videoBRef}
        className={`video-bg-layer ${activeSlot === 1 ? 'is-active' : 'is-inactive'}`}
        muted
        playsInline
        loop
        preload="none"
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="video-bg-overlay" />
    </div>
  );
};

export default VideoBackground;
