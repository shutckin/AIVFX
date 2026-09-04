import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App, { preloadRouteChunks } from './App';

const rootElement = document.getElementById('root');

const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// В прод-сборке страницы отдаются предзарендеренными: разметка уже в HTML,
// поэтому гидратируем, а не пересоздаём дерево. Но сначала дожидаемся чанков
// маршрута - иначе React.lazy на первом рендере подставит заглушку Suspense,
// разметка не сойдётся с серверной, и React выбросит готовый HTML, перерисовав
// страницу с нуля (ошибки #418/#423). Пользователь ничего не ждёт: готовая
// страница уже нарисована браузером, гидратация происходит поверх неё.
if (rootElement.hasChildNodes()) {
  preloadRouteChunks().then(() => {
    hydrateRoot(rootElement, tree);
  });
} else {
  // Dev-режим: в index.html пустой div, гидратировать нечего
  createRoot(rootElement).render(tree);
}
