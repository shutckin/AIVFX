import React, { useState } from 'react';
import { useNotification } from '../App';



const ContactForm = () => {
  const { showSuccess } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false); // Временно убираем
  const [phoneError, setPhoneError] = useState('');

  // Функция для форматирования номера телефона
  const formatPhoneNumber = (value) => {
    // Удаляем все символы кроме цифр
    const phoneNumber = value.replace(/\D/g, '');
    
    // Если номер начинается с 8, заменяем на 7
    let formattedNumber = phoneNumber;
    if (formattedNumber.startsWith('8')) {
      formattedNumber = '7' + formattedNumber.slice(1);
    }
    
    // Добавляем +7 если номер начинается с 7 и имеет 11 цифр
    if (formattedNumber.startsWith('7') && formattedNumber.length === 11) {
      const digits = formattedNumber.slice(1);
      return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`;
    }
    
    // Если номер начинается с других цифр, форматируем как есть
    if (formattedNumber.length >= 10) {
      if (formattedNumber.length === 10) {
        return `(${formattedNumber.slice(0, 3)}) ${formattedNumber.slice(3, 6)}-${formattedNumber.slice(6, 8)}-${formattedNumber.slice(8, 10)}`;
      } else if (formattedNumber.length === 11 && !formattedNumber.startsWith('7')) {
        return `+${formattedNumber.slice(0, 1)} (${formattedNumber.slice(1, 4)}) ${formattedNumber.slice(4, 7)}-${formattedNumber.slice(7, 9)}-${formattedNumber.slice(9, 11)}`;
      }
    }
    
    return value;
  };

  // Функция для валидации номера телефона
  const validatePhoneNumber = (phone) => {
    // Удаляем все символы кроме цифр
    const phoneNumber = phone.replace(/\D/g, '');
    
    // Проверяем российские номера (начинаются с 7 или 8, всего 11 цифр)
    if (phoneNumber.length === 11 && (phoneNumber.startsWith('7') || phoneNumber.startsWith('8'))) {
      const code = phoneNumber.slice(1, 4);
      // Проверяем валидные коды российских операторов
      const validCodes = [
        '900', '901', '902', '903', '904', '905', '906', '908', '909', // МТС
        '910', '911', '912', '913', '914', '915', '916', '917', '918', '919', // МТС
        '920', '921', '922', '923', '924', '925', '926', '928', '929', // МТС/Мегафон
        '930', '931', '932', '933', '934', '936', '937', '938', '939', // Мегафон
        '950', '951', '952', '953', '958', '960', '961', '962', '963', '964', '965', '966', '967', '968', '969', // Билайн
        '970', '971', '977', '978', '980', '981', '982', '983', '984', '985', '986', '987', '988', '989', '991', '992', '993', '994', '995', '996', '997', '999' // Билайн/Теле2
      ];
      
      if (validCodes.includes(code)) {
        return { isValid: true, message: '' };
      } else {
        return { isValid: false, message: 'Неверный код оператора' };
      }
    }
    
    // Проверяем международные номера (от 10 до 15 цифр)
    if (phoneNumber.length >= 10 && phoneNumber.length <= 15) {
      return { isValid: true, message: '' };
    }
    
    // Если номер не подходит под критерии
    if (phoneNumber.length > 0 && phoneNumber.length < 10) {
      return { isValid: false, message: 'Номер слишком короткий' };
    }
    
    if (phoneNumber.length > 15) {
      return { isValid: false, message: 'Номер слишком длинный' };
    }
    
    return { isValid: true, message: '' };
  };

  const handleInputChange = (field, value) => {
    if (field === 'phone') {
      // Ограничиваем ввод только цифрами, пробелами, скобками, плюсом и дефисами
      const cleanValue = value.replace(/[^\d\s()\-+]/g, '');
      const formattedPhone = formatPhoneNumber(cleanValue);
      
      // Валидация номера
      const validation = validatePhoneNumber(formattedPhone);
      setPhoneError(validation.message);
      
      setFormData(prev => ({
        ...prev,
        [field]: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Дополнительная проверка телефона перед отправкой
    if (formData.phone) {
      const validation = validatePhoneNumber(formData.phone);
      if (!validation.isValid) {
        setPhoneError(validation.message);
        return;
      }
    }
    
    setIsSubmitting(true);

    try {
      console.log('🚀 Начинаю отправку формы...', formData);
      
      // Отправляем в Telegram бот
      await sendToTelegram(formData);
      
      console.log('✅ Данные отправлены в Telegram');
      console.log('🎉 Заявка успешно отправлена!');
      
    } catch (error) {
      console.error('❌ Ошибка отправки формы:', error);
    }
    
    setIsSubmitting(false);
    showSuccess();
    
    // Сброс формы
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
    setPhoneError('');
  };

  // Функция отправки в Telegram бот
  const sendToTelegram = async (data) => {
    try {
      const telegramBotToken = '8297016787:AAEUvRbfSs5mLngtmoiFvGOIQnKZltU3zGY'; // Токен бота
      const telegramChatId = '572494981'; // Chat ID
      
      if (telegramBotToken && telegramChatId) {
        console.log('📱 Отправляю в Telegram...');
        
        // Создаем текстовое сообщение
        const message = `🎬 НОВАЯ ЗАЯВКА С САЙТА VFX STUDIO

👤 Имя: ${data.name}
📧 Email: ${data.email}
📞 Телефон: ${data.phone}
🏢 Компания: ${data.company || 'Не указано'}
💬 Сообщение: ${data.message}`;

        // Отправляем текстовое сообщение
        const textResponse = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: message,
            parse_mode: 'HTML'
          })
        });
        
        if (textResponse.ok) {
          console.log('✅ Сообщение отправлено в Telegram');
        } else {
          console.error('❌ Ошибка отправки сообщения:', await textResponse.text());
        }
        
      } else {
        console.log('⚠️ Telegram токены не настроены, пропускаю отправку');
      }
    } catch (error) {
      console.error('❌ Ошибка отправки в Telegram:', error);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      value: "info@aivfx.ru",
      link: "mailto:info@aivfx.ru"
    }
  ];

  const socialLinks = [
    {
      name: "Telegram",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.48.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.178.164.172.213.421.227.592.007.096-.001.234-.003.325z"/>
        </svg>
      ),
      url: "tg://resolve?domain=aivfx"
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <div className="accent-line mx-auto mb-6"></div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Свяжитесь с нами
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Оставьте заявку, и мы свяжемся с вами в течение 24 часов для обсуждения вашего проекта
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Форма */}
          <div className="card">
            <h3 className="text-2xl font-bold text-white mb-8">Отправить заявку</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Имя */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Введите ваше имя"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="your@email.com"
                />
              </div>

              {/* Телефон */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${
                    phoneError 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-white/20 focus:ring-primary'
                  }`}
                  placeholder="+7 (999) 123-45-67"
                />
                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
              </div>

              {/* Компания */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                  Компания
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Название вашей компании"
                />
              </div>

              {/* Сообщение */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                  Расскажите о проекте *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none backdrop-blur-sm"
                  placeholder="Опишите ваш проект, задачи и пожелания..."
                />
              </div>

              {/* Кнопка отправки */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-white/20 cursor-not-allowed' 
                    : 'btn-primary'
                } ${!isSubmitting ? 'hover:shadow-lg transform hover:-translate-y-1' : ''}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    <span>Отправка...</span>
                  </div>

                ) : (
                  'Отправить заявку'
                )}
              </button>
            </form>
          </div>

          {/* Контактная информация */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Контактная информация</h3>
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">{contact.title}</h4>
                      {contact.link ? (
                        <a 
                          href={contact.link}
                          className="text-white/70 hover:text-primary transition-colors duration-300"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-white/70 whitespace-pre-line">{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Соцсети */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Мы в социальных сетях</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary/80 transition-colors duration-300 hover:scale-110 transform"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Время работы */}
            <div className="glass rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Время работы</h4>
              <div className="space-y-2 text-white/70">
                <div className="flex justify-between">
                  <span>Понедельник - Пятница:</span>
                  <span className="font-medium text-white">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Суббота:</span>
                  <span className="font-medium text-white">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Воскресенье:</span>
                  <span className="font-medium text-white">Выходной</span>
                </div>
              </div>
            </div>

            {/* Быстрая связь */}
            <div className="bg-gradient-to-r from-primary to-red-600 text-white rounded-xl p-6">
              <h4 className="text-xl font-bold mb-2">Нужна срочная консультация?</h4>
              <p className="mb-4 opacity-90">Напишите нам в Telegram для быстрого ответа</p>
              <a 
                href="tg://resolve?domain=aivfx"
                className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.48.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.178.164.172.213.421.227.592.007.096-.001.234-.003.325z"/>
                </svg>
                <span>Написать в Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 