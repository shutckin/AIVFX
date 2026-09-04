// ── Растяжка против утечки секретов в файлы сайта ──────────────────────
//
// В августе 2026 года токен Telegram-бота оказался внутри JS-файла сайта:
// любой посетитель мог открыть исходники страницы, забрать токен и
// перехватить бота. Так и произошло.
//
// Этот скрипт запускается после каждой сборки и просматривает всё, что
// уедет на сервер. Если находит что-то похожее на секрет - валит сборку,
// и деплой просто не случается.
//
// Правило, которое стоит за этим: всё, что попадает в браузер, публично.
// Переменные с префиксом REACT_APP_ вшиваются в бандл целиком, поэтому
// класть в них ключи нельзя никогда.

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');

// Что ищем. Каждый шаблон - реальный формат ключа, а не «что-то длинное»:
// иначе на хешах файлов и base64-картинках будут ложные срабатывания.
const PATTERNS = [
  { name: 'токен Telegram-бота', re: /\b\d{8,10}:[A-Za-z0-9_-]{30,}\b/ },
  { name: 'ключ OpenAI', re: /\bsk-[A-Za-z0-9_-]{20,}\b/ },
  { name: 'ключ Anthropic', re: /\bsk-ant-[A-Za-z0-9_-]{20,}\b/ },
  { name: 'ключ AWS', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: 'приватный ключ', re: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: 'прямое обращение к Telegram API из браузера', re: /api\.telegram\.org\/bot/ },
];

// Смотрим только текстовые файлы: картинки и видео проверять бессмысленно
const TEXT_EXT = new Set(['.js', '.css', '.html', '.json', '.txt', '.xml', '.map', '.svg']);

const walk = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (TEXT_EXT.has(path.extname(entry.name))) out.push(full);
  }
  return out;
};

if (!fs.existsSync(BUILD_DIR)) {
  console.error('[secrets] папки build нет - нечего проверять');
  process.exit(0);
}

const found = [];
for (const file of walk(BUILD_DIR)) {
  const content = fs.readFileSync(file, 'utf8');
  for (const { name, re } of PATTERNS) {
    const m = content.match(re);
    if (!m) continue;
    // Показываем ЧТО нашли и ГДЕ, но сам секрет печатаем обрезанным
    const preview = m[0].length > 14 ? `${m[0].slice(0, 10)}…` : m[0];
    found.push({ file: path.relative(BUILD_DIR, file), name, preview });
  }
}

if (found.length) {
  console.error('\n╔══════════════════════════════════════════════════════════╗');
  console.error('║  СБОРКА ОСТАНОВЛЕНА: в файлах сайта найден секрет        ║');
  console.error('╚══════════════════════════════════════════════════════════╝\n');
  for (const f of found) {
    console.error(`  ${f.name}: ${f.preview}`);
    console.error(`  файл: build/${f.file}\n`);
  }
  console.error('Всё, что попадает в браузер, публично. Ключи должны жить');
  console.error('только на сервере - см. папку aivfx-lead-api.\n');
  process.exit(1);
}

console.log('[secrets] секретов в файлах сайта нет');
