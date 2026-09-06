// Лёгкий режим для медиа: телефон с сенсорным вводом и узким экраном,
// либо браузер сам попросил экономить трафик, либо сеть медленная.
// На таких устройствах ролики-превью не грузим (стоит постер), а у
// прокручиваемого ролика «процесса» не докачиваем тяжёлую версию.
export const isLightDevice = () => {
  if (typeof window === 'undefined') return false;
  const nav = window.navigator || {};
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
  if (conn && (conn.saveData || /(^|-)(2g|3g)$/.test(conn.effectiveType || ''))) return true;
  const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  return Boolean(coarse && window.innerWidth < 900);
};
