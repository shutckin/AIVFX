const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' && purgecss({
      content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html'
      ],
      safelist: [
        /^bg-/,
        /^text-/,
        /^border-/,
        /^hover:/,
        /^focus:/,
        /^animate-/,
        /^glass/,
        'btn',
        'card',
        'container'
      ]
    })
  ].filter(Boolean),
} 