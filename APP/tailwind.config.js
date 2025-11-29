// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo 600
        secondary: '#EC4899', // Pink 500
        background: '#F9FAFB', // Gray 50
      }
    },
  },
  plugins: [],
}

