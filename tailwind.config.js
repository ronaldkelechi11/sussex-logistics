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
        logoImg: "url('/assets/images/logo.JPG')",
        heroImg: "url('/assets/images/courier_girl.jpg')"
      },

      fontFamily: {
        kanit: 'Kanit',
        poppins: 'Poppins'
      }

    },
  },
  plugins: [],
}

