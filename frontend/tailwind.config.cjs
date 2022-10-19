/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: '#D9D9D9',
        light: '#F9F9F9',
        darkGrey: '#E6E6E6',
        dark: '#262626',
        primary: '#0E0E0E',
        form: '#808080',
        formInput: '#D1D1D1',
      },
    },
  },
  plugins: [],
}
