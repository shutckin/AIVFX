import React from 'react';

// ── Картинка в двух форматах и двух размерах ────────────────────────────
//
// Отдаём webp современным браузерам и jpg всем остальным, а телефонам -
// узкий вариант на 640 пикселей вместо кадра в 1280. Обложка статьи весит
// около 150 КБ в jpg и около 45 КБ в webp, и на мобильном интернете именно
// она держит отрисовку первого экрана.
//
// Варианты создаёт scripts/make-image-variants.sh, запускать после
// добавления новых картинок. Если webp вдруг нет, браузер возьмёт jpg.
const Pic = ({ src, alt, sizes, className, eager = false, width, height }) => {
  const base = src.replace(/\.(jpg|jpeg|png)$/i, '');
  return (
    <picture>
      <source type="image/webp" srcSet={`${base}-640.webp 640w, ${base}.webp 1280w`} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        decoding="async"
        {...(eager ? { fetchPriority: 'high' } : { loading: 'lazy' })}
      />
    </picture>
  );
};

export default Pic;
