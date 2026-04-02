import React, { useState } from 'react';

/**
 * LazyImage — thin wrapper around <img> that:
 * - Uses native browser lazy-loading (supported in all modern browsers)
 * - Fades in when loaded so there's no jarring layout shift
 * - className goes ONLY to <img>, not to any wrapper div
 */
const LazyImage = ({ src, alt, className, wrapperClassName = '', eager = false, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${wrapperClassName}`}>
      {/* Subtle placeholder while image loads */}
      {!loaded && (
        <div className="absolute inset-0 bg-white/5 rounded" />
      )}

      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className ?? ''}`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
