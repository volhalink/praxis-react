/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '375px',
      },
      colors: {
        //'violet-light': '#dfdbe5',
        //'violet-dark': '#9c92ac',
        'main-light': '#f9f9f5', // olive-50
        'main-dark': '#585e1c', //olive-600
        'main-navigation-text': '#444718', //olive-700
        'main-highlight-light': '#f3f0d9', //olive-100
        'main-highlight-dark': '#e4e0ae', //olive-200
        'main-shadow': '#444718', // olive-700
        'main-btnsave-bg': '#8f974a', // olive-400
        'main-btnsave-text': '#444718', // olive-700
        'main-btncancel-bg': '#d28448', // cocoa-400
        'main-btncancel-text': '#773616', // cocoa-700
        'main-error-light': '#fb7185', //rose-400
        'main-error-dark': '#be123c', //rose-700
        cocoa: {
          '50':  '#fcfbf7',
          '100': '#faf0d5',
          '200': '#f4d9aa',
          '300': '#e3b176',
          '400': '#d28448',
          '500': '#b9622a',
          '600': '#9c481b',
          '700': '#773616',
          '800': '#522511',
          '900': '#34170b',
        },
        olive: {
          '50':  '#f9f9f5',
          '100': '#f3f0d9',
          '200': '#e4e0ae',
          '300': '#c1be79',
          '400': '#8f974a',
          '500': '#6e782a',
          '600': '#585e1c',
          '700': '#444718',
          '800': '#2f3013',
          '900': '#1e1d0e',
        },
      },
      backgroundImage: {
        'endless-clouds-pattern': "url('img/endless-clouds.svg')",
      }
    },
  },
  plugins: [],
}

