/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'gryffindor': '#740001',
        'slytherin': '#1a472a',
        'ravenclaw': '#0e1a40',
        'hufflepuff': '#ecb939',
      }
    },
  },
  plugins: [],
}
