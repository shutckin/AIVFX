// AIVFX content data — all text and project data

export const PROJECTS = [
  { id: 1, title: "Porsche 911 Turbo S", cat: "Автомобили", tech: "AI", desc: "Полностью AI-сгенерированная реклама премиального автомобиля с фотореалистичными эффектами.", thumb: "/thumbnails/porsche.jpg", duration: "0:35", views: "5.8M", time: "8 дней", year: "2026" },
  { id: 11, title: "Автопрограмма NL", cat: "Автомобили", tech: "AI+VFX", desc: "Комбинированный AI + VFX проект с генерацией сцен и постобработкой.", thumb: "/thumbnails/NL2.jpg", duration: "0:30", views: "820K", time: "7 дней", year: "2026" },
  { id: 2, title: "Rolex — стенд", cat: "Продукты", tech: "VFX", desc: "VFX ролик премиальных часов для демонстрации на рекламном стенде.", thumb: "/thumbnails/rolex.jpg", duration: "0:25", views: "340K", time: "10 дней", year: "2026" },
  { id: 3, title: "Dyson Supersonic", cat: "Продукты", tech: "VFX", desc: "Инновационная презентация бытовой техники с AI-визуализацией.", thumb: "/thumbnails/dyson.jpg", duration: "0:45", views: "1.2M", time: "6 дней", year: "2025" },
  { id: 4, title: "House Визуализация", cat: "Архитектура", tech: "AI", desc: "Современная архитектурная презентация дома с AI-генерацией окружения.", thumb: "/thumbnails/house.jpg", duration: "0:50", views: "150K", time: "24 часа", year: "2025" },
  { id: 5, title: "YallaMarket", cat: "Продукты", tech: "VFX", desc: "VFX интеграция 3D элементов и эффектов для рекламы маркетплейса.", thumb: "/thumbnails/museum.jpg", duration: "0:20", views: "400K", time: "6 дней", year: "2025" },
  { id: 6, title: "Deepfake демо", cat: "Социальное", tech: "AI", desc: "Демонстрация возможностей AI в создании реалистичных цифровых персонажей.", thumb: "/thumbnails/deepfake.jpg", duration: "1:30", views: "2.4M", time: "4 дня", year: "2026" },
  { id: 7, title: "Runway Shortfilm", cat: "Социальное", tech: "AI", desc: "Экологический фильм о загрязнении морей, созданный с помощью AI.", thumb: "/thumbnails/Runway.jpg", duration: "2:45", views: "120K", time: "72 часа", year: "2025" },
  { id: 8, title: "Danube Properties", cat: "Архитектура", tech: "VFX", desc: "VFX интеграция архитектурных элементов для презентации ЖК.", thumb: "/thumbnails/danube.jpg", duration: "0:40", views: "90K", time: "7 дней", year: "2025" },
  { id: 9, title: "Очиститель воздуха", cat: "Продукты", tech: "VFX", desc: "VFX интеграция 3D моделей с реалистичным композитингом.", thumb: "/thumbnails/synr.jpg", duration: "0:20", views: "700K", time: "4 дня", year: "2026" },
  { id: 10, title: "Sacr — Fashion Reel", cat: "Продукты", tech: "AI", desc: "Стильный рилс для модного бренда с AI-моделями и виртуальной одеждой.", thumb: "/thumbnails/sacr.jpg", duration: "0:15", views: "400K", time: "48 часов", year: "2026" },
  { id: 12, title: "Недвижка — рендер→видео", cat: "Архитектура", tech: "AI", desc: "AI генерация архитектурного видео на основе статичных рендеров.", thumb: "/thumbnails/недвижка.jpg", duration: "2:30", views: "80K", time: "24 часа", year: "2025" }
];

export const CATEGORIES = ["Все", "Автомобили", "Продукты", "Социальное", "Архитектура"];

export const SERVICES = [
  { num: "S/01", glyph: "∆", title: "AI-генерация видео", desc: "Полный цикл создания рекламных роликов из промптов и референсов. От идеи до 4K-финала." },
  { num: "S/02", glyph: "○", title: "VFX и композитинг", desc: "Голливудский уровень визуальных эффектов, 3D-интеграция и пост-продакшен." },
  { num: "S/03", glyph: "◇", title: "Гибрид AI + VFX", desc: "Комбинация алгоритмов и ручной работы художников — лучшее из двух миров." },
  { num: "S/04", glyph: "⌒", title: "Адаптация форматов", desc: "Один ролик — десять площадок. Reels, TikTok, YouTube, телевизионный хронометраж." },
  { num: "S/05", glyph: "∇", title: "Продуктовые демо", desc: "Фотореалистичные продуктовые ролики без съёмочной группы и логистики." },
  { num: "S/06", glyph: "✕", title: "Виртуальные персонажи", desc: "Цифровые актёры, deepfake-технологии и анимация лиц на уровне прод-студии." }
];


export const STATS = [
  { v: "50", u: "+", l: "Проектов сдано" },
  { v: "72", u: "ч", l: "Средний срок" },
  { v: "70", u: "%", l: "Экономия бюджета" },
  { v: "4K", u: "+", l: "Качество видео" }
];


export const TESTIMONIALS = [
  {
    id: 1, name: "Алексей Морозов", role: "Рук. цифровых проектов, Audi Россия",
    text: "Команда буквально прочувствовала наш продукт — за 5 дней ребята создали главный ролик и четыре адаптации. Каждый формат получился живым: видно, что не просто монтировали кадры, а вкладывали идею и эмоции.",
    project: "Главный ролик + 4 адаптации", featured: false
  },
  {
    id: 2, name: "Ксения Шеина", role: "Креативный продюсер, NL International",
    text: "Сотрудничаю с продакшеном на постоянной основе. Всегда комфортная коммуникация, идеально структурированные процессы и супер качество на выходе. Отдельный кайф — ролики с помощью AI: формат экономит невероятное время и бюджет.",
    project: "Постоянное сотрудничество", featured: true
  }
];

export const CLIENTS = ["AUDI", "CINQUE", "PORSCHE", "DYSON", "DEHANCER", "DANUBE", "NL INT.", "WHITEWILL"];

export const COMPARE_OLD = ["Недели планирования", "Дорогое оборудование", "Большая съёмочная группа", "Зависимость от погоды / локации", "Месяцы пост-продакшена"];
export const COMPARE_NEW = ["Часы от идеи до результата", "Компьютер и креативный подход", "Команда 2–3 специалиста", "Любые локации и условия", "Мгновенные правки"];

export const BUDGETS = ["< 100K ₽", "100–300K ₽", "300K–1M ₽", "> 1M ₽", "Обсудим"];

