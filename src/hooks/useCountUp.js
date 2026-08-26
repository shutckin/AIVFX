import { useEffect, useRef, useState } from 'react';

// Накручивающийся счётчик: стартует, когда элемент попадает в viewport.
// Умеет значения вида "180+", "24/7", "13", "100%", "-70%", "<2 мин":
// анимируется только ПЕРВОЕ число в строке, префикс/суффикс сохраняются.
// prefers-reduced-motion — сразу финальное значение.
export function useCountUp(finalValue, { duration = 1200 } = {}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(finalValue);

  useEffect(() => {
    const el = ref.current;
    const str = String(finalValue);
    const m = str.match(/(\d+)/); // первое целое число в строке
    const reduced = typeof window !== 'undefined'
      && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!el || !m || reduced) { setDisplay(str); return; }

    const target = parseInt(m[1], 10);
    const prefix = str.slice(0, m.index);
    const suffix = str.slice(m.index + m[1].length);
    let rafId = null;
    let started = false;

    const run = () => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setDisplay(prefix + Math.round(target * eased) + suffix);
        if (p < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          run();
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });

    setDisplay(prefix + '0' + suffix);
    obs.observe(el);
    return () => { obs.disconnect(); if (rafId) cancelAnimationFrame(rafId); };
  }, [finalValue, duration]);

  return [ref, display];
}
