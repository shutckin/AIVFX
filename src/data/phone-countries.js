// ── Страны для поля телефона ───────────────────────────────────────────
//
// Список намеренно статический, а не собирается из библиотеки на лету.
// Причина: страница отдаётся предзарендеренной, и всё, что появляется
// уже после её загрузки, расходится с готовой разметкой - React ругается
// и перерисовывает страницу заново. Статический список одинаков всегда.
//
// Сверху - рынки, с которыми работаем чаще всего, дальше по алфавиту.
// Коды и названия сгенерированы из таблицы libphonenumber и Intl.DisplayNames.
//
// c - код страны, d - телефонный код, ru/en - название.
export const PHONE_COUNTRIES = [
  { c: 'RU', d: '7', ru: 'Россия', en: 'Russia' },
  { c: 'KZ', d: '7', ru: 'Казахстан', en: 'Kazakhstan' },
  { c: 'BY', d: '375', ru: 'Беларусь', en: 'Belarus' },
  { c: 'AE', d: '971', ru: 'ОАЭ', en: 'United Arab Emirates' },
  { c: 'ID', d: '62', ru: 'Индонезия', en: 'Indonesia' },
  { c: 'TH', d: '66', ru: 'Таиланд', en: 'Thailand' },
  { c: 'TR', d: '90', ru: 'Турция', en: 'Türkiye' },
  { c: 'US', d: '1', ru: 'Соединенные Штаты', en: 'United States' },
  { c: 'GB', d: '44', ru: 'Великобритания', en: 'United Kingdom' },
  { c: 'DE', d: '49', ru: 'Германия', en: 'Germany' },
  { c: 'AU', d: '61', ru: 'Австралия', en: 'Australia' },
  { c: 'AT', d: '43', ru: 'Австрия', en: 'Austria' },
  { c: 'AZ', d: '994', ru: 'Азербайджан', en: 'Azerbaijan' },
  { c: 'AM', d: '374', ru: 'Армения', en: 'Armenia' },
  { c: 'BE', d: '32', ru: 'Бельгия', en: 'Belgium' },
  { c: 'BG', d: '359', ru: 'Болгария', en: 'Bulgaria' },
  { c: 'BR', d: '55', ru: 'Бразилия', en: 'Brazil' },
  { c: 'HU', d: '36', ru: 'Венгрия', en: 'Hungary' },
  { c: 'VN', d: '84', ru: 'Вьетнам', en: 'Vietnam' },
  { c: 'HK', d: '852', ru: 'Гонконг (САР)', en: 'Hong Kong SAR China' },
  { c: 'GR', d: '30', ru: 'Греция', en: 'Greece' },
  { c: 'GE', d: '995', ru: 'Грузия', en: 'Georgia' },
  { c: 'DK', d: '45', ru: 'Дания', en: 'Denmark' },
  { c: 'EG', d: '20', ru: 'Египет', en: 'Egypt' },
  { c: 'IL', d: '972', ru: 'Израиль', en: 'Israel' },
  { c: 'IN', d: '91', ru: 'Индия', en: 'India' },
  { c: 'IE', d: '353', ru: 'Ирландия', en: 'Ireland' },
  { c: 'ES', d: '34', ru: 'Испания', en: 'Spain' },
  { c: 'IT', d: '39', ru: 'Италия', en: 'Italy' },
  { c: 'CA', d: '1', ru: 'Канада', en: 'Canada' },
  { c: 'QA', d: '974', ru: 'Катар', en: 'Qatar' },
  { c: 'CY', d: '357', ru: 'Кипр', en: 'Cyprus' },
  { c: 'KG', d: '996', ru: 'Киргизия', en: 'Kyrgyzstan' },
  { c: 'CN', d: '86', ru: 'Китай', en: 'China' },
  { c: 'LV', d: '371', ru: 'Латвия', en: 'Latvia' },
  { c: 'LT', d: '370', ru: 'Литва', en: 'Lithuania' },
  { c: 'MY', d: '60', ru: 'Малайзия', en: 'Malaysia' },
  { c: 'MX', d: '52', ru: 'Мексика', en: 'Mexico' },
  { c: 'MD', d: '373', ru: 'Молдова', en: 'Moldova' },
  { c: 'NL', d: '31', ru: 'Нидерланды', en: 'Netherlands' },
  { c: 'NZ', d: '64', ru: 'Новая Зеландия', en: 'New Zealand' },
  { c: 'NO', d: '47', ru: 'Норвегия', en: 'Norway' },
  { c: 'PL', d: '48', ru: 'Польша', en: 'Poland' },
  { c: 'PT', d: '351', ru: 'Португалия', en: 'Portugal' },
  { c: 'KR', d: '82', ru: 'Республика Корея', en: 'South Korea' },
  { c: 'RO', d: '40', ru: 'Румыния', en: 'Romania' },
  { c: 'SA', d: '966', ru: 'Саудовская Аравия', en: 'Saudi Arabia' },
  { c: 'RS', d: '381', ru: 'Сербия', en: 'Serbia' },
  { c: 'SG', d: '65', ru: 'Сингапур', en: 'Singapore' },
  { c: 'SK', d: '421', ru: 'Словакия', en: 'Slovakia' },
  { c: 'SI', d: '386', ru: 'Словения', en: 'Slovenia' },
  { c: 'TJ', d: '992', ru: 'Таджикистан', en: 'Tajikistan' },
  { c: 'TW', d: '886', ru: 'Тайвань', en: 'Taiwan' },
  { c: 'UZ', d: '998', ru: 'Узбекистан', en: 'Uzbekistan' },
  { c: 'UA', d: '380', ru: 'Украина', en: 'Ukraine' },
  { c: 'PH', d: '63', ru: 'Филиппины', en: 'Philippines' },
  { c: 'FI', d: '358', ru: 'Финляндия', en: 'Finland' },
  { c: 'FR', d: '33', ru: 'Франция', en: 'France' },
  { c: 'HR', d: '385', ru: 'Хорватия', en: 'Croatia' },
  { c: 'ME', d: '382', ru: 'Черногория', en: 'Montenegro' },
  { c: 'CZ', d: '420', ru: 'Чехия', en: 'Czechia' },
  { c: 'CH', d: '41', ru: 'Швейцария', en: 'Switzerland' },
  { c: 'SE', d: '46', ru: 'Швеция', en: 'Sweden' },
  { c: 'EE', d: '372', ru: 'Эстония', en: 'Estonia' },
  { c: 'ZA', d: '27', ru: 'Южно-Африканская Республика', en: 'South Africa' },
  { c: 'JP', d: '81', ru: 'Япония', en: 'Japan' },
];

export const PHONE_COUNTRY_BY_CODE = PHONE_COUNTRIES.reduce((acc, item) => {
  acc[item.c] = item;
  return acc;
}, {});
