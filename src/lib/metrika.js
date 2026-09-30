// Отметка целей в Яндекс.Метрике (счётчик из public/index.html).
// Если счётчик заблокирован или ещё не загрузился, молча ничего не делает:
// аналитика не должна ломать ни форму, ни переход.

export const METRIKA_ID = 109098541;

export const reachGoal = (goal, params) => {
  try {
    if (typeof window !== 'undefined' && typeof window.ym === 'function') {
      window.ym(METRIKA_ID, 'reachGoal', goal, params);
    }
  } catch (e) {
    /* нечего делать: цель не отметилась, сайт работает */
  }
};
