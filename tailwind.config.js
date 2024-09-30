/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        'chess-light': '#F0D9B5',
        'chess-dark': '#B58863',
      }
    },
  },
  plugins: [],
}

