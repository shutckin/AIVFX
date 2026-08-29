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

// ── Ролики бегущей ленты ───────────────────────────────────────────────
//
// Витрина работ едет сама, анимацией CSS. Карточки въезжают в кадр без
// единого события scroll, поэтому проверка выше их не будит: ролик
// доезжает до зрителя чёрным. Так и было на странице.
//
// Грузить всю ленту разом — тоже не выход: браузер держит около шести
// одновременных соединений с сервером, остальные встают в очередь, и
// карточки снова остаются пустыми, только теперь все сразу.
//
// Поэтому здесь свой цикл: пока лента на экране, раз в кадр смотрим, кто
// подъезжает, и грузим только их. Цикл останавливается, как только лента
// уходит из виду, — вхолостую он не крутится.

const moving = new Set();
// Именно флаг, а не идентификатор кадра: карточек в ленте много, и они
// регистрируются одна за другой. С идентификатором каждая видела бы ноль
// в начале прохода и заводила свой цикл — восемнадцать циклов, плодящих
// новые каждый кадр. Страница от этого встаёт колом, проверено.
let movingRunning = false;

const movingPass = () => {
  let anyOnScreen = false;

  moving.forEach((item) => {
    const el = item.el;
    if (!el || !el.isConnected) {
      moving.delete(item);
      return;
    }

    const r = el.getBoundingClientRect();
    // По вертикали лента целиком либо видна, либо нет
    const bandOnScreen = r.top < window.innerHeight && r.bottom > 0;
    if (bandOnScreen) anyOnScreen = true;
    if (!bandOnScreen) {
      if (item.loaded && !el.paused) el.pause();
      return;
    }

    // Запас в экран по горизонтали: ролик успевает подгрузиться до того,
    // как карточка выедет из-за края
    const nearX = r.left < window.innerWidth * 2 && r.right > -window.innerWidth;
    if (!item.loaded && nearX) item.load();

    if (!item.loaded || item.reduced) return;

    const onScreen = r.left < window.innerWidth && r.right > 0;
    if (onScreen) {
      if (el.paused) el.play().catch(() => {});
    } else if (!el.paused) {
      el.pause();
    }
  });

  if (!moving.size) {
    movingRunning = false;
    return;
  }
  // Пока лента в кадре — следим покадрово, она же едет. Ушла из виду —
  // редкие проверки, лишь бы поймать возвращение.
  if (anyOnScreen) requestAnimationFrame(movingPass);
  else setTimeout(movingPass, 400);
};

const registerMoving = (item) => {
  moving.add(item);
  if (movingRunning) return;
  movingRunning = true;
  requestAnimationFrame(movingPass);
};

const LazyVideo = ({ src, title, poster, always = false }) => {
  const ref = useRef(null);
  // Пока пусто — тег ничего не грузит
  const [source, setSource] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // Ролики бегущей ленты живут по своим правилам, см. moving.js ниже
    if (always) {
      const item = {
        el,
        loaded: false,
        reduced: Boolean(window.matchMedia
          && window.matchMedia('(prefers-reduced-motion: reduce)').matches),
        load() {
          item.loaded = true;
          setSource(src);
        },
      };
      registerMoving(item);
      return () => { moving.delete(item); };
    }

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
  }, [src, always]);

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
        const reduced = window.matchMedia
          && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) return;
        const r = el.getBoundingClientRect();
        const onScreen = always
          ? (r.left < window.innerWidth && r.right > 0
            && r.top < window.innerHeight && r.bottom > 0)
          : visible(r);
        if (onScreen) el.play().catch(() => {});
      }}
    />
  );
};

export default LazyVideo;
