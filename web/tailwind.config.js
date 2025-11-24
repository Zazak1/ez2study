/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#ffffff',        // Pure white
          surface: '#f8fafc',   // Slate 50
          card: '#ffffff',
        },
        primary: {
          DEFAULT: '#6366f1', // Indigo
          50: '#eef2ff',
          100: '#e0e7ff',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          900: '#312e81',
        },
        secondary: {
          DEFAULT: '#0ea5e9', // Sky Blue
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        accent: {
          DEFAULT: '#ec4899', // Pink
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        },
        text: {
          main: '#1e293b', // Slate 800
          muted: '#64748b', // Slate 500
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'pearl': '0 4px 20px -2px rgba(99, 102, 241, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        'pearl-lg': '0 10px 25px -5px rgba(99, 102, 241, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        'pearl-hover': '0 20px 30px -5px rgba(99, 102, 241, 0.2)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.8)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
