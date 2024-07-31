const cssLoader = require('css-loader')
const { postcss } = require('tailwindcss')
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",    // Scan all .js, .ts, .jsx, .tsx files in the 'app' directory
    "./components/**/*.{js,ts,jsx,tsx}", // Scan all .js, .ts, .jsx, .tsx files in the 'components' directory
    "./styles/**/*.css"              // Scan all .css files in the 'styles' directory
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: ['css-loader','postcss-loader'],
};

