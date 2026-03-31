import React from 'react';
import { useNotification } from '../App';

const Footer = () => {
  const { showPrivacy } = useNotification();
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigation = [
    { id: 'hero', label: 'Главная' },
    { id: 'about', label: 'О нас' },
    { id: 'services', label: 'Услуги' },
    { id: 'portfolio', label: 'Портфолио' },
    { id: 'clients', label: 'Клиенты' },
    { id: 'contact', label: 'Контакты' }
  ];

  const services = [
    'AI + VFX Контент',
    'Вирусные ролики',
    'Рекламные видео',
    'Продуктовые демо',
    'Социальные сети',
    'Адаптации форматов'
  ];

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      value: "info@aivfx.ru",
      link: "mailto:info@aivfx.ru"
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Логотип и описание */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-gradient">AIVFX</span>
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Революционная AI + VFX студия для создания вирусного контента. 
              Быстрее, дешевле, качественнее традиционного производства.
            </p>
            <div className="flex space-x-4">
              <a 
                href="tg://resolve?domain=aivfx"
                className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white hover-lift"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.48.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.178.164.172.213.421.227.592.007.096-.001.234-.003.325z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">
              Навигация
            </h4>
            <nav className="space-y-3">
              {navigation.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block text-gray-300 hover:text-white transition-colors duration-300 text-left"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Услуги */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">
              Наши услуги
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 hover:text-white transition-colors duration-300">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">
              Контакты
            </h4>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="text-primary mt-1">
                    {contact.icon}
                  </div>
                  <div>
                    {contact.link ? (
                      <a 
                        href={contact.link}
                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-gray-300 text-sm whitespace-pre-line">
                        {contact.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2026 AIVFX. Все права защищены.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <button 
                onClick={showPrivacy}
                className="hover:text-white transition-colors duration-300"
              >
                Политика конфиденциальности
              </button>
              <a 
                href="/terms-of-service" 
                className="hover:text-white transition-colors duration-300"
              >
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 