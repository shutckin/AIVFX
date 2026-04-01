import React from 'react';
import { useNotification } from '../App';
import Tilt3D from './Tilt3D';

const Services = () => {
  const { show: showNotification, scrollToSection } = useNotification();

  const advantages = [
    {
      glyph: '10×',
      title: 'В 10X БЫСТРЕЕ',
      description: 'Что раньше занимало недели и месяцы, теперь делаем за часы и дни'
    },
    {
      glyph: '70%',
      title: 'НА 70% ДЕШЕВЛЕ',
      description: 'Революционно низкие цены без компромиссов в качестве'
    },
    {
      glyph: '4K',
      title: 'ПРЕМИУМ КАЧЕСТВО',
      description: 'Голливудский уровень визуальных эффектов и постпродакшена'
    }
  ];

  const pricingPlans = [
    {
      name: 'БАЗОВЫЙ',
      description: 'Идеально для небольших проектов и тестирования',
      price: 'от 50 000 ₽',
      period: 'за проект',
      timeline: 'Готово за 72ч',
      savings: null,
      features: [
        '1–2 минуты готового видео',
        'Basic AI генерация',
        'Простые VFX эффекты',
        'HD качество (1080p)',
        '3 правки включены',
        'Техническая поддержка'
      ],
      popular: false
    },
    {
      name: 'ПРОФЕССИОНАЛЬНЫЙ',
      description: 'Оптимальный выбор для бизнеса и маркетинга',
      price: 'от 150 000 ₽',
      period: 'за проект',
      timeline: 'Готово за 1 неделю',
      savings: 'Экономия 50%',
      features: [
        'До 5 минут готового видео',
        'Advanced AI генерация',
        'Сложные VFX эффекты',
        '4K качество',
        'Кастомная анимация',
        'Неограниченные правки',
        'Персональный менеджер'
      ],
      popular: true
    },
    {
      name: 'ПРЕМИУМ',
      description: 'Для крупных проектов и высоких требований',
      price: 'от 300 000 ₽',
      period: 'за проект',
      timeline: 'Готово за 2 недели',
      savings: 'Экономия 60%',
      features: [
        'Неограниченная длительность',
        'Cutting-edge AI',
        'Голливудские VFX',
        '4K качество',
        'Полная кастомизация',
        'Многокамерные сцены',
        'VIP поддержка 24/7'
      ],
      popular: false
    }
  ];

  return (
    <section id="services" className="py-32">
      {/* Section content wrapper — semi-transparent "card on video" */}
      <div className="container">
        <div
          className="rounded-[2.5rem] px-6 py-12 lg:px-14 lg:py-16"
          style={{
            background: 'rgba(8,8,8,0.75)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 1px 0 rgba(255,255,255,0.05) inset, 0 48px 96px rgba(0,0,0,0.5)',
          }}
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="eyebrow mb-5 inline-flex">Наши возможности</span>
            <h2
              className="text-white mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.03em' }}
            >
              AI + VFX УСЛУГИ
            </h2>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '42rem', margin: '0 auto' }}>
              Революционные AI-технологии + профессиональные{' '}
              <span style={{ color: '#D35C00', fontWeight: 600 }}>невероятные</span>{' '}
              результаты за минимальное время
            </p>
          </div>

          {/* Advantage cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {advantages.map((adv, index) => (
              <Tilt3D
                key={index}
                className="reveal-ready h-full"
                intensity={10}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bezel-outer h-full">
                  <div className="bezel-inner p-7 text-center h-full flex flex-col" style={{ transformStyle: 'preserve-3d' }}>
                    <div
                      className="font-black mb-4"
                      style={{ fontSize: '2.5rem', letterSpacing: '-0.04em', color: '#D35C00', transform: 'translateZ(20px)' }}
                    >
                      {adv.glyph}
                    </div>
                    <h3
                      className="font-bold text-white mb-3"
                      style={{ fontSize: '0.9rem', letterSpacing: '0.1em', transform: 'translateZ(12px)' }}
                    >
                      {adv.title}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.65, flex: 1 }}>
                      {adv.description}
                    </p>
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>

          {/* Pricing header */}
          <div className="text-center mb-12">
            <div className="section-separator mb-12" />
            <span className="eyebrow mb-5 inline-flex">Тарифы</span>
            <h3
              className="text-white mb-3"
              style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}
            >
              ЦЕНОВЫЕ ПАКЕТЫ
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '30rem', margin: '0 auto', fontSize: '0.9rem' }}>
              Выберите оптимальный пакет для вашего проекта
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid lg:grid-cols-3 gap-6 mb-14">
            {pricingPlans.map((plan, index) => (
              <Tilt3D
                key={index}
                intensity={8}
              >
              <div
                className={`pricing-card ${plan.popular ? 'featured' : ''} relative reveal-ready h-full`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="eyebrow" style={{ background: 'rgba(211,92,0,0.95)', color: '#fff', border: 'none' }}>
                      ПОПУЛЯРНЫЙ ВЫБОР
                    </span>
                  </div>
                )}

                <h3
                  className="font-bold text-white mb-2"
                  style={{ fontSize: '1rem', letterSpacing: '0.1em' }}
                >
                  {plan.name}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  {plan.description}
                </p>

                <div className="mb-5">
                  <span className="price">{plan.price}</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{plan.period}</span>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-1.5 mb-3" style={{ fontSize: '0.8rem' }}>
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#D35C00' }}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-medium">{plan.timeline}</span>
                </div>

                {plan.savings && (
                  <div className="mb-5">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(106,168,79,0.15)', color: '#6AA84F', border: '1px solid rgba(106,168,79,0.25)' }}
                    >
                      {plan.savings}
                    </span>
                  </div>
                )}

                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#D35C00' }}>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={showNotification}
                  className={`w-full btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-arrow`}
                >
                  <span>Начать AI-проект</span>
                  <span className="btn-arrow-circle">↗</span>
                </button>
              </div>
              </Tilt3D>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="section-separator mb-12" />
          <div className="text-center">
            <h3 className="text-white font-bold mb-3" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
              Не можете выбрать подходящий пакет?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Получите персональную консультацию и индивидуальное предложение
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={showNotification} className="btn btn-primary btn-arrow">
                <span>Получить консультацию</span>
                <span className="btn-arrow-circle">↗</span>
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="btn btn-secondary">
                Смотреть примеры работ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;