import React from 'react';
import { useNotification } from '../App';
import Tilt3D from './Tilt3D';

const Hero = () => {
  const { show: showNotification, scrollToSection } = useNotification();

  return (
    <section id="hero" className="relative flex items-center overflow-hidden" style={{ minHeight: '100dvh' }}>
      <div className="container relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-center" style={{ minHeight: '100dvh', paddingTop: '7rem', paddingBottom: '4rem' }}>

          {/* Left column — content */}
          <div className="lg:col-span-8 space-y-8">

            {/* Eyebrow */}
            <div>
              <span className="eyebrow">
                <span
                  className="inline-block rounded-full bg-primary animate-pulse"
                  style={{ width: '6px', height: '6px', background: '#D35C00' }}
                />
                Революция в видеопроизводстве
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1
                style={{
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  letterSpacing: '-0.04em',
                  fontWeight: 800,
                  lineHeight: 1,
                  color: '#EFEFEF',
                }}
              >
                СОЗДАЁМ<br />
                <span style={{ color: '#D35C00' }}>ВИРУСНЫЙ</span><br />
                КОНТЕНТ<br />С AI и VFX
              </h1>
              <p className="text-lg lg:text-xl font-semibold" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '36rem', paddingTop: '0.5rem' }}>
                Быстрее. Дешевле. Качественнее.
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3">
              {['10x быстрее', '70% дешевле', 'Премиум качество', '4K видео'].map((tag) => (
                <span
                  key={tag}
                  className="eyebrow"
                  style={{ fontSize: '11px', letterSpacing: '0.12em' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={showNotification}
                className="btn btn-primary btn-large btn-arrow"
                aria-label="Открыть форму заказа AI-контента"
              >
                <span>Создать AI-контент</span>
                <span className="btn-arrow-circle">↗</span>
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="btn btn-secondary btn-large"
                aria-label="Перейти к примерам работ"
              >
                Смотреть примеры
              </button>
            </div>
          </div>

          {/* Right column — floating stat cards */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-4 items-end">
            {[
              { value: 'AI', label: 'Генерация', delay: '0s' },
              { value: 'VFX', label: 'Эффекты', delay: '0.4s' },
              { value: '70%', label: 'Экономия', delay: '0.8s' },
              { value: '72ч', label: 'Средний срок', delay: '1.2s' },
              { value: '50+', label: 'Проектов', delay: '1.6s' },
            ].map((stat) => (
              <Tilt3D
                key={stat.value}
                intensity={18}
                className="animate-float"
                style={{ animationDelay: stat.delay }}
              >

                <div
                  className="bezel-outer"
                  style={{ minWidth: '120px', transformStyle: 'preserve-3d' }}
                >
                  <div className="bezel-inner px-5 py-3 text-center">
                    <div
                      className="font-black"
                      style={{ fontSize: '1.5rem', letterSpacing: '-0.03em', color: '#D35C00', transform: 'translateZ(14px)' }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
            Листать
          </span>
          <div
            style={{
              width: '1px',
              height: '56px',
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
