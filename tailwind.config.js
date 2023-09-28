const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    colors: {
      teal: colors.teal,
      cyan: colors.cyan,
      gray: colors.gray,
      amber: colors.amber,
      sky: colors.sky,
      white: '#fff'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
