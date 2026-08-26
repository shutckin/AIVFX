import React, { useEffect, useRef, useState } from 'react';
import { useLocale } from '../i18n';
import { mediaFor, fetchLocalized } from '../lib/localizedMedia';
import './scroll-reel.css';

// ── Полноэкранный ролик, которым управляет прокрутка ─────────────────────
//
// Ролик занимает весь экран и держится на месте, пока читаешь шаги.
// Текст лежит поверх кадра слева, справа полоса прогресса. Прокрутка
// сверху вниз ведёт одновременно и текст, и кадр: картинка уходит вперёд
// ровно настолько, насколько прочитано шагов.
//
// Почему перемотка, а не обычное воспроизведение: у блока свои шаги и своя
// длина прокрутки, а у ролика своя длительность. Привязав одно к другому,
// получаем управление кадром вместо параллельно бегущего видео, и текст
// с картинкой не могут разъехаться.
//
// Здесь только механика. Что писать в шагах — решает тот, кто вызывает:
// renderStep рисует содержимое шага, railLabels подписывает полосу.
// Так один и тот же пролёт обслуживает и «Как рождается ролик», и «Подход».

// Насколько быстро текущий кадр догоняет целевой. Меньше — плавнее,
// но заметнее отставание от прокрутки.
const CATCH_UP = 0.22;

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

const ScrollReel = ({
  videoSrc,          // адрес полной версии, русской
  lightSrc,          // адрес лёгкой версии, она включается первой
  posterSrc,         // кадр-заглушка до загрузки
  count,             // сколько шагов
  renderStep,        // (индекс, активен) => содержимое шага
  railLabels = [],   // короткие подписи для полосы прогресса
  label,             // описание ролика для читалки с экрана
  fallbackShots = [] // картинки на случай, если ролик не загрузился
}) => {
  const L = useLocale();

  // Стартовые значения не зависят от браузера: первый рендер обязан
  // совпасть с предзарендеренной разметкой
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lightFellBack, setLightFellBack] = useState(false);
  const [sharpUrl, setSharpUrl] = useState(null);
  const [sharp, setSharp] = useState(false);

  const wrapRef = useRef(null);
  const lightRef = useRef(null);
  const sharpRef = useRef(null);
  // Целевая позиция в ролике, 0..1. Пишет прокрутка, читает анимация.
  const targetRef = useRef(0);

  // ── Подгрузка на подлёте ──
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
  useEffect(() => {
    if (!loading) return undefined;

    let url = null;
    let cancelled = false;

    fetchLocalized(videoSrc, L)
      .then((blob) => {
        if (cancelled || !blob) return;
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
  }, [loading, L, videoSrc]);

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
      const idx = Math.min(count - 1, Math.floor(p * count));
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
    const onError = () => {
      const { fallback } = mediaFor(lightSrc, L);
      // Нет версии на язык страницы — переключаемся на русскую
      if (video === lightRef.current && fallback && !lightFellBack) {
        setLightFellBack(true);
        return;
      }
      setFailed(true);
    };

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
  }, [count, loading, sharp, L, lightFellBack, lightSrc]);

  const lightHref = loading
    ? (lightFellBack
      ? mediaFor(lightSrc, L).fallback || lightSrc
      : mediaFor(lightSrc, L).primary)
    : undefined;

  return (
    // Высота блока задаёт длину прокрутки: экран под сцену плюс
    // примерно по экрану на каждый шаг
    <div className="vpf" ref={wrapRef} style={{ '--vpf-count': count }}>
      <div className={`vpf-stage${ready ? ' vpf-stage--ready' : ''}${sharp ? ' vpf-stage--sharp' : ''}`}>
        {/* Лёгкая версия: включается первой, чтобы блок сразу работал */}
        <video
          ref={lightRef}
          className="vpf-video vpf-video--light"
          src={lightHref}
          poster={posterSrc}
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
          aria-label={label}
        />

        {failed && fallbackShots.map((shot, i) => (
          <img
            key={shot}
            className={`vpf-shot${i === active ? ' vpf-shot--on' : ''}`}
            src={shot}
            alt=""
            loading="lazy"
            width="1080"
            height="1440"
          />
        ))}

        {/* Затемнение под текстом: кадр местами светлый, без него
            подпись читалась бы через раз */}
        <span className="vpf-scrim" aria-hidden="true" />

        <ol className="vpf-steps">
          {Array.from({ length: count }, (_, i) => (
            <li
              key={i}
              className={`vpf-step${i === active ? ' vpf-step--on' : ''}`}
              // Шаги лежат стопкой друг на друге. Скрытые от глаза
              // прячем и от чтения вслух, иначе всё сливается в кашу.
              aria-hidden={i === active ? undefined : 'true'}
            >
              {renderStep(i, i === active)}
            </li>
          ))}
        </ol>

        {/* Полоса прогресса: сколько этапов позади и что будет дальше */}
        <ol className="vpf-rail" aria-hidden="true">
          {Array.from({ length: count }, (_, i) => (
            <li
              key={i}
              className={`vpf-rail-item${i <= active ? ' vpf-rail-item--done' : ''}${i === active ? ' vpf-rail-item--on' : ''}`}
            >
              <span className="vpf-rail-label mono">{railLabels[i] || ''}</span>
              <span className="vpf-rail-tick" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ScrollReel;
