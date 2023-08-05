  const colors =  require('tailwindcss/colors');
  
  module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx,vue}',],
     darkMode: false, // or 'media' or 'class'
     theme: {
      colors: {
        teal: colors.teal,
        cyan: colors.cyan,
        gray: colors.gray,
        white: '#fff'
      },
       extend: {},
     },
     variants: {
       extend: {},
     },
     plugins: [],
   }