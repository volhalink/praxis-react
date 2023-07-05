/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'violet-light': '#dfdbe5',
        'violet-dark': '#9c92ac',
      },
      backgroundImage: {
        'morphing-diamonds-pattern': "url('img/morphing-diamonds.svg')",
        'endless-clouds-pattern': "url('img/endless-clouds.svg')" ,
      }
    },
  },
  plugins: [],
}

