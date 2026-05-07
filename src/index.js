import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

// react-snap кладёт уже готовый HTML → используем hydrateRoot,
// чтобы React переиспользовал разметку, а не пересоздавал её.
// На обычном dev-режиме (пустой div) — обычный createRoot.
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
