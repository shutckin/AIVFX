import React, { useRef } from 'react';

const Tilt3D = ({ children, className = '', style = {}, intensity = 12 }) => {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale3d(1.03,1.03,1.03)`;
  };

  const onMouseLeave = () => {
    if (ref.current)
      ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: 'transform 0.4s cubic-bezier(0.32,0.72,0,1), opacity 0.75s cubic-bezier(0.32,0.72,0,1), filter 0.5s cubic-bezier(0.32,0.72,0,1)', transformStyle: 'preserve-3d', ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default Tilt3D;
