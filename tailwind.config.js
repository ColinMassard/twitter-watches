module.exports = {
  content: ['./views/**/*.pug', './styles/index.sass'],
  theme: {
    extend: {
      colors: {
        primary: '#00132c',
        secondary: '#e7e8f9'
      },
      fontSize: {
        none: '0'
      },
      zIndex: {
        max: '9999'
      },
      spacing: {
        '128': '32rem',
        '200': '50rem'
      }
    }
  },
  plugins: []
}
