/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //'violet-light': '#dfdbe5',
        //'violet-dark': '#9c92ac',
        'main-light': '#dfdbe5',
        'main-dark': '#9c92ac',
        'main-highlight-light': '#7c3aed', //violet-600
        'main-highlight-dark': '#5b21b6', //violet-800
      },
      backgroundImage: {
        'morphing-diamonds-pattern': "url('img/morphing-diamonds.svg')",
        'endless-clouds-pattern': "url('img/endless-clouds.svg')" ,
      }
    },
  },
  plugins: [],
}

