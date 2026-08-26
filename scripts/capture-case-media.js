// Скриншоты живого EastRide для флагманского кейса на aivfx.ru
const puppeteer = require('puppeteer');
const SHOTS = [
  { url: 'https://eastride.cc/en',       out: 'public/case-media/eastride-home.jpg' },
  { url: 'https://eastride.cc/en/bikes', out: 'public/case-media/eastride-catalog.jpg' },
  { url: 'https://eastride.cc/en/tours', out: 'public/case-media/eastride-tours.jpg' },
];
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  for (const s of SHOTS) {
    try {
      await page.goto(s.url, { waitUntil: 'networkidle2', timeout: 60000 });
      await new Promise(r => setTimeout(r, 2500));
      // закрыть возможные баннеры (cookie и т.п.)
      await page.evaluate(() => {
        document.querySelectorAll('button').forEach(b => {
          const t = (b.textContent || '').toLowerCase();
          if (/(accept|agree|принять|got it|ok)/.test(t) && t.length < 20) b.click();
        });
      });
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({ path: s.out, type: 'jpeg', quality: 82 });
      console.log('✓', s.out);
    } catch (e) { console.error('✗', s.url, e.message); }
  }
  await browser.close();
})();
