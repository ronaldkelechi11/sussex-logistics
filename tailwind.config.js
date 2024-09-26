/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        primary: '#e72828'
      },

      backgroundImage: {
        logoImg: "url('./public/assets/images/logo.JPG')"
      },

      fontFamily: {
        kanit: 'Kanit',
        poppins: 'Poppins'
      }

    },
  },
  plugins: [],
}

