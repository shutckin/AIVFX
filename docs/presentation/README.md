# Презентация «AI-ассистент в CRM»

`crm-assistant.html` - исходник, `AIVFX-ассистент-в-CRM.pdf` - версия для отправки.

Для клиентов: как заявка проходит путь от сообщения до сделки, что видит
клиент и что видит менеджер, правила ассистента, этапы внедрения.
Технических деталей нет намеренно - они в `crm-bitrix24-playbook.md`.

Пересобрать PDF после правок html:

```js
// scripts/_pdf.tmp.js, запустить node scripts/_pdf.tmp.js docs/presentation, потом удалить
const puppeteer = require('puppeteer'); const dir = process.argv[2];
(async () => {
  const b = await puppeteer.launch({ headless: 'new' }); const p = await b.newPage();
  await p.goto('file://' + process.cwd() + '/' + dir + '/crm-assistant.html', { waitUntil: 'networkidle0' });
  await p.emulateMediaType('print');
  await p.pdf({ path: dir + '/AIVFX-ассистент-в-CRM.pdf', format: 'A4', landscape: true, printBackground: true,
    margin: { top: '12mm', right: '14mm', bottom: '12mm', left: '14mm' } });
  await b.close();
})();
```
