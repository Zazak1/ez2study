/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coze: {
          bg: '#F7F8FA',
          primary: '#666BE8', // Coze signature purple/blue
          secondary: '#4D53E8',
          text: {
            main: '#1D2129',
            secondary: '#86909C',
            placeholder: '#C9CDD4'
          },
          border: '#E5E6EB',
          surface: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'coze': '0 2px 8px 0 rgba(0,0,0,0.04)',
        'coze-hover': '0 4px 16px 0 rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
