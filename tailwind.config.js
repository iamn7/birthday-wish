/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          pink: '#ec4899',
          purple: '#a855f7',
          indigo: '#6366f1',
          rose: '#f43f5e',
        }
      },
      backgroundImage: {
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #ec4899 0deg, #a855f7 120deg, #6366f1 240deg, #ec4899 360deg)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'heart-beat': 'heart-beat 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(236,72,153,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(236,72,153,0.7), 0 0 60px rgba(168,85,247,0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'heart-beat': {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'glow-pink': '0 0 30px rgba(236,72,153,0.4)',
        'glow-purple': '0 0 30px rgba(168,85,247,0.4)',
        'glass': '0 8px 32px rgba(0,0,0,0.37), inset 0 1px 0 rgba(255,255,255,0.1)',
        'card': '0 20px 60px rgba(0,0,0,0.4)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
