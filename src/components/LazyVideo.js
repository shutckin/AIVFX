import React, { useEffect, useRef, useState } from 'react';

// ── Превью-ролик, который грузится только когда нужен ──────────────────
//
// На странице видеопродакшна таких роликов 45 штук. Раньше адрес стоял
// в теге сразу у всех, и браузер начинал тянуть их все при открытии
// страницы — даже те, что лежат далеко внизу. Наблюдатель пересечений
// управлял только воспроизведением, но не загрузкой.
//
// На быстром канале это незаметно. На медленном или далёком от сервера
// страница грузилась минутами: полсотни отдельных запросов, каждый со
// своим ожиданием ответа. В Safari, где одновременных запросов меньше,
// доходило до чёрных прямоугольников вместо превью.
//
// Здесь всё решает одна общая проверка на прокрутку: она подставляет
// адрес подъезжающим роликам, запускает те, что видны, и ставит на паузу
// ушедшие. Наблюдатель пересечений намеренно не используется — в этом
// проекте он несколько раз молча не срабатывал, а невидимая поломка
// хуже лишнего вычисления прямоугольника.

// Все живые ролики страницы. Один слушатель на всех, а не 45 штук.
const items = new Set();
let listening = false;
let scheduled = false;

const visible = (r) => (
  r.top < window.innerHeight
  && r.bottom > 0
  && r.left < window.innerWidth
  && r.right > 0
);

// Запас в пол-экрана: ролик успевает подгрузиться до того,
// как читатель до него доскроллит
const near = (r) => (
  r.top < window.innerHeight * 1.5
  && r.bottom > -window.innerHeight * 0.5
  // Витрина работ едет вбок, поэтому горизонталь проверяем тоже:
  // по вертикали в кадр попадает вся лента разом
  && r.left < window.innerWidth * 1.5
  && r.right > -window.innerWidth * 0.5
);

const pass = () => {
  scheduled = false;

  items.forEach((item) => {
    const el = item.el;
    if (!el || !el.isConnected) {
      items.delete(item);
      return;
    }

    const r = el.getBoundingClientRect();
    if (!item.loaded && near(r)) item.load();

    if (!item.loaded || item.reduced) return;
    // Играть тому, что за экраном, незачем
    if (visible(r)) {
      if (el.paused) el.play().catch(() => {});
    } else if (!el.paused) {
      el.pause();
    }
  });

  if (!items.size && listening) {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    listening = false;
  }
};

// Прокрутка сыплет событиями чаще, чем браузер рисует кадры,
// поэтому пересчитываем не чаще раза на кадр
function schedule() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(pass);
}

const register = (item) => {
  items.add(item);
  if (!listening && typeof window !== 'undefined') {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    listening = true;
  }
  schedule();
};

const LazyVideo = ({ src, title, poster }) => {
  const ref = useRef(null);
  // Пока пусто — тег ничего не грузит
  const [source, setSource] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const item = {
      el,
      loaded: false,
      // Системная настройка «меньше движения»: показываем первый кадр
      reduced: Boolean(window.matchMedia
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches),
      load() {
        item.loaded = true;
        setSource(src);
      },
    };

    register(item);
    return () => { items.delete(item); };
  }, [src]);

  return (
    <video
      ref={ref}
      src={source || undefined}
      poster={poster || undefined}
      muted
      loop
      playsInline
      preload="none"
      aria-label={title}
      // Данные приходят не сразу после подстановки адреса. Если к этому
      // моменту ролик на экране — запускаем, иначе он остался бы стоять
      onLoadedData={(e) => {
        const el = e.currentTarget;
        if (visible(el.getBoundingClientRect())) el.play().catch(() => {});
      }}
    />
  );
};

export default LazyVideo;
