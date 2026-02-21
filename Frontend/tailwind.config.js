/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        osu: '#dc4405',
        'osu-light': '#f97316',
        'arena-dark': '#0a0a0a',
        'arena-card': 'rgba(0, 0, 0, 0.8)',
        'arena-border': 'rgba(220, 68, 5, 0.6)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(220, 68, 5, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(220, 68, 5, 0.6)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'slide-in': 'slideInRight 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}
