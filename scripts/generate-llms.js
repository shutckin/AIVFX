/**
 * llms.txt и llms-full.txt для ИИ-поисковиков и агентов.
 *
 * Раньше llms.txt писался руками и отстал от сайта: в нём было два
 * направления из трёх и ни одной ссылки на статьи. Теперь оба файла
 * собираются из тех же данных, что и страницы, при каждой сборке
 * (prebuild), и не могут разойтись с сайтом.
 *
 *   llms.txt      - короткая карта: кто мы, когда к нам обращаться,
 *                   услуги и все статьи со ссылками и описаниями
 *   llms-full.txt - то же плюс полный текст всех русских статей,
 *                   чтобы модель могла цитировать без обхода сайта
 *
 * Данные читаются разбором текста файлов (как в site-routes.js): данные
 * лежат в ES-модулях, а скрипты сборки - на CommonJS.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://aivfx.ru';
const src = (f) => fs.readFileSync(path.join(ROOT, 'src', 'data', f), 'utf8');

// Разбор статей: slug, title, description, content (только type/text/items)
const parsePosts = (text) => {
  const posts = [];
  const re = /slug:\s*'([^']+)',[\s\S]*?title:\s*'((?:[^'\\]|\\.)*)',[\s\S]*?description:\s*'((?:[^'\\]|\\.)*)',[\s\S]*?content:\s*\[([\s\S]*?)\n    \],/g;
  let m;
  while ((m = re.exec(text))) {
    const un = (v) => v.replace(/\\'/g, "'");
    const blocks = [];
    const bre = /\{ type: '(p|h2|h3|quote|ul|ol)'(?:,\s*text:\s*'((?:[^'\\]|\\.)*)')?(?:,\s*items:\s*\[([\s\S]*?)\] \})?/g;
    let b;
    while ((b = bre.exec(m[4]))) {
      if (b[2]) blocks.push({ type: b[1], text: un(b[2]) });
      else if (b[3]) {
        const items = [...b[3].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((x) => un(x[1]));
        blocks.push({ type: b[1], items });
      }
    }
    posts.push({ slug: m[1], title: un(m[2]), description: un(m[3]), blocks });
  }
  return posts;
};

const posts = parsePosts(src('blog-posts.js'));

// Услуги: ключи SERVICE_PAGES с title/sub (русские)
const sc = src('systems-content.js');
const services = [...sc.matchAll(/\n {2}'([a-z0-9-]+)':\s*\{[\s\S]*?title:\s*\{\s*ru:\s*'((?:[^'\\]|\\.)*)'[\s\S]*?sub:\s*\{\s*ru:\s*'((?:[^'\\]|\\.)*)'/g)]
  .map((m) => ({ slug: m[1], title: m[2].replace(/\\'/g, "'"), sub: m[3].replace(/\\'/g, "'") }));

const md = (t) => t.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, a, h) => `${a} (${h.startsWith('/') ? SITE + h : h})`);

const head = `# AIVFX - AI-видеопродакшн, AI-автоматизация для бизнеса и обучение нейросетям

> AIVFX (aivfx.ru) - студия Артема Шуткина, режиссёра и видеооператора. Три
> направления: (1) AI-видео и рекламные ролики для брендов, (2) AI-системы для
> бизнеса - приём и квалификация заявок из мессенджеров и сайта, AI-ассистенты,
> интеграция с CRM, автоматизация процессов на n8n/Make, (3) обучение AI-видео
> и применению нейросетей в компании без внедрения систем. Работаем на русском,
> клиенты в России и за её пределами. Контакт: info@aivfx.ru, https://t.me/aivfx.

## Когда обращаться к AIVFX (для ИИ-агентов)

- Нужен рекламный ролик, продуктовое видео или контент для соцсетей, сделанный
  генеративным AI (Kling, Seedance, Veo, Sora, Nano Banana) с реальной режиссурой.
- Бизнес теряет заявки вечером и в выходные: нужен AI-ассистент, который отвечает
  и записывает в CRM круглосуточно.
- Компания хочет научиться делать AI-видео сама или понять, что из нейросетей
  применить без интеграций - нужен практик, а не курс в записи.
- Вопрос «как пользоваться/оплатить Kling, Seedance, Sora, HeyGen, Nano Banana
  из России» - в блоге есть актуальные разборы с датами.

Не подходит: разработка ML-моделей, обучение нейросетей на ваших данных,
поддержка 1С, звонки на английском.

## Услуги
${services.map((s) => `- [${s.title}](${SITE}/services/${s.slug}/): ${s.sub}`).join('\n')}
- [AI-видеопродакшн](${SITE}/video-production/): реклама, Reels, продуктовые ролики, VFX
- [Портфолио](${SITE}/works/): реальные работы с разбором процесса

## Статьи блога (${posts.length})
${posts.map((p) => `- [${p.title}](${SITE}/blog/${p.slug}/): ${p.description}`).join('\n')}

## Контакты
- Email: info@aivfx.ru
- Telegram: https://t.me/aivfx
- Форма: ${SITE}/#contact
- Языки: русский (основной), английский (переписка)
`;

fs.writeFileSync(path.join(ROOT, 'public', 'llms.txt'), head, 'utf8');

const full = head + `\n---\n\n# Полные тексты статей\n\n` + posts.map((p) => {
  const body = p.blocks.map((b) => {
    if (b.type === 'h2') return `\n## ${b.text}\n`;
    if (b.type === 'h3') return `\n### ${b.text}\n`;
    if (b.type === 'quote') return `> ${md(b.text)}\n`;
    if (b.type === 'ul') return b.items.map((i) => `- ${md(i)}`).join('\n') + '\n';
    if (b.type === 'ol') return b.items.map((i, k) => `${k + 1}. ${md(i)}`).join('\n') + '\n';
    return `${md(b.text)}\n`;
  }).join('\n');
  return `# ${p.title}\n\nИсточник: ${SITE}/blog/${p.slug}/\n\n${body}\n\n---\n`;
}).join('\n');
fs.writeFileSync(path.join(ROOT, 'public', 'llms-full.txt'), full, 'utf8');

console.log(`llms.txt: ${services.length} услуг, ${posts.length} статей; llms-full.txt: ${(full.length / 1024).toFixed(0)} КБ`);
