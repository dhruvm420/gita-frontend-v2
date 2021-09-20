module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'inter': ['"Inter"', 'cursive']
      },
      colors:{
        'my-orange':'#F57903',
        'lead-text':'#FEDF89',
        'box-bg':'#FFFAEC',
        'box-stroke':'#FFE9B1'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
