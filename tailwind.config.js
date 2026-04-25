/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        bg: '#0a0a0a',
        card: '#111111',
        primary: { DEFAULT: '#6c63ff', foreground: '#ffffff' },
        secondary: { DEFAULT: '#ff6584', foreground: '#ffffff' },
        muted: { DEFAULT: '#1a1a1a', foreground: '#a0a0a0' },
        border: '#1f1f1f',
        ring: '#6c63ff',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(108, 99, 255, 0.4), 0 0 40px rgba(108, 99, 255, 0.15)',
        'glow-secondary': '0 0 20px rgba(255, 101, 132, 0.4), 0 0 40px rgba(255, 101, 132, 0.15)',
      },
      keyframes: {
        'fade-in':  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'slide-up': { '0%': { opacity: 0, transform: 'translateY(10px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: {
        'fade-in':  'fade-in 0.4s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
