# Презентация «AI-ассистент в CRM»

`crm-assistant.html` - исходник, `AIVFX-ассистент-в-CRM.pdf` - версия для отправки.

Для клиентов: как заявка проходит путь от сообщения до сделки, что видит
клиент и что видит менеджер, что ассистент пишет в карточку и что приходит
менеджеру в мессенджер, правила ассистента, этапы внедрения.

Семь слайдов. Карточка сделки и уведомление на слайдах 3 и 4 повторяют то,
что ассистент заполняет на самом деле: менять их вместе с `lib/bitrix-crm.js`
в `aivfx-lead-api`, иначе презентация начнёт врать.
Технических деталей нет намеренно - они в `crm-bitrix24-playbook.md`.

Пересобрать PDF после правок html:

```js
// scripts/_pdf.tmp.js, запустить node scripts/_pdf.tmp.js docs/presentation, потом удалить
const puppeteer = require('puppeteer'); const dir = process.argv[2];
(async () => {
  const b = await puppeteer.launch({ headless: 'new' }); const p = await b.newPage();
  // Ширину окна задать обязательно: иначе печать идёт в узком окне,
  // срабатывает мобильная вёрстка и схема падает в один столбец.
  await p.setViewport({ width: 1123, height: 794, deviceScaleFactor: 2 });
  await p.goto('file://' + process.cwd() + '/' + dir + '/crm-assistant.html', { waitUntil: 'networkidle0' });
  await p.emulateMediaType('print');
  // Формат листа здесь, а не через @page size: с preferCSSPageSize Chrome
  // считает страницу книжной. Поля нулевые, отступы держит сам слайд.
  await p.pdf({ path: dir + '/AIVFX-ассистент-в-CRM.pdf', format: 'A4', landscape: true, printBackground: true });
  await b.close();
})();
```
