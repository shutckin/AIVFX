import React from 'react';

// Универсальный заголовок секции: [NN / SECTION] + заголовок + курсивный акцент + сайд-текст.
// Общий для всех секций — раньше был скопирован в 5 файлах.
const SecHead = ({ num, title, titleIt, side, sideTitle }) => (
  <div className="sec-head reveal">
    <div className="sec-num">{num}</div>
    <h2 className="sec-title">
      {title} {titleIt && <span className="it">{titleIt}</span>}
    </h2>
    {side && (
      <div className="sec-side">
        {sideTitle && <span className="kicker">{sideTitle}</span>}
        <p>{side}</p>
      </div>
    )}
  </div>
);

export default SecHead;
