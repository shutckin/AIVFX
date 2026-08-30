// ─────────────────────────────────────────────────────────────────────────
// Английская версия блога AIVFX — собирается из 4 переведённых частей.
// Порядок статей идентичен русскому BLOG_POSTS (важно для featured-карточки).
// Структура каждого объекта совпадает с blog-posts.js (slug, cover, даты —
// общие; переведены title/description/keywords/excerpt/category/content).
// ─────────────────────────────────────────────────────────────────────────
import PART_1 from './_en_part1';
import PART_2 from './_en_part2';
import PART_3 from './_en_part3';
import PART_4 from './_en_part4';
import PART_5 from './_en_part5';
import PART_6 from './_en_part6';

export const BLOG_POSTS_EN = [...PART_6, ...PART_5, ...PART_1, ...PART_2, ...PART_3, ...PART_4];

// Хелпер: найти английскую статью по slug
export const getPostBySlugEn = (slug) =>
  BLOG_POSTS_EN.find((p) => p.slug === slug) || null;
