import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({ src, alt, className, wrapperClassName = '', ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const wrapperRef = useRef();

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Use native lazy loading where available, fall back to IntersectionObserver
    if ('loading' in HTMLImageElement.prototype) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${wrapperClassName}`}>
      {/* Skeleton placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse rounded" />
      )}

      {/* Actual image — className goes ONLY to <img>, not the wrapper */}
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className ?? ''}`}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;
