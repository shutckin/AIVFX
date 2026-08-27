// ── База знаний для ассистента на сайте ────────────────────────────────
//
// Ассистент отвечает не по написанному вручную промпту, а по содержимому
// самого сайта. Файл собирается из src/data/systems-content.js на каждой
// сборке, поэтому не может разойтись с тем, что читает посетитель:
// поправил услугу на сайте — ассистент знает новую версию после деплоя.
//
// Писать этот текст руками было бы ошибкой: он устарел бы через месяц,
// и ассистент рассказывал бы про услуги, которых уже нет.
//
// Скрипт намеренно .mjs: контент — ES-модуль, и его можно просто
// импортировать. Первая версия вычисляла его как строку кода, это лишний
// и опасный приём там, где хватает обычного импорта.
//
// Результат: public/assistant-context.txt, его читает серверная функция.
//
// Запуск: node scripts/build-assistant-context.mjs (входит в prebuild)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import * as C from '../src/data/systems-content.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(here, '..', 'public', 'assistant-context.txt');

// Из пары {ru, en} берём русскую строку: ассистент сам отвечает на языке
// посетителя, а база знаний нужна одна — дублировать её вдвое незачем.
const ru = (v) => {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'object' && 'ru' in v) return v.ru;
  return '';
};

const lines = [];
const put = (s = '') => lines.push(s);

put('# База знаний AIVFX для ассистента на сайте');
put();
put('Собрано автоматически из контента сайта. Руками не править: изменения');
put('затрутся на следующей сборке. Источник — src/data/systems-content.js.');
put();

put('## Чем занимается студия');
put(ru(C.HERO_SYS?.sub));
put();

put('## Услуги');
Object.entries(C.SERVICE_PAGES || {}).forEach(([slug, p]) => {
  put(`### ${ru(p.title)} (/services/${slug}/)`);
  if (p.sub) put(ru(p.sub));
  if (p.pains?.items?.length) {
    put(`${ru(p.pains.title) || 'Когда это нужно'}:`);
    p.pains.items.forEach((i) => put(`- ${ru(i)}`));
  }
  if (Array.isArray(p.proof) && p.proof.length) {
    put(`Как это выглядит по шагам: ${p.proof.map(ru).join(' → ')}`);
  }
  put();
});

put('## Как мы работаем, по шагам');
(C.APPROACH_SYS?.steps || []).forEach((s) => put(`${s.num}. ${ru(s.title)} — ${ru(s.desc)}`));
put();

put('## Боли клиентов, с которых всё начинается');
(C.PROBLEMS_SYS?.items || []).forEach((i) => {
  const tag = ru(i.tag);
  put(`- «${ru(i.text)}»${tag ? ` — ${tag}` : ''}`);
});
if (C.PROBLEMS_SYS?.outro) put(ru(C.PROBLEMS_SYS.outro));
put();

put('## Интеграции');
(C.INTEGRATIONS_SYS?.groups || []).forEach((g) => {
  put(`### ${ru(g.label)}`);
  if (g.desc) put(ru(g.desc));
  const items = (g.items || []).map((i) => (typeof i === 'string' ? i : ru(i.name || i))).filter(Boolean);
  if (items.length) put(`Сервисы: ${items.join(', ')}`);
});
if (C.INTEGRATIONS_SYS?.note) put(ru(C.INTEGRATIONS_SYS.note));
put(`Технологии в работе: ${(C.TICKER_SYS || []).join(', ')}.`);
put();

put('## Кейсы и сценарии');
if (C.CASES_SYS?.head?.side) put(ru(C.CASES_SYS.head.side));
(C.CASES_SYS?.items || []).forEach((c) => {
  put(`### ${ru(c.industry)}`);
  if (c.problem) put(`Задача: ${ru(c.problem)}`);
  if (c.solution) put(`Решение: ${ru(c.solution)}`);
  if (Array.isArray(c.metrics)) {
    put(`Показатели: ${c.metrics.map((m) => `${ru(m.v)} ${ru(m.k)}`).join(', ')}`);
  }
  // Пометка обязана дойти до ассистента: выдавать демо-сценарий
  // за выполненный проект — прямой обман клиента
  if (c.isDemo) put('ВАЖНО: это демо-сценарий на типовых процессах отрасли, а НЕ выполненный проект. Так и говорить, если спросят.');
  put();
});

put('## Частые вопросы и утверждённые ответы');
(C.FAQ_SYS || []).forEach((f) => {
  put(`В: ${ru(f.q)}`);
  put(`О: ${ru(f.a)}`);
  put();
});

put('## Второе направление: AI-видеопродакшн');
put(ru(C.VIDEO_PAGE?.hero?.sub));
put('Страница: /video-production/, портфолио: /works/');
(C.VIDEO_FAQ || []).forEach((f) => {
  put(`В: ${ru(f.q)}`);
  put(`О: ${ru(f.a)}`);
});
put();

put('## О студии');
(C.ABOUT_SYS?.paragraphs || []).forEach((p) => put(ru(p)));
put(`Для кого: ${(C.ABOUT_SYS?.audience?.items || []).map(ru).join(', ')}.`);
if (C.ABOUT_SYS?.brands?.items?.length) {
  put(`Работали для брендов: ${C.ABOUT_SYS.brands.items.join(', ')}.`);
}
put();

put('## Контакты и что обещаем');
if (C.FOOTER_SYS?.email) put(`Почта: ${C.FOOTER_SYS.email}`);
if (C.CHAT_DEMO?.lead?.tgUrl) put(`Telegram: ${C.CHAT_DEMO.lead.tgUrl}`);
put('Цен на сайте нет: смета считается под задачу, ответ с архитектурой решения — в течение 24 часов после брифа.');

const text = `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, text, 'utf8');

// Грубая прикидка: на смеси русского с английским выходит около
// 2.5 символа на токен. Нужна, чтобы видеть цену запроса заранее.
const tokens = Math.round(text.length / 2.5);
console.log(`[assistant] база знаний: ${(text.length / 1024).toFixed(1)} КБ, ~${tokens} токенов`);
if (tokens > 12000) {
  console.log('[assistant] база разрослась — на каждом запросе это дорого, стоит сократить');
}
