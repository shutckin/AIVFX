import React from 'react';

const Globe3D = ({ size = 260, className = '' }) => {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;

  const latitudes = [-60, -30, 0, 30, 60];
  const longitudes = [0, 45, 90, 135];

  return (
    <div className={`relative select-none pointer-events-none ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="g3d-bg" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="rgba(45,15,2,0.95)" />
            <stop offset="100%" stopColor="rgba(4,4,4,0.98)" />
          </radialGradient>
          <radialGradient id="g3d-glow" cx="32%" cy="28%" r="55%">
            <stop offset="0%" stopColor="rgba(211,92,0,0.55)" />
            <stop offset="55%" stopColor="rgba(211,92,0,0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <clipPath id="g3d-clip">
            <circle cx={cx} cy={cy} r={r} />
          </clipPath>
          <filter id="g3d-blur">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Base sphere */}
        <circle cx={cx} cy={cy} r={r} fill="url(#g3d-bg)" />
        <circle cx={cx} cy={cy} r={r} stroke="rgba(211,92,0,0.25)" strokeWidth="1" fill="none" />

        {/* Latitude lines */}
        {latitudes.map((lat, i) => {
          const yPos = cy + (lat / 90) * r;
          const rx = Math.cos((lat * Math.PI) / 180) * r;
          const ry = rx * 0.18;
          return (
            <ellipse
              key={`lat-${i}`}
              cx={cx} cy={yPos}
              rx={rx} ry={ry}
              fill="none"
              stroke="rgba(211,92,0,0.18)"
              strokeWidth="0.7"
              clipPath="url(#g3d-clip)"
            />
          );
        })}

        {/* Longitude lines — animated spin */}
        <g
          clipPath="url(#g3d-clip)"
          style={{
            animation: 'g3d-spin 14s linear infinite',
            transformOrigin: `${cx}px ${cy}px`,
          }}
        >
          {longitudes.map((angle, i) => (
            <ellipse
              key={`lng-${i}`}
              cx={cx} cy={cy}
              rx={r * 0.22} ry={r}
              fill="none"
              stroke="rgba(211,92,0,0.18)"
              strokeWidth="0.7"
              transform={`rotate(${angle} ${cx} ${cy})`}
            />
          ))}
        </g>

        {/* Surface glow */}
        <circle cx={cx} cy={cy} r={r} fill="url(#g3d-glow)" clipPath="url(#g3d-clip)" />

        {/* Specular highlight */}
        <ellipse
          cx={cx - r * 0.28}
          cy={cy - r * 0.32}
          rx={r * 0.22}
          ry={r * 0.14}
          fill="rgba(255,170,80,0.14)"
          style={{ filter: 'blur(7px)' }}
        />
      </svg>

      {/* Outer ambient halo */}
      <div
        style={{
          position: 'absolute',
          inset: -size * 0.12,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(211,92,0,0.1) 0%, transparent 68%)',
          filter: 'blur(12px)',
        }}
      />

      <style>{`
        @keyframes g3d-spin {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Globe3D;
