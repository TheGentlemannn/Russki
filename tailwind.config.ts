import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        soviet: {
          red: '#C0392B',
          cream: '#F5F0E8',
          charcoal: '#1C1C1C',
          gold: '#D4A017',
          darkred: '#922B21',
          lightcream: '#FAF7F2'
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Source Sans 3', 'sans-serif']
      },
      animation: {
        flip: 'flip 0.6s ease-in-out',
        'score-ring': 'scoreRing 1s ease-out forwards',
        waveform: 'waveform 0.5s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out'
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' }
        },
        scoreRing: {
          '0%': { strokeDashoffset: '283' },
          '100%': { strokeDashoffset: 'var(--score-offset)' }
        },
        waveform: {
          '0%': { transform: 'scaleY(0.35)' },
          '100%': { transform: 'scaleY(1)' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      }
    }
  },
  plugins: []
} satisfies Config;
