/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Coze-inspired color system
        coze: {
          bg: '#F7F8FA',
          primary: '#666BE8',
          secondary: '#4D53E8',
          text: {
            main: '#1D2129',
            secondary: '#86909C',
            placeholder: '#C9CDD4'
          },
          border: '#E5E6EB',
          surface: '#FFFFFF'
        },
        // Legacy aliases for backward compatibility
        light: {
          bg: '#F7F8FA',
          surface: '#FFFFFF',
        },
        primary: {
          DEFAULT: '#666BE8',
          50: '#F0F1FE',
          100: '#E0E1FD',
          200: '#C2C4FB',
          400: '#8588ED',
          500: '#666BE8',
          600: '#4D53E8',
          700: '#3B41D9',
          900: '#1E2280',
        },
        secondary: {
          DEFAULT: '#4D53E8',
          400: '#7075ED',
          500: '#4D53E8',
          600: '#3B41D9',
        },
        accent: {
          DEFAULT: '#F472B6',
          100: '#FCE7F3',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
        },
        text: {
          main: '#1D2129',
          muted: '#86909C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'coze': '0 2px 8px 0 rgba(0,0,0,0.04)',
        'coze-hover': '0 4px 16px 0 rgba(0,0,0,0.08)',
        'coze-lg': '0 4px 24px 0 rgba(0,0,0,0.08)',
        'pearl': '0 4px 20px -2px rgba(102, 107, 232, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        'pearl-lg': '0 10px 25px -5px rgba(102, 107, 232, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
