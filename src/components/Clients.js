import React from 'react';
import { useNotification } from '../App';
import LazyImage from './LazyImage';
import Tilt3D from './Tilt3D';

// Импорт логотипов
import AudiLogo from '../assets/images/Audi Logo SVG.svg';
import DanubeLogo from '../assets/images/Danube Properties Logo.png';
import DehancerLogo from '../assets/images/Dehancer Logo.png';
import DysonLogo from '../assets/images/Dyson Logo.png';
import KiaLogo from '../assets/images/KIA Logo 3.png';
import NLLogo from '../assets/images/NL LOGO.png';
import PorscheLogo from '../assets/images/Porsche Logo.svg';
import WhitewillLogo from '../assets/images/Whitewill Dubai Logo.svg';

const Clients = () => {
  const { show: showNotification } = useNotification();

  const testimonials = [
    {
      id: 1,
      name: "Алексей Морозов",
      position: "Руководитель цифровых проектов, Audi Россия",
      avatar: "АМ",
      rating: 5,
      text: "Команда буквально прочувствовала наш продукт — за 5 дней они создали главный ролик и четыре адаптации для Instagram, YouTube, TikTok и сайта. Каждый формат получился живым и душевным: видно, что ребята не просто монтировали кадры, а вкладывали идею и эмоции. Работать с AIVFX оказалось так же приятно, как водить наш e‑tron: чётко и комфортно! Огромное спасибо за креатив и энергию!",
      featured: false,
      project: "Главный ролик + 4 адаптации за 5 дней"
    },
    {
      id: 2,
      name: "Ксения Шеина",
      position: "Креативный продюсер NL International",
      avatar: "КШ",
      rating: 5,
      text: "Сотрудничаю с продакшеном на постоянной основе. Всегда комфортная коммуникация, идеально структурированные процессы и как итог — супер качество на выходе. Отдельный кайф — ролики, сделанные с помощью AI. Этот формат позволяет реализовать самые смелые творческие решения и просто невероятно экономит время и бюджет.",
      featured: true,
      project: "Постоянное сотрудничество"
    }
  ];

  const logoCls = "h-20 w-auto object-contain filter brightness-0 invert";

  const clients = [
    { name: 'AUDI', logo: (<div className="w-full h-full glass rounded-xl p-6 flex items-center justify-center"><LazyImage src={AudiLogo} alt="AUDI" className="h-28 w-auto object-contain filter brightness-0 invert" /></div>) },
    { name: 'KIA', logo: (<div className="w-full h-full glass rounded-xl p-6 flex items-center justify-center"><LazyImage src={KiaLogo} alt="KIA" className={logoCls} /></div>) },
    { name: 'PORSCHE', logo: (<div className="w-full h-full glass rounded-xl p-6 flex items-center justify-center"><LazyImage src={PorscheLogo} alt="PORSCHE" className={logoCls} /></div>) },
    { name: 'DYSON', logo: (<div className="w-full h-full glass rounded-xl p-6 flex items-center justify-center"><LazyImage src={DysonLogo} alt="DYSON" className={logoCls} /></div>) },
    { name: 'DEHANCER', logo: (<div className="w-full h-full glass rounded-xl p-6 flex items-center justify-center"><LazyImage src={DehancerLogo} alt="DEHANCER" className={logoCls} /></div>) },
    { name: 'DANUBE PROPERTIES', logo: (<div className="w-full h-full glass rounded-xl p-6 flex items-center justify-center"><LazyImage src={DanubeLogo} alt="DANUBE PROPERTIES" className={logoCls} /></div>) },
    { name: 'NL', logo: (<div className="w-full h-full glass rounded-xl p-0 flex items-center justify-center"><LazyImage src={NLLogo} alt="NL" className="w-full h-full object-contain filter brightness-0 invert" /></div>) },
    { name: 'WHITEWILL', logo: (<div className="w-full h-full glass rounded-xl p-6 flex items-center justify-center"><LazyImage src={WhitewillLogo} alt="WHITEWILL" className={logoCls} /></div>) }
  ];

  return (
    <section id="clients" className="py-20">
      <div className="container">
        {/* Отзывы */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {testimonials.map((testimonial) => (
            <Tilt3D key={testimonial.id} intensity={7}>
            <div
              className={`relative p-8 rounded-3xl h-full transition-all duration-300 ${
                testimonial.featured
                  ? 'bg-primary text-white'
                  : 'bg-white/10 backdrop-blur-20 border border-white/20 text-white'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Кавычки */}
              <div className={`text-6xl font-serif mb-4 ${
                testimonial.featured ? 'text-white/30' : 'text-primary'
              }`}>
                "
              </div>

              {/* Проект бейдж */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-6 ${
                testimonial.featured 
                  ? 'bg-white/20 text-white' 
                  : 'bg-primary/20 text-primary'
              }`}>
                ⚡ {testimonial.project}
              </div>

              {/* Текст отзыва */}
              <p className="text-lg leading-relaxed mb-8 font-medium">
                {testimonial.text}
              </p>
              
              {/* Автор */}
              <div className="flex items-center space-x-4">
                <div>
                  <div className={`font-bold text-lg ${
                    testimonial.featured ? 'text-white' : 'text-white'
                  }`}>
                    {testimonial.name}
                  </div>
                  <div className={`text-sm ${
                    testimonial.featured ? 'text-white/80' : 'text-white/70'
                  }`}>
                    {testimonial.position}
                  </div>
                </div>
              </div>
            </div>
            </Tilt3D>
          ))}
        </div>

        {/* CTA секция после отзывов */}
        <div className="text-center mb-20">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Хотите получить такой же результат как у них?
            </h3>
            <p className="text-white/80 mb-6">
              Нажмите на кнопку и узнайте о сроках и стоимости вашего проекта
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={showNotification}
                className="btn btn-primary"
              >
                Связаться с нами
              </button>
              <button 
                onClick={showNotification}
                className="btn btn-secondary"
              >
                Узнать о сроках
              </button>
            </div>
          </div>
        </div>

        {/* Секция скорости */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative">
            <div className="aspect-[4/3] glass rounded-3xl shadow-custom-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 glass-strong rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-primary mb-2">Молниеносная скорость</p>
                  <p className="text-sm text-white/80 mb-6">От идеи до результата</p>
                  
                  {/* Временная шкала процесса */}
                  <div className="flex items-center justify-center space-x-4 max-w-sm mx-auto">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mb-1">
                        <span className="text-xs font-bold text-primary">💡</span>
                      </div>
                      <div className="text-xs text-white/70">Идея</div>
                      <div className="text-xs font-semibold text-primary">30м</div>
                    </div>
                    
                    <div className="w-6 h-0.5 bg-primary/30"></div>
                    
                    <div className="text-center">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mb-1">
                        <span className="text-xs font-bold text-primary">🤖</span>
                      </div>
                      <div className="text-xs text-white/70">AI</div>
                      <div className="text-xs font-semibold text-primary">6ч</div>
                    </div>
                    
                    <div className="w-6 h-0.5 bg-primary/30"></div>
                    
                    <div className="text-center">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mb-1">
                        <span className="text-xs font-bold text-primary">🎨</span>
                      </div>
                      <div className="text-xs text-white/70">VFX</div>
                      <div className="text-xs font-semibold text-primary">2ч</div>
                    </div>
                    
                    <div className="w-6 h-0.5 bg-primary/30"></div>
                    
                    <div className="text-center">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mb-1">
                        <span className="text-xs font-bold text-primary">✨</span>
                      </div>
                      <div className="text-xs text-white/70">Готово</div>
                      <div className="text-xs font-semibold text-primary">8ч</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 glass rounded-2xl shadow-lg p-4 animate-float">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10x</div>
                <div className="text-xs text-white/70">быстрее</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 glass rounded-2xl shadow-lg p-4 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">70%</div>
                <div className="text-xs text-white/70">экономия</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white">
              ПРОЕКТЫ<br />
              <span className="text-primary">В КРАТЧАЙШИЕ СРОКИ</span>
            </h2>
            
            <div className="accent-line"></div>
            
            <p className="text-lg text-white/80 leading-relaxed">
              Наши клиенты получают готовые проекты в рекордные сроки. 
              AI-технологии позволяют нам создавать контент за часы, а не недели.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 glass rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <span className="font-medium text-white/90">Серии роликов за дни, а не месяцы</span>
              </div>
              
              <div className="flex items-center space-x-3 p-4 glass rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <span className="font-medium text-white/90">Адаптации под все форматы за часы</span>
              </div>
              
              <div className="flex items-center space-x-3 p-4 glass rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <span className="font-medium text-white/90">Правки и изменения в реальном времени</span>
              </div>
            </div>

            <button className="btn btn-primary">
              Узнать о сроках
            </button>
          </div>
        </div>

        {/* Логотипы клиентов */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Нам доверяют
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clients.map((client, index) => (
              <div key={index} className="group">
                <div className="h-32 transition-all duration-300 hover:scale-105">
                  {client.logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients; 