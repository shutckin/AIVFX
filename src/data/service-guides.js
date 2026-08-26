// ── Развёрнутые гайды на страницах услуг ───────────────────────────────
//
// Страница /services/<slug>/ раньше была короткой карточкой-лендингом.
// Здесь лежит её вторая, содержательная половина: разбор того, как
// устроена система, как проходит внедрение и что считать результатом.
// Задача двойная — объяснить процесс человеку и дать поисковикам текст,
// за который страницу вообще есть смысл показывать.
//
// Структура блоков намеренно бедная: 'p' — абзац, 'list' — маркированный
// список, 'steps' — нумерованные шаги, 'note' — выделенная врезка.
// Ничего больше в вёрстке гайда не нужно.

export const SERVICE_GUIDES = {
  // ═══════════════════════════════════════════════════════════════════════
  'ai-sales-automation': {
    readTime: { ru: '9 минут чтения', en: '9 min read' },
    lead: {
      ru: 'Разбор того, как устроена система приёма и обработки заявок: из каких узлов она собирается, что происходит с обращением на каждом шаге, сколько занимает внедрение и по каким цифрам понятно, что она работает.',
      en: 'A breakdown of how an inbound lead system is actually built: which parts it consists of, what happens to an inquiry at every step, how long deployment takes and which numbers tell you it is working.',
    },
    sections: [
      {
        id: 'chto-eto',
        h: { ru: 'Чем система отличается от чат-бота', en: 'How a system differs from a chatbot' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Чат-бот — это интерфейс. Он умеет вести диалог в одном канале и на этом заканчивается: дальше человек всё равно руками переносит данные, ставит задачу менеджеру и вспоминает, кому нужно перезвонить. Поэтому бизнес часто разочаровывается — бот поставили, а количество потерянных заявок не изменилось.',
              en: 'A chatbot is an interface. It can hold a conversation in one channel and that is where it ends: a human still copies the data over by hand, assigns the task to a manager and tries to remember who needs a call back. That is why businesses get disappointed — the bot is live, but the number of lost leads has not moved.',
            },
          },
          {
            type: 'p',
            text: {
              ru: 'Система — это цепочка, которая доводит обращение от первого сообщения до записи в CRM и напоминания через сутки. Диалог в ней всего лишь один из узлов. Ценность создаёт не то, что кто-то ответил клиенту, а то, что после ответа обращение не исчезло.',
              en: 'A system is a chain that carries an inquiry from the first message all the way to a CRM record and a follow-up reminder a day later. The conversation is just one node in it. The value is not that somebody replied to the customer — it is that the inquiry did not vanish afterwards.',
            },
          },
          {
            type: 'note',
            text: {
              ru: 'Простой тест на зрелость: попросите показать, что происходит с заявкой через 48 часов после первого сообщения. Если ответ — «менеджер посмотрит в переписке», это ещё не система.',
              en: 'A simple maturity test: ask to see what happens to a lead 48 hours after the first message. If the answer is “the manager will check the chat history”, it is not a system yet.',
            },
          },
        ],
      },
      {
        id: 'uzly',
        h: { ru: 'Из чего собирается система', en: 'What the system is made of' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Архитектура почти всегда одна и та же, меняется только наполнение под отрасль. Пять узлов, каждый из которых решает свою задачу и может быть заменён отдельно от остальных.',
              en: 'The architecture is nearly always the same; only the content changes per industry. Five nodes, each solving its own job and each replaceable independently of the rest.',
            },
          },
          {
            type: 'steps',
            items: [
              {
                ru: 'Приём. Все каналы — сайт, WhatsApp, Telegram, Instagram Direct, почта, телефония — сводятся в одну точку входа. С этого момента у обращения появляется единый идентификатор, по которому его можно найти.',
                en: 'Capture. Every channel — website, WhatsApp, Telegram, Instagram DM, email, phone — flows into a single entry point. From that moment the inquiry has one identifier you can trace it by.',
              },
              {
                ru: 'Понимание. Модель читает сообщение в контексте всей переписки и истории клиента: что человек хочет, повторное ли это обращение, какой продукт обсуждается, есть ли срочность.',
                en: 'Understanding. The model reads the message in the context of the whole thread and the customer history: what the person wants, whether this is a repeat inquiry, which product is being discussed, whether it is urgent.',
              },
              {
                ru: 'Квалификация. Система задаёт недостающие вопросы — вежливо и по одному, а не анкетой — и отделяет целевые обращения от спама, вакансий и «просто спросить».',
                en: 'Qualification. The system asks the missing questions — politely and one at a time, not as a form — and separates real leads from spam, job applications and idle curiosity.',
              },
              {
                ru: 'Фиксация. Сделка создаётся в CRM с заполненными полями и полной историей переписки. Ручной ввод исчезает как класс, вместе с опечатками в номерах телефона.',
                en: 'Recording. A deal is created in the CRM with fields filled in and the full conversation attached. Manual entry disappears as a category, and with it the typos in phone numbers.',
              },
              {
                ru: 'Доведение. Менеджер получает уведомление там, где он реально работает. Если реакции нет — эскалация. Если клиент не ответил — follow-up по расписанию, а не по памяти.',
                en: 'Follow-through. The manager gets a notification where they actually work. No reaction — escalation. Customer went quiet — a scheduled follow-up rather than one somebody remembered.',
              },
            ],
          },
        ],
      },
      {
        id: 'vnedrenie',
        h: { ru: 'Как проходит внедрение', en: 'How deployment works' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Мы не начинаем с выбора модели или платформы. Начинаем с разбора: садимся и смотрим, как обращение проходит через компанию сегодня — от какого канала до какого человека, где оно ждёт, где теряется и кто об этом узнаёт.',
              en: 'We do not start by choosing a model or a platform. We start with a walkthrough: we sit down and map how an inquiry travels through the company today — from which channel to which person, where it waits, where it is lost and who finds out about it.',
            },
          },
          {
            type: 'list',
            items: [
              {
                ru: 'Неделя 1 — разбор процесса, доступы к каналам и CRM, согласование архитектуры и границ ответственности системы.',
                en: 'Week 1 — process walkthrough, access to channels and CRM, sign-off on the architecture and on the limits of the system’s responsibility.',
              },
              {
                ru: 'Недели 2–3 — сборка первого контура на одном канале и одном сценарии. Он уже работает вживую, но под наблюдением.',
                en: 'Weeks 2–3 — the first loop is assembled on one channel and one scenario. It is already live, but supervised.',
              },
              {
                ru: 'Недели 4–6 — подключение остальных каналов, тонкая настройка ответов на реальных диалогах, правила эскалации и отчётность.',
                en: 'Weeks 4–6 — the remaining channels are connected, answers are tuned on real conversations, escalation rules and reporting are added.',
              },
              {
                ru: 'Дальше — развитие итерациями. Каждый месяц смотрим, на каких вопросах система спотыкается, и дообучаем её на этих же вопросах.',
                en: 'After that — iterative development. Every month we look at where the system stumbles and retrain it on exactly those questions.',
              },
            ],
          },
          {
            type: 'p',
            text: {
              ru: 'Первый работающий контур обычно появляется за две–шесть недель в зависимости от того, сколько каналов и интеграций нужно завести. Запускать всё сразу мы не советуем: на одном канале ошибки видно быстрее и стоят они дешевле.',
              en: 'A first working loop usually appears within two to six weeks depending on how many channels and integrations are involved. We advise against launching everything at once: on a single channel mistakes surface faster and cost less.',
            },
          },
        ],
      },
      {
        id: 'metriki',
        h: { ru: 'По каким цифрам судить о результате', en: 'Which numbers tell you it works' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Количество сообщений, которые обработал ИИ, — метрика для презентации, а не для бизнеса. Смотреть нужно на другое.',
              en: 'The number of messages the AI handled is a metric for a slide deck, not for a business. Look at these instead.',
            },
          },
          {
            type: 'list',
            items: [
              {
                ru: 'Время до первого ответа — медиана, а не среднее, и отдельно по ночам и выходным. Именно там прячется основная потеря.',
                en: 'Time to first response — the median, not the average, and split out for nights and weekends. That is where most of the loss hides.',
              },
              {
                ru: 'Доля обращений, дошедших до CRM. Если она не 100%, где-то остался ручной шаг.',
                en: 'Share of inquiries that reached the CRM. If it is not 100%, a manual step is still in the chain somewhere.',
              },
              {
                ru: 'Доля квалифицированных заявок в общем потоке — показывает, сколько времени менеджеров освободилось.',
                en: 'Share of qualified leads in the total flow — it shows how much manager time was freed up.',
              },
              {
                ru: 'Конверсия из обращения в запись или встречу до и после запуска. Это единственная цифра, которая интересует собственника.',
                en: 'Conversion from inquiry to booking or meeting, before and after launch. This is the only number an owner actually cares about.',
              },
              {
                ru: 'Количество follow-up, отправленных по расписанию. До автоматизации оно почти всегда равно нулю.',
                en: 'Number of follow-ups sent on schedule. Before automation it is almost always zero.',
              },
            ],
          },
        ],
      },
      {
        id: 'oshibki',
        h: { ru: 'Частые ошибки', en: 'Common mistakes' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Первая и самая дорогая — попытка заставить систему продавать вместо человека. ИИ хорошо снимает рутину: принимает, уточняет, фиксирует, напоминает. Решение о сделке и работа с сомнениями остаются за менеджером, и это не временное ограничение технологии, а разумное распределение ролей.',
              en: 'The first and most expensive one is trying to make the system sell instead of a human. AI is good at removing routine: capturing, clarifying, recording, reminding. Closing the deal and handling objections stay with the manager — and that is not a temporary limitation of the technology but a sensible division of labour.',
            },
          },
          {
            type: 'p',
            text: {
              ru: 'Вторая — автоматизировать процесс, который сам по себе сломан. Если в компании нет правила, кто и за какое время отвечает на заявку, система просто начнёт быстрее доставлять обращения в ту же пустоту. Сначала правило, потом автоматизация.',
              en: 'The second is automating a process that is broken to begin with. If the company has no rule about who answers an inquiry and how fast, the system will simply deliver inquiries into the same void more quickly. The rule comes first, the automation second.',
            },
          },
          {
            type: 'p',
            text: {
              ru: 'Третья — прятать от клиента, что он говорит с ассистентом. Это всегда вскрывается и всегда стоит доверия. Гораздо лучше работает честная формулировка и мгновенная передача человеку по первой просьбе.',
              en: 'The third is hiding from the customer that they are talking to an assistant. It always comes out and it always costs trust. An honest line plus an instant handover to a human on first request works far better.',
            },
          },
        ],
      },
      {
        id: 'smeta',
        h: { ru: 'От чего зависит смета', en: 'What drives the estimate' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Мы не публикуем прайс, потому что одинаковых внедрений не бывает: система на один канал и одну CRM и система на шесть каналов с телефонией и складом отличаются на порядок. Смета считается после разбора процесса, и на неё влияют четыре вещи.',
              en: 'We do not publish a price list because no two deployments are alike: a system on one channel with one CRM and a system across six channels with telephony and inventory differ by an order of magnitude. The estimate follows the process walkthrough and depends on four things.',
            },
          },
          {
            type: 'list',
            items: [
              { ru: 'Количество каналов, из которых приходят обращения.', en: 'How many channels inquiries arrive from.' },
              { ru: 'Количество и зрелость интеграций: у современных CRM есть API, у самописных систем — далеко не всегда.', en: 'The number and maturity of integrations: modern CRMs have APIs, in-house systems often do not.' },
              { ru: 'Сложность сценариев: одно дело записать на консультацию, другое — подобрать объект по десятку параметров.', en: 'Scenario complexity: booking a consultation is one thing, matching a property against a dozen parameters is another.' },
              { ru: 'Объём базы знаний, которую системе нужно освоить, и то, в каком виде она существует сегодня.', en: 'The size of the knowledge base the system has to absorb — and what shape it is in today.' },
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: { ru: 'Нужно ли менять CRM?', en: 'Do we need to change our CRM?' },
        a: {
          ru: 'Нет. Система встраивается в то, что у вас уже стоит — Bitrix24, amoCRM, HubSpot или самописное решение с API. Менять инструменты ради внедрения мы не предлагаем.',
          en: 'No. The system plugs into what you already run — Bitrix24, amoCRM, HubSpot or an in-house tool with an API. We do not propose changing your tooling for the sake of the deployment.',
        },
      },
      {
        q: { ru: 'Что будет, если система не поймёт вопрос?', en: 'What happens if the system does not understand a question?' },
        a: {
          ru: 'Она не выдумывает ответ. Непонятое обращение помечается и передаётся человеку с пометкой о том, что именно осталось неясным. Эти случаи мы разбираем на регулярной основе — они и есть материал для дообучения.',
          en: 'It does not invent an answer. The unresolved inquiry is flagged and handed to a human along with a note about what stayed unclear. We review those cases regularly — they are the raw material for retraining.',
        },
      },
      {
        q: { ru: 'Клиент поймёт, что говорит с ИИ?', en: 'Will the customer realise they are talking to AI?' },
        a: {
          ru: 'Мы всегда рекомендуем сказать об этом прямо и дать возможность позвать человека в один клик. Скрытность даёт краткосрочный эффект и долгосрочный ущерб репутации.',
          en: 'We always recommend saying so plainly and offering a one-click handover to a person. Concealment gives a short-term effect and long-term reputational damage.',
        },
      },
      {
        q: { ru: 'Кому принадлежат данные и ключи?', en: 'Who owns the data and the keys?' },
        a: {
          ru: 'Вам. Данные остаются в вашей инфраструктуре и ваших сервисах, ключи и токены заводятся на вашей стороне, доступы выдаются по минимуму и отзываются в один шаг.',
          en: 'You do. Data stays in your infrastructure and your services, keys and tokens live on your side, access is granted minimally and revoked in one step.',
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  'ai-assistants': {
    readTime: { ru: '8 минут чтения', en: '8 min read' },
    lead: {
      ru: 'Как устроен ассистент, который отвечает не общими словами, а по документам компании: где живёт база знаний, как проверяется качество до запуска и почему главное умение ассистента — вовремя замолчать.',
      en: 'How to build an assistant that answers from company documents rather than in generalities: where the knowledge base lives, how quality is verified before launch, and why the assistant’s most important skill is knowing when to stop talking.',
    },
    sections: [
      {
        id: 'dva-tipa',
        h: { ru: 'Два типа ассистентов', en: 'Two kinds of assistant' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Внешний ассистент говорит с клиентом: консультирует на сайте и в мессенджерах, объясняет условия, помогает выбрать, записывает. У него жёсткие рамки по тону и по темам, и он всегда должен уметь передать диалог человеку.',
              en: 'An external assistant talks to customers: it advises on the website and in messengers, explains terms, helps choose, books appointments. It has hard limits on tone and topics, and it must always be able to hand the conversation to a human.',
            },
          },
          {
            type: 'p',
            text: {
              ru: 'Внутренний ассистент говорит с сотрудником: находит пункт в регламенте, поднимает историю по клиенту, готовит черновик документа, отвечает на вопросы новичка вместо того, чтобы он шёл к коллеге. Здесь рамки мягче, зато требования к точности выше — на основании его ответа человек примет решение.',
              en: 'An internal assistant talks to employees: it finds the clause in a policy, pulls up a customer’s history, drafts a document, answers a newcomer’s questions instead of them walking over to a colleague. The limits here are softer, but the accuracy bar is higher — a person will act on its answer.',
            },
          },
          {
            type: 'p',
            text: {
              ru: 'Технически это одна и та же архитектура. Разница в базе знаний, в правах доступа и в том, что считается допустимой ошибкой.',
              en: 'Technically it is the same architecture. The difference is in the knowledge base, in access rights, and in what counts as an acceptable mistake.',
            },
          },
        ],
      },
      {
        id: 'baza-znanij',
        h: { ru: 'База знаний важнее модели', en: 'The knowledge base matters more than the model' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Выбор модели — самая переоценённая часть задачи. Современные модели примерно одинаково хорошо формулируют; разница между хорошим и бесполезным ассистентом почти всегда в том, что ему дали читать.',
              en: 'Choosing the model is the most overrated part of the job. Modern models phrase things about equally well; the difference between a good assistant and a useless one is almost always in what it was given to read.',
            },
          },
          {
            type: 'p',
            text: {
              ru: 'Поэтому первый этап работы — не промпты, а сбор и вычистка знаний: прайсы, регламенты, ответы на частые вопросы, описания услуг, ограничения и исключения. Часто выясняется, что половина этого существует только в голове у руководителя отдела, и мы помогаем это записать.',
              en: 'So the first stage is not prompting but collecting and cleaning up knowledge: price lists, policies, FAQs, service descriptions, limitations and exceptions. It often turns out half of it exists only in a department head’s memory — and we help write it down.',
            },
          },
          {
            type: 'note',
            text: {
              ru: 'Побочный эффект, который клиенты ценят отдельно: после сборки базы знаний у компании впервые появляется актуальный, единый и проверенный свод правил. Им начинают пользоваться люди, а не только ассистент.',
              en: 'A side effect clients value on its own: once the knowledge base is assembled, the company has a single, current, verified set of rules for the first time. People start using it, not just the assistant.',
            },
          },
        ],
      },
      {
        id: 'granicy',
        h: { ru: 'Где ассистент обязан замолчать', en: 'Where the assistant must stop' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Самая опасная черта языковой модели — готовность ответить на что угодно. Именно поэтому границы проектируются раньше, чем сценарии диалога.',
              en: 'The most dangerous trait of a language model is its willingness to answer anything. That is exactly why the boundaries are designed before the dialogue scenarios.',
            },
          },
          {
            type: 'list',
            items: [
              { ru: 'Всё, что связано со здоровьем, правом и деньгами клиента, — только по утверждённым формулировкам, без импровизации.', en: 'Anything touching a customer’s health, legal position or money — approved wording only, no improvisation.' },
              { ru: 'Скидки, исключения из правил и индивидуальные условия — всегда человек.', en: 'Discounts, exceptions and individual terms — always a human.' },
              { ru: 'Жалоба, конфликт или явное раздражение в тоне — мгновенная передача с полным контекстом.', en: 'A complaint, a conflict or clear irritation in tone — instant handover with full context.' },
              { ru: 'Вопрос, ответа на который нет в базе, — честное «уточню и вернусь», а не правдоподобная выдумка.', en: 'A question the knowledge base does not cover — an honest “let me check and come back” rather than a plausible invention.' },
            ],
          },
        ],
      },
      {
        id: 'proverka',
        h: { ru: 'Как проверяется качество до запуска', en: 'How quality is verified before launch' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Ассистента нельзя выпускать к клиентам «на глазок». Перед запуском мы собираем набор проверочных диалогов — обычно 60–150 реальных вопросов из вашей переписки, включая неудобные, — и прогоняем ассистента по ним после каждого изменения.',
              en: 'You cannot release an assistant to customers on a hunch. Before launch we assemble a test set — typically 60 to 150 real questions from your own conversation history, awkward ones included — and run the assistant against them after every change.',
            },
          },
          {
            type: 'p',
            text: {
              ru: 'Это скучная, но решающая часть работы: она превращает «вроде отвечает нормально» в измеримую долю верных ответов и показывает, что именно сломалось, когда вы добавили новый прайс.',
              en: 'It is the boring but decisive part of the job: it turns “seems to answer fine” into a measurable share of correct answers and shows exactly what broke when you added a new price list.',
            },
          },
          {
            type: 'p',
            text: {
              ru: 'После запуска набор продолжает пополняться: каждый случай, где ассистент ошибся или спасовал, попадает в него и больше не повторяется незамеченным.',
              en: 'After launch the set keeps growing: every case where the assistant erred or gave up is added to it and never repeats unnoticed.',
            },
          },
        ],
      },
      {
        id: 'kanaly',
        h: { ru: 'Каналы и интеграции', en: 'Channels and integrations' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Один и тот же ассистент живёт сразу везде, где вы общаетесь с клиентом: виджет на сайте, WhatsApp, Telegram, Instagram Direct, почта. Логика и база знаний общие, меняется только оформление ответа под канал — в мессенджере короче, на сайте можно позволить себе список.',
              en: 'The same assistant lives everywhere you talk to customers at once: a website widget, WhatsApp, Telegram, Instagram DM, email. The logic and knowledge base are shared; only the formatting changes per channel — shorter in a messenger, a list is acceptable on the site.',
            },
          },
          {
            type: 'p',
            text: {
              ru: 'Отдельно настраивается доступ к живым данным: расписание врача, наличие на складе, статус заказа. Без этого ассистент остаётся справочником, а с этим начинает отвечать на вопросы, ради которых люди и пишут.',
              en: 'Access to live data is configured separately: a doctor’s schedule, stock availability, order status. Without it the assistant stays a reference book; with it, it starts answering the questions people actually write in about.',
            },
          },
        ],
      },
      {
        id: 'podderzhka',
        h: { ru: 'Что происходит после запуска', en: 'What happens after launch' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Ассистент — не коробка, которую поставили и забыли. У компании меняются цены, услуги и правила, и база знаний должна меняться вместе с ними. Мы передаём заказчику простой способ обновлять её без разработчика и раз в месяц смотрим статистику: какие вопросы приходят чаще всего, где ассистент передаёт человеку, что стоит добавить.',
              en: 'An assistant is not a box you install and forget. Prices, services and rules change, and the knowledge base has to change with them. We hand over a simple way to update it without a developer and review the stats monthly: which questions come up most, where the assistant hands off, what is worth adding.',
            },
          },
        ],
      },
    ],
    faq: [
      {
        q: { ru: 'Ассистент может выдумать ответ?', en: 'Can the assistant make an answer up?' },
        a: {
          ru: 'Может — если построить его неправильно. Мы ограничиваем ответы базой знаний компании и учим честно признавать, когда информации нет. Проверочный набор диалогов существует именно для того, чтобы ловить такие случаи до клиентов.',
          en: 'It can — if it is built badly. We constrain answers to the company knowledge base and train it to admit honestly when information is missing. The test dialogue set exists precisely to catch such cases before customers do.',
        },
      },
      {
        q: { ru: 'На каком языке он отвечает?', en: 'Which language does it answer in?' },
        a: {
          ru: 'На языке клиента. Это редко бывает проблемой: современные модели свободно переключаются, а тон и терминологию мы фиксируем отдельно для каждого языка.',
          en: 'The customer’s. That is rarely a problem: modern models switch freely, and we fix tone and terminology separately for each language.',
        },
      },
      {
        q: { ru: 'Сколько занимает запуск?', en: 'How long does launch take?' },
        a: {
          ru: 'Обычно две–четыре недели, и львиная доля этого времени уходит не на разработку, а на сбор и вычистку базы знаний. Чем лучше у вас записаны правила, тем быстрее.',
          en: 'Usually two to four weeks, and most of that goes not into development but into collecting and cleaning the knowledge base. The better your rules are written down, the faster it goes.',
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  'business-process-automation': {
    readTime: { ru: '8 минут чтения', en: '8 min read' },
    lead: {
      ru: 'Какие процессы окупаются первыми, как описать процесс так, чтобы его вообще можно было автоматизировать, чем отличаются n8n, Make и собственный код и что делать, когда сценарий однажды упадёт.',
      en: 'Which processes pay off first, how to describe a process so it can be automated at all, how n8n, Make and custom code differ, and what to do when a scenario eventually breaks.',
    },
    sections: [
      {
        id: 'chto-avtomatizirovat',
        h: { ru: 'Что автоматизировать первым', en: 'What to automate first' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Соблазн начать с самого сложного и заметного процесса велик, но окупается обратный подход. Первыми стоит брать задачи, у которых сходятся три признака: они повторяются много раз в неделю, выполняются по понятному правилу и стоят кому-то живого времени.',
              en: 'The temptation to start with the most complex, most visible process is strong, but the opposite approach pays off. Take the tasks where three traits meet first: they repeat many times a week, they follow a clear rule, and they cost somebody real time.',
            },
          },
          {
            type: 'list',
            items: [
              { ru: 'Перенос данных между системами — из формы в CRM, из CRM в таблицу, из таблицы в бухгалтерию.', en: 'Moving data between systems — from a form to the CRM, from the CRM to a spreadsheet, from the spreadsheet to accounting.' },
              { ru: 'Формирование документов: договоры, счета, акты, коммерческие предложения по шаблону.', en: 'Producing documents: contracts, invoices, statements, template-based proposals.' },
              { ru: 'Отчёты, которые кто-то собирает руками каждый понедельник.', en: 'Reports somebody assembles by hand every Monday.' },
              { ru: 'Напоминания и согласования, которые держатся на чьей-то памяти.', en: 'Reminders and approvals that rest on somebody’s memory.' },
              { ru: 'Распределение заявок и задач по правилам, которые все и так знают наизусть.', en: 'Routing leads and tasks by rules everyone already knows by heart.' },
            ],
          },
          {
            type: 'p',
            text: {
              ru: 'Такие задачи скучные, и именно поэтому их автоматизация возвращает вложения быстрее всего: результат виден в первую же неделю, а риск ошибки минимальный.',
              en: 'Those tasks are boring, and that is exactly why automating them returns the investment fastest: the result shows up in the first week and the risk of error is minimal.',
            },
          },
        ],
      },
      {
        id: 'opisanie',
        h: { ru: 'Как описать процесс перед автоматизацией', en: 'Describing a process before automating it' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Автоматизировать можно только то, что описано. Чаще всего процесс в компании существует в виде «Марина знает, как это делается», и первый честный шаг — вытащить это знание наружу.',
              en: 'You can only automate what has been described. Most often the process exists as “Marina knows how it is done”, and the first honest step is getting that knowledge out into the open.',
            },
          },
          {
            type: 'steps',
            items: [
              { ru: 'Что запускает процесс: письмо, заявка, дата, действие в CRM.', en: 'What starts the process: an email, a lead, a date, an action in the CRM.' },
              { ru: 'Какие данные нужны на входе и откуда они берутся.', en: 'What data is needed as input and where it comes from.' },
              { ru: 'Какие решения принимаются по пути и по какому правилу.', en: 'Which decisions are made along the way and by what rule.' },
              { ru: 'Что считается успешным завершением — и как это проверить.', en: 'What counts as successful completion — and how to verify it.' },
              { ru: 'Что делать при исключении: нет данных, отказ сервиса, нестандартный случай.', en: 'What to do on an exception: missing data, service failure, an edge case.' },
            ],
          },
          {
            type: 'p',
            text: {
              ru: 'Последний пункт пропускают чаще всего, и именно он определяет, будет ли автоматизация надёжной. Сценарий, у которого не продуман отказ, однажды тихо перестанет работать, и узнают об этом через неделю по недовольному клиенту.',
              en: 'The last point is skipped most often, and it is the one that decides whether the automation will be reliable. A scenario with no failure path will one day quietly stop working, and you will find out a week later from an unhappy customer.',
            },
          },
        ],
      },
      {
        id: 'instrumenty',
        h: { ru: 'n8n, Make или собственный код', en: 'n8n, Make or custom code' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Вопрос инструмента решается не вкусом, а тремя вещами: сложностью логики, требованиями к данным и тем, кто будет это поддерживать через год.',
              en: 'The tooling question is settled not by taste but by three things: how complex the logic is, what the data requirements are, and who will maintain it a year from now.',
            },
          },
          {
            type: 'list',
            items: [
              {
                ru: 'Make — быстрый старт для линейных сценариев с популярными сервисами. Отлично подходит, когда логика простая и её редко меняют.',
                en: 'Make — a fast start for linear scenarios with popular services. Great when the logic is simple and rarely changes.',
              },
              {
                ru: 'n8n — когда сценариев много, логика ветвится и данные не должны покидать вашу инфраструктуру: его можно поставить на собственный сервер.',
                en: 'n8n — when there are many scenarios, the logic branches, and the data must not leave your infrastructure: it can be self-hosted.',
              },
              {
                ru: 'Собственный код — когда нагрузка высокая, интеграция нестандартная или требуется поведение, которое в конструкторе выражается через десять костылей.',
                en: 'Custom code — when the load is high, the integration is non-standard, or the required behaviour would take ten workarounds in a visual builder.',
              },
            ],
          },
          {
            type: 'p',
            text: {
              ru: 'В реальных проектах это почти всегда смесь: тяжёлая логика в коде, обвязка и интеграции в n8n. Мы стараемся, чтобы бо́льшая часть системы оставалась в наглядном виде — так её сможет прочитать не только автор.',
              en: 'In real projects it is nearly always a mix: heavy logic in code, wiring and integrations in n8n. We try to keep most of the system in a visual form — so somebody other than its author can read it.',
            },
          },
        ],
      },
      {
        id: 'nadezhnost',
        h: { ru: 'Надёжность: что будет, когда сломается', en: 'Reliability: what happens when it breaks' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Любая автоматизация однажды упадёт: сменится формат ответа у стороннего сервиса, истечёт токен, кто-то переименует колонку в таблице. Вопрос не в том, случится ли это, а в том, узнаете ли вы об этом в тот же час.',
              en: 'Every automation eventually breaks: a third-party service changes its response format, a token expires, somebody renames a column in a spreadsheet. The question is not whether it happens but whether you find out within the hour.',
            },
          },
          {
            type: 'list',
            items: [
              { ru: 'Повторные попытки с нарастающей паузой — большинство сбоев сетевые и проходят сами.', en: 'Retries with backoff — most failures are network hiccups and resolve on their own.' },
              { ru: 'Уведомление ответственному человеку при отказе, а не запись в лог, который никто не читает.', en: 'A notification to a responsible human on failure, not an entry in a log nobody reads.' },
              { ru: 'Очередь необработанных задач: когда сервис вернётся, они доедут, а не потеряются.', en: 'A queue of unprocessed jobs: when the service comes back they get through instead of being lost.' },
              { ru: 'Ручной обход для критичных процессов — чтобы бизнес не встал целиком из-за одного упавшего сценария.', en: 'A manual fallback for critical processes — so the business does not stop entirely because of one broken scenario.' },
            ],
          },
        ],
      },
      {
        id: 'dostupy',
        h: { ru: 'Данные и доступы', en: 'Data and access' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Автоматизация по определению получает доступ к рабочим данным компании, и это место, где не стоит экономить на аккуратности. Мы придерживаемся простых правил: ключи и токены заводятся на стороне заказчика, доступ выдаётся по минимуму необходимого, каждый сервис получает отдельный ключ, который можно отозвать, не ломая остальное.',
              en: 'Automation by definition gets access to a company’s working data, and this is not the place to economise on care. We stick to simple rules: keys and tokens are created on the client’s side, access is granted at the minimum needed, and each service gets its own key that can be revoked without breaking the rest.',
            },
          },
          {
            type: 'p',
            text: {
              ru: 'При завершении работ доступы передаются заказчику вместе с описанием того, что где лежит. Ситуация, когда компания не может обслуживать собственную автоматизацию без подрядчика, нас не устраивает.',
              en: 'When the work is done, access is handed to the client along with documentation of what sits where. A situation where a company cannot maintain its own automation without the contractor is not acceptable to us.',
            },
          },
        ],
      },
      {
        id: 'okupaemost',
        h: { ru: 'Как считать окупаемость', en: 'How to calculate the payback' },
        blocks: [
          {
            type: 'p',
            text: {
              ru: 'Считать нужно до внедрения, иначе спорить о результате будет не с чем. Формула простая: сколько раз в месяц выполняется операция, умножить на время одного выполнения, умножить на стоимость часа сотрудника. Это верхняя граница экономии.',
              en: 'Do the maths before the deployment, otherwise there is nothing to compare the result against. The formula is simple: how many times a month the operation runs, times the duration of one run, times the hourly cost of the employee. That is the upper bound of the saving.',
            },
          },
          {
            type: 'p',
            text: {
              ru: 'К ней стоит добавить то, что обычно не считают: стоимость ошибок ручного ввода, стоимость задержек в согласованиях и стоимость того, что квалифицированный сотрудник занят копированием строк вместо работы, ради которой его нанимали.',
              en: 'To that you should add what usually goes uncounted: the cost of manual-entry errors, the cost of delays in approvals, and the cost of a qualified employee copying rows instead of doing the work they were hired for.',
            },
          },
        ],
      },
    ],
    faq: [
      {
        q: { ru: 'Мы небольшая компания — нам это рано?', en: 'We are a small company — is it too early for us?' },
        a: {
          ru: 'Скорее наоборот. В большой компании рутину распределяют по людям, в маленькой она вся падает на двух–трёх человек, и именно там час освобождённого времени стоит дороже всего.',
          en: 'Rather the opposite. In a large company routine is spread across people; in a small one it all lands on two or three, and that is exactly where an hour of freed time is worth the most.',
        },
      },
      {
        q: { ru: 'Придётся ли менять инструменты, к которым все привыкли?', en: 'Will we have to change the tools everyone is used to?' },
        a: {
          ru: 'Нет. Автоматизация встраивается между существующими сервисами и работает в фоне. Для сотрудника в идеале не меняется вообще ничего, кроме того, что часть работы перестаёт появляться.',
          en: 'No. The automation slots in between existing services and runs in the background. Ideally nothing changes for an employee except that a chunk of the work stops appearing.',
        },
      },
      {
        q: { ru: 'Что если процесс изменится через полгода?', en: 'What if the process changes in six months?' },
        a: {
          ru: 'Это нормальный сценарий, и мы закладываем его заранее: сценарии собираются модульно, а правила по возможности выносятся в настройки, чтобы менять их без разработчика.',
          en: 'That is a normal scenario and we plan for it: automations are built modularly and rules are moved into settings wherever possible so they can be changed without a developer.',
        },
      },
    ],
  },
};

// Общие подписи вокруг гайда
export const GUIDE_UI = {
  toc: { ru: 'В этом материале', en: 'In this guide' },
  faqTitle: { ru: 'Частые вопросы', en: 'Frequently asked questions' },
};
