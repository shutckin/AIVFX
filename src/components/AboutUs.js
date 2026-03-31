import React, { useState } from 'react';
import { useNotification } from '../App';
import Tilt3D from './Tilt3D';
import Globe3D from './Globe3D';

const AboutUs = () => {
  const { show: showNotification, scrollToSection } = useNotification();
  const [openFaq, setOpenFaq] = useState(null);

  const faqData = [
    {
      question: "Какие форматы видео вы поддерживаете?",
      answer: "Мы работаем со всеми популярными форматами, а также можем адаптировать контент под любые платформы и требования."
    },
    {
      question: "Сколько времени занимает создание AI-контента?",
      answer: "В среднем создание AI-контента занимает от нескольких часов до 3 дней, в зависимости от сложности проекта. Простые ролики можем сделать за 72 часа."
    },
    {
      question: "Можете ли вы создать контент для социальных сетей?",
      answer: "Да, мы специализируемся на создании контента для всех популярных платформ: Instagram, TikTok, YouTube, Facebook и других. Адаптируем под форматы и требования каждой платформы."
    },
    {
      question: "Какова стоимость ваших услуг?",
      answer: "Стоимость зависит от сложности и объема работ. У нас есть пакеты от 50 000 рублей за базовый проект. Точную стоимость рассчитаем после обсуждения ваших задач."
    }
  ];

  const stats = [
    { number: "50+", label: "Завершенных проектов" },
    { number: "72ч", label: "Средний срок" },
    { number: "70%", label: "Экономия бюджета" },
    { number: "4K+", label: "Качество видео" }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* FAQ секция */}
          <div>
            <div className="accent-line mb-6"></div>
            <h2 className="text-4xl font-bold text-white mb-8">FAQ</h2>
            
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <div key={index} className="glass rounded-xl overflow-hidden">
                  <button
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-white/10 transition-colors duration-300"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-white pr-4">
                      {item.question}
                    </span>
                    <svg 
                      className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${
                        openFaq === index ? 'transform rotate-180' : ''
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-white/80 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* О нас секция */}
          <div>
            <div className="accent-line mb-6"></div>
            <h2 className="text-4xl font-bold text-white mb-8">
              О НАШЕЙ AI + VFX СТУДИИ
            </h2>

            {/* Globe + text row */}
            <div className="flex items-center gap-6 mb-8">
              <Globe3D size={140} className="flex-shrink-0 opacity-90" />
              <p className="text-lg text-white/80 leading-relaxed">
                Мы — пионеры в области AI-контента, объединяющие мощь искусственного интеллекта с мастерством VFX-художников.
                Наша миссия — сделать качественный видеоконтент доступным для каждого.
              </p>
            </div>

            {/* Статистики */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Tilt3D key={index} intensity={14}>
                  <div className="text-center p-6 glass rounded-xl" style={{ transformStyle: 'preserve-3d' }}>
                    <div
                      className="text-3xl font-bold text-primary mb-2"
                      style={{ transform: 'translateZ(16px)' }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-sm text-white/80 uppercase tracking-wider font-medium">
                      {stat.label}
                    </div>
                  </div>
                </Tilt3D>
              ))}
            </div>
          </div>
        </div>

        {/* Большой блок сравнения */}
        <div className="relative mb-16">
          {/* Фоновые декоративные элементы */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-red-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative glass-strong rounded-4xl p-6 lg:p-12 overflow-hidden">
            {/* Заголовок */}
            <div className="text-center mb-12">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary/20 to-red-500/20 rounded-full mb-6">
                <span className="text-primary font-bold text-sm uppercase tracking-wider">Революция в производстве</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">
                ПОЧЕМУ AI + VFX<br/>
                <span className="text-gradient bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
                  ЭТО БУДУЩЕЕ?
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-red-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
              {/* Традиционное производство */}
              <div className="relative">
                {/* Фоновая иконка */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-6 h-full">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <h3 className="text-xl font-bold text-red-400 uppercase tracking-wider">
                      Традиционное производство
                    </h3>
                  </div>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white/70 group-hover:text-white/90 transition-colors duration-300 font-medium">
                        Недели планирования
                      </span>
                    </li>
                    <li className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white/70 group-hover:text-white/90 transition-colors duration-300 font-medium">
                        Дорогое оборудование
                      </span>
                    </li>
                    <li className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white/70 group-hover:text-white/90 transition-colors duration-300 font-medium">
                        Большая съемочная группа
                      </span>
                    </li>
                    <li className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white/70 group-hover:text-white/90 transition-colors duration-300 font-medium">
                        Зависимость от погоды/локации
                      </span>
                    </li>
                    <li className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white/70 group-hover:text-white/90 transition-colors duration-300 font-medium">
                        Месяцы пост-продакшена
                      </span>
                    </li>
                  </ul>

                  {/* Статистика традиционного подхода */}
                  <div className="mt-6 pt-4 border-t border-red-500/20">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-red-500/10 rounded-xl">
                        <div className="text-2xl font-bold text-red-400">2-6</div>
                        <div className="text-xs text-white/60 uppercase">недель</div>
                      </div>
                      <div className="p-3 bg-red-500/10 rounded-xl">
                        <div className="text-2xl font-bold text-red-400">100%</div>
                        <div className="text-xs text-white/60 uppercase">стоимость</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Наш AI + VFX подход */}
              <div className="relative">
                {/* Фоновая иконка */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-3xl p-6 h-full">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <h3 className="text-xl font-bold text-primary uppercase tracking-wider">
                      НАШ AI + VFX ПОДХОД
                    </h3>
                  </div>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white group-hover:text-primary transition-colors duration-300 font-medium">
                        Часы от идеи до результата
                      </span>
                    </li>
                    <li className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white group-hover:text-primary transition-colors duration-300 font-medium">
                        Компьютер и талантливый подход
                      </span>
                    </li>
                    <li className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white group-hover:text-primary transition-colors duration-300 font-medium">
                        Команда из 2-3 специалистов
                      </span>
                    </li>
                    <li className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white group-hover:text-primary transition-colors duration-300 font-medium">
                        Любые локации и условия
                      </span>
                    </li>
                    <li className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white group-hover:text-primary transition-colors duration-300 font-medium">
                        Мгновенные правки
                      </span>
                    </li>
                  </ul>

                  {/* Статистика AI подхода */}
                  <div className="mt-6 pt-4 border-t border-primary/20">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <div className="text-2xl font-bold text-primary">1-5</div>
                        <div className="text-xs text-white/60 uppercase">дней</div>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <div className="text-2xl font-bold text-primary">30%</div>
                        <div className="text-xs text-white/60 uppercase">стоимость</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Декоративные элементы */}
            <div className="absolute top-8 left-8 w-2 h-2 bg-primary rounded-full animate-ping"></div>
            <div className="absolute bottom-8 right-8 w-2 h-2 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 