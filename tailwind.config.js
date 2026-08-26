/** @type {import('tailwindcss').Config} */
// Tailwind используется только утилитами (blog/privacy/consent).
// Палитра сайта живёт в CSS-переменных :root (src/index.css).
module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: { extend: {} },
  plugins: [],
};
