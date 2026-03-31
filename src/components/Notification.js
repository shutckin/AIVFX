import React, { useEffect, useState } from 'react';
import { useNotification } from '../App';

const Notification = () => {
  const { showNotification, isNotificationAnimating, hide, showSuccess } = useNotification();
  const [formData, setFormData] = useState({
    phone: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const closeNotification = () => {
    hide();
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

    // Имитация отправки формы
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setFormData({ phone: '', name: '' });
    setPhoneError('');
    showSuccess();
  };

  const handleBackdropClick = (e) => {
    // Закрываем при клике вне модального окна
    if (e.target === e.currentTarget) {
      closeNotification();
    }
  };

  if (!showNotification) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ${
        isNotificationAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <div className={`relative bg-white/90 backdrop-blur-2xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/60 transform transition-all duration-300 ${
        isNotificationAnimating ? 'scale-100' : 'scale-95'
      }`}>
        {/* Кнопка закрытия */}
        <button 
          onClick={closeNotification}
          className="absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Заголовок */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ОСТАВЬТЕ НОМЕР
          </h3>
          <p className="text-gray-700 leading-relaxed">
            либо свяжитесь с нами в телеграм,<br />
            чтобы обсудить возможности сотрудничества!
          </p>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
              placeholder="+7 (999) 123-45-67"
              className={`w-full px-4 py-3 rounded-xl border bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-500 ${
                phoneError 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-primary'
              }`}
            />
            {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
          </div>
          
          <div>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              placeholder="Ваше имя"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg transform hover:scale-105'
            }`}
          >
            {isSubmitting ? 'Отправка...' : 'Получить консультацию'}
          </button>
        </form>

        {/* Контакты */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm mb-4">
            Или свяжитесь с нами напрямую:
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://t.me/aivfx"
              className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.48.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.178.164.172.213.421.227.592.007.096-.001.234-.003.325z"/>
              </svg>
              <span className="text-sm text-blue-700">Telegram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification; 