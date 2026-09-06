import React from 'react';
import Pic from './Pic';
import { useLocale } from '../i18n';

// Блок «генерация» внутри статьи: кадр, сделанный нейросетью, показан
// вместе с промптом и параметрами. Читатель видит не «картинку к тексту»,
// а результат, который можно повторить: модель, формат, текст запроса.
const GenFrame = ({ block }) => {
  const locale = useLocale();
  const en = locale === 'en';
  const model = block.model || 'Seedream 5 Pro';
  const meta = block.meta || '2K · 16:9';
  const label = block.label || (en ? 'Generation' : 'Генерация');
  return (
    <figure className="gen-frame my-10 -mx-2 sm:mx-0">
      <div className="gen-frame-glow" />
      <div className="gen-frame-head">
        <span className="gen-frame-kicker">{`${label} · ${model}`}</span>
        <span className="gen-frame-meta">{meta}</span>
      </div>
      <div className="gen-frame-shot">
        <Pic
          src={block.src}
          alt={block.alt || ''}
          sizes="(max-width: 768px) 100vw, 1024px"
          className="w-full h-auto block"
          width={1280}
          height={720}
        />
      </div>
      {block.prompt && (
        <div className="gen-frame-prompt">
          <span className="gen-frame-prompt-label">{en ? 'Prompt' : 'Промпт'}</span>
          <span className="gen-frame-prompt-text">{block.prompt}</span>
        </div>
      )}
      {block.caption && (
        <figcaption className="gen-frame-caption">{block.caption}</figcaption>
      )}
      <div className="gen-frame-foot">
        <span className="gen-frame-line" />
        <span className="gen-frame-mark">AIVFX</span>
      </div>
    </figure>
  );
};

export default GenFrame;
