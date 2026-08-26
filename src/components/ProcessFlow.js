import React, { useEffect, useRef, useState } from 'react';
import { useLocale, pick } from '../i18n';
import { VIDEO_PROCESS } from '../data/systems-content';

// ── Блок «Как рождается ролик» ─────────────────────────────────────────
//
// Ролик занимает весь экран и держится на месте, пока читаешь шаги.
// Текст этапа лежит прямо поверх кадра слева, справа идёт полоса
// прогресса. Прокрутка сверху вниз ведёт одновременно и текст, и кадр:
// производство на экране движется вперёд ровно настолько, насколько
// прочитано шагов.
//
// Почему перемотка, а не обычное воспроизведение: у блока пять шагов
// и своя длина прокрутки, а у ролика своя длительность. Привязав одно
// к другому, получаем управление кадром вместо параллельно бегущего
// видео, и текст с картинкой не могут разъехаться.

// Две версии одного ролика. Лёгкая долетает почти мгновенно и сразу даёт
// рабочую перемотку, полная подменяет её, когда докачается целиком.
// Так блок не заставляет ждать и при этом не остаётся в мыле.
const VIDEO_SRC = '/process/reel.mp4';
const VIDEO_LIGHT_SRC = '/process/reel-lq.mp4';
const POSTER_SRC = '/process/reel-poster.jpg';

// Запасные кадры по одному на шаг. Нужны, если ролик не загрузился:
// у зрителя вместо чёрного экрана остаётся понятная картинка этапа.
const FALLBACK_SHOTS = [
  '/process/p01-moodboard.jpg',
  '/process/p02-storyboard.jpg',
  '/process/p03-rough.jpg',
  '/process/p04-grade.jpg',
  '/process/p05-final.jpg',
];

// Насколько быстро текущий кадр догоняет целевой. Меньше — плавнее,
// но заметнее отставание от прокрутки.
const CATCH_UP = 0.22;

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

const ProcessFlow = () => {
  const L = useLocale();
  const steps = VIDEO_PROCESS.steps;

  // Стартовые значения не зависят от браузера: первый рендер обязан
  // совпасть с предзарендеренной разметкой
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  // Полная версия весит мегабайты, поэтому адреса подставляем только
  // когда блок близко: незачем тянуть их на открытии страницы
  const [loading, setLoading] = useState(false);
  // Адрес скачанной полной версии и признак того, что она уже на экране
  const [sharpUrl, setSharpUrl] = useState(null);
  const [sharp, setSharp] = useState(false);

  const wrapRef = useRef(null);
  const lightRef = useRef(null);
  const sharpRef = useRef(null);
  // Целевая позиция в ролике, 0..1. Пишет прокрутка, читает анимация.
  const targetRef = useRef(0);

  // ── Подгрузка ролика на подлёте ──
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setLoading(true); // старый браузер: грузим сразу, лишь бы работало
      return undefined;
    }

    // Запас в три экрана: пока читают предыдущие секции, полная версия
    // успевает скачаться и подмена проходит незаметно
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setLoading(true);
        io.disconnect();
      }
    }, { rootMargin: '300% 0px' });

    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  // ── Скачивание полной версии ──
  //
  // Просто подставить адрес в тег недостаточно: браузер по своему
  // усмотрению тянет только начало файла и останавливается, а перемотка
  // прыгает по всему ролику и упирается в неподгруженный конец.
  // Поэтому качаем файл сами и отдаём тегу уже готовым.
  useEffect(() => {
    if (!loading) return undefined;

    let url = null;
    let cancelled = false;

    fetch(VIDEO_SRC)
      .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
      .then((blob) => {
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        setSharpUrl(url);
      })
      .catch(() => {
        // Полная версия не доехала — лёгкая продолжает работать,
        // блок остаётся живым, просто менее чётким
      });

    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [loading]);

  // ── Передача перемотки полной версии ──
  useEffect(() => {
    const full = sharpRef.current;
    if (!sharpUrl || !full) return undefined;

    const handOver = () => {
      // Подхватываем позицию у лёгкой версии, чтобы подмена не дёрнула кадр
      const light = lightRef.current;
      if (light && Number.isFinite(light.currentTime)) {
        full.currentTime = light.currentTime;
      }
      setSharp(true);
    };

    if (full.readyState >= 1) handOver();
    else full.addEventListener('loadedmetadata', handOver);

    return () => full.removeEventListener('loadedmetadata', handOver);
  }, [sharpUrl]);

  // ── Связка прокрутки с кадром и шагом ──
  useEffect(() => {
    const wrap = wrapRef.current;
    // Перематываем ту версию, которая сейчас на экране
    const video = sharp ? sharpRef.current : lightRef.current;
    if (!wrap || !video) return undefined;

    const reduced = window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;

    // Прогресс прокрутки блока: 0 — шаги только начались,
    // 1 — последний шаг дочитан
    const readProgress = () => {
      const r = wrap.getBoundingClientRect();
      // Блок «проезжает» мимо экрана: считаем, какая его часть уже позади
      const travel = r.height - window.innerHeight;
      if (travel <= 0) return 0;
      return clamp01(-r.top / travel);
    };

    const applyStep = (p) => {
      const idx = Math.min(steps.length - 1, Math.floor(p * steps.length));
      setActive((prev) => (prev === idx ? prev : idx));
    };

    // Кадр за кадром подтягиваем ролик к целевой позиции. Резкое присвоение
    // currentTime на каждый пиксель прокрутки даёт рывки, поэтому догоняем
    // плавно и останавливаемся, когда разница перестала быть заметной.
    const tick = () => {
      raf = 0;
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const target = targetRef.current * (duration - 0.05);
      const diff = target - video.currentTime;

      if (Math.abs(diff) < 0.015) {
        video.currentTime = target;
        return;
      }

      video.currentTime += diff * CATCH_UP;
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const p = readProgress();
      targetRef.current = p;
      applyStep(p);

      if (reduced) return; // системная настройка: кадр не гоняем
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLoaded = () => {
      setReady(true);
      onScroll();
    };
    const onError = () => setFailed(true);

    if (video.readyState >= 1) onLoaded();
    else video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('error', onError);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('error', onError);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [steps.length, loading, sharp]);

  const outLabel = L === 'en' ? 'You get' : 'На выходе';

  return (
    <>
      <div className="shell">
        <p className="vpf-lead reveal">{pick(L, VIDEO_PROCESS.lead)}</p>
      </div>

      {/* Высота блока задаёт длину прокрутки: экран под сцену плюс
          примерно по экрану на каждый шаг */}
      <div className="vpf" ref={wrapRef} style={{ '--vpf-count': steps.length }}>
        <div className={`vpf-stage${ready ? ' vpf-stage--ready' : ''}${sharp ? ' vpf-stage--sharp' : ''}`}>
          {/* Лёгкая версия: включается первой, чтобы блок сразу работал */}
          <video
            ref={lightRef}
            className="vpf-video vpf-video--light"
            src={loading ? VIDEO_LIGHT_SRC : undefined}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          {/* Полная версия: лежит сверху и проявляется, когда докачается */}
          <video
            ref={sharpRef}
            className="vpf-video vpf-video--sharp"
            src={sharpUrl || undefined}
            muted
            playsInline
            preload="auto"
            // Ролик управляется прокруткой, поэтому не играет сам
            // и не зациклен
            aria-label={L === 'en'
              ? 'How a commercial is made, from brief to final frame'
              : 'Как рождается ролик, от брифа до финального кадра'}
          />

          {failed && steps.map((s, i) => (
            <img
              key={s.num}
              className={`vpf-shot${i === active ? ' vpf-shot--on' : ''}`}
              src={FALLBACK_SHOTS[i] || FALLBACK_SHOTS[0]}
              alt={pick(L, s.title)}
              loading="lazy"
              width="1080"
              height="1440"
            />
          ))}

          {/* Затемнение под текстом: кадр местами светлый, без него
              подпись читалась бы через раз */}
          <span className="vpf-scrim" aria-hidden="true" />

          <ol className="vpf-steps">
            {steps.map((s, i) => (
              <li
                key={s.num}
                className={`vpf-step${i === active ? ' vpf-step--on' : ''}`}
                // Шаги лежат стопкой друг на друге. Скрытые от глаза
                // прячем и от чтения вслух, иначе всё сливается в кашу.
                aria-hidden={i === active ? undefined : 'true'}
              >
                <span className="vpf-step-ghost" aria-hidden="true">{s.num}</span>

                <div className="vpf-step-head">
                  <span className="vpf-step-num mono">{s.num}</span>
                  <span className="vpf-step-time mono">{pick(L, s.time)}</span>
                </div>

                <h3 className="vpf-step-title">{pick(L, s.title)}</h3>
                <p className="vpf-step-desc">{pick(L, s.desc)}</p>

                <ul className="vpf-step-list">
                  {s.detail.map((d, j) => (
                    <li key={j}>{pick(L, d)}</li>
                  ))}
                </ul>

                <span className="vpf-step-out mono">
                  {`${outLabel} · ${pick(L, s.out)}`}
                </span>
              </li>
            ))}
          </ol>

          {/* Полоса прогресса: сколько этапов позади и что будет дальше */}
          <ol className="vpf-rail" aria-hidden="true">
            {steps.map((s, i) => (
              <li
                key={s.num}
                className={`vpf-rail-item${i <= active ? ' vpf-rail-item--done' : ''}${i === active ? ' vpf-rail-item--on' : ''}`}
              >
                <span className="vpf-rail-label mono">{pick(L, s.out)}</span>
                <span className="vpf-rail-tick" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default ProcessFlow;
