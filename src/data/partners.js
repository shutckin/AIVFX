/**
 * Партнёрские ссылки. Единственное место, где они лежат.
 *
 * Зачем отдельный файл: ссылка с партнёрской меткой рано или поздно
 * меняется, и менять её в двадцати статьях руками - гарантированная
 * потеря денег на забытом абзаце. В статьях пишем `partner:syntx`
 * вместо адреса, а реальный адрес подставляется отсюда.
 *
 * Правила по таким ссылкам:
 * - в разметке они уходят с rel="sponsored nofollow", чтобы поисковик
 *   видел, что это реклама, а не рекомендация редакции;
 * - рядом обязательно стоит честная подпись, что ссылка партнёрская;
 * - партнёрский блок ставим только там, где человек и так ищет способ
 *   оплаты. В обзорных статьях его не место: обзор превращается в
 *   рекламу, и Яндекс за это понижает страницу.
 */

export const PARTNERS = {
  syntx: {
    name: 'SYNTX',
    url: 'https://t.me/syntxaibot?start=aff_572494981',
    ru: {
      kicker: 'чем пользуемся сами',
      title: 'Оплата рублями через SYNTX',
      copy:
        'Агрегатор с оплатой российской картой: девяносто с лишним инструментов и четыре десятка моделей по одной подписке, работает в Telegram и в браузере, интерфейс русский. Мы держим его как рабочий доступ к моделям, для которых своя подписка не нужна каждый месяц.',
      action: 'Открыть SYNTX в Telegram',
      note:
        'Ссылка партнёрская: мы получаем процент с подписки. Для вас цена та же, что и по обычной ссылке.',
    },
    en: {
      kicker: 'what we use ourselves',
      title: 'Paying in roubles through SYNTX',
      copy:
        'An aggregator that accepts Russian cards: ninety-plus tools and four dozen models on one subscription, available in Telegram and in the browser. We keep it as working access to models that do not justify a monthly subscription of their own.',
      action: 'Open SYNTX in Telegram',
      note:
        'This is an affiliate link: we receive a share of the subscription. The price for you is the same as through any other link.',
    },
  },
};

/** Адрес партнёра по идентификатору. Неизвестный id возвращает пустую строку. */
export const partnerUrl = (id) => (PARTNERS[id] ? PARTNERS[id].url : '');

/** Тексты партнёрского блока под язык страницы. */
export const partnerText = (id, locale) => {
  const p = PARTNERS[id];
  if (!p) return null;
  return { name: p.name, url: p.url, ...(locale === 'en' ? p.en : p.ru) };
};

/** Номер счётчика Метрики, тот же, что в public/index.html. */
const METRIKA_ID = 109098541;

/**
 * Отметить клик по партнёрской ссылке как цель в Метрике.
 *
 * Нужно, чтобы понимать, доходит ли поисковый трафик до кнопки: в кабинете
 * партнёрки видно только оплаты, а не переходы. Если Метрика заблокирована
 * или ещё не загрузилась, функция молча ничего не делает: ссылка обязана
 * открыться в любом случае.
 */
export const trackPartnerClick = (id) => {
  try {
    if (typeof window !== 'undefined' && typeof window.ym === 'function') {
      window.ym(METRIKA_ID, 'reachGoal', `partner_${id}`);
    }
  } catch (e) {
    /* аналитика не должна ломать переход */
  }
};
