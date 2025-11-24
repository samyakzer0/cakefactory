/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFB7B2',
          blue: '#AEC6CF',
          yellow: '#FDFD96',
          green: '#B2D8B2',
          purple: '#C3B1E1',
          cream: '#FDF5E6',
        },
        bakery: {
          brown: '#8B4513',
          gold: '#FFD700',
        }
      },
      fontFamily: {
        cursive: ['"Dancing Script"', 'cursive'],
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
