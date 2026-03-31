import React, { useState } from 'react';
import { useNotification } from '../App';

const Portfolio = () => {
  const { show: showNotification } = useNotification();
  // const [activeFilter, setActiveFilter] = useState('Все'); // Убрано - не используется

  const projects = [
    {
      id: 1,
      title: "Реклама Porsche 911", 
      category: "Автомобили",
      technology: "AI",
      description: "Полностью AI-сгенерированная реклама премиального автомобиля с фотореалистичными эффектами",
      video: "/fixed/porsh.mp4",
      duration: "0:35",
      views: "5.8M",
      time: "8 дней"
    },
    {
      id: 11,
      title: "Промо автопрограммы NL",
      category: "Автомобили",
      technology: "AI",
      combinedTech: true,
      description: "Комбинированный AI + VFX проект для автомобильной программы NL с генерацией сцен и постобработкой",
      video: "/fixed/NL2.mp4",
      duration: "0:30",
      time: "7 дней"
    },
    {
      id: 2,
      title: "Ролик Rolex для стенда",
      category: "Продукты",
      technology: "VFX",
      description: "VFX ролик премиальных часов Rolex для демонстрации на рекламном стенде с детализированными материалами",
      video: "/fixed/rolex.mp4",
      duration: "0:25",
      time: "10 дней"
    },
    {
      id: 3,
      title: "Реклама Dyson",
      category: "Продукты",
      technology: "VFX",
      description: "Инновационная презентация бытовой техники с AI-визуализацией технологий",
      video: "/fixed/dyson.mp4",
      duration: "0:45",
      time: "6 дней"
    },
    {
      id: 4,
      title: "Архитектурная визуализация",
      category: "Архитектура",
      technology: "AI",
      description: "Современная архитектурная презентация дома с AI-генерацией окружения",
      video: "/fixed/house.mp4",
      duration: "0:50",
      views: "150K",
      time: "24 часа"
    },
    {
      id: 5,
      title: "Реклама YallaMarket",
      category: "Продукты",
      technology: "VFX",
      description: "VFX интеграция 3D элементов и эффектов в отснятое видео для рекламы маркетплейса",
      video: "/fixed/museum.mp4",
      duration: "0:20",
      views: "400K",
      time: "6 дней"
    },
    {
      id: 6,
      title: "Deepfake технологии",
      category: "Социальное",
      technology: "AI",
      description: "Демонстрация возможностей AI в создании реалистичных цифровых персонажей",
      video: "/fixed/deepfake.mp4",
      duration: "1:30",
      time: "4 дня"
    },
    {
      id: 7,
      title: "Короткометражный фильм",
      category: "Социальное",
      technology: "AI",
      description: "Экологический фильм о загрязнении морей и океанов, созданный с помощью AI технологий",
      video: "/fixed/Runway.mp4",
      duration: "2:45",
      views: "120K",
      time: "72 часа"
    },
    {
      id: 8,
      title: "Реклама для застройщика Danube",
      category: "Архитектура",
      technology: "VFX",
      description: "VFX интеграция архитектурных элементов и анимация для презентации жилого комплекса",
      video: "/fixed/danube.mp4",
      duration: "0:40",
      time: "7 дней"
    },
    {
      id: 9,
      title: "Реклама очистителя",
      category: "Продукты",
      technology: "VFX",
      description: "VFX интеграция 3D моделей и эффектов в отснятое видео с реалистичным композитингом",
      video: "/fixed/synr.mp4",
      duration: "0:20",
      views: "700K",
      time: "4 дня"
    },
    {
      id: 10,
      title: "Рилс для бренда одежды",
      category: "Продукты", 
      technology: "AI",
      description: "Стильный рилс для модного бренда с AI-сгенерированными моделями и виртуальной одеждой",
      video: "/fixed/sacr.mp4",
      duration: "0:15",
      views: "400K",
      time: "48 часов"
    },
    {
      id: 12,
      title: "Архитектурное видео из рендеров",
      category: "Архитектура",
      technology: "AI",
      description: "AI генерация архитектурного видео на основе статичных рендеров недвижимости",
      video: "/fixed/недвижка.mp4",
      duration: "2:30",
      views: "80K",
      time: "24 часа"
    }
  ];

  const categories = ["Все", "Автомобили", "Продукты", "Социальное", "Архитектура"];
  const [activeCategory, setActiveCategory] = useState("Все");

  const filteredProjects = activeCategory === "Все" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-20">
      <div className="container">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <div className="accent-line mx-auto mb-6"></div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            ПОРТФОЛИО
          </h2>
          <p className="text-xl text-white/80 max-w-4xl mx-auto">
            Портфолио проектов, демонстрирующих наш опыт в создании визуального контента с помощью AI и VFX
          </p>
        </div>

        {/* Фильтры категорий */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-lg'
                  : 'glass text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Сетка проектов */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="card group cursor-pointer"
              onClick={() => showNotification()}
            >
              {/* Превью изображения */}
              <div className="relative overflow-hidden rounded-xl mb-6">
                <video
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  controls={false}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  onLoadedMetadata={() => console.log('✅ Video metadata loaded:', project.video)}
                  onCanPlay={() => console.log('✅ Video can play:', project.video)}
                  onError={(e) => console.error('❌ Video error:', project.video, e.target.error)}
                >
                  <source src={project.video} type="video/mp4" />
                  <p>Ваш браузер не поддерживает видео.</p>
                </video>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-white font-semibold">Заказать проект</span>
                  </div>
                </div>
                
                {/* Статистики на превью */}
                <div className="absolute top-4 right-4 glass-light rounded-lg px-3 py-1">
                  <span className="text-white text-sm font-medium">{project.duration}</span>
                </div>
                <div className="absolute top-4 left-4">
                  {project.combinedTech ? (
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-500 text-white">
                        AI
                      </span>
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-pink-500 text-white">
                        VFX
                      </span>
                    </div>
                  ) : (
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      project.technology === 'AI' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-pink-500 text-white'
                    }`}>
                      {project.technology}
                    </span>
                  )}
                </div>
                {project.views && (
                  <div className="absolute bottom-4 left-4 glass-light rounded-lg px-3 py-1">
                    <span className="text-white text-sm font-medium">{project.views} просмотров</span>
                  </div>
                )}
              </div>

              {/* Информация о проекте */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <div className="flex items-center space-x-1 text-green-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-white">{project.time}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-white/70 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Конец контейнера проектов */}
      </div>

        {/* CTA секция удалена по просьбе клиента */}

      {/* Модальное окно проекта */}
      {/* The modal is removed as per the edit hint. */}
    </section>
  );
};

export default Portfolio; 