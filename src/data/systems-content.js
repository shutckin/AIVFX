// ═══════════════════════════════════════════════════════════════════════
// AIVFX AI SYSTEMS - весь контент нового позиционирования.
// Двуязычные поля - объекты { ru, en }; в компонентах выбираются через
// pick(locale, obj) из src/i18n.js.
// Здесь НЕТ выдуманных достижений: кейсы помечены isDemo и показываются
// как демо-сценарии, пока не заменим реальными.
// ═══════════════════════════════════════════════════════════════════════

// ── Навигация ──────────────────────────────────────────────────────────
export const NAV_SYS = [
  { id: 'services', label: { ru: 'Услуги', en: 'Services' } },
  // Обучение есть только в русском меню: секции и страниц на английском
  // нет намеренно, занятия ведутся по-русски
  { id: 'training', label: { ru: 'Обучение' }, ruOnly: true },
  { id: 'cases', label: { ru: 'Кейсы', en: 'Cases' } },
  { id: 'approach', label: { ru: 'Подход', en: 'Approach' } },
  { id: 'about', label: { ru: 'О нас', en: 'About' } },
];
// Кнопка «Блог» и CTA «Связаться» добавляются в Header отдельно.

// ── Hero ───────────────────────────────────────────────────────────────
export const HERO_SYS = {
  kicker: { ru: 'AI-СИСТЕМЫ ДЛЯ БИЗНЕСА', en: 'AI SYSTEMS FOR BUSINESS' },
  // Заголовок построчно: [строка1, строка2-акцент, строка3]
  titleLines: {
    ru: ['AI-системы, которые', 'возвращают клиентов', 'и экономят часы работы'],
    en: ['AI systems that', 'win customers back', 'and save hours of work'],
  },
  accentLineIndex: 1, // какая строка подсвечивается акцентом
  sub: {
    ru: 'Для клиник, недвижимости и сервисного бизнеса с потоком заявок: система отвечает клиенту за секунды, доводит до записи и фиксирует каждое обращение в CRM - 24/7.',
    en: 'For clinics, real estate and service businesses with inquiry flow: the system replies in seconds, drives bookings and logs every lead in the CRM - 24/7.',
  },
  // Оффер под кнопками - главный крючок
  offer: {
    ru: 'Ответ с архитектурой решения - в течение 24 часов',
    en: 'A solution architecture in reply - within 24 hours',
  },
  // Строка-отличие от чат-бот агентств
  diff: {
    ru: 'Не чат-бот, а система: приём → квалификация → CRM → follow-up',
    en: 'Not a chatbot - a system: intake → qualification → CRM → follow-up',
  },
  cta1: { ru: 'Обсудить задачу', en: 'Discuss your case' },
  cta2: { ru: 'Посмотреть решения', en: 'See solutions' },
};

// Чат-диалог в hero-телефоне: продукт показан буквально.
// from: 'client' | 'ai' | 'system'. t - время сообщения.
export const HERO_CHAT = [
  { from: 'client', t: '21:47', text: { ru: 'Здравствуйте! Сколько стоит имплантация под ключ?', en: 'Hi! How much is a full dental implant?' } },
  { from: 'ai', t: '21:47', text: { ru: 'Добрый вечер! От 45 000 ₽ за зуб - зависит от снимка. Могу записать вас на бесплатную консультацию - удобно завтра в 12:00 или 18:30?', en: 'Good evening! From $600 per tooth - it depends on your scan. I can book you a free consultation - tomorrow at 12:00 or 6:30 pm?' } },
  { from: 'client', t: '21:48', text: { ru: 'Давайте в 18:30', en: '6:30 pm works' } },
  { from: 'ai', t: '21:48', text: { ru: 'Записал: завтра, 18:30, доктор Соколова. Пришлю напоминание за 2 часа 👌', en: 'Booked: tomorrow, 6:30 pm, Dr. Sokolova. I will remind you 2 hours before 👌' } },
  { from: 'system', t: '21:48', text: { ru: 'Сделка создана в CRM · Менеджер уведомлён', en: 'Deal created in CRM · Manager notified' } },
];

// Живая лента событий в hero-визуале («интерфейсное доказательство»)
export const HERO_PIPELINE = [
  { icon: '↓', label: { ru: 'Новая заявка · WhatsApp', en: 'Incoming lead · WhatsApp' }, tone: 'in' },
  { icon: '◈', label: { ru: 'AI-квалификация: горячий лид', en: 'AI qualification: hot lead' }, tone: 'ai' },
  { icon: '⇄', label: { ru: 'Карточка создана в CRM', en: 'CRM record created' }, tone: 'sys' },
  { icon: '⚑', label: { ru: 'Менеджер получил уведомление', en: 'Manager notified' }, tone: 'sys' },
  { icon: '↻', label: { ru: 'Follow-up запланирован на завтра', en: 'Follow-up scheduled for tomorrow' }, tone: 'ok' },
];

// Полоса метрик - свойства систем, а не «достижения» (ничего выдуманного)
export const STATS_SYS = [
  { v: '24/7', l: { ru: 'обработка обращений', en: 'inquiry handling' } },
  { v: '6+', l: { ru: 'каналов в одной системе', en: 'channels in one system' } },
  { v: '100%', l: { ru: 'заявок фиксируются в CRM', en: 'of leads logged in the CRM' } },
  { v: '0', l: { ru: 'изменений вашего стека - встраиваемся в текущий', en: 'changes to your stack - we plug into it' } },
];

// ── Блок проблем ───────────────────────────────────────────────────────
export const PROBLEMS_SYS = {
  head: {
    num: { ru: 'ПРОБЛЕМА', en: 'PROBLEM' },
    title: { ru: 'Ваш бизнес уже получает заявки.', en: 'Your business already gets inquiries.' },
    titleIt: { ru: 'Вопрос - сколько из них теряется', en: 'The question is how many get lost' },
    side: {
      ru: 'Чаще всего дело не в маркетинге, а в том, что происходит с обращением после того, как клиент написал.',
      en: 'Most of the time the issue is not marketing - it is what happens to an inquiry after the customer reaches out.',
    },
    sideTitle: 'REALITY CHECK',
  },
  // ui - тип мини-интерфейса в bento-плитке: chat | task | pipe | copy | churn
  items: [
    {
      time: '21:47',
      ui: 'chat',
      text: { ru: 'Написал вечером - ответ утром', en: 'Wrote at night - answered in the morning' },
      tag: { ru: 'упущенное время', en: 'lost time' },
    },
    {
      time: 'DAY 3',
      ui: 'task',
      text: { ru: 'Follow-up забыт', en: 'Follow-up forgotten' },
      tag: { ru: 'человеческий фактор', en: 'human factor' },
    },
    {
      time: '-',
      ui: 'pipe',
      text: { ru: 'Заявка потерялась между WhatsApp и CRM', en: 'Lead lost between WhatsApp and the CRM' },
      tag: { ru: 'разрыв каналов', en: 'channel gap' },
    },
    {
      time: '2:30/д',
      timeEn: '2:30/day',
      ui: 'copy',
      text: { ru: 'Данные переносят вручную', en: 'Data is copied by hand' },
      tag: { ru: 'ручная работа', en: 'manual work' },
    },
    {
      time: '✕',
      ui: 'churn',
      text: { ru: 'Ушедших клиентов никто не возвращает', en: 'Nobody wins lapsed customers back' },
      tag: { ru: 'потерянная выручка', en: 'lost revenue' },
    },
  ],
  outro: {
    ru: 'AIVFX соединяет каналы, CRM и людей в одну систему, где ни одно обращение не проваливается в щели.',
    en: 'AIVFX connects channels, CRM and people into one system where no inquiry falls through the cracks.',
  },
};

// ── Схема системы (центральный визуал) ─────────────────────────────────
export const FLOW_SYS = {
  head: {
    num: { ru: 'СИСТЕМА', en: 'SYSTEM' },
    title: { ru: 'Одна система', en: 'One system' },
    titleIt: { ru: 'вместо хаоса каналов', en: 'instead of channel chaos' },
    side: {
      ru: 'Каждое обращение проходит один и тот же управляемый путь - независимо от того, откуда оно пришло.',
      en: 'Every inquiry travels the same managed path - no matter which channel it came from.',
    },
    sideTitle: 'ARCHITECTURE',
  },
  sources: ['Website', 'WhatsApp', 'Instagram', 'Telegram', { ru: 'Звонки', en: 'Calls' }, 'Email'],
  stages: [
    {
      key: 'intake',
      title: 'AI Intake',
      desc: { ru: 'Принимает обращение из любого канала и понимает контекст', en: 'Captures the inquiry from any channel and understands context' },
    },
    {
      key: 'qualification',
      title: 'AI Qualification',
      desc: { ru: 'Квалифицирует клиента, отвечает на базовые вопросы, собирает данные', en: 'Qualifies the lead, answers basic questions, collects data' },
    },
    {
      key: 'crm',
      title: 'CRM Integration',
      desc: { ru: 'Создаёт и обновляет карточку в вашей CRM автоматически', en: 'Creates and updates the record in your CRM automatically' },
    },
    {
      key: 'routing',
      title: 'Smart Routing',
      desc: { ru: 'Передаёт человека нужному менеджеру в нужный момент', en: 'Hands the customer to the right manager at the right moment' },
    },
    {
      key: 'followup',
      title: 'Follow-up & Nurturing',
      desc: { ru: 'Напоминает, догревает и возвращает клиентов к покупке', en: 'Reminds, nurtures and brings customers back to purchase' },
    },
    {
      key: 'analytics',
      title: 'Analytics Dashboard',
      desc: { ru: 'Показывает весь процесс и узкие места в цифрах', en: 'Shows the whole process and its bottlenecks in numbers' },
    },
  ],
};

// ── Услуги (3 направления) ─────────────────────────────────────────────
export const SERVICES_SYS = {
  head: {
    num: { ru: 'УСЛУГИ', en: 'SERVICES' },
    title: { ru: 'Три системы', en: 'Three systems' },
    titleIt: { ru: 'под задачи бизнеса', en: 'built for business tasks' },
    side: {
      ru: 'Не каталог из десятков услуг - три направления, которые закрывают путь клиента от заявки до повторной продажи.',
      en: 'Not a catalog of dozens of services - three directions that cover the customer journey from inquiry to repeat sale.',
    },
    sideTitle: 'WHAT WE BUILD',
  },
  items: [
    {
      slug: 'ai-sales-automation',
      num: 'S/01',
      title: { ru: 'AI для заявок и продаж', en: 'AI for leads & sales' },
      desc: {
        ru: 'Принимает обращения из всех каналов, квалифицирует клиентов, обновляет CRM, распределяет лиды и запускает follow-up.',
        en: 'Captures inquiries from every channel, qualifies leads, updates the CRM, routes conversations and triggers follow-ups.',
      },
      chips: ['Intake', 'Qualification', 'CRM', 'Routing', 'Follow-up'],
    },
    {
      slug: 'ai-assistants',
      num: 'S/02',
      title: { ru: 'AI-ассистенты', en: 'AI assistants' },
      desc: {
        ru: 'Работают с клиентами и сотрудниками через сайт, WhatsApp, Telegram и другие интерфейсы - от консультаций до базы знаний компании.',
        en: 'Serve customers and employees via the website, WhatsApp, Telegram and other interfaces - from consultations to the company knowledge base.',
      },
      chips: ['Website', 'WhatsApp', 'Telegram', 'Knowledge base', 'Internal'],
    },
    {
      slug: 'business-process-automation',
      num: 'S/03',
      title: { ru: 'Автоматизация процессов', en: 'Process automation' },
      desc: {
        ru: 'Убирает ручную работу с CRM, документами, отчётами, уведомлениями и внутренними операциями.',
        en: 'Removes manual work across CRM, documents, reports, notifications and internal operations.',
      },
      chips: ['CRM ops', 'Docs', 'Reports', 'Alerts', 'Data sync'],
    },
  ],
  more: { ru: 'Подробнее', en: 'Learn more' },
};

// ── Страницы услуг (/services/<slug>) ──────────────────────────────────
export const SERVICE_PAGES = {
  // ── Обучение и консультации ──────────────────────────────────────────
  //
  // Третье направление, мост между двумя первыми. Человеку, которому
  // внедрение системы за сотни тысяч сейчас не нужно или не по бюджету,
  // продать нечего - он уходит. Обучение закрывает этот разрыв: тот же
  // опыт, но в формате, который начинается на следующей неделе.
  //
  // Профиль намеренно узкий. Не «ИИ для всех», а две темы, где за словами
  // стоит собственная ежедневная работа: производство видео и прикладное
  // применение моделей в бизнесе без интеграций. Курс по нейросетям для
  // бухгалтеров мы вести не можем и не беремся.
  //
  // Страницы русские, английских версий нет намеренно: занятия идут
  // голосом и по-русски (см. RU_ONLY_SERVICES в scripts/site-routes.js).
  'obuchenie-ai-video': {
    cta: {
      title: { ru: 'Разберём вашу задачу?' },
      sub: { ru: 'Напишите, какой ролик нужен и что уже пробовали. Отвечу, реально ли это сделать самому и сколько на это уйдёт времени.' },
      btn: { ru: 'Написать' },
    },
    alsoSee: ['obuchenie-ii-dlya-biznesa', 'ai-assistants'],
    readMore: ['kling-gayd', 'runway-gayd', 'veo-gayd', 'kak-sozdat-ai-avatar-heygen', 'seedance-gayd', 'agregatory-ai-servisov'],
    kicker: { ru: 'ОБУЧЕНИЕ / AI-ВИДЕО', en: 'TRAINING / AI VIDEO' },
    title: { ru: 'Обучение AI-видео: как делать ролики, которые не стыдно показать клиенту', en: 'AI video training' },
    sub: {
      ru: 'Разбираем весь путь на ваших задачах: от постановки кадра и опорных изображений до сборки и правок.',
      en: 'Hands-on training in AI video production.',
    },
    pains: {
      title: { ru: 'Знакомо?', en: 'Sound familiar?' },
      items: [
        { ru: 'Генерации получаются, но выглядят как генерации - показать клиенту нельзя', en: 'Generations work but look generated' },
        { ru: 'Герой меняет лицо и одежду от кадра к кадру', en: 'The character changes between shots' },
        { ru: 'Промпты пишутся наугад: непонятно, что именно повлияло на результат', en: 'Prompts are guesswork' },
        { ru: 'Кредиты уходят на десятки дублей, а в работу идёт один', en: 'Credits vanish into rejected takes' },
      ],
    },
    proof: [
      { ru: 'Разбор вашей задачи и референсов', en: 'Reviewing your task and references' },
      { ru: 'Сборка опорных кадров под персонажа', en: 'Building reference frames' },
      { ru: 'Промпт: свет, оптика, движение камеры', en: 'Prompt: light, lens, camera move' },
      { ru: 'Первая генерация и разбор ошибок', en: 'First generation and review' },
      { ru: 'Правки без перегенерации всей сцены', en: 'Fixes without full regeneration' },
      { ru: 'Сборка и вывод под площадку', en: 'Assembly and export' },
    ],
    features: {
      title: { ru: 'Что разбираем', en: 'What we cover' },
      items: [
        { t: { ru: 'Как устроен кадр', en: 'How a shot works' }, d: { ru: 'Почему одна генерация выглядит киношно, а другая нет: оптика, свет, движение камеры. Это не про модели, это про съёмку - и переносится на любой инструмент.', en: 'Why one generation looks cinematic and another does not: optics, light, camera movement.' } },
        { t: { ru: 'Консистентность персонажа', en: 'Character consistency' }, d: { ru: 'Как собрать опорные кадры так, чтобы герой оставался собой от сцены к сцене. Главная причина, по которой ролики разваливаются.', en: 'How to assemble references so a character stays itself across scenes.' } },
        { t: { ru: 'Промпт как техзадание', en: 'The prompt as a brief' }, d: { ru: 'Разбираем структуру: что в кадре, как снято, чего быть не должно. И почему менять надо одну вещь за раз.', en: 'Prompt structure: what is in frame, how it is shot, what must not appear.' } },
        { t: { ru: 'Выбор инструмента под задачу', en: 'Choosing the tool' }, d: { ru: 'Где сильнее Veo, где Kling, где Seedance, а где дешевле снять на телефон. Честно, включая случаи, когда AI не нужен.', en: 'Where each model wins - and when AI is not the answer.' } },
        { t: { ru: 'Сборка и звук', en: 'Assembly and sound' }, d: { ru: 'Что делать с генерациями дальше: монтаж, ритм, звук, титры. Модель выдаёт сцену, а ролик собирает человек.', en: 'What happens after generation: editing, rhythm, sound, titles.' } },
        { t: { ru: 'Экономика производства', en: 'Production economics' }, d: { ru: 'Сколько дублей уходит в брак, как считать бюджет ролика и на чём реально экономить, а на чём нельзя.', en: 'Reject rates, budgeting and where saving actually works.' } },
      ],
    },
  },
  'obuchenie-ii-dlya-biznesa': {
    cta: {
      title: { ru: 'С чего начать именно вам?' },
      sub: { ru: 'Опишите, на что уходит время команды. Скажу, что из этого закрывается готовыми инструментами, а что требует внедрения.' },
      btn: { ru: 'Написать' },
    },
    alsoSee: ['obuchenie-ai-video', 'ai-assistants'],
    readMore: ['chat-bot-ili-ai-assistent', 'skolko-stoit-ai-assistent', 'agregatory-ai-servisov'],
    kicker: { ru: 'ОБУЧЕНИЕ / ИИ В РАБОТЕ', en: 'TRAINING / AI AT WORK' },
    title: { ru: 'ИИ в работе компании: что можно получить без внедрения систем', en: 'AI at work without a full deployment' },
    sub: {
      ru: 'Практический разбор для команды: какие задачи закрываются готовыми инструментами уже завтра, без интеграций, разработки и бюджета в сотни тысяч.',
      en: 'A practical session for teams on what AI closes without integrations.',
    },
    pains: {
      title: { ru: 'Знакомо?', en: 'Sound familiar?' },
      items: [
        { ru: 'Все говорят про ИИ, но непонятно, с чего начать именно вам', en: 'Everyone talks about AI, nobody says where to start' },
        { ru: 'Сотрудники пробуют инструменты вразнобой, результат непредсказуем', en: 'Staff use tools at random with unpredictable results' },
        { ru: 'Бюджета на полноценное внедрение сейчас нет', en: 'No budget for a full deployment right now' },
        { ru: 'Есть опасение, что ИИ придумает лишнего и это увидит клиент', en: 'Fear that AI will invent something a customer will see' },
      ],
    },
    proof: [
      { ru: 'Смотрим, на что реально уходит время команды', en: 'Where the team time actually goes' },
      { ru: 'Отбираем задачи, где ИИ даёт эффект сразу', en: 'Selecting tasks with immediate effect' },
      { ru: 'Собираем рабочие сценарии на готовых инструментах', en: 'Building workflows on off-the-shelf tools' },
      { ru: 'Проверяем на настоящих материалах компании', en: 'Testing on the company own materials' },
      { ru: 'Отмечаем, где нужен человек и почему', en: 'Marking where a human is required' },
      { ru: 'Договариваемся о правилах: что не отдаём ИИ', en: 'Agreeing what never goes to AI' },
    ],
    features: {
      title: { ru: 'Что разбираем', en: 'What we cover' },
      items: [
        { t: { ru: 'Что закрывается без разработки', en: 'What needs no development' }, d: { ru: 'Подготовка текстов, разбор документов, черновики ответов, картинки для соцсетей, расшифровки встреч.', en: 'Drafting, document review, images, meeting transcripts - subscription-level tools.' } },
        { t: { ru: 'Где проходит граница', en: 'Where the boundary is' }, d: { ru: 'Честно про то, что без интеграций не решается: работа с вашей базой, автоматический приём заявок, действия в CRM.', en: 'What genuinely requires integrations - so you know when deployment is premature.' } },
        { t: { ru: 'Правила безопасности', en: 'Safety rules' }, d: { ru: 'Какие данные нельзя загружать в чужие сервисы, как формулировать запросы, чтобы не утекли персональные данные клиентов, и что записать во внутренний регламент.', en: 'What data must never go into external services, and what to put in your internal policy.' } },
        { t: { ru: 'Как проверять результат', en: 'Checking the output' }, d: { ru: 'Главный навык: замечать, когда модель уверенно выдумывает. Разбираем на реальных примерах, где это ловится, а где проходит незамеченным.', en: 'Spotting confident invention - the single most important skill.' } },
        { t: { ru: 'Инструменты под ваши задачи', en: 'Tools for your tasks' }, d: { ru: 'Без списка из пятидесяти сервисов. Берём ваши задачи и подбираем два-три инструмента, которыми команда будет пользоваться на самом деле.', en: 'Not a list of fifty services: two or three tools your team will actually use.' } },
        { t: { ru: 'Что делать дальше', en: 'What comes next' }, d: { ru: 'Короткий план на месяц: с чего начать, как измерить эффект и по каким признакам понять, что пора автоматизировать всерьёз.', en: 'A one-month plan with measurable checkpoints.' } },
      ],
    },
  },

  // ── Отраслевые страницы ──────────────────────────────────────────────
  //
  // Общие страницы услуг отвечают на вопрос «что вы делаете». Эти - на
  // вопрос «а с такими, как мы, вы работали». Человек, который ищет
  // «AI-ассистент для клиники», а не «автоматизация заявок», уже понял,
  // что ему нужно, и выбирает исполнителя: конкуренция по таким запросам
  // низкая, а готовность обсуждать работу высокая.
  //
  // Отличаются они не оформлением, а содержанием: боли, лог системы и
  // возможности переписаны под конкретную отрасль. Копия общей страницы
  // с заменённым словом «клиника» не работает - и для читателя, и для
  // поиска это одна и та же страница.
  'ai-dlya-klinik': {
    alsoSee: ['ai-sales-automation', 'ai-assistants'],
    readMore: ['pochemu-teryayutsya-zayavki', 'skolko-stoit-ai-assistent', 'chat-bot-ili-ai-assistent'],
    kicker: { ru: 'РЕШЕНИЕ / ДЛЯ КЛИНИК И МЕДЦЕНТРОВ', en: 'SOLUTION / FOR CLINICS' },
    title: { ru: 'AI-ассистент для клиники: запись и вопросы пациентов без потерь', en: 'AI assistant for clinics: bookings and patient questions without losses' },
    sub: {
      ru: 'AI-ассистент для клиники: отвечает пациентам круглосуточно, записывает на приём, объясняет подготовку и цены, а всё медицинское передаёт человеку.',
      en: 'AI assistant for clinics: answers patients around the clock, books appointments, explains preparation and prices, and hands anything medical to a human.',
    },
    pains: {
      title: { ru: 'Знакомо?', en: 'Sound familiar?' },
      items: [
        { ru: 'Пациент звонит вечером, слышит автоответчик и записывается в соседнюю клинику', en: 'A patient calls in the evening, hears voicemail and books at the clinic next door' },
        { ru: 'Администратор весь день отвечает на одни и те же вопросы про подготовку к УЗИ', en: 'The desk spends all day answering the same questions about preparing for a scan' },
        { ru: 'Записи переносят и отменяют в мессенджере, а в расписании этого нет', en: 'Reschedules happen in chat and never reach the calendar' },
        { ru: 'Пациенты не приходят на приём, и никто не напомнил заранее', en: 'Patients miss appointments because nobody reminded them' },
      ],
    },
    proof: [
      { ru: 'Сообщение · WhatsApp, 22:14', en: 'Message · WhatsApp, 22:14' },
      { ru: 'Вопрос про подготовку к приёму - ответ из базы клиники', en: 'Question about preparation - answered from the clinic knowledge base' },
      { ru: 'Свободные окна на четверг предложены', en: 'Available Thursday slots offered' },
      { ru: 'Запись создана в медицинской системе', en: 'Appointment created in the practice system' },
      { ru: 'Упоминание симптома - диалог передан администратору', en: 'Symptom mentioned - conversation handed to the desk' },
      { ru: 'Напоминание за сутки отправлено', en: 'Reminder sent 24 h before' },
    ],
    features: {
      title: { ru: 'Что делает система в клинике', en: 'What the system does in a clinic' },
      items: [
        { t: { ru: 'Запись без администратора', en: 'Booking without the desk' }, d: { ru: 'Показывает свободные окна нужного специалиста и создаёт запись в вашей медицинской системе, а не в отдельной табличке.', en: 'Shows free slots for the right specialist and creates the appointment in your practice system, not a side spreadsheet.' } },
        { t: { ru: 'Ответы на организационные вопросы', en: 'Organisational answers' }, d: { ru: 'Подготовка к процедурам, документы, адрес, парковка, стоимость приёма - по вашим материалам, без выдумок.', en: 'Preparation, documents, address, parking, prices - strictly from your own materials, nothing invented.' } },
        { t: { ru: 'Жёсткая граница по медицине', en: 'A hard medical boundary' }, d: { ru: 'Ни диагнозов, ни советов по лечению, ни трактовки анализов. Любой такой вопрос уходит человеку немедленно и с пометкой срочности.', en: 'No diagnoses, no treatment advice, no reading of test results. Any such question goes to a human immediately, flagged as urgent.' } },
        { t: { ru: 'Напоминания и переносы', en: 'Reminders and reschedules' }, d: { ru: 'Напоминает за сутки и за два часа, принимает перенос и отмену прямо в переписке - расписание обновляется само.', en: 'Reminds a day and two hours ahead, accepts reschedules and cancellations in chat - the calendar updates itself.' } },
        { t: { ru: 'Возврат тех, кто не дошёл', en: 'Win-back for no-shows' }, d: { ru: 'Пациент, который записался и не пришёл, получает аккуратное сообщение, а не теряется навсегда.', en: 'A patient who booked and never came gets a gentle follow-up instead of disappearing.' } },
        { t: { ru: 'Персональные данные под контролем', en: 'Personal data under control' }, d: { ru: 'Согласие на обработку, хранение в вашем контуре, доступ по минимуму и удаление переписок по расписанию.', en: 'Explicit consent, storage inside your perimeter, least-privilege access and scheduled deletion of conversations.' } },
      ],
    },
  },
  'ai-dlya-avtoservisa': {
    alsoSee: ['ai-sales-automation', 'business-process-automation'],
    readMore: ['pochemu-teryayutsya-zayavki', 'ai-kvalifikaciya-lidov', 'ai-assistent-i-crm'],
    kicker: { ru: 'РЕШЕНИЕ / ДЛЯ АВТОСЕРВИСОВ', en: 'SOLUTION / FOR AUTO SERVICE' },
    title: { ru: 'AI-ассистент для автосервиса: запись, расчёт и загрузка постов', en: 'AI assistant for auto service: bookings, estimates and bay load' },
    sub: {
      ru: 'AI-ассистент для автосервиса: принимает обращения из мессенджеров и с сайта, выясняет марку, пробег и симптом, называет вилку цены и записывает.',
      en: 'AI assistant for auto service: takes inquiries from messengers and the website, gets make, mileage and symptom, quotes a range, books a slot.',
    },
    pains: {
      title: { ru: 'Знакомо?', en: 'Sound familiar?' },
      items: [
        { ru: 'Клиент пишет в выходной, а отвечают ему в понедельник', en: 'A customer writes on Saturday and hears back on Monday' },
        { ru: 'Мастер-приёмщик отвечает в мессенджере вместо работы с машиной', en: 'The service advisor answers chats instead of working with cars' },
        { ru: 'Половина вопросов - «сколько будет стоить замена колодок»', en: 'Half the questions are «how much for new brake pads»' },
        { ru: 'Записи путаются, посты то простаивают, то перегружены', en: 'Bookings get muddled: bays sit idle, then overflow' },
      ],
    },
    proof: [
      { ru: 'Сообщение · Telegram, суббота 19:40', en: 'Message · Telegram, Saturday 19:40' },
      { ru: 'Марка, год и пробег уточнены', en: 'Make, year and mileage clarified' },
      { ru: 'Симптом описан: стук спереди справа', en: 'Symptom captured: knock, front right' },
      { ru: 'Вилка по диагностике названа', en: 'Diagnostics price range given' },
      { ru: 'Запись на понедельник, 10:00, пост №2', en: 'Booked Monday 10:00, bay 2' },
      { ru: 'Карточка создана в CRM с историей переписки', en: 'CRM record created with full chat history' },
    ],
    features: {
      title: { ru: 'Что делает система в автосервисе', en: 'What the system does in a workshop' },
      items: [
        { t: { ru: 'Сбор данных об автомобиле', en: 'Vehicle details upfront' }, d: { ru: 'Марка, модель, год, пробег и описание проблемы выясняются до записи - мастер видит картину заранее.', en: 'Make, model, year, mileage and the described fault are gathered before the booking, so the advisor sees the picture in advance.' } },
        { t: { ru: 'Вилка по типовым работам', en: 'Ranges for standard jobs' }, d: { ru: 'Называет диапазон по вашему прайсу и честно говорит, что точная сумма - после диагностики. Никаких выдуманных цен.', en: 'Quotes a range from your own price list and says plainly that the exact figure follows diagnostics. No invented numbers.' } },
        { t: { ru: 'Запись с учётом загрузки постов', en: 'Booking against real bay load' }, d: { ru: 'Предлагает время, когда пост реально свободен, а не первое попавшееся окно в календаре.', en: 'Offers times when a bay is genuinely free, not the first empty slot in a calendar.' } },
        { t: { ru: 'Напоминание и подтверждение', en: 'Reminders and confirmation' }, d: { ru: 'Напоминает накануне и просит подтвердить - меньше пустых постов из-за неявок.', en: 'Reminds the day before and asks to confirm - fewer idle bays from no-shows.' } },
        { t: { ru: 'Возврат на регламент', en: 'Service-interval win-back' }, d: { ru: 'Через нужный срок или пробег напоминает про ТО тем, кто уже был у вас.', en: 'Reminds returning customers about scheduled maintenance at the right time or mileage.' } },
        { t: { ru: 'Всё в одной карточке', en: 'One record per customer' }, d: { ru: 'Переписка, автомобиль, работы и история визитов лежат вместе, а не в чужом телефоне.', en: 'Chat, vehicle, jobs and visit history live together instead of on someone\'s personal phone.' } },
      ],
    },
  },
  'ai-dlya-nedvizhimosti': {
    alsoSee: ['ai-sales-automation', 'ai-assistants'],
    readMore: ['ai-kvalifikaciya-lidov', 'pochemu-teryayutsya-zayavki', 'skolko-stoit-ai-assistent'],
    kicker: { ru: 'РЕШЕНИЕ / ДЛЯ АГЕНТСТВ НЕДВИЖИМОСТИ', en: 'SOLUTION / FOR REAL ESTATE' },
    title: { ru: 'AI-ассистент для агентства недвижимости: разбор заявок и запись на показ', en: 'AI assistant for real estate: lead triage and viewing bookings' },
    sub: {
      ru: 'AI-ассистент для недвижимости: отвечает на обращения с площадок за секунды, выясняет бюджет, район и сроки и передаёт риелтору только целевых.',
      en: 'AI assistant for real estate: replies to portal and ad inquiries in seconds, works out budget, area and timing, and passes the agent only real buyers.',
    },
    pains: {
      title: { ru: 'Знакомо?', en: 'Sound familiar?' },
      items: [
        { ru: 'Заявки с площадок приходят пачками, риелтор физически не успевает обзвонить', en: 'Portal leads arrive in bursts and no agent can call them all in time' },
        { ru: 'Кто ответил первым, тот и работает с клиентом - остальные опоздали', en: 'Whoever replies first gets the client; everyone else is late' },
        { ru: 'Половина обращений - не тот бюджет или не тот район', en: 'Half the inquiries are the wrong budget or the wrong district' },
        { ru: 'Показы срываются, потому что никто не подтвердил встречу', en: 'Viewings fall through because nobody confirmed the meeting' },
      ],
    },
    proof: [
      { ru: 'Заявка · площадка объявлений, 23:05', en: 'Lead · listings portal, 23:05' },
      { ru: 'Ответ отправлен через 40 секунд', en: 'Replied in 40 seconds' },
      { ru: 'Бюджет и район уточнены', en: 'Budget and district clarified' },
      { ru: 'Ипотека: нужна, одобрения пока нет', en: 'Mortgage: needed, not yet approved' },
      { ru: 'Лид помечен: горячий, показ на выходных', en: 'Lead tagged: hot, viewing this weekend' },
      { ru: 'Риелтор получил карточку с историей', en: 'Agent received the record with full history' },
    ],
    features: {
      title: { ru: 'Что делает система в агентстве', en: 'What the system does in an agency' },
      items: [
        { t: { ru: 'Ответ быстрее конкурентов', en: 'Faster than the competition' }, d: { ru: 'Отвечает за секунды в любое время - в недвижимости первый ответивший чаще всего и работает с клиентом.', en: 'Replies within seconds at any hour - in property the first responder usually keeps the client.' } },
        { t: { ru: 'Разбор по бюджету и району', en: 'Budget and area triage' }, d: { ru: 'Выясняет вилку, район, сроки и способ оплаты, не превращая разговор в анкету.', en: 'Works out the range, area, timing and payment method without turning the chat into a form.' } },
        { t: { ru: 'Подбор из вашей базы', en: 'Matching from your own base' }, d: { ru: 'Предлагает подходящие объекты из вашей выгрузки, а не абстрактные «варианты есть».', en: 'Suggests matching listings from your feed instead of a vague «we have options».' } },
        { t: { ru: 'Запись на показ и подтверждение', en: 'Viewings and confirmations' }, d: { ru: 'Согласует время, ставит встречу в календарь риелтора и напоминает обеим сторонам.', en: 'Agrees the time, puts it in the agent calendar and reminds both sides.' } },
        { t: { ru: 'Долгие сделки не теряются', en: 'Long deals stay alive' }, d: { ru: 'Тем, кто «вернётся через полгода», приходят редкие уместные касания вместо еженедельного «ну что, надумали».', en: 'People who «will come back in six months» get rare, relevant touches instead of weekly nagging.' } },
        { t: { ru: 'Честность в цифрах', en: 'Honest numbers' }, d: { ru: 'Никаких обещаний по одобрению ипотеки и доходности - только факты из ваших материалов.', en: 'No promises about mortgage approval or returns - only facts from your own materials.' } },
      ],
    },
  },

  'ai-sales-automation': {
    alsoSee: ['ai-dlya-klinik', 'ai-dlya-avtoservisa', 'ai-dlya-nedvizhimosti', 'obuchenie-ii-dlya-biznesa'],
    // Статьи блога по теме услуги. Список ручной: подбор по совпадению
    // слов дал бы соседство, а не пользу читателю.
    readMore: ['pochemu-teryayutsya-zayavki', 'ai-kvalifikaciya-lidov', 'skolko-stoit-ai-assistent'],
    kicker: { ru: 'УСЛУГА / AI ДЛЯ ЗАЯВОК И ПРОДАЖ', en: 'SERVICE / AI FOR LEADS & SALES' },
    title: { ru: 'Ни одна заявка больше не теряется', en: 'No lead ever gets lost again' },
    seoTitle: { ru: 'AI для заявок и продаж: приём, квалификация, CRM, follow-up', en: 'AI for Leads & Sales: Intake, Qualification, CRM, Follow-up' },
    sub: {
      ru: 'AI для заявок и продаж: принимает обращения из всех каналов, квалифицирует клиента, отвечает на базовые вопросы и передаёт менеджеру в нужный момент.',
      en: 'AI for leads and sales: captures inquiries from every channel, qualifies the customer, answers basic questions and hands them to a manager at the right moment.',
    },
    pains: {
      title: { ru: 'Когда это нужно', en: 'When you need this' },
      items: [
        { ru: 'Заявки приходят в 5 разных каналов, и часть из них никто не видит', en: 'Leads arrive in 5 different channels and some are never seen' },
        { ru: 'Клиенты пишут вечером и в выходные, а отвечают им в рабочее время', en: 'Customers write in the evenings and weekends but get answers during office hours' },
        { ru: 'Менеджеры тратят время на нецелевые обращения', en: 'Managers waste time on unqualified inquiries' },
        { ru: 'CRM заполняется вручную и с ошибками - или не заполняется вовсе', en: 'The CRM is filled in manually with mistakes - or not at all' },
      ],
    },
    // «интерфейсное доказательство» - что реально делает система
    proof: [
      { ru: 'Новая заявка · Instagram Direct', en: 'Incoming lead · Instagram DM' },
      { ru: 'AI уточняет задачу и бюджет', en: 'AI clarifies the task and budget' },
      { ru: 'Лид квалифицирован: целевой', en: 'Lead qualified: sales-ready' },
      { ru: 'Сделка создана в amoCRM', en: 'Deal created in the CRM' },
      { ru: 'Менеджер подключён к диалогу', en: 'Manager joined the conversation' },
      { ru: 'Follow-up: напоминание через 24 ч', en: 'Follow-up reminder in 24 h' },
    ],
    features: {
      title: { ru: 'Что делает система', en: 'What the system does' },
      items: [
        { t: { ru: 'Мгновенный первый ответ', en: 'Instant first response' }, d: { ru: 'Отвечает за секунды в любое время суток - клиент не успевает уйти к конкуренту.', en: 'Replies within seconds at any hour - before the customer moves on to a competitor.' } },
        { t: { ru: 'Квалификация и сбор данных', en: 'Qualification & data capture' }, d: { ru: 'Задаёт правильные вопросы, отделяет целевые обращения от шума, собирает контакты и детали задачи.', en: 'Asks the right questions, separates real leads from noise, captures contacts and task details.' } },
        { t: { ru: 'CRM без ручного ввода', en: 'CRM without manual entry' }, d: { ru: 'Каждое обращение автоматически становится карточкой сделки с полной историей.', en: 'Every inquiry automatically becomes a deal record with full history.' } },
        { t: { ru: 'Передача менеджеру вовремя', en: 'Timely human handover' }, d: { ru: 'Система знает, когда подключить человека, и передаёт диалог с контекстом.', en: 'The system knows when to bring a human in - and hands over the conversation with context.' } },
        { t: { ru: 'Follow-up и возврат клиентов', en: 'Follow-up & win-back' }, d: { ru: 'Напоминания, дожим и повторные касания происходят сами, по сценарию.', en: 'Reminders, nudges and repeat touches happen automatically, on schedule.' } },
        { t: { ru: 'Прозрачная аналитика', en: 'Transparent analytics' }, d: { ru: 'Видно каждый этап воронки: сколько пришло, где буксует, что конвертируется.', en: 'Every funnel stage is visible: what comes in, where it stalls, what converts.' } },
      ],
    },
  },
  'ai-assistants': {
    alsoSee: ['ai-dlya-klinik', 'ai-dlya-nedvizhimosti', 'ai-dlya-avtoservisa', 'obuchenie-ii-dlya-biznesa'],
    // Статьи блога по теме услуги. Список ручной: подбор по совпадению
    // слов дал бы соседство, а не пользу читателю.
    readMore: ['chat-bot-ili-ai-assistent', 'skolko-stoit-ai-assistent', 'ai-assistent-i-crm'],
    kicker: { ru: 'УСЛУГА / AI-АССИСТЕНТЫ', en: 'SERVICE / AI ASSISTANTS' },
    title: { ru: 'Ассистент, который знает ваш бизнес', en: 'An assistant that knows your business' },
    sub: {
      ru: 'AI-ассистенты для клиентов и сотрудников: консультант на сайте, ассистент в WhatsApp и Telegram, внутренний помощник с доступом к базе знаний компании.',
      en: 'AI assistants for customers and employees: a website consultant, WhatsApp and Telegram assistants, an internal helper connected to the company knowledge base.',
    },
    pains: {
      title: { ru: 'Когда это нужно', en: 'When you need this' },
      items: [
        { ru: 'Команда отвечает на одни и те же вопросы десятки раз в день', en: 'The team answers the same questions dozens of times a day' },
        { ru: 'Знания компании разбросаны по документам, чатам и головам', en: 'Company knowledge is scattered across documents, chats and heads' },
        { ru: 'Новые сотрудники неделями ищут, у кого что спросить', en: 'New employees spend weeks figuring out who to ask about what' },
        { ru: 'Подготовка типовых ответов и документов съедает часы', en: 'Drafting routine replies and documents eats up hours' },
      ],
    },
    proof: [
      { ru: 'Вопрос клиента на сайте', en: 'Customer question on the website' },
      { ru: 'Ассистент отвечает из базы знаний', en: 'Assistant answers from the knowledge base' },
      { ru: 'Уточняет детали и предлагает запись', en: 'Clarifies details, offers a booking' },
      { ru: 'Сложный случай - эскалация человеку', en: 'Complex case - escalated to a human' },
      { ru: 'Диалог сохранён в CRM', en: 'Conversation saved to the CRM' },
    ],
    features: {
      title: { ru: 'Что делает система', en: 'What the system does' },
      items: [
        { t: { ru: 'Клиентский консультант', en: 'Customer-facing consultant' }, d: { ru: 'Отвечает на вопросы о продуктах, ценах и условиях на сайте и в мессенджерах - на языке клиента.', en: 'Answers questions about products, prices and terms on the website and in messengers - in the customer’s language.' } },
        { t: { ru: 'Работа с базой знаний', en: 'Knowledge-base grounding' }, d: { ru: 'Ассистент опирается на ваши документы и регламенты, а не на фантазии модели.', en: 'The assistant is grounded in your documents and policies - not in the model’s imagination.' } },
        { t: { ru: 'Внутренний помощник', en: 'Internal copilot' }, d: { ru: 'Сотрудники мгновенно находят информацию, готовят ответы и документы.', en: 'Employees instantly find information, draft replies and documents.' } },
        { t: { ru: 'Эскалация человеку', en: 'Human escalation' }, d: { ru: 'Ассистент понимает границы своих полномочий и вовремя передаёт диалог команде.', en: 'The assistant knows its limits and hands the conversation to the team at the right time.' } },
        { t: { ru: 'Многоканальность', en: 'Multi-channel by design' }, d: { ru: 'Один ассистент - сайт, WhatsApp, Telegram, Instagram, внутренние чаты.', en: 'One assistant - website, WhatsApp, Telegram, Instagram, internal chats.' } },
        { t: { ru: 'Обучение на ваших данных', en: 'Trained on your data' }, d: { ru: 'Тон, сценарии и знания настраиваются под компанию и обновляются по мере роста.', en: 'Tone, scenarios and knowledge are tailored to the company and updated as it grows.' } },
      ],
    },
  },
  'business-process-automation': {
    alsoSee: ['ai-dlya-avtoservisa', 'ai-dlya-klinik', 'ai-dlya-nedvizhimosti', 'obuchenie-ii-dlya-biznesa'],
    // Статьи блога по теме услуги. Список ручной: подбор по совпадению
    // слов дал бы соседство, а не пользу читателю.
    readMore: ['ai-assistent-i-crm', 'ai-kvalifikaciya-lidov', 'pochemu-teryayutsya-zayavki'],
    kicker: { ru: 'УСЛУГА / АВТОМАТИЗАЦИЯ ПРОЦЕССОВ', en: 'SERVICE / PROCESS AUTOMATION' },
    title: { ru: 'Рутина исчезает из расписания команды', en: 'Routine work disappears from your team’s day' },
    sub: {
      ru: 'Автоматизируем рутинные операции: CRM, документы, отчёты, распределение заявок, напоминания, согласования, уведомления и синхронизацию данных между сервисами.',
      en: 'We automate routine operations: CRM upkeep, documents, reports, lead distribution, reminders, approvals, notifications and data sync between tools.',
    },
    pains: {
      title: { ru: 'Когда это нужно', en: 'When you need this' },
      items: [
        { ru: 'Данные вручную переносятся между CRM, таблицами и чатами', en: 'Data is copied by hand between the CRM, spreadsheets and chats' },
        { ru: 'Отчёты собираются полдня и устаревают к моменту готовности', en: 'Reports take half a day to compile and are stale on arrival' },
        { ru: 'Согласования и напоминания держатся на памяти людей', en: 'Approvals and reminders rely on human memory' },
        { ru: 'Бизнес растёт - и количество ручной работы растёт вместе с ним', en: 'The business grows - and manual work grows with it' },
      ],
    },
    proof: [
      { ru: 'Закрыта сделка в CRM', en: 'Deal closed in the CRM' },
      { ru: 'Договор сформирован автоматически', en: 'Contract generated automatically' },
      { ru: 'Счёт отправлен клиенту', en: 'Invoice sent to the customer' },
      { ru: 'Задача поставлена аккаунт-менеджеру', en: 'Task assigned to the account manager' },
      { ru: 'Отчёт за день собран в 19:00', en: 'Daily report compiled at 7 pm' },
    ],
    features: {
      title: { ru: 'Что делает система', en: 'What the system does' },
      items: [
        { t: { ru: 'Порядок в CRM', en: 'CRM hygiene' }, d: { ru: 'Карточки создаются, обновляются и двигаются по воронке без ручного ввода.', en: 'Records are created, updated and moved along the pipeline without manual entry.' } },
        { t: { ru: 'Документы и отчёты', en: 'Documents & reports' }, d: { ru: 'Договоры, счета и регулярные отчёты формируются автоматически из ваших данных.', en: 'Contracts, invoices and recurring reports are generated automatically from your data.' } },
        { t: { ru: 'Напоминания и согласования', en: 'Reminders & approvals' }, d: { ru: 'Система сама следит за дедлайнами и двигает согласования дальше.', en: 'The system tracks deadlines and pushes approvals forward on its own.' } },
        { t: { ru: 'Синхронизация сервисов', en: 'Tool-to-tool sync' }, d: { ru: 'CRM, таблицы, календари и мессенджеры обмениваются данными без людей-курьеров.', en: 'CRM, spreadsheets, calendars and messengers exchange data without human couriers.' } },
        { t: { ru: 'Уведомления по делу', en: 'Signal-only notifications' }, d: { ru: 'Команда получает только важные события, а не поток шума.', en: 'The team gets only the events that matter - not a stream of noise.' } },
        { t: { ru: 'Повторные продажи', en: 'Repeat sales triggers' }, d: { ru: 'Система напоминает клиентам о продлении и возвращает их к покупке.', en: 'The system reminds customers about renewals and brings them back to buy.' } },
      ],
    },
  },
};

// Общий CTA-блок для страниц услуг
export const SERVICE_CTA = {
  title: { ru: 'Разберём ваш процесс?', en: 'Shall we map your process?' },
  sub: {
    ru: 'Расскажите, как устроена работа с заявками сейчас - предложим архитектуру системы и оценку.',
    en: 'Tell us how you handle inquiries today - we will propose a system architecture and an estimate.',
  },
  btn: { ru: 'Обсудить задачу', en: 'Discuss your case' },
};

// ── Обучение (третье направление, только на русском) ───────────────────
//
// Секция нужна ровно затем, чтобы направление вообще существовало для
// посетителя. Сначала страницы обучения были связаны только подвалом и
// перекрёстными ссылками внизу страниц услуг - человек листал главную и
// не видел их вовсе.
//
// Блок намеренно короче секции услуг: это не четвёртая «система», а
// другой способ работать с нами, для тех, кому внедрение сейчас
// избыточно.
export const TRAINING_SYS = {
  head: {
    num: { ru: 'ОБУЧЕНИЕ' },
    title: { ru: 'Не всем нужна' },
    titleIt: { ru: 'готовая система' },
  },
  // Вводный абзац секции. Не side/sideTitle: боковой столбец SecHead
  // игнорирует по всему сайту, а фраза несёт суть направления и должна
  // быть видна.
  lead: {
    ru: 'Если внедрение сейчас избыточно или не по бюджету, есть второй путь: разобраться и делать самому. Занятия веду лично, на ваших задачах.',
  },
  items: [
    {
      slug: 'obuchenie-ai-video',
      title: { ru: 'Обучение AI-видео' },
      desc: {
        ru: 'Как делать ролики, которые не стыдно показать клиенту: кадр, консистентность героя, промпт, сборка. Разбираем на вашей задаче, а не на учебных примерах.',
      },
    },
    {
      slug: 'obuchenie-ii-dlya-biznesa',
      title: { ru: 'ИИ в работе компании' },
      desc: {
        ru: 'Что нейросети закрывают уже завтра, без интеграций и разработки. И где проходит граница, за которой без внедрения не обойтись.',
      },
    },
  ],
  more: { ru: 'Подробнее' },
};

// ── Кейсы (демо-сценарии - честно помечены) ────────────────────────────
export const CASES_SYS = {
  head: {
    num: { ru: 'КЕЙСЫ', en: 'CASES' },
    title: { ru: 'Проблема → система', en: 'Problem → system' },
    titleIt: { ru: '→ результат', en: '→ result' },
    side: {
      ru: 'Каждый проект строится вокруг измеримого результата, а не вокруг технологии ради технологии.',
      en: 'Every project is built around a measurable result - not around technology for its own sake.',
    },
    sideTitle: 'OUTCOMES',
  },
  demoBadge: { ru: 'Демо-сценарий', en: 'Demo scenario' },
  demoNote: {
    ru: 'EastRide - собственный продукт студии, работает вживую. Два сценария рядом собраны на типовых процессах клиники и агентства недвижимости: цифры в них показывают, на какой результат мы проектируем систему.',
    en: 'EastRide is the studio’s own product, live in production. The two scenarios beside it are built on the typical processes of a clinic and a real-estate agency: their numbers show the outcome we design such systems for.',
  },
  items: [
    {
      id: 'eastride',
      isDemo: false,
      flagship: true,
      badge: { ru: 'Наш продукт · работает вживую', en: 'Our product · live' },
      industry: { ru: 'EastRide - travel-платформа', en: 'EastRide - travel platform' },
      problem: {
        ru: 'Запустить маркетплейс аренды байков и мото-туров по Азии командой без штата: сотни карточек техники, партнёры в 13 городах, заявки, контент и соцсети - всё требовало бы отдела операторов.',
        en: 'Launch a bike-rental and moto-tour marketplace across Asia without hiring a staff: hundreds of vehicle listings, partners in 13 cities, inquiries, content and social media - all of it would normally take a team of operators.',
      },
      solution: {
        ru: 'Построили всю инфраструктуру AI-инструментами: платформа eastride.cc, партнёрский Telegram-бот с кабинетом, CRM-контур, мгновенные уведомления о заявках, автогенерация и автопубликация контента по расписанию, SEO-автоматика.',
        en: 'We built the entire infrastructure with AI tooling: the eastride.cc platform, a partner Telegram bot with a dashboard, a CRM loop, instant inquiry notifications, scheduled content generation and auto-publishing, SEO automation.',
      },
      metrics: [
        { v: '180+', l: { ru: 'байков в каталоге', en: 'bikes in the catalog' } },
        { v: '13', l: { ru: 'городов Азии', en: 'cities across Asia' } },
        { v: '24/7', l: { ru: 'работа без операторов', en: 'runs without operators' } },
      ],
    },
    {
      id: 'clinic',
      isDemo: true,
      industry: { ru: 'Клиника', en: 'Clinic' },
      problem: {
        ru: 'Пациенты пишут в WhatsApp вечером и в выходные. Администраторы отвечают только в смену - к утру часть пациентов уже записалась к конкурентам.',
        en: 'Patients message on WhatsApp in the evenings and on weekends. Admins reply only during shifts - by morning some patients have already booked elsewhere.',
      },
      solution: {
        ru: 'AI-приём обращений в WhatsApp и на сайте: ответы на вопросы, запись на приём, интеграция с CRM и расписанием, напоминания о визите.',
        en: 'AI intake on WhatsApp and the website: answering questions, booking appointments, CRM and schedule integration, visit reminders.',
      },
      metrics: [
        { v: '<2 мин', vEn: '<2 min', l: { ru: 'время ответа', en: 'response time' } },
        { v: '24/7', l: { ru: 'приём обращений', en: 'inquiry intake' } },
        { v: '+35%', l: { ru: 'конверсия в запись', en: 'booking conversion' } },
      ],
    },
    {
      id: 'realestate',
      isDemo: true,
      industry: { ru: 'Недвижимость', en: 'Real estate' },
      problem: {
        ru: 'Лиды с рекламы падают в Instagram, Telegram и на сайт. Брокеры отвечают выборочно, CRM заполняется от случая к случаю - маркетинговый бюджет утекает.',
        en: 'Ad leads land in Instagram, Telegram and on the website. Brokers reply selectively, the CRM is updated sporadically - the marketing budget leaks away.',
      },
      solution: {
        ru: 'Единый AI-контур: квалификация по бюджету и объекту, автоматические карточки сделок, умное распределение по брокерам, follow-up цепочки.',
        en: 'A single AI loop: qualification by budget and property, automatic deal records, smart broker routing, follow-up sequences.',
      },
      metrics: [
        { v: '100%', l: { ru: 'лидов в CRM', en: 'of leads in the CRM' } },
        { v: '-70%', l: { ru: 'ручной работы', en: 'manual work' } },
        { v: '+35%', l: { ru: 'конверсия в встречи', en: 'meeting conversion' } },
      ],
    },
  ],
};

// ── Подход (5 шагов) ───────────────────────────────────────────────────
export const APPROACH_SYS = {
  head: {
    num: { ru: 'ПОДХОД', en: 'APPROACH' },
    title: { ru: 'Сначала процесс,', en: 'Process first,' },
    titleIt: { ru: 'потом технологии', en: 'technology second' },
    side: {
      ru: 'Мы не продаём готовую коробку. Мы разбираем, как работает ваш бизнес, и собираем систему под него.',
      en: 'We do not sell a pre-built box. We study how your business works and assemble a system around it.',
    },
    sideTitle: 'HOW WE WORK',
  },
  steps: [
    {
      num: '01',
      title: { ru: 'Разбираем процесс', en: 'Map the process' },
      desc: { ru: 'Изучаем текущую инфраструктуру, каналы, CRM и то, как сотрудники работают сейчас.', en: 'We study your current infrastructure, channels, CRM and how the team works today.' },
    },
    {
      num: '02',
      title: { ru: 'Находим узкие места', en: 'Find the bottlenecks' },
      desc: { ru: 'Определяем, где бизнес теряет заявки, время или деньги.', en: 'We pinpoint where the business loses leads, time or money.' },
    },
    {
      num: '03',
      title: { ru: 'Проектируем систему', en: 'Design the system' },
      desc: { ru: 'Выбираем AI, автоматизации и интеграции, которые действительно нужны - без лишнего.', en: 'We choose the AI, automations and integrations that are actually needed - nothing extra.' },
    },
    {
      num: '04',
      title: { ru: 'Внедряем', en: 'Deploy' },
      desc: { ru: 'Подключаем систему к существующей инфраструктуре - без перестройки компании под нас.', en: 'We plug the system into your existing infrastructure - without rebuilding the company around us.' },
    },
    {
      num: '05',
      title: { ru: 'Проверяем и улучшаем', en: 'Measure & improve' },
      desc: { ru: 'Смотрим на реальные данные и дорабатываем workflow, пока метрики не встанут на место.', en: 'We look at real data and refine the workflow until the metrics settle where they should.' },
    },
  ],
};

// ── Интеграции ─────────────────────────────────────────────────────────
export const INTEGRATIONS_SYS = {
  head: {
    num: { ru: 'СОВМЕСТИМОСТЬ', en: 'COMPATIBILITY' },
    title: { ru: 'Ничего менять', en: 'Nothing to replace' },
    titleIt: { ru: 'не придётся', en: 'on your side' },
    side: {
      ru: 'Система подключается к тому, чем вы уже пользуетесь. Переезжать, переучивать команду и покупать новые сервисы не нужно.',
      en: 'The system plugs into what you already use. No migrations, no retraining, no new subscriptions.',
    },
    sideTitle: 'INTEGRATIONS',
  },
  // Группы на языке пользы: сначала что это даёт, потом чем именно делаем
  groups: [
    {
      label: { ru: 'Ваша CRM остаётся вашей', en: 'Your CRM stays yours' },
      desc: {
        ru: 'Заявки и диалоги попадают туда, где команда уже работает - карточки создаются и обновляются сами.',
        en: 'Leads and conversations land where your team already works - records are created and updated automatically.',
      },
      items: ['Битрикс24', 'amoCRM', 'HubSpot'],
      itemsEn: ['Bitrix24', 'amoCRM', 'HubSpot'],
    },
    {
      label: { ru: 'Каналы, где пишут клиенты', en: 'The channels your customers use' },
      desc: {
        ru: 'Подключаем мессенджеры, соцсети, почту и сайт - все обращения сходятся в один поток.',
        en: 'We connect messengers, social media, email and the website - every inquiry flows into one place.',
      },
      items: ['WhatsApp', 'Telegram', 'Instagram', 'Email', 'Сайт'],
      itemsEn: ['WhatsApp', 'Telegram', 'Instagram', 'Email', 'Website'],
    },
    {
      label: { ru: 'Мозг системы', en: 'The brain of the system' },
      desc: {
        ru: 'Модели, которые понимают контекст переписки и отвечают по вашим правилам и базе знаний.',
        en: 'Models that understand conversation context and answer by your rules and knowledge base.',
      },
      items: ['Claude', 'OpenAI'],
      itemsEn: ['Claude', 'OpenAI'],
    },
    {
      label: { ru: 'Связывающая логика', en: 'The wiring in between' },
      desc: {
        ru: 'Сценарии, по которым данные ходят между сервисами: кто что получает, когда напомнить, куда передать.',
        en: 'The scenarios moving data between services: who gets what, when to remind, where to hand over.',
      },
      items: ['n8n', 'Make'],
      itemsEn: ['n8n', 'Make'],
    },
  ],
  note: {
    ru: 'Работаем и с другими сервисами - если у вас своя система, подключимся к ней через API.',
    en: 'We work with other tools too - if you run your own system, we connect to it via API.',
  },
};

// Плоский список для тикера в hero
export const TICKER_SYS = ['n8n', 'Make', 'OpenAI', 'Claude', 'Bitrix24', 'amoCRM', 'HubSpot', 'WhatsApp API', 'Telegram Bot', 'Instagram', 'Email', 'Analytics'];

// ── О нас ──────────────────────────────────────────────────────────────
export const ABOUT_SYS = {
  head: {
    num: { ru: 'О НАС', en: 'ABOUT' },
    title: { ru: 'Инженерная студия,', en: 'An engineering studio' },
    titleIt: { ru: 'а не агентство чат-ботов', en: 'not a chatbot agency' },
    side: {
      ru: 'AIVFX проектирует системы под процесс конкретной компании - от архитектуры до внедрения и поддержки.',
      en: 'AIVFX designs systems around a specific company’s process - from architecture to deployment and support.',
    },
    sideTitle: 'AIVFX AI SYSTEMS',
  },
  paragraphs: [
    {
      ru: 'Мы начинали как AI-продакшн: генеративное видео, VFX и автоматизированные контент-конвейеры для брендов. Именно там мы научились главному - собирать из AI-моделей, API и интеграций рабочие системы, которые крутятся каждый день без присмотра.',
      en: 'We started as an AI production studio: generative video, VFX and automated content pipelines for brands. That is where we learned the key skill - assembling AI models, APIs and integrations into working systems that run every day without supervision.',
    },
    {
      ru: 'Сегодня главный фокус AIVFX - AI-системы и автоматизации для бизнеса: приём и квалификация заявок, ассистенты, процессы. Для кого это? Клиники, недвижимость, юридические и сервисные компании, образовательные проекты - любой бизнес с потоком обращений и отделом продаж.',
      en: 'Today the main focus of AIVFX is AI systems and automation for business: lead intake and qualification, assistants, processes. Who is it for? Clinics, real estate, legal and service companies, education projects - any business with an inquiry flow and a sales team.',
    },
  ],
  audience: {
    title: { ru: 'Для кого', en: 'Who it’s for' },
    items: [
      { ru: 'Клиники и стоматологии', en: 'Clinics & dental practices' },
      { ru: 'Недвижимость', en: 'Real estate' },
      { ru: 'Юридические компании', en: 'Legal firms' },
      { ru: 'Сервисные компании', en: 'Service companies' },
      { ru: 'Образовательные проекты', en: 'Education projects' },
      { ru: 'Отделы продаж с потоком заявок', en: 'Sales teams with inquiry flow' },
    ],
  },
  // Честный перенос доверия: бренды из видео-направления
  brands: {
    label: { ru: 'Выросли из AI-продакшна - делали работы для', en: 'We grew out of AI production - with work for' },
    items: ['AUDI', 'PORSCHE', 'DYSON', 'DANUBE', 'NL INT.', 'WHITEWILL', 'CINQUE', 'DEHANCER'],
  },
  founder: {
    name: { ru: 'Артем Шуткин', en: 'Artem Shutkin' },
    role: { ru: 'Основатель AIVFX', en: 'Founder, AIVFX' },
    line: {
      ru: 'Каждый проект веду лично - от разбора процесса до запуска и сопровождения. Мне важно, чтобы система реально работала в вашем бизнесе, а не красиво выглядела в презентации.',
      en: 'I run every project personally - from process mapping to launch and support. What matters to me is a system that actually works in your business, not one that just looks good in a deck.',
    },
  },
  videoNote: {
    text: {
      ru: 'Второе направление студии - AI-видеопродакшн: реклама, продуктовые ролики и контент.',
      en: 'The studio’s second direction is AI video production: ads, product videos and content.',
    },
    link: { ru: 'Смотреть направление AI-видео →', en: 'Explore AI video →' },
  },
};

// ── FAQ (новый, про системы) ───────────────────────────────────────────
export const FAQ_SYS = [
  {
    q: { ru: 'Чем вы отличаетесь от агентства чат-ботов?', en: 'How are you different from a chatbot agency?' },
    a: {
      ru: 'Чат - лишь один из интерфейсов. Мы проектируем систему целиком: приём обращений, квалификация, CRM, распределение, follow-up и аналитика. Продаём не бота, а решение конкретной операционной проблемы с измеримым результатом.',
      en: 'Chat is just one interface. We design the whole system: intake, qualification, CRM, routing, follow-up and analytics. We sell not a bot but a solution to a specific operational problem, with a measurable result.',
    },
  },
  {
    q: { ru: 'Придётся ли менять нашу CRM или сервисы?', en: 'Will we have to change our CRM or tools?' },
    a: {
      ru: 'Нет. Система встраивается в существующий стек: вашу CRM, мессенджеры, телефонию и таблицы. Мы адаптируемся под вас, а не наоборот.',
      en: 'No. The system plugs into your existing stack: your CRM, messengers, telephony and spreadsheets. We adapt to you - not the other way around.',
    },
  },
  {
    q: { ru: 'Сколько это стоит?', en: 'How much does it cost?' },
    a: {
      ru: 'Зависит от объёма: количества каналов, интеграций и сценариев. Начинаем с разбора процесса - после него даём архитектуру решения и точную смету.',
      en: 'It depends on scope: the number of channels, integrations and scenarios. We start by mapping your process - then provide the solution architecture and an exact estimate.',
    },
  },
  {
    q: { ru: 'Какие сроки внедрения?', en: 'How long does deployment take?' },
    a: {
      ru: 'Первый работающий контур - обычно от 2 до 6 недель в зависимости от сложности. Дальше система развивается итерациями на реальных данных.',
      en: 'A first working loop typically takes 2-6 weeks depending on complexity. After that the system evolves in iterations on real data.',
    },
  },
  {
    q: { ru: 'Что если AI ответит клиенту неправильно?', en: 'What if the AI gives a customer a wrong answer?' },
    a: {
      ru: 'Ассистент отвечает только на основе вашей базы знаний и согласованных сценариев, а сложные и чувствительные случаи сразу передаёт человеку. Границы полномочий AI фиксируются на этапе проектирования.',
      en: 'The assistant answers only from your knowledge base and approved scenarios, and hands complex or sensitive cases straight to a human. The AI’s limits are defined at the design stage.',
    },
  },
  {
    q: { ru: 'Что происходит после запуска?', en: 'What happens after launch?' },
    a: {
      ru: 'Система остаётся на нашем сопровождении: мониторим работу, разбираем реальные диалоги и дорабатываем сценарии. Если что-то меняется на стороне подключённых сервисов - чиним мы, а не вы.',
      en: 'The system stays under our care: we monitor it, review real conversations and refine scenarios. If something changes on the side of connected services - we fix it, not you.',
    },
  },
  {
    q: { ru: 'Что с данными и безопасностью?', en: 'What about data and security?' },
    a: {
      ru: 'Данные остаются в вашей инфраструктуре и ваших сервисах. Доступы выдаются по минимуму, ключи и токены - только на вашей стороне.',
      en: 'Data stays in your infrastructure and your tools. Access is granted on a least-privilege basis; keys and tokens remain on your side.',
    },
  },
];

// ── Контакты ───────────────────────────────────────────────────────────
export const CONTACT_SYS = {
  head: {
    num: { ru: 'КОНТАКТ', en: 'CONTACT' },
    title: { ru: 'Обсудим', en: 'Let’s discuss' },
    titleIt: { ru: 'вашу задачу', en: 'your case' },
    side: {
      ru: 'Опишите процесс или проблему - вернёмся с вопросами и предложением архитектуры в течение 24 часов.',
      en: 'Describe your process or problem - we will come back with questions and a proposed architecture within 24 hours.',
    },
    sideTitle: 'START',
  },
  briefLabel: { ru: 'ЗАДАЧА', en: 'YOUR CASE' },
  briefPlaceholder: {
    ru: 'Опишите процесс, который хотите автоматизировать: откуда приходят заявки, какая CRM, что сейчас болит...',
    en: 'Describe the process you want to automate: where inquiries come from, which CRM you use, what hurts today...',
  },
};

// ── Футер ──────────────────────────────────────────────────────────────
export const FOOTER_SYS = {
  desc: {
    ru: 'Студия AI-систем и автоматизаций для бизнеса. Проектируем и внедряем решения от первой заявки до повторных продаж.',
    en: 'A studio for business AI systems and automation. We design and deploy solutions from the first inquiry to repeat sales.',
  },
  servicesTitle: { ru: 'УСЛУГИ', en: 'SERVICES' },
  services: [
    { slug: 'ai-sales-automation', label: { ru: 'AI для заявок и продаж', en: 'AI for leads & sales' } },
    { slug: 'ai-assistants', label: { ru: 'AI-ассистенты', en: 'AI assistants' } },
    { slug: 'business-process-automation', label: { ru: 'Автоматизация процессов', en: 'Process automation' } },
  ],
  videoLink: { ru: 'AI-видеопродакшн', en: 'AI video production' },
  // Обучение показываем только в русском футере: услуга русскоязычная,
  // и в английской версии ссылка вела бы в никуда
  training: [
    { slug: 'obuchenie-ai-video', label: { ru: 'Обучение AI-видео' } },
    { slug: 'obuchenie-ii-dlya-biznesa', label: { ru: 'ИИ в работе компании' } },
  ],
};

// ── Страница /video-production (второе направление) ────────────────────
export const VIDEO_PAGE = {
  kicker: { ru: 'НАПРАВЛЕНИЕ / AI-ВИДЕОПРОДАКШН', en: 'DIRECTION / AI VIDEO PRODUCTION' },
  title: { ru: 'AI-видео и VFX', en: 'AI video & VFX' },
  titleIt: { ru: 'для брендов', en: 'for brands' },
  sub: {
    ru: 'Второе направление AIVFX: рекламные ролики, продуктовые видео и вирусный контент с помощью генеративного AI и классического VFX.',
    en: 'AIVFX’s second direction: commercials, product videos and viral content built with generative AI and classic VFX. Hollywood-grade quality in days, not weeks.',
  },
  portfolioCta: { ru: 'Смотреть портфолио', en: 'View portfolio' },
  contactCta: { ru: 'Обсудить ролик', en: 'Discuss a video' },
  blogNote: {
    ru: 'Гайды и разборы AI-видео - в нашем блоге.',
    en: 'AI video guides and breakdowns live in our blog.',
  },
};

// ── CTA-врезка между секциями главной ──────────────────────────────────
export const CTA_BREAK = {
  title: { ru: 'Разберём ваш процесс и предложим архитектуру', en: 'We will map your process and propose an architecture' },
  sub: { ru: 'Разбор бесплатный. Ответ - в течение 24 часов.', en: 'The review is free. Reply within 24 hours.' },
  btn: { ru: 'Обсудить задачу', en: 'Discuss your case' },
  tg: { ru: 'Написать в Telegram', en: 'Message on Telegram' },
  tgUrl: 'https://t.me/aivfx',
};

// ── Видео-направление: форматы работы БЕЗ цен (смета под задачу) ───────
export const VIDEO_FORMATS = {
  head: {
    num: { ru: 'ФОРМАТЫ', en: 'FORMATS' },
    title: { ru: 'Три формата', en: 'Three formats' },
    titleIt: { ru: 'работы', en: 'of engagement' },
    side: {
      ru: 'Стоимость считаем сметой под задачу. Бриф бесплатный, оценка - в течение 24 часов.',
      en: 'Pricing is a per-project estimate. The brief is free; you get the quote within 24 hours.',
    },
    sideTitle: 'HOW WE WORK',
  },
  items: [
    {
      name: { ru: 'Тест-ролик', en: 'Test video' },
      timing: { ru: '~72 часа', en: '~72 hours' },
      desc: { ru: 'Проверить формат и качество на короткой задаче.', en: 'Validate the format and quality on a short task.' },
      features: [
        { ru: '1-2 минуты готового видео', en: '1-2 minutes of finished video' },
        { ru: 'AI-генерация + базовый VFX', en: 'AI generation + basic VFX' },
        { ru: '3 итерации правок', en: '3 revision rounds' },
      ],
    },
    {
      name: { ru: 'Кампания', en: 'Campaign' },
      timing: { ru: '~1 неделя', en: '~1 week' },
      desc: { ru: 'Основной ролик плюс адаптации под площадки.', en: 'A hero video plus platform adaptations.' },
      popular: true,
      features: [
        { ru: 'Ролик до 5 минут + адаптации', en: 'Up to 5 minutes + adaptations' },
        { ru: 'Продвинутый AI + сложный VFX, 4K', en: 'Advanced AI + complex VFX, 4K' },
        { ru: 'Безлимит правок, персональный менеджер', en: 'Unlimited revisions, dedicated manager' },
      ],
    },
    {
      name: { ru: 'Флагман', en: 'Flagship' },
      timing: { ru: '~2 недели', en: '~2 weeks' },
      desc: { ru: 'Фильм бренда с полной кастомизацией.', en: 'A brand film with full customization.' },
      features: [
        { ru: 'Без ограничений по длительности', en: 'No duration limits' },
        { ru: 'Голливудский VFX, многокамерные сцены', en: 'Hollywood-grade VFX, multi-camera scenes' },
        { ru: 'Полная кастомизация под бренд', en: 'Full customization for the brand' },
      ],
    },
  ],
  note: {
    ru: 'Точную смету и сроки присылаем после брифа - в течение 24 часов.',
    en: 'We send the exact estimate and timeline after the brief - within 24 hours.',
  },
};

// ── Видео-направление: FAQ без цен ─────────────────────────────────────
export const VIDEO_FAQ = [
  {
    q: { ru: 'Какие форматы видео вы делаете?', en: 'What video formats do you produce?' },
    a: { ru: 'Все популярные: от Reels и Shorts до полноформатных рекламных роликов и фильмов бренда. Адаптируем под любую площадку.', en: 'All popular ones: from Reels and Shorts to full-length commercials and brand films. We adapt to any platform.' },
  },
  {
    q: { ru: 'Как быстро будет готов ролик?', en: 'How fast will the video be ready?' },
    a: { ru: 'Тест-ролик - около 72 часов, кампания - около недели, флагманский проект - около двух. Точные сроки фиксируем в смете.', en: 'A test video takes about 72 hours, a campaign about a week, a flagship project about two. Exact timelines are fixed in the estimate.' },
  },
  {
    q: { ru: 'Сколько это стоит?', en: 'How much does it cost?' },
    a: { ru: 'Каждый проект считаем сметой под задачу: длительность, сложность графики, количество адаптаций. Бриф бесплатный, оценку присылаем в течение 24 часов.', en: 'Every project is priced individually: duration, VFX complexity, number of adaptations. The brief is free; we send the quote within 24 hours.' },
  },
  {
    q: { ru: 'Можно ли вносить правки?', en: 'Can we request revisions?' },
    a: { ru: 'Да. Количество итераций зависит от формата; в «Кампании» и «Флагмане» правки безлимитные.', en: 'Yes. The number of rounds depends on the format; Campaign and Flagship come with unlimited revisions.' },
  },
  {
    q: { ru: 'Чем AI-продакшн лучше классической съёмки?', en: 'Why is AI production better than a classic shoot?' },
    a: { ru: 'Без съёмочной группы, аренды локаций и месяцев постпродакшена: любые локации и сцены собираются в разы быстрее и заметно дешевле - при кинематографичной картинке.', en: 'No film crew, location rentals or months of post: any location or scene comes together several times faster and materially cheaper - with a cinematic image.' },
  },
];

// ── Видео-направление: свой контакт-контекст ───────────────────────────
export const VIDEO_CONTACT = {
  head: {
    num: { ru: 'КОНТАКТ', en: 'CONTACT' },
    title: { ru: 'Обсудим', en: 'Let’s discuss' },
    titleIt: { ru: 'ваш ролик', en: 'your video' },
    side: {
      ru: 'Опишите задачу и референсы - вернёмся со сметой и сроками в течение 24 часов.',
      en: 'Describe the task and references - we will come back with an estimate and timeline within 24 hours.',
    },
    sideTitle: 'START',
  },
  briefLabel: { ru: 'ЗАДАЧА', en: 'YOUR BRIEF' },
  briefPlaceholder: {
    ru: 'Опишите ролик: продукт, длительность, референсы, дедлайн...',
    en: 'Describe the video: product, duration, references, deadline...',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// ДЕМО-АССИСТЕНТ НА САЙТЕ
// Сайт сам показывает продукт: ассистент консультирует по сценарию и
// доводит до контакта. Ответы настоящие (не выдумка модели), поэтому
// консультация честная; сложные вопросы честно передаются человеку.
// Позже подключается живой AI - достаточно заменить источник ответов.
// ═══════════════════════════════════════════════════════════════════════
export const CHAT_DEMO = {
  launcher: { ru: 'Спросить ассистента', en: 'Ask the assistant' },
  title: 'AIVFX Assistant',
  status: { ru: 'отвечает мгновенно · 24/7', en: 'replies instantly · 24/7' },
  // Бейдж «демо» убран: ассистент отвечает настоящей моделью, и подпись
  // занижала то, что студия продаёт. Вместо него строка под полем ввода -
  // она говорит ровно то, ради чего этот виджет тут стоит.
  // Одна строка, а не рекламный абзац: подробности и призыв к действию
  // живут на странице услуги, в узком окне чата им тесно и навязчиво
  pitch: {
    ru: 'Такой же ассистент - для вашего бизнеса',
    en: 'The same assistant, for your business',
  },
  inputPlaceholder: { ru: 'Напишите вопрос...', en: 'Type your question...' },
  greeting: {
    ru: 'Здравствуйте! Я AI-ассистент AIVFX - такой же, каких мы ставим клиентам. Расскажу, что мы делаем, и помогу понять, подойдёт ли это вашему бизнесу.',
    en: 'Hi! I am the AIVFX AI assistant - the same kind we build for clients. I can explain what we do and help you see whether it fits your business.',
  },
  // Свободный ввод: ключевые слова → узел сценария
  keywords: [
    { node: 'price', words: ['цен', 'стои', 'сколько', 'бюджет', 'price', 'cost', 'how much', 'budget'] },
    { node: 'time', words: ['срок', 'быстро', 'долго', 'когда', 'time', 'long', 'deadline'] },
    { node: 'what', words: ['что вы', 'чем занима', 'услуг', 'делаете', 'what do you', 'services'] },
    { node: 'crm', words: ['crm', 'црм', 'битрикс', 'amo', 'амо', 'hubspot', 'интеграц', 'integrat'] },
    { node: 'clinic', words: ['клиник', 'стомат', 'медиц', 'clinic', 'dental', 'medical'] },
    { node: 'realestate', words: ['недвиж', 'агентств', 'застройщ', 'real estate', 'property', 'broker'] },
    { node: 'diff', words: ['бот', 'отлич', 'чем вы', 'bot', 'differ', 'why you'] },
    { node: 'safety', words: ['данн', 'безопас', 'ошиб', 'галлюц', 'data', 'security', 'wrong', 'mistake'] },
    { node: 'contact', words: ['связ', 'обсуд', 'заяв', 'позвон', 'contact', 'talk', 'call', 'discuss'] },
  ],
  fallback: {
    ru: 'Хороший вопрос - на него точнее ответит человек, чем демо-сценарий. Оставьте контакт, и мы вернёмся с разбором именно вашей ситуации в течение 24 часов.',
    en: 'Good question - a human will answer it better than a demo script. Leave your contact and we will come back with a review of your specific case within 24 hours.',
  },
  // Стартовые подсказки
  start: ['what', 'price', 'time', 'diff'],
  nodes: {
    what: {
      q: { ru: 'Что вы делаете?', en: 'What do you do?' },
      a: {
        ru: 'Мы строим системы, которые работают с вашими заявками: принимают обращения из WhatsApp, Telegram, Instagram, сайта и почты, отвечают клиенту за секунды в любое время, квалифицируют, заносят всё в CRM и напоминают менеджеру о следующем шаге. Плюс автоматизируем внутреннюю рутину - документы, отчёты, уведомления.',
        en: 'We build systems that handle your inquiries: capture messages from WhatsApp, Telegram, Instagram, the website and email, reply within seconds at any hour, qualify the lead, log everything in your CRM and remind the manager about the next step. We also automate internal routine - documents, reports, notifications.',
      },
      next: ['clinic', 'realestate', 'crm', 'contact'],
    },
    price: {
      q: { ru: 'Сколько это стоит?', en: 'How much does it cost?' },
      a: {
        ru: 'Фиксированного прайса нет - считаем смету под задачу: сколько каналов подключаем, какие интеграции и сценарии нужны. Начинаем с бесплатного разбора вашего процесса, после него присылаем архитектуру решения и точную цифру - в течение 24 часов.',
        en: 'There is no fixed price list - we quote per project: how many channels, which integrations and scenarios are needed. We start with a free review of your process, then send the solution architecture and an exact figure - within 24 hours.',
      },
      next: ['time', 'diff', 'contact'],
    },
    time: {
      q: { ru: 'Какие сроки?', en: 'How long does it take?' },
      a: {
        ru: 'Первый работающий контур обычно запускаем за 2-6 недель - зависит от количества каналов и сложности сценариев. Дальше система развивается итерациями: смотрим на реальные диалоги и дорабатываем.',
        en: 'The first working loop usually goes live in 2-6 weeks, depending on the number of channels and scenario complexity. After that the system evolves in iterations: we review real conversations and refine it.',
      },
      next: ['price', 'safety', 'contact'],
    },
    diff: {
      q: { ru: 'Чем вы отличаетесь от чат-ботов?', en: 'How are you different from chatbots?' },
      a: {
        ru: 'Чат - только одно окно системы. Бот отвечает и на этом всё; наша система ведёт заявку дальше: квалифицирует клиента, создаёт сделку в CRM, передаёт менеджеру в нужный момент, запускает follow-up и показывает аналитику по воронке. Мы продаём не бота, а закрытую операционную проблему.',
        en: 'Chat is just one window of the system. A bot answers and stops there; our system carries the lead onward: qualifies the customer, creates the deal in your CRM, hands it to a manager at the right moment, triggers follow-ups and reports on the funnel. We sell a solved operational problem, not a bot.',
      },
      next: ['what', 'crm', 'contact'],
    },
    crm: {
      q: { ru: 'А наша CRM подойдёт?', en: 'Will it work with our CRM?' },
      a: {
        ru: 'Да. Работаем с Битрикс24, amoCRM, HubSpot, а если у вас своя система - подключаемся через API. Менять CRM или переучивать команду не нужно: система встраивается в то, чем вы уже пользуетесь.',
        en: 'Yes. We work with Bitrix24, amoCRM, HubSpot, and if you run your own system we connect via API. No need to change your CRM or retrain the team: the system plugs into what you already use.',
      },
      next: ['safety', 'time', 'contact'],
    },
    clinic: {
      q: { ru: 'У нас клиника', en: 'We run a clinic' },
      a: {
        ru: 'Частый сценарий. Пациенты пишут вечером и в выходные, а администратор отвечает в смену - и часть уходит к конкурентам. Ассистент отвечает сразу: консультирует по услугам, записывает на приём в ваше расписание, напоминает о визите и возвращает тех, кто не дошёл. Всё фиксируется в CRM.',
        en: 'A common scenario. Patients write in the evenings and on weekends while your front desk answers during shifts - and some go to competitors. The assistant replies instantly: explains services, books into your schedule, sends visit reminders and wins back no-shows. Everything is logged in the CRM.',
      },
      next: ['safety', 'price', 'contact'],
    },
    realestate: {
      q: { ru: 'У нас недвижимость', en: 'We are in real estate' },
      a: {
        ru: 'Тоже знакомо. Лиды с рекламы падают в разные каналы, брокеры отвечают выборочно, CRM заполняется как получится. Система собирает все обращения, квалифицирует по бюджету и объекту, распределяет между брокерами и ведёт follow-up цепочки - маркетинговый бюджет перестаёт утекать.',
        en: 'Familiar too. Ad leads land in different channels, brokers reply selectively, the CRM is filled in at random. The system collects every inquiry, qualifies by budget and property, routes to brokers and runs follow-up sequences - your marketing budget stops leaking.',
      },
      next: ['crm', 'price', 'contact'],
    },
    safety: {
      q: { ru: 'А если AI ошибётся?', en: 'What if the AI makes a mistake?' },
      a: {
        ru: 'Ассистент отвечает только из вашей базы знаний и согласованных сценариев - он не фантазирует. Границы полномочий задаём на старте: чувствительные темы (диагнозы, юридические оценки, скидки) он не трогает, а сразу передаёт человеку с полным контекстом переписки. Данные остаются в вашей инфраструктуре.',
        en: 'The assistant answers only from your knowledge base and approved scenarios - it does not improvise. We define its limits upfront: sensitive topics (diagnoses, legal assessments, discounts) go straight to a human with full conversation context. Your data stays in your infrastructure.',
      },
      next: ['crm', 'diff', 'contact'],
    },
    contact: {
      q: { ru: 'Хочу обсудить задачу', en: 'I want to discuss my case' },
      a: {
        ru: 'Отлично. Оставьте контакт - вернёмся с разбором вашего процесса и архитектурой решения в течение 24 часов. Или напишите сразу в Telegram, там отвечаем в течение часа.',
        en: 'Great. Leave your contact - we will come back with a review of your process and a solution architecture within 24 hours. Or message us on Telegram, where we reply within an hour.',
      },
      lead: true,
    },
  },
  lead: {
    namePlaceholder: { ru: 'Как к вам обращаться?', en: 'Your name' },
    contactPlaceholder: { ru: 'Telegram, телефон или email', en: 'Telegram, phone or email' },
    submit: { ru: 'Отправить', en: 'Send' },
    tg: { ru: 'Написать в Telegram', en: 'Message on Telegram' },
    tgUrl: 'https://t.me/aivfx',
    success: {
      ru: 'Записал, спасибо! Вернёмся в течение 24 часов. Если удобнее переписка - напишите в Telegram.',
      en: 'Got it, thank you! We will get back within 24 hours. If chat suits you better - write to us on Telegram.',
    },
    error: {
      ru: 'Не получилось отправить. Напишите, пожалуйста, в Telegram - так точно не потеряется.',
      en: 'Could not send it. Please write to us on Telegram - that way it will not get lost.',
    },
  },
};

// ── Видео-направление: витрина услуг с реальными кадрами ──────────────
// Кадры сгенерированы в фирменном луке студии (public/services/*.jpg),
// каждый иллюстрирует конкретную услугу - вместо абстрактных иконок.
export const VIDEO_SHOWCASE = {
  head: {
    num: { ru: 'ЧТО ДЕЛАЕМ', en: 'WHAT WE DO' },
    title: { ru: 'Шесть форматов', en: 'Six kinds of work' },
    titleIt: { ru: 'работы с кадром', en: 'with the frame' },
    side: {
      ru: 'Каждый кадр ниже сделан нашим пайплайном - это не стоковые картинки, а примеры того, что получает клиент.',
      en: 'Every frame below came out of our pipeline - these are not stock images but examples of what a client gets.',
    },
    sideTitle: 'CAPABILITIES',
  },
  items: [
    {
      // Единственный пункт витрины, где вместо кадра стоит сам ролик:
      // формат этого направления - движение, и статичной картинкой его
      // не показать. Постер - первый кадр ролика, он стоит в карточке,
      // пока видео не подгрузилось (грузится оно только на подъезде,
      // см. LazyVideo).
      video: '/services/s01-video.mp4',
      img: '/services/s01-video-poster.jpg',
      w: 1920,
      h: 1080,
      title: { ru: 'AI-генерация видео', en: 'AI video generation' },
      desc: {
        ru: 'Рекламный ролик от промпта до финального монтажа: сцены, свет и движение камеры собираются без съёмочной группы.',
        en: 'A commercial from prompt to final cut: scenes, light and camera moves assembled without a film crew.',
      },
      tag: { ru: 'реклама · промо', en: 'ads · promo' },
    },
    {
      img: '/services/s02-vfx.jpg',
      w: 1300,
      h: 732,
      title: { ru: 'VFX и композитинг', en: 'VFX & compositing' },
      desc: {
        ru: 'Эффекты, частицы, дым, разрушения и интеграция 3D в отснятый материал - на уровне большого продакшена.',
        en: 'Effects, particles, smoke, destruction and 3D integration into live footage - at big-production level.',
      },
      tag: { ru: 'эффекты · 3D', en: 'effects · 3D' },
    },
    {
      img: '/services/s03-hybrid.jpg',
      w: 1300,
      h: 726,
      title: { ru: 'Гибрид AI + съёмка', en: 'Hybrid AI + live action' },
      desc: {
        ru: 'Реальные кадры дополняем сгенерированными сценами и объектами - там, где снять дорого или невозможно.',
        en: 'Real footage extended with generated scenes and objects - where shooting would be costly or impossible.',
      },
      tag: { ru: 'съёмка · доработка', en: 'shoot · augment' },
    },
    {
      img: '/services/s04-formats.jpg',
      w: 1100,
      h: 822,
      title: { ru: 'Адаптация форматов', en: 'Format adaptation' },
      desc: {
        ru: 'Один ролик - десять площадок: вертикаль для Reels и Shorts, квадрат для ленты, широкий формат для сайта и ТВ.',
        en: 'One video, ten placements: vertical for Reels and Shorts, square for feed, widescreen for site and TV.',
      },
      tag: { ru: 'Reels · Shorts · ТВ', en: 'Reels · Shorts · TV' },
    },
    {
      img: '/services/s05-product.jpg',
      w: 1100,
      h: 822,
      title: { ru: 'Продуктовые демо', en: 'Product films' },
      desc: {
        ru: 'Фотореалистичные ролики о товаре без студии, логистики и предметного стола - с точной фактурой материалов.',
        en: 'Photorealistic product films without a studio, logistics or a tabletop rig - with accurate material texture.',
      },
      tag: { ru: 'продукт · e-com', en: 'product · e-com' },
    },
    {
      img: '/services/s06-avatar.jpg',
      w: 1100,
      h: 822,
      title: { ru: 'Виртуальные персонажи', en: 'Virtual presenters' },
      desc: {
        ru: 'Цифровые ведущие и лица бренда: говорят на любом языке, снимаются круглосуточно и не требуют дублей.',
        en: 'Digital presenters and brand faces: they speak any language, shoot around the clock and never need a second take.',
      },
      tag: { ru: 'аватары · липсинк', en: 'avatars · lip-sync' },
    },
  ],
};

// ── Видео-направление: как проходит работа ────────────────────────────
export const VIDEO_PROCESS = {
  head: {
    num: { ru: 'ПРОЦЕСС', en: 'PROCESS' },
    title: { ru: 'Как рождается', en: 'How a video' },
    titleIt: { ru: 'ролик', en: 'comes to life' },
    side: {
      ru: 'Прозрачный путь от брифа до финального файла: вы видите результат на каждом этапе и правите до того, как он станет дорогим.',
      en: 'A transparent path from brief to final file: you see the result at every stage and adjust before changes get expensive.',
    },
    sideTitle: 'WORKFLOW',
  },
  lead: {
    ru: 'Пять этапов, на каждом из которых вы получаете готовый материал, а не обещание. Чем раньше правка, тем дешевле она стоит: поменять кадр на раскадровке это минуты, поменять его же в готовом ролике это пересборка сцены.',
    en: 'Five stages, and at each one you get finished material rather than a promise. The earlier a change comes, the cheaper it is: swapping a frame on the storyboard takes minutes, swapping the same frame in a finished film means rebuilding the scene.',
  },
  steps: [
    {
      num: '01',
      title: { ru: 'Бриф и референсы', en: 'Brief & references' },
      desc: {
        ru: 'Разбираем задачу, площадки и настроение. Собираем мудборд, чтобы говорить об одном и том же, а не про «что-то динамичное».',
        en: 'We map the task, placements and mood, and build a moodboard so we discuss the same thing instead of “something dynamic”.',
      },
      detail: [
        { ru: 'Куда идёт ролик и что должен сделать со зрителем', en: 'Where the video runs and what it should do to the viewer' },
        { ru: 'Референсы по свету, темпу и монтажу', en: 'References for light, pace and editing' },
        { ru: 'Ограничения бренда: палитра, шрифты, тон', en: 'Brand constraints: palette, type, tone of voice' },
      ],
      out: { ru: 'мудборд', en: 'moodboard' },
      time: { ru: '1-2 дня', en: '1-2 days' },
    },
    {
      num: '02',
      title: { ru: 'Сценарий и раскадровка', en: 'Script & storyboard' },
      desc: {
        ru: 'Пишем сценарий и показываем кадры до продакшена. Правки на этом этапе стоят ноль, и именно поэтому мы их здесь и ждём.',
        en: 'We write the script and show the frames before production. Changes cost nothing at this point, which is exactly why we want them here.',
      },
      detail: [
        { ru: 'Покадровый план: что в кадре, как движется камера', en: 'A shot-by-shot plan: what is in frame, how the camera moves' },
        { ru: 'Хронометраж каждой сцены под площадку', en: 'Timing for each scene, matched to the placement' },
        { ru: 'Черновой текст закадрового голоса', en: 'A draft of the voice-over script' },
      ],
      out: { ru: 'раскадровка', en: 'storyboard' },
      time: { ru: '2-3 дня', en: '2-3 days' },
    },
    {
      num: '03',
      title: { ru: 'Генерация и съёмка', en: 'Generation & shooting' },
      desc: {
        ru: 'Собираем сцены нашим пайплайном, при необходимости добавляем реальные съёмочные кадры. Каждый кадр проходит отбор: в сборку идёт лучший дубль из нескольких.',
        en: 'We build the scenes with our pipeline and add real footage where it is needed. Every shot goes through selection: the best take of several makes the cut.',
      },
      detail: [
        { ru: 'Несколько вариантов на каждый ключевой кадр', en: 'Several options for every key shot' },
        { ru: 'Единый лук по всей сцене: свет, оптика, зерно', en: 'One look across the scene: light, optics, grain' },
        { ru: 'Досъёмка там, где генерация не даёт точности', en: 'Live footage where generation cannot be precise enough' },
      ],
      out: { ru: 'черновые сцены', en: 'rough scenes' },
      time: { ru: '3-7 дней', en: '3-7 days' },
    },
    {
      num: '04',
      title: { ru: 'Монтаж, звук, грейд', en: 'Edit, sound, grade' },
      desc: {
        ru: 'Собираем ритм, добавляем музыку и озвучку, приводим картинку к единому фирменному луку. С этого момента ролик уже можно смотреть целиком.',
        en: 'We build the rhythm, add music and voice-over, and unify the image into one signature look. From here the film can be watched end to end.',
      },
      detail: [
        { ru: 'Ритм под музыку, а не музыка под готовый монтаж', en: 'Rhythm built to the music, not music dropped onto a finished cut' },
        { ru: 'Озвучка, шумы и сведение звука', en: 'Voice-over, sound design and the audio mix' },
        { ru: 'Цветокоррекция и титры в стиле бренда', en: 'Colour grading and titles in the brand style' },
      ],
      out: { ru: 'превью-версия', en: 'preview cut' },
      time: { ru: '2-4 дня', en: '2-4 days' },
    },
    {
      num: '05',
      title: { ru: 'Правки и сдача', en: 'Revisions & delivery' },
      desc: {
        ru: 'Вносим замечания и отдаём финал во всех нужных форматах и разрешениях, включая вертикальные адаптации и версии с субтитрами.',
        en: 'We apply your notes and deliver the final in every format and resolution you need, including vertical adaptations and subtitled versions.',
      },
      detail: [
        { ru: 'Два круга правок входят в работу', en: 'Two rounds of revisions are included' },
        { ru: 'Мастер до 4K плюс адаптации под площадки', en: 'A master up to 4K plus placement adaptations' },
        { ru: 'Исходники и права на использование', en: 'Source files and usage rights' },
      ],
      out: { ru: 'мастер-файлы', en: 'master files' },
      time: { ru: '1-2 дня', en: '1-2 days' },
    },
  ],
};

// ── Видео-направление: что получает клиент ────────────────────────────
export const VIDEO_DELIVERABLES = {
  head: {
    num: { ru: 'НА ВЫХОДЕ', en: 'DELIVERABLES' },
    title: { ru: 'Что вы получаете', en: 'What you get' },
    titleIt: { ru: 'в конце', en: 'at the end' },
    side: {
      ru: 'Не только готовый ролик, но и всё, что нужно, чтобы запустить его в любой канал.',
      en: 'Not just a finished video, but everything you need to launch it in any channel.',
    },
    sideTitle: 'OUTPUT',
  },
  items: [
    { t: { ru: 'Мастер до 4K', en: 'Master up to 4K' }, d: { ru: 'Финальный файл в максимальном качестве, готовый к эфиру и сайту.', en: 'The final file at maximum quality, ready for broadcast and web.' } },
    { t: { ru: 'Адаптации под площадки', en: 'Platform adaptations' }, d: { ru: 'Вертикаль, квадрат и широкий формат с правильной композицией, а не обрезкой.', en: 'Vertical, square and widescreen - recomposed, not just cropped.' } },
    { t: { ru: 'Версии с субтитрами', en: 'Subtitled versions' }, d: { ru: 'Для ленты без звука - вшитые титры в фирменном стиле.', en: 'For sound-off feeds - burned-in captions in your brand style.' } },
    { t: { ru: 'Обложки и стоп-кадры', en: 'Covers & stills' }, d: { ru: 'Кадры из ролика для превью, баннеров и постов.', en: 'Frames from the video for thumbnails, banners and posts.' } },
    { t: { ru: 'Исходники по запросу', en: 'Source files on request' }, d: { ru: 'Проектные файлы и слои, если планируете дорабатывать сами.', en: 'Project files and layers if you plan to iterate in-house.' } },
    { t: { ru: 'Права на использование', en: 'Usage rights' }, d: { ru: 'Материал ваш: используйте в рекламе, соцсетях и на любых носителях.', en: 'The material is yours: use it in ads, social media and any medium.' } },
  ],
};
