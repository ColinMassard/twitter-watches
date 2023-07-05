module.exports = {
  content: ['./views/**/*.pug', './styles/index.sass'],
  theme: {
    extend: {
      colors: {
        primary: '#002658',
        secondary: '#e7e8f9'
      },
      fontSize: {
        none: '0'
      },
      zIndex: {
        max: '9999'
      }
    }
  },
  plugins: []
}
