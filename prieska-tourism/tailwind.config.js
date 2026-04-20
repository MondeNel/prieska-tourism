// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'prieska-terracotta': '#C86A45',
        'prieska-river': '#2B5B84',
        'prieska-sand': '#EADDCA',
      },
      fontFamily: {
        'serif': ['Merriweather', 'serif'],      // Changed
        'sans': ['Poppins', 'sans-serif'],       // Changed
      },
    },
  },
  plugins: [],
}