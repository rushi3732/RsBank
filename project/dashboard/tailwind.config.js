/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 

  theme: {
    extend: {
      colors: {
        "dark-purple":"#0B1A51",
        'light-white':'grgba(255,255,255,0,18'
      },
      fontFamily: {
        custom: ['CustomFont', 'sans'], 
      },
    },

  },
  

  variants: {
    extend: {
      backgroundColor: ['hover', 'focus'],
     
    },
  }

}
