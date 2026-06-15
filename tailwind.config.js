/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./blog/**/*.html",
    "./events/**/*.html",
    "./projects/**/*.html",
    "./news/**/*.html",
    "./assets/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        hbnGreen: '#4e9317',
        hbnGreenDark: '#3d7412',
        hbnPurple: '#8360a9',
        hbnGray: '#808184',
        hbnYellow: '#ffca29',
        hbnBlue: '#3e95dd',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        shadows: ['"Shadows Into Light"', 'cursive'],
      },
    },
  },
  plugins: [],
};
