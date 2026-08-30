#!/usr/bin/env node
/**
 * Сообщаем поисковикам, что страницы обновились.
 *
 * Зачем, если есть карта сайта. Карту краулер перечитывает по своему
 * расписанию — от суток до недель. Проверено на этом сайте: последний
 * массовый обход Яндекса был 29 мая, а статьи выходили и после. Пока
 * страницу не обошли, её в поиске нет вообще, сколько бы хорошей она
 * ни была.
 *
 * IndexNow — общий протокол, его слушают Яндекс, Bing, Seznam, Naver.
 * Google в нём НЕ участвует и узнаёт об изменениях по своей карте
 * сайта и обходу; ускорить его этим способом нельзя.
 *
 * КЛЮЧ НЕ СЕКРЕТ. Протокол сам требует выложить его открытым текстом
 * по адресу /{ключ}.txt — так поисковик убеждается, что уведомление
 * шлёт владелец домена. Поэтому он константа в коде, а не секрет
 * сборки. При смене ключа поменять надо в двух местах разом: здесь и
 * в имени файла в public/.
 *
 * Запуск:  node scripts/indexnow-ping.js           — все адреса карты
 *          node scripts/indexnow-ping.js /blog/foo/ /blog/bar/  — точечно
 *
 * Вызывается шагом деплоя после выкладки. Ошибку наружу не бросает:
 * это подсказка поисковику, а не часть выкладки, и ронять из-за неё
 * зелёный деплой было бы хуже, чем прожить без мгновенного пинга.
 */
const fs = require('fs');
const path = require('path');

const HOST = 'aivfx.ru';
const SITE = `https://${HOST}`;
const KEY = '034465f1218aab2406126c902687bb26';

const SITEMAP = path.resolve(__dirname, '..', 'public', 'sitemap.xml');

const urlsFromSitemap = () => {
  const xml = fs.readFileSync(SITEMAP, 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
};

const main = async () => {
  const args = process.argv.slice(2);
  const urls = args.length
    ? args.map((p) => (p.startsWith('http') ? p : SITE + (p.startsWith('/') ? p : `/${p}`)))
    : urlsFromSitemap();

  if (!urls.length) {
    console.log('  Нечего отправлять: в карте сайта нет адресов.');
    return;
  }

  // Файл-подтверждение должен лежать на сайте — без него поисковик
  // ответит 403 и молча проигнорирует все адреса
  const keyFile = path.resolve(__dirname, '..', 'public', `${KEY}.txt`);
  if (!fs.existsSync(keyFile)) {
    console.log(`  ПРОПУСК: нет файла public/${KEY}.txt, поисковик не примет уведомление.`);
    return;
  }

  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  });

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body,
    });
    // 200 — принято, 202 — принято и поставлено в очередь на проверку ключа
    if (res.status === 200 || res.status === 202) {
      console.log(`  IndexNow: отправлено ${urls.length} адресов, ответ ${res.status}.`);
    } else {
      const text = await res.text().catch(() => '');
      console.log(`  IndexNow отказал: ${res.status} ${text.slice(0, 200)}`);
    }
  } catch (e) {
    console.log(`  IndexNow недоступен: ${e.message}`);
  }
};

main();
