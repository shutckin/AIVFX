import React, { useRef, useState, useEffect } from 'react';

const VideoBackground = ({ currentVideo }) => {
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  // activeSlot: 0 = A is visible, 1 = B is visible
  const [activeSlot, setActiveSlot] = useState(0);
  const pendingVideoRef = useRef(null);
  const isTransitioningRef = useRef(false);

  // On mount — start playing the initial video in slot A
  useEffect(() => {
    const videoA = videoARef.current;
    if (videoA && currentVideo) {
      videoA.src = currentVideo;
      videoA.load();
      videoA.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When currentVideo prop changes, crossfade to the new video
  useEffect(() => {
    if (!currentVideo) return;

    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    const activeRef = activeSlot === 0 ? videoA : videoB;
    // If same src as currently active, do nothing
    if (activeRef.src && activeRef.src.endsWith(currentVideo)) return;

    if (isTransitioningRef.current) {
      // Queue the latest request; it will be picked up after current transition
      pendingVideoRef.current = currentVideo;
      return;
    }

    startTransition(currentVideo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo]);

  const startTransition = (videoSrc) => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    isTransitioningRef.current = true;

    const inactiveSlot = activeSlot === 0 ? 1 : 0;
    const inactiveVideo = inactiveSlot === 0 ? videoA : videoB;

    // Load new video into inactive slot
    inactiveVideo.src = videoSrc;
    inactiveVideo.load();

    let transitioned = false;

    const doTransition = () => {
      if (transitioned) return;
      transitioned = true;
      inactiveVideo.play().catch(() => {});
      setActiveSlot(inactiveSlot);

      // After transition completes, check for pending
      setTimeout(() => {
        isTransitioningRef.current = false;
        if (pendingVideoRef.current) {
          const next = pendingVideoRef.current;
          pendingVideoRef.current = null;
          startTransition(next);
        }
      }, 950);
    };

    // Fallback: transition even if canplay never fires
    const fallbackTimer = setTimeout(doTransition, 2000);

    inactiveVideo.addEventListener('canplay', () => {
      clearTimeout(fallbackTimer);
      doTransition();
    }, { once: true });
  };

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
