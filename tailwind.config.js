/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Helvetica Neue', 'Helvetica', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'helvetica': ['Helvetica Neue', 'Helvetica', 'sans-serif'],
      },
      colors: {
        // Новая цветовая палитра
        primary: {
          DEFAULT: '#D35C00', // Акцентный оранжевый
          light: '#E67A33',
          dark: '#A64700',
        },
        secondary: {
          DEFAULT: '#4A90E2', // Пастельный синий
          light: '#6BA3E8',
          dark: '#357ABD',
        },
        accent: {
          gold: '#C8A165', // Мягкий золотой
          green: '#6AA84F', // Нежный зелёный
          purple: '#8E44AD', // Пастельно-фиолетовый
        },
        // Базовая монохромная схема
        background: {
          primary: '#121212', // Тёмный фон
          secondary: '#1F1F1F', // Карты и блоки
          hover: 'rgba(31, 31, 31, 0.8)',
        },
        text: {
          primary: '#E0E0E0', // Основной текст
          secondary: '#A0A0A0', // Второстепенный текст
          muted: '#808080',
        },
        // Совместимость со старыми классами
        gray: {
          50: '#F8F9FA',
          100: '#E0E0E0',
          200: '#C0C0C0',
          300: '#A0A0A0',
          400: '#808080',
          500: '#606060',
          600: '#404040',
          700: '#2A2A2A',
          800: '#1F1F1F',
          900: '#121212',
        },
        dark: '#121212',
        light: '#E0E0E0',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #D35C00 0%, #A64700 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C8A165 0%, #B8956B 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1F1F1F 0%, #121212 100%)',
      },
      maxWidth: {
        'container': '1200px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-left': 'fadeInLeft 0.8s ease-out', 
        'fade-in-right': 'fadeInRight 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
      boxShadow: {
        'custom': '0 10px 25px rgba(211, 92, 0, 0.15)',
        'custom-lg': '0 20px 40px rgba(211, 92, 0, 0.2)',
        'gold': '0 10px 25px rgba(200, 161, 101, 0.15)',
        'blue': '0 10px 25px rgba(74, 144, 226, 0.15)',
      },
    },
  },
  plugins: [],
} 