/* eslint-disable quote-props */
module.exports = {
  content: ['./views/**/*.pug', './styles/index.sass'],
  theme: {
    extend: {
      colors: {
        primary: '#00132c',
        secondary: '#e7e8f9'
      },
      maxWidth: {
        'container': '160rem',
        'container-sm': '63.25rem',
        'container-faq': '53.25rem'
      },
      fontSize: {
        none: '0'
      },
      zIndex: {
        max: '9999'
      },
      spacing: {
        'container-md': '80%',
        'container': '90%',
        '128': '32rem',
        '200': '50rem'
      }
    }
  },
  plugins: []
}
