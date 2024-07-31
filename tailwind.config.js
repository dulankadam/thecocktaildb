const cssLoader = require('css-loader')
const { postcss } = require('tailwindcss')
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.css' 
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: ['css-loader','postcss-loader'],
};

